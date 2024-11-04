package com.FOT3.SFRMS.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "payments")
@Data
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int payId;
    private String cusName;
    private String type;
    private String acType;
    private Date checkIn;
    private Date checkOut;
    private String paymentMethod;
    private float amount;



    @OneToOne // One payments can be associated with one booking
    @JoinColumn(name = "bookingId", nullable = false) // Foreign key referencing bookings
    private Bookings booking; // This will hold the booking associated with the payment

}
