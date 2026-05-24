package com.nestmate.matching_service.service;

import com.nestmate.matching_service.dto.ListingResponse;
import com.nestmate.matching_service.dto.UserProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String USER_SERVICE_URL = "http://localhost:8081";
    private static final String LISTING_SERVICE_URL = "http://localhost:8082";

    public List<ListingResponse> getMatchedListings(Long userId, String token) {
        System.out.println("Token being sent: " + token);
        // Step 1 - fetch profile WITH token
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization",token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<UserProfileResponse> profileResponse = restTemplate.exchange(
                USER_SERVICE_URL + "/profile/" + userId,
                HttpMethod.GET,
                entity,
                UserProfileResponse.class
        );
        UserProfileResponse profile = profileResponse.getBody();

        // Step 2 - fetch all listings WITH token
        ResponseEntity<ListingResponse[]> listingsResponse = restTemplate.exchange(
                LISTING_SERVICE_URL + "/listings",
                HttpMethod.GET,
                entity,
                ListingResponse[].class
        );
        ListingResponse[] listings = listingsResponse.getBody();

        // Step 3 - score and sort
        return Arrays.stream(listings)
                .filter(l -> l.getAvailableBeds() > 0)
                .filter(l -> "AVAILABLE".equals(l.getStatus()))
                .map(l -> {
                    double score = calculateScore(profile, l);
                    l.setScore(score);
                    return l;
                })
                .sorted(Comparator.comparingDouble(ListingResponse::getScore).reversed())
                .toList();
    }

    private double calculateScore(UserProfileResponse profile, ListingResponse listing) {
        double score = 0.0;

        // location match → highest weight
        if (profile.getPreferredLocation() != null &&
                listing.getLocation() != null &&
                listing.getLocation().toLowerCase()
                        .contains(profile.getPreferredLocation().toLowerCase())) {
            score += 0.35;
        }

        // budget match
        if (profile.getMaxBudget() != null &&
                listing.getRent() <= profile.getMaxBudget()) {
            score += 0.25;
        }

        // vegetarian match
        if (profile.isVegetarian() == listing.isVegetarian()) {
            score += 0.15;
        }

        // gender preference match
        if (listing.getPreferredGender().equals("ANY") ||
                listing.getPreferredGender().equals(profile.getPreferredGender())) {
            score += 0.10;
        }

        // AC match
        if (profile.isAcRequired() == listing.isAcAvailable()) {
            score += 0.08;
        }

        // electricity match
        if (profile.isElectricityIncluded() == listing.isElectricityIncluded()) {
            score += 0.07;
        }

        return score;
    }
}
