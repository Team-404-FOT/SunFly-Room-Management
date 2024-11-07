package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.dto.ActiveBookingDetails;
import com.FOT3.SFRMS.dto.BookingHistoryDTO;
import com.FOT3.SFRMS.dto.PaymentRequest;
import com.FOT3.SFRMS.entity.Bookings;
import com.FOT3.SFRMS.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBooking(@RequestBody Bookings booking) {
        try {
            bookingService.addBooking(booking);
            return new ResponseEntity<>("Booking added successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add booking: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<ActiveBookingDetails>> getActiveBookings() {
        List<ActiveBookingDetails> activeBookings = bookingService.getActiveBookings();
        return ResponseEntity.ok(activeBookings);
    }

    @PostMapping("/add-payment")
    public ResponseEntity<String> addPayment(@RequestBody PaymentRequest paymentRequest) {
        bookingService.addPayment(paymentRequest);
        return ResponseEntity.ok("Payment added successfully!");
    }

    @GetMapping("/history")
    public List<BookingHistoryDTO> getBookingHistory() {
        return bookingService.getBookingHistory();
    }

    @DeleteMapping("/delete/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable int bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
            return new ResponseEntity<>("Booking deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete booking: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}