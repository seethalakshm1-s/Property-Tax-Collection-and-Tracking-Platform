package com.propertytax.backend.controller;

import com.propertytax.backend.entity.PropertyVerification;
import com.propertytax.backend.service.PropertyVerificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property-verifications")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyVerificationController {

    private final PropertyVerificationService propertyVerificationService;

    public PropertyVerificationController(
            PropertyVerificationService propertyVerificationService) {
        this.propertyVerificationService = propertyVerificationService;
    }

    @GetMapping
    public List<PropertyVerification> getAllVerifications() {
        return propertyVerificationService.getAllVerifications();
    }

    @GetMapping("/{id}")
    public PropertyVerification getVerificationById(
            @PathVariable Integer id) {
        return propertyVerificationService.getVerificationById(id);
    }

    @PostMapping
    public PropertyVerification saveVerification(
            @RequestBody PropertyVerification propertyVerification) {
        return propertyVerificationService.saveVerification(propertyVerification);
    }
    @PutMapping("/{id}")
    public PropertyVerification updateVerification(
        @PathVariable Integer id,
        @RequestBody PropertyVerification propertyVerification) {
    return propertyVerificationService.updateVerification(
            id, propertyVerification);
    }
    @DeleteMapping("/{id}")
    public void deleteVerification(@PathVariable Integer id) {
        propertyVerificationService.deleteVerification(id);
    }
}