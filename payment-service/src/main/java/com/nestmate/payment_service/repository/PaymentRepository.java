package com.nestmate.payment_service.repository;

import com.nestmate.payment_service.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    public List<Payment> findByUserId(Long UserId);

    Optional<Payment> findByStripePaymentIntentId(String stripePaymentIntentId);
}
