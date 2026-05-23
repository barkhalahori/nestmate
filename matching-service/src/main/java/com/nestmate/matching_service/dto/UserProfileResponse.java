package com.nestmate.matching_service.dto;

import lombok.Data;

@Data
public class UserProfileResponse {
    private Long id;
    private Long userId;
    private String preferredLocation;
    private String preferredGender;
    private Double maxBudget;
    private boolean vegetarian;
    private boolean acRequired;
    private boolean electricityIncluded;
    private String lookingFor;
}
