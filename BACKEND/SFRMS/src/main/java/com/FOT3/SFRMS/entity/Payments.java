package com.FOT3.SFRMS.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
public class Payments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int payId;
    private LocalDateTime date;
    private String paymentMethod;
    private float amount;

    @OneToOne // One payments can be associated with one booking
    @JoinColumn(name = "bookingId", nullable = false) // Foreign key referencing bookings
    private Bookings booking; // This will hold the booking associated with the payment

}
