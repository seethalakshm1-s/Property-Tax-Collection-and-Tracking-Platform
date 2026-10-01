package com.propertytax.backend.controller;

import com.propertytax.backend.entity.Receipt;
import com.propertytax.backend.service.ReceiptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:5173")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping
    public List<Receipt> getAllReceipts() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/{id}")
    public Receipt getReceiptById(@PathVariable Integer id) {
        return receiptService.getReceiptById(id);
    }

    @PostMapping
    public Receipt saveReceipt(@RequestBody Receipt receipt) {
        return receiptService.saveReceipt(receipt);
    }

    @DeleteMapping("/{id}")
    public void deleteReceipt(@PathVariable Integer id) {
        receiptService.deleteReceipt(id);
    }
}