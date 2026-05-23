package com.nestmate.user_service.controller;

import com.nestmate.user_service.dto.UserProfileRequest;
import com.nestmate.user_service.dto.UserProfileResponse;
import com.nestmate.user_service.service.UserProfileService;
import com.nestmate.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{userId}")
    public UserProfileResponse getProfile(@PathVariable Long userId){
        return userProfileService.getProfile(userId);
    }

    @PostMapping
    public UserProfileResponse saveProfile(@RequestBody UserProfileRequest userProfileRequest){
        return userProfileService.saveProfile(userProfileRequest);
    }
}
