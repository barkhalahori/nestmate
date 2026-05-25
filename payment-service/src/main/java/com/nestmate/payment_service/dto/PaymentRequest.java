package com.nestmate.payment_service.dto;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long userId;
    private Double amount;
    private String currency;
}
