package com.FOT3.SFRMS.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;
    private LocalDateTime bookingDateAndTime;
    private String specialNote;

    @ManyToOne // Many bookings can be associated with one user
    @JoinColumn(name = "userId", nullable = false)
    private OurUsers user; // This will hold the user who made the booking

    @ManyToOne // Many bookings can be associated with one customer
    @JoinColumn(name = "customerId", nullable = false)
    private Customers customer; // This will hold the customer associated with the booking

    @ManyToOne // Many bookings can be associated with one room
    @JoinColumn(name = "roomId", nullable = false)
    private Rooms room; // This will hold the room booked

}
