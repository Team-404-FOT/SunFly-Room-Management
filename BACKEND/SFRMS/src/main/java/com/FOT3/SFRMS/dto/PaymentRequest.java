package com.FOT3.SFRMS.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentRequest {
    private int bookingId;
    private String type;
    private String acType;
    private String cusName;
    private String paymentMethod;
    private LocalDateTime checkIn;
    private LocalDateTime checkOut;
    private double amount;
}
