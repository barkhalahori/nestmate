package com.nestmate.user_service.controller;

import com.nestmate.user_service.dto.*;
import com.nestmate.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){
        return userService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return userService.login(request);
    }

    @PostMapping("/refresh")
    public RefreshResponse refreshRequest(@RequestBody RefreshRequest request){
        return userService.refresh(request);
    }
}
