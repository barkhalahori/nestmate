package com.nestmate.listing_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Listing {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String location;
    private Double rent;
    private int totalBeds;
    private boolean vegetarian;
    private String preferredGender;
    private boolean acAvailable;
    private boolean electricityIncluded;
    private String status;
    private LocalDateTime createdAt;
    private int availableBeds;

}
