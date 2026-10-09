package com.propertytax.backend.controller;

import com.propertytax.backend.entity.Payment;
import com.propertytax.backend.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Integer id) {
        return paymentService.getPaymentById(id);
    }
    @GetMapping("/user/{userId}")
public List<Payment> getPaymentsByUserId(@PathVariable Integer userId) {
    return paymentService.getPaymentsByUserId(userId);
}

    @PostMapping
    public Payment savePayment(@RequestBody Payment payment) {
        return paymentService.savePayment(payment);
    }
    @PutMapping("/{id}")
    public Payment updatePayment(
        @PathVariable Integer id,
        @RequestBody Payment payment) {
    return paymentService.updatePayment(id, payment);
    }
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Integer id) {
        paymentService.deletePayment(id);
    }
}