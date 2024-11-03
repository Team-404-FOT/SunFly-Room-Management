package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.dto.PaymentDTO;
import com.FOT3.SFRMS.entity.Bookings;
import com.FOT3.SFRMS.entity.Payments;
import com.FOT3.SFRMS.repository.BookingRepository;
import com.FOT3.SFRMS.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public PaymentService(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public Payments createPayment(PaymentDTO paymentDTO) {
        Bookings booking = bookingRepository.findById(paymentDTO.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        Payments payment = new Payments();
        payment.setAmount(paymentDTO.getAmount());
        payment.setDate(LocalDateTime.now());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setBooking(booking);

        return paymentRepository.save(payment);
    }

    public Optional<Payments> getPaymentByBookingId(Integer bookingId) {
        return paymentRepository.findByBooking_Id(bookingId);
    }
}