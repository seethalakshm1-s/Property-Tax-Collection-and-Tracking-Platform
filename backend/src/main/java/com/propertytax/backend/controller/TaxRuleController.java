package com.propertytax.backend.controller;

import com.propertytax.backend.entity.TaxRule;
import com.propertytax.backend.service.TaxRuleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tax-rules")
@CrossOrigin(origins = "http://localhost:5173")
public class TaxRuleController {

    private final TaxRuleService taxRuleService;

    public TaxRuleController(TaxRuleService taxRuleService) {
        this.taxRuleService = taxRuleService;
    }

    @GetMapping
    public List<TaxRule> getAllTaxRules() {
        return taxRuleService.getAllTaxRules();
    }

    @GetMapping("/{id}")
    public TaxRule getTaxRuleById(@PathVariable Integer id) {
        return taxRuleService.getTaxRuleById(id);
    }

    @PostMapping
    public TaxRule saveTaxRule(@RequestBody TaxRule taxRule) {
        return taxRuleService.saveTaxRule(taxRule);
    }

    @DeleteMapping("/{id}")
    public void deleteTaxRule(@PathVariable Integer id) {
        taxRuleService.deleteTaxRule(id);
    }
}