package com.nestmate.payment_service.service;

import com.nestmate.payment_service.dto.PaymentRequest;
import com.nestmate.payment_service.dto.PaymentResponse;
import com.nestmate.payment_service.entity.Payment;
import com.nestmate.payment_service.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public PaymentResponse createPaymentIntent(PaymentRequest request) throws StripeException {
        //initialize Stripe with secret key
        Stripe.apiKey = stripeSecretKey;

        //create payment intent on Stripe
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (request.getAmount() * 100))
                .setCurrency(request.getCurrency())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        //save to DB
        Payment payment = new Payment();
        payment.setUserId(request.getUserId());
        payment.setCreatedAt(LocalDateTime.now());
        payment.setStripePaymentIntentId(intent.getId());
        payment.setCurrency(request.getCurrency());
        payment.setAmount(request.getAmount());
        payment.setStatus("PENDING");

        Payment saved = paymentRepository.save(payment);

        return mapToResponse(saved);
    }

    public void handleWebhook(String paymentIntentId) {
        paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .ifPresent(payment -> {
                    payment.setStatus("SUCCESS");
                    paymentRepository.save(payment);
                });
    }

    public List<PaymentResponse> getPaymentsByUser(Long userId) {
        return paymentRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getUserId(),
                payment.getAmount(),
                payment.getCurrency(),
                payment.getStripePaymentIntentId(),
                payment.getStatus(),
                payment.getCreatedAt()
        );
    }
}

