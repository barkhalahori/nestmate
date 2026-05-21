package com.nestmate.listing_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingResponse {
    private Long id;
    private String status;
    private LocalDateTime createdAt;
    private Long userId;
    private String location;
    private Double rent;
    private int totalBeds;
    private boolean isVegetarian;
    private String preferredGender;
    private boolean acAvailable;
    private boolean electricityIncluded;
    private int availableBeds;
}
