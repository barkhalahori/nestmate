package com.nestmate.matching_service.dto;

import lombok.Data;

@Data
public class ListingResponse {
    private Long id;
    private Long userId;
    private String location;
    private Double rent;
    private int totalBeds;
    private int availableBeds;
    private boolean vegetarian;
    private String preferredGender;
    private boolean acAvailable;
    private boolean electricityIncluded;
    private String status;
    private double score;
}
