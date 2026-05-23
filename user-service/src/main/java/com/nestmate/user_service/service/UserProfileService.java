package com.nestmate.user_service.service;

import com.nestmate.user_service.dto.UserProfileRequest;
import com.nestmate.user_service.dto.UserProfileResponse;
import com.nestmate.user_service.entity.UserProfile;
import com.nestmate.user_service.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {
    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfileResponse saveProfile(UserProfileRequest request){
        UserProfile userProfile = new UserProfile();

        userProfile.setAcRequired(request.isAcRequired());
        userProfile.setUserId(request.getUserId());
        userProfile.setElectricityIncluded(request.isElectricityIncluded());
        userProfile.setMaxBudget(request.getMaxBudget());
        userProfile.setLookingFor(request.getLookingFor());
        userProfile.setVegetarian(request.isVegetarian());
        userProfile.setPreferredGender(request.getPreferredGender());
        userProfile.setPreferredLocation(request.getPreferredLocation());

        UserProfile saved = userProfileRepository.save(userProfile);
        return mapToResponse(saved);
    }

    public UserProfileResponse getProfile(Long userId){
        UserProfile userProfile = userProfileRepository.findProfileByUserId(userId)
                .orElseThrow(()->new RuntimeException("Profile not found"));

        return mapToResponse(userProfile);
    }

    private UserProfileResponse mapToResponse(UserProfile userProfile){
        return new UserProfileResponse(
                userProfile.getUserId(),
                userProfile.getId(),
                userProfile.getPreferredLocation(),
                userProfile.getPreferredGender(),
                userProfile.getMaxBudget(),
                userProfile.isVegetarian(),
                userProfile.isAcRequired(),
                userProfile.isElectricityIncluded(),
                userProfile.getLookingFor()
        );
    }
}
