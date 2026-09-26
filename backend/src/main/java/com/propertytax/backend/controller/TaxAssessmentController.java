package com.propertytax.backend.controller;

import com.propertytax.backend.entity.TaxAssessment;
import com.propertytax.backend.service.TaxAssessmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tax-assessments")
@CrossOrigin(origins = "http://localhost:5173")
public class TaxAssessmentController {

    private final TaxAssessmentService taxAssessmentService;

    public TaxAssessmentController(TaxAssessmentService taxAssessmentService) {
        this.taxAssessmentService = taxAssessmentService;
    }

    @GetMapping
    public List<TaxAssessment> getAllAssessments() {
        return taxAssessmentService.getAllAssessments();
    }

    @GetMapping("/{id}")
    public TaxAssessment getAssessmentById(@PathVariable Integer id) {
        return taxAssessmentService.getAssessmentById(id);
    }

    @PostMapping
    public TaxAssessment createAssessment(@RequestBody TaxAssessment assessment) {
        return taxAssessmentService.saveAssessment(assessment);
    }

    @PutMapping("/{id}")
    public TaxAssessment updateAssessment(
            @PathVariable Integer id,
            @RequestBody TaxAssessment assessment) {

        assessment.setAssessmentId(id);
        return taxAssessmentService.saveAssessment(assessment);
    }

    @DeleteMapping("/{id}")
    public void deleteAssessment(@PathVariable Integer id) {
        taxAssessmentService.deleteAssessment(id);
    }
}