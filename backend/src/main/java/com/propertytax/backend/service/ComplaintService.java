package com.propertytax.backend.service;

import com.propertytax.backend.entity.Complaint;
import com.propertytax.backend.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Complaint getComplaintById(Integer id) {
        return complaintRepository.findById(id).orElse(null);
    }

    public Complaint saveComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Integer id) {
        complaintRepository.deleteById(id);
    }
    public Complaint updateComplaint(Integer id, Complaint complaint) {

    Complaint existingComplaint = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    existingComplaint.setSubject(complaint.getSubject());
    existingComplaint.setDescription(complaint.getDescription());
    existingComplaint.setStatus(complaint.getStatus());
    existingComplaint.setPropertyId(complaint.getPropertyId());
    existingComplaint.setUserId(complaint.getUserId());
    existingComplaint.setAdminRemarks(complaint.getAdminRemarks());
    existingComplaint.setResolvedAt(complaint.getResolvedAt());

    return complaintRepository.save(existingComplaint);
}
}