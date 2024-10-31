package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.entity.Bookings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BookingService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addBooking(Bookings booking) {
        String sql = "CALL insert_booking(?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                booking.getBookingDateAndTime(),
                booking.getSpecialNote(),
                booking.getUser().getId(),
                booking.getCustomer().getCusId(),
                booking.getRoom().getRoomId(),
                booking.isInBooking()
        );
    }
}