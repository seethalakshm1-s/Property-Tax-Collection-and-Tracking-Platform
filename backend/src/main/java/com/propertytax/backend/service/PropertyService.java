package com.propertytax.backend.service;

import com.propertytax.backend.entity.Property;
import com.propertytax.backend.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property updateProperty(Integer id, Property property) {

        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        existingProperty.setAssessmentNumber(property.getAssessmentNumber());
        existingProperty.setPropertyType(property.getPropertyType());
        existingProperty.setUsageType(property.getUsageType());
        existingProperty.setArea(property.getArea());
        existingProperty.setDoorNumber(property.getDoorNumber());
        existingProperty.setStreet(property.getStreet());
        existingProperty.setAddress(property.getAddress());
        existingProperty.setUrbanOrRural(property.getUrbanOrRural());
        existingProperty.setRegistrationDate(property.getRegistrationDate());
        existingProperty.setUserId(property.getUserId());
        existingProperty.setLocationId(property.getLocationId());

        return propertyRepository.save(existingProperty);
    }

    public void deleteProperty(Integer id) {
        propertyRepository.deleteById(id);
    }
}