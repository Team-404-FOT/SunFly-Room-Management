package com.FOT3.SFRMS.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BookingHistoryDTO {
    private int bookingId;
    private Date checkIn;
    private Date checkOut;
    private int roomNum;
    private String customerName;
    private String nic;
    private String phoneNumber;
    private String type;
    private String actype;
    private String specialNote;
}
