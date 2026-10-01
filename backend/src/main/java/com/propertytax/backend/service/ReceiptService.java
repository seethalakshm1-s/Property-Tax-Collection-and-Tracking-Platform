package com.propertytax.backend.service;

import com.propertytax.backend.entity.Receipt;
import com.propertytax.backend.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Receipt getReceiptById(Integer id) {
        return receiptRepository.findById(id).orElse(null);
    }

    public Receipt saveReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public void deleteReceipt(Integer id) {
        receiptRepository.deleteById(id);
    }
}