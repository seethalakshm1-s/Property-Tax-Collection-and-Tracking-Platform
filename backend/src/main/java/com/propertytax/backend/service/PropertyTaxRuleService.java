package com.propertytax.backend.service;

import com.propertytax.backend.entity.PropertyTaxRule;
import com.propertytax.backend.entity.PropertyTaxRuleId;
import com.propertytax.backend.repository.PropertyTaxRuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyTaxRuleService {

    private final PropertyTaxRuleRepository propertyTaxRuleRepository;

    public PropertyTaxRuleService(PropertyTaxRuleRepository propertyTaxRuleRepository) {
        this.propertyTaxRuleRepository = propertyTaxRuleRepository;
    }

    public List<PropertyTaxRule> getAllPropertyTaxRules() {
        return propertyTaxRuleRepository.findAll();
    }

    public PropertyTaxRule getPropertyTaxRule(Integer propertyId, Integer ruleId) {
        PropertyTaxRuleId id = new PropertyTaxRuleId(propertyId, ruleId);
        return propertyTaxRuleRepository.findById(id).orElse(null);
    }

    public PropertyTaxRule savePropertyTaxRule(PropertyTaxRule propertyTaxRule) {
        return propertyTaxRuleRepository.save(propertyTaxRule);
    }

    public void deletePropertyTaxRule(Integer propertyId, Integer ruleId) {
        PropertyTaxRuleId id = new PropertyTaxRuleId(propertyId, ruleId);
        propertyTaxRuleRepository.deleteById(id);
    }
    public PropertyTaxRule updatePropertyTaxRule(
        Integer propertyId,
        Integer ruleId,
        PropertyTaxRule propertyTaxRule) {

    PropertyTaxRuleId id = new PropertyTaxRuleId(propertyId, ruleId);

    PropertyTaxRule existingPropertyTaxRule =
            propertyTaxRuleRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Property Tax Rule not found"));

    existingPropertyTaxRule.setPropertyId(propertyTaxRule.getPropertyId());
    existingPropertyTaxRule.setRuleId(propertyTaxRule.getRuleId());

    return propertyTaxRuleRepository.save(existingPropertyTaxRule);
}
}