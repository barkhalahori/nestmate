package com.nestmate.listing_service.service;

import com.nestmate.listing_service.dto.CreateListingRequest;
import com.nestmate.listing_service.dto.ListingResponse;
import com.nestmate.listing_service.entity.Listing;
import com.nestmate.listing_service.repository.ListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import static java.util.stream.Collectors.toList;

@Service
public class ListingService {

    @Autowired
    private ListingRepository listingRepository;

    public ListingResponse createListing(CreateListingRequest request){
        Listing listing = new Listing();
        listing.setCreatedAt(LocalDateTime.now());
        listing.setStatus("AVAILABLE");
        listing.setUserId(request.getUserId());
        listing.setLocation(request.getLocation());
        listing.setRent(request.getRent());
        listing.setTotalBeds(request.getTotalBeds());
        listing.setAvailableBeds(request.getAvailableBeds());
        listing.setVegetarian(request.isVegetarian());
        listing.setPreferredGender(request.getPreferredGender());
        listing.setAcAvailable(request.isAcAvailable());
        listing.setElectricityIncluded(request.isElectricityIncluded());

        Listing saved = listingRepository.save(listing);
        return mapToResponse(saved);
    }

    public List<ListingResponse> getListingsByUser(Long UserId){
        return listingRepository.findByUserId(UserId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ListingResponse mapToResponse(Listing listing) {
        ListingResponse response = new ListingResponse();
        response.setId(listing.getId());
        response.setUserId(listing.getUserId());
        response.setLocation(listing.getLocation());
        response.setRent(listing.getRent());
        response.setTotalBeds(listing.getTotalBeds());
        response.setAvailableBeds(listing.getAvailableBeds());
        response.setVegetarian(listing.isVegetarian());
        response.setPreferredGender(listing.getPreferredGender());
        response.setAcAvailable(listing.isAcAvailable());
        response.setElectricityIncluded(listing.isElectricityIncluded());
        response.setStatus(listing.getStatus());
        response.setCreatedAt(listing.getCreatedAt());

        return response;
    }
}
