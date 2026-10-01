package com.propertytax.backend.service;

import com.propertytax.backend.entity.PropertyStatus;
import com.propertytax.backend.repository.PropertyStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyStatusService {

    private final PropertyStatusRepository propertyStatusRepository;

    public PropertyStatusService(PropertyStatusRepository propertyStatusRepository) {
        this.propertyStatusRepository = propertyStatusRepository;
    }

    public List<PropertyStatus> getAllStatuses() {
        return propertyStatusRepository.findAll();
    }

    public PropertyStatus getStatusById(Integer id) {
        return propertyStatusRepository.findById(id).orElse(null);
    }

    public PropertyStatus saveStatus(PropertyStatus propertyStatus) {
        return propertyStatusRepository.save(propertyStatus);
    }

    public void deleteStatus(Integer id) {
        propertyStatusRepository.deleteById(id);
    }
    public PropertyStatus updatePropertyStatus(
        Integer id,
        PropertyStatus propertyStatus) {

    PropertyStatus existingStatus =
            propertyStatusRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Property Status not found"));

    existingStatus.setPropertyId(propertyStatus.getPropertyId());
    existingStatus.setStatus(propertyStatus.getStatus());
    existingStatus.setRemarks(propertyStatus.getRemarks());
    existingStatus.setUpdatedDate(propertyStatus.getUpdatedDate());

    return propertyStatusRepository.save(existingStatus);
}
}