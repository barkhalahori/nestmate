package com.nestmate.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private Long userId;
    private Long id;
    private String preferredLocation;
    private String preferredGender;
    private Double maxBudget;
    private boolean isVegetarian;
    private boolean acRequired;
    private boolean electricityIncluded;
    private String lookingFor; //"ROOM" or "FLATMATE"
}

