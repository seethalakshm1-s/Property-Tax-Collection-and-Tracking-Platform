package com.propertytax.backend.service;

import com.propertytax.backend.entity.TaxRule;
import com.propertytax.backend.repository.TaxRuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaxRuleService {

    private final TaxRuleRepository taxRuleRepository;

    public TaxRuleService(TaxRuleRepository taxRuleRepository) {
        this.taxRuleRepository = taxRuleRepository;
    }

    public List<TaxRule> getAllTaxRules() {
        return taxRuleRepository.findAll();
    }

    public TaxRule getTaxRuleById(Integer id) {
        return taxRuleRepository.findById(id).orElse(null);
    }

    public TaxRule saveTaxRule(TaxRule taxRule) {
        return taxRuleRepository.save(taxRule);
    }

    public void deleteTaxRule(Integer id) {
        taxRuleRepository.deleteById(id);
    }
}