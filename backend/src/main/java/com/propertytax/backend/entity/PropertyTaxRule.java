

package com.propertytax.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "property_tax_rule")
@IdClass(PropertyTaxRuleId.class)
public class PropertyTaxRule {

    @Id
    @Column(name = "property_id")
    private Integer propertyId;

    @Id
    @Column(name = "rule_id")
    private Integer ruleId;

    public Integer getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Integer propertyId) {
        this.propertyId = propertyId;
    }

    public Integer getRuleId() {
        return ruleId;
    }

    public void setRuleId(Integer ruleId) {
        this.ruleId = ruleId;
    }
}