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
    public TaxAssessment updateTaxAssessment(Integer id, TaxAssessment taxAssessment) {

    TaxAssessment existingAssessment = taxAssessmentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tax Assessment not found"));

    existingAssessment.setTaxYear(taxAssessment.getTaxYear());
    existingAssessment.setTaxableValue(taxAssessment.getTaxableValue());
    existingAssessment.setTaxRate(taxAssessment.getTaxRate());
    existingAssessment.setPropertyId(taxAssessment.getPropertyId());
    existingAssessment.setTaxAmount(taxAssessment.getTaxAmount());
    existingAssessment.setDueDate(taxAssessment.getDueDate());
    existingAssessment.setPaidAmount(taxAssessment.getPaidAmount());
    existingAssessment.setBalanceAmount(taxAssessment.getBalanceAmount());
    existingAssessment.setStatus(taxAssessment.getStatus());

    return taxAssessmentRepository.save(existingAssessment);
  }
}