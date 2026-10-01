package com.propertytax.backend.repository;

import com.propertytax.backend.entity.PropertyVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyVerificationRepository
        extends JpaRepository<PropertyVerification, Integer> {
}