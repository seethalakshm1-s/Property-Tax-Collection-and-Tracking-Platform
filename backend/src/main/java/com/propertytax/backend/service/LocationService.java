package com.propertytax.backend.service;

import com.propertytax.backend.entity.Location;
import com.propertytax.backend.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public void deleteLocation(Integer id) {
        locationRepository.deleteById(id);
    }
    public Location updateLocation(Integer id, Location location) {
    Location existingLocation = locationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Location not found"));

    existingLocation.setDistrict(location.getDistrict());
    existingLocation.setTaluk(location.getTaluk());
    existingLocation.setLocalBody(location.getLocalBody());
    existingLocation.setWard(location.getWard());
    existingLocation.setVillage(location.getVillage());
    existingLocation.setPincode(location.getPincode());

    return locationRepository.save(existingLocation);
}
    
}