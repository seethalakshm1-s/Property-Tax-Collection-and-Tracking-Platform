package com.propertytax.backend.repository;

import com.propertytax.backend.entity.PropertyTaxRule;
import com.propertytax.backend.entity.PropertyTaxRuleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyTaxRuleRepository
        extends JpaRepository<PropertyTaxRule, PropertyTaxRuleId> {
}