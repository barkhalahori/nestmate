package com.nestmate.user_service.config;

import com.nestmate.user_service.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import  com.nestmate.user_service.entity.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException{
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");


        Optional<User> existing = userRepository.findByEmail(email);
        if(existing.isEmpty()){
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPassword("");
            newUser.setRole("SEEKER");
            userRepository.save(newUser);
        }

        String role = userRepository.findByEmail(email).get().getRole();
        String token = jwtUtil.generateAccessToken(email,role);

        response.setContentType("application/json");
        response.getWriter().write("{\"accessToken\":\""+token+"\"}");
    }
}

