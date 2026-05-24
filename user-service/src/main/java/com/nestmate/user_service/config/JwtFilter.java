package com.nestmate.user_service.config;

import com.nestmate.user_service.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;

    //this doFilterInternal is called by the Spring automatically for every request.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //This reads the Authorization header from the incoming request
        String authHeader = request.getHeader("Authorization");

        //If the request has not token or the header exists but doesn't follow the Bearer format.
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        //Token is being extracted
        String token = authHeader.substring(7);

//        System.out.println("Token received: " + token);
//        System.out.println("Is valid: " + jwtUtil.isTokenValid(token));


        //isTokenValid method checks: 1) Is the signature valid? 2) Is it not expired?
        //If either fails...it returns false and we immediately send back 401
        if(!jwtUtil.isTokenValid(token)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String email = jwtUtil.extractEmail(token);

        //In production systems, JWT filters never do DB lookups.
//        userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));

        if (email == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        //UserDetails : Spring Security's representation of a logged-in user.
        UserDetails userDetails = User.withUsername(email)
                .password("")
                .authorities(List.of())
                .build();

        //UsernamePasswordAuthenticationToken is a container that holds the authenticated user.
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        //filter is done. Pass the request forward -- next stop is the controller
        filterChain.doFilter(request, response);
    }
}
