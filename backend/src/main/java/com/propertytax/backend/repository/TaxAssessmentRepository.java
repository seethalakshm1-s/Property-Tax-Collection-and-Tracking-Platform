package com.propertytax.backend.repository;

import com.propertytax.backend.entity.TaxAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxAssessmentRepository extends JpaRepository<TaxAssessment, Integer> {
}