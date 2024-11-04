package com.FOT3.SFRMS.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingDetailsResponse {
    private String roomNum;
    private String customerName;
    private String type;
    private String acType;
    private float amountPerDay;
    private LocalDate bookingDate;
    private int bookingId;
}
