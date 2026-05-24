package com.nestmate.listing_service.dto;

import lombok.Data;

@Data
public class CreateListingRequest {
    private Long userId;
    private String location;
    private Double rent;
    private int totalBeds;
    private boolean vegetarian;
    private String preferredGender;
    private boolean acAvailable;
    private boolean electricityIncluded;
    private int availableBeds;
}
