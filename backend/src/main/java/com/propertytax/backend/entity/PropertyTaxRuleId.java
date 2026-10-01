package com.propertytax.backend.entity;

import java.io.Serializable;
import java.util.Objects;

public class PropertyTaxRuleId implements Serializable {

    private Integer propertyId;
    private Integer ruleId;

    public PropertyTaxRuleId() {
    }

    public PropertyTaxRuleId(Integer propertyId, Integer ruleId) {
        this.propertyId = propertyId;
        this.ruleId = ruleId;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PropertyTaxRuleId)) return false;

        PropertyTaxRuleId that = (PropertyTaxRuleId) o;

        return Objects.equals(propertyId, that.propertyId)
                && Objects.equals(ruleId, that.ruleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(propertyId, ruleId);
    }
}