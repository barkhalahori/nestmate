package com.nestmate.user_service.dto;

import lombok.Data;

@Data
public class UserProfileRequest {
    private Long userId;

    private String preferredLocation;
    private String preferredGender;
    private Double maxBudget;
    private boolean vegetarian;
    private boolean acRequired;
    private boolean electricityIncluded;
    private String lookingFor; //"ROOM" or "FLATMATE"
}
