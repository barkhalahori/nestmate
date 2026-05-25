package com.nestmate.payment_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaymentResponse {
    private Long id;
    private Long userId;
    private Double amount;
    private String currency;
    private String stripePaymentIntentId;
    private String status;
    private LocalDateTime createdAt;
}
