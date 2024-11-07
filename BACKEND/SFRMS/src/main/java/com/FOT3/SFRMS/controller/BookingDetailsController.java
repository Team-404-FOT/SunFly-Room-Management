package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.dto.BookingDetailsResponse;
import com.FOT3.SFRMS.dto.PaymentHistoryDTO;
import com.FOT3.SFRMS.dto.PaymentRequest;
import com.FOT3.SFRMS.service.BookingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bookings")
public class BookingDetailsController {

    @Autowired
    private BookingDetailsService bookingDetailsService;

    @GetMapping("/details")
    public List<BookingDetailsResponse> getAllBookingDetails() {
        return bookingDetailsService.getAllBookingDetails();
    }

    @GetMapping("/calculate-amount")
    public Map<String, Object> calculateAmount(
            @RequestParam("checkOut") String checkOut,
            @RequestParam("bookingId") int bookingId) {
        return bookingDetailsService.calculateAmount(checkOut, bookingId);
    }

    @GetMapping("/payment-history")
    public List<PaymentHistoryDTO> getAllPaymentHistory() {
        return bookingDetailsService.findAllPaymentHistory();
    }



}
