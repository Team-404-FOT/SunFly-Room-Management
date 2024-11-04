package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.dto.ActiveBookingDetails;
import com.FOT3.SFRMS.dto.PaymentRequest;
import com.FOT3.SFRMS.entity.Bookings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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

    public List<ActiveBookingDetails> getActiveBookings() {
        String sql = "SELECT * FROM ActiveBookings"; // Selecting from the view

        return jdbcTemplate.query(sql, this::mapRowToBookingDetails);
    }

    private ActiveBookingDetails mapRowToBookingDetails(ResultSet rs, int rowNum) throws SQLException {
        ActiveBookingDetails bookingDetails = new ActiveBookingDetails();
        bookingDetails.setBookingId(rs.getInt("booking_id"));
        bookingDetails.setBookingDateAndTime(rs.getDate("booking_date_and_time").toLocalDate());
        bookingDetails.setRoomNum(rs.getInt("room_num"));
        bookingDetails.setCustomerName(rs.getString("customer_name"));
        bookingDetails.setNic(rs.getString("nic"));
        bookingDetails.setPhoneNumber(rs.getString("phone_number"));
        bookingDetails.setType(rs.getString("type"));
        bookingDetails.setAcType(rs.getString("actype"));
        bookingDetails.setSpecialNote(rs.getString("special_note"));
        return bookingDetails;
    }

    public void addPayment(PaymentRequest paymentRequest) {
        String sql = "{CALL add_payment(?, ?, ?, ?, ?, ?, ?, ?)}";

        jdbcTemplate.update(sql, paymentRequest.getBookingId(),
                paymentRequest.getType(),
                paymentRequest.getAcType(),
                paymentRequest.getCusName(),
                paymentRequest.getPaymentMethod(),
                paymentRequest.getCheckIn(),
                paymentRequest.getCheckOut(),
                paymentRequest.getAmount());
    }
}