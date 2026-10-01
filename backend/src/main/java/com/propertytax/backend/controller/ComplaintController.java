package com.propertytax.backend.controller;

import com.propertytax.backend.entity.Complaint;
import com.propertytax.backend.service.ComplaintService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Integer id) {
        return complaintService.getComplaintById(id);
    }

    @PostMapping
    public Complaint saveComplaint(@RequestBody Complaint complaint) {
        return complaintService.saveComplaint(complaint);
    }
    @PutMapping("/{id}")
    public Complaint updateComplaint(
        @PathVariable Integer id,
        @RequestBody Complaint complaint) {
    return complaintService.updateComplaint(id, complaint);
    }
    @DeleteMapping("/{id}")
    public void deleteComplaint(@PathVariable Integer id) {
        complaintService.deleteComplaint(id);
    }
}