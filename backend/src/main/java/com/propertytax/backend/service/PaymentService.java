package com.propertytax.backend.service;

import com.propertytax.backend.entity.Payment;
import com.propertytax.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    public List<Payment> getAllPayments() {
    return paymentRepository.findAll();
}

    public List<Payment> getPaymentsByUserId(Integer userId) {
    return paymentRepository.findPaymentsByUserId(userId);
}

    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public void deletePayment(Integer id) {
        paymentRepository.deleteById(id);
    }
    public Payment updatePayment(Integer id, Payment payment) {

    Payment existingPayment = paymentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Payment not found"));

    existingPayment.setAssessmentId(payment.getAssessmentId());
    existingPayment.setPaymentDate(payment.getPaymentDate());
    existingPayment.setAmount(payment.getAmount());
    existingPayment.setPaymentMethod(payment.getPaymentMethod());
    existingPayment.setPaymentReference(payment.getPaymentReference());
    existingPayment.setTransactionId(payment.getTransactionId());
    existingPayment.setStatus(payment.getStatus());

    return paymentRepository.save(existingPayment);
}
}