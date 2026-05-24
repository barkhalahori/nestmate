package com.nestmate.matching_service.controller;

import com.nestmate.matching_service.dto.ListingResponse;
import com.nestmate.matching_service.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/match")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @GetMapping("/{userId}")
    public List<ListingResponse> getMatchedListings(@PathVariable Long userId, @RequestHeader("Authorization") String authHeader){

//        String token = authHeader.substring(7);
        return matchingService.getMatchedListings(userId, authHeader);
    }


}
