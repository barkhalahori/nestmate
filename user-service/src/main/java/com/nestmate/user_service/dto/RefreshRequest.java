package com.nestmate.user_service.dto;

import lombok.Data;

@Data
public class RefreshRequest {
    private String refreshToken;
}
