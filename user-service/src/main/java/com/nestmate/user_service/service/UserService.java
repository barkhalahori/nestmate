package com.nestmate.user_service.service;

import com.nestmate.user_service.dto.RegisterRequest;
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

}
