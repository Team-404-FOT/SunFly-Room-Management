package com.FOT3.SFRMS.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ActiveBookingDetails {
    private int bookingId;
    private LocalDate bookingDateAndTime;
    private int roomNum;
    private String customerName;
    private String nic;
    private String phoneNumber;
    private String type;
    private String acType;
    private String specialNote;
}