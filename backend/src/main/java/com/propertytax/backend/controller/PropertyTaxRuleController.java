package com.propertytax.backend.controller;

import com.propertytax.backend.entity.PropertyTaxRule;
import com.propertytax.backend.service.PropertyTaxRuleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property-tax-rules")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyTaxRuleController {

    private final PropertyTaxRuleService propertyTaxRuleService;

    public PropertyTaxRuleController(PropertyTaxRuleService propertyTaxRuleService) {
        this.propertyTaxRuleService = propertyTaxRuleService;
    }

    @GetMapping
    public List<PropertyTaxRule> getAllPropertyTaxRules() {
        return propertyTaxRuleService.getAllPropertyTaxRules();
    }

    @GetMapping("/{propertyId}/{ruleId}")
    public PropertyTaxRule getPropertyTaxRule(
            @PathVariable Integer propertyId,
            @PathVariable Integer ruleId) {

        return propertyTaxRuleService.getPropertyTaxRule(propertyId, ruleId);
    }

    @PutMapping("/{propertyId}/{ruleId}")
    public PropertyTaxRule updatePropertyTaxRule(
        @PathVariable Integer propertyId,
        @PathVariable Integer ruleId,
        @RequestBody PropertyTaxRule propertyTaxRule) {

    return propertyTaxRuleService.updatePropertyTaxRule(
            propertyId, ruleId, propertyTaxRule);
    }

    @DeleteMapping("/{propertyId}/{ruleId}")
    public void deletePropertyTaxRule(
            @PathVariable Integer propertyId,
            @PathVariable Integer ruleId) {

        propertyTaxRuleService.deletePropertyTaxRule(propertyId, ruleId);
    }
}