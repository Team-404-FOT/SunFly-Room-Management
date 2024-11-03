package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.dto.PaymentDTO;
import com.FOT3.SFRMS.entity.Payments;
import com.FOT3.SFRMS.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<Payments> createPayment(@RequestBody PaymentDTO paymentDTO) {
        Payments payment = paymentService.createPayment(paymentDTO);
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    @GetMapping("/bookings/{bookingId}")
    public ResponseEntity<Payments> getPaymentByBookingId(@PathVariable Integer bookingId) {
        return paymentService.getPaymentByBookingId(bookingId)
                .map(payment -> new ResponseEntity<>(payment, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
