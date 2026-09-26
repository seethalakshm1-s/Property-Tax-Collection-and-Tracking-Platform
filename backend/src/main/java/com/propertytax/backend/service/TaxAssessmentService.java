package com.propertytax.backend.service;

import com.propertytax.backend.entity.TaxAssessment;
import com.propertytax.backend.repository.TaxAssessmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaxAssessmentService {

    private final TaxAssessmentRepository taxAssessmentRepository;

    public TaxAssessmentService(TaxAssessmentRepository taxAssessmentRepository) {
        this.taxAssessmentRepository = taxAssessmentRepository;
    }

    public List<TaxAssessment> getAllAssessments() {
        return taxAssessmentRepository.findAll();
    }

    public TaxAssessment getAssessmentById(Integer id) {
        return taxAssessmentRepository.findById(id).orElse(null);
    }

    public TaxAssessment saveAssessment(TaxAssessment assessment) {
        return taxAssessmentRepository.save(assessment);
    }

    public void deleteAssessment(Integer id) {
        taxAssessmentRepository.deleteById(id);
    }
}