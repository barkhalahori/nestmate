package com.nestmate.user_service.repository;

import com.nestmate.user_service.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    public Optional<UserProfile> findProfileByUserId(Long userId);
}
