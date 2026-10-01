package com.propertytax.backend.service;

import com.propertytax.backend.entity.PropertyVerification;
import com.propertytax.backend.repository.PropertyVerificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyVerificationService {

    private final PropertyVerificationRepository propertyVerificationRepository;

    public PropertyVerificationService(
            PropertyVerificationRepository propertyVerificationRepository) {
        this.propertyVerificationRepository = propertyVerificationRepository;
    }

    public List<PropertyVerification> getAllVerifications() {
        return propertyVerificationRepository.findAll();
    }

    public PropertyVerification getVerificationById(Integer id) {
        return propertyVerificationRepository.findById(id).orElse(null);
    }

    public PropertyVerification saveVerification(
            PropertyVerification propertyVerification) {
        return propertyVerificationRepository.save(propertyVerification);
    }

    public void deleteVerification(Integer id) {
        propertyVerificationRepository.deleteById(id);
    }
}