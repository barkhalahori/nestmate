package com.nestmate.listing_service.controller;

import com.nestmate.listing_service.dto.CreateListingRequest;
import com.nestmate.listing_service.dto.ListingResponse;
import com.nestmate.listing_service.service.ListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listings")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @PostMapping
    public ListingResponse createListing(@RequestBody CreateListingRequest request){
        return listingService.createListing(request);
    }

    @GetMapping("/user/{userId}")
    public List<ListingResponse> getAllListings(@PathVariable Long userId){
        return listingService.getListingsByUser(userId);
    }

    @GetMapping
    public List<ListingResponse> getAllListings(){
        return listingService.getAllListings();
    }
}
