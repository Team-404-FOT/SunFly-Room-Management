package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.dto.BookingDetailsResponse;
import com.FOT3.SFRMS.dto.PaymentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.stereotype.Service;

import java.sql.Types;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class BookingDetailsService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<BookingDetailsResponse> getAllBookingDetails() {
        String sql = "SELECT * FROM booking_details_view";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            BookingDetailsResponse bookingDetails = new BookingDetailsResponse();
            bookingDetails.setRoomNum(rs.getString("room_num"));
            bookingDetails.setCustomerName(rs.getString("customer_name"));
            bookingDetails.setType(rs.getString("type"));
            bookingDetails.setAcType(rs.getString("actype"));
            bookingDetails.setAmountPerDay(rs.getFloat("amount_per_day"));
            bookingDetails.setBookingDate(rs.getDate("booking_date_and_time").toLocalDate());
            bookingDetails.setBookingId(rs.getInt("booking_id"));
            return bookingDetails;
        });
    }



    // Method to call the stored procedure
    public Map<String, Object> calculateAmount(String checkOut, int bookingId) {
        String sql = "{CALL cal_amount(?, ?)}";

        // Set the parameters and execute the stored procedure
        return jdbcTemplate.call(
                connection -> {
                    var callableStatement = connection.prepareCall(sql);
                    callableStatement.setString(1, checkOut); // First parameter: checkOut date as String
                    callableStatement.setInt(2, bookingId);   // Second parameter: booking ID as integer
                    return callableStatement;
                },
                List.of(new SqlParameter(Types.DATE), new SqlParameter(Types.INTEGER))
        );
    }





}
