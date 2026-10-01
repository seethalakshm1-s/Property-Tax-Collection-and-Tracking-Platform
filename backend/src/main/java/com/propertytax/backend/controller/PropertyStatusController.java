package com.propertytax.backend.controller;

import com.propertytax.backend.entity.PropertyStatus;
import com.propertytax.backend.service.PropertyStatusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/property-status")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyStatusController {

    private final PropertyStatusService propertyStatusService;

    public PropertyStatusController(PropertyStatusService propertyStatusService) {
        this.propertyStatusService = propertyStatusService;
    }

    @GetMapping
    public List<PropertyStatus> getAllStatuses() {
        return propertyStatusService.getAllStatuses();
    }

    @GetMapping("/{id}")
    public PropertyStatus getStatusById(@PathVariable Integer id) {
        return propertyStatusService.getStatusById(id);
    }

    @PostMapping
    public PropertyStatus saveStatus(@RequestBody PropertyStatus propertyStatus) {
        return propertyStatusService.saveStatus(propertyStatus);
    }

    @DeleteMapping("/{id}")
    public void deleteStatus(@PathVariable Integer id) {
        propertyStatusService.deleteStatus(id);
    }
}