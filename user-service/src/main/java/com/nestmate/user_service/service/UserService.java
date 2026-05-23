package com.nestmate.user_service.service;

import com.nestmate.user_service.config.JwtUtil;
import com.nestmate.user_service.dto.*;
import com.nestmate.user_service.entity.User;
import com.nestmate.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request){
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            return "Email already registered";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully";
    }

    public LoginResponse login(LoginRequest request){
        //find user or throw error
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found"));
        //check password using passwordEncoder.matches()
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Password");
        }
        String accessToken = jwtUtil.generateAccessToken(request.getEmail(), user.getRole());
        String refreshToken = jwtUtil.generateRefreshToken(request.getEmail());

        return new LoginResponse(accessToken,refreshToken,"Login Successful");
    }

    public RefreshResponse refresh(RefreshRequest request){
        if(jwtUtil.isTokenValid(request.getRefreshToken())){
            String email = jwtUtil.extractEmail(request.getRefreshToken());
            User user = userRepository.findByEmail(email)
                    .orElseThrow(()-> new RuntimeException("User not found"));

            String accessToken = jwtUtil.generateAccessToken(email, user.getRole());
            return new RefreshResponse(accessToken,"Access Token generated successfully!");
        }
        else{
            throw new RuntimeException("Invalid or expired refresh token");
        }
    }

}
