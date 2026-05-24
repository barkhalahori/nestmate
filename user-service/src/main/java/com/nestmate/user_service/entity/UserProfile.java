package com.nestmate.user_service.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private Long userId;

    private String preferredLocation;
    private String preferredGender;
    private Double maxBudget;
    private boolean vegetarian;
    private boolean acRequired;
    private boolean electricityIncluded;
    private String lookingFor; //"ROOM" or "FLATMATE"
}
