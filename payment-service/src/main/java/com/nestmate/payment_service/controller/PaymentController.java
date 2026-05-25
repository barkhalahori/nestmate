package com.nestmate.payment_service.controller;

import com.nestmate.payment_service.dto.PaymentRequest;
import com.nestmate.payment_service.dto.PaymentResponse;
import com.nestmate.payment_service.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-intent")
    public PaymentResponse createPaymentIntent(@RequestBody PaymentRequest request) throws StripeException {
        return paymentService.createPaymentIntent(request);
    }

    @PostMapping("/webhook")
    public void handleWebhook(@RequestBody String paymentIntentId){
        paymentService.handleWebhook(paymentIntentId);
    }

    @GetMapping("/{userId}")
    public List<PaymentResponse> getPaymentsByUser(@PathVariable Long userId){
        return paymentService.getPaymentsByUser(userId);
    }
}