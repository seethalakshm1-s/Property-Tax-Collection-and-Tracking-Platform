package com.propertytax.backend.repository;

import com.propertytax.backend.entity.TaxAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaxAssessmentRepository extends JpaRepository<TaxAssessment, Integer> {
   
    @Query(value = "SELECT ta.* FROM tax_assessment ta " +
            "JOIN property p ON ta.property_id = p.property_id " +
            "WHERE p.user_id = :userId", nativeQuery = true)
    List<TaxAssessment> findAssessmentsByUserId(@Param("userId") Integer userId);
}
