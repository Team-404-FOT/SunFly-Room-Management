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
    @Column(nullable = false)
    private float amount;

    @ManyToOne // One payments can be associated with one booking
    @JoinColumn(name = "bookingId", unique = true, nullable = false) // Foreign key referencing bookings
    private Bookings booking; // This will hold the booking associated with the payment


    // Getter and Setter for payId
    /**
     * Gets the unique payment ID.
     * @return payId as Integer.
     */
    public Integer getPayId() {
        return payId;
    }

    /**
     * Sets the unique payment ID.
     * @param payId as Integer.
     */
    public void setPayId(Integer payId) {
        this.payId = payId;
    }

    // Getter and Setter for amount
    /**
     * Gets the payment amount.
     * @return amount as Float.
     */
    public Float getAmount() {
        return amount;
    }

    /**
     * Sets the payment amount.
     * @param amount as Float.
     */
    public void setAmount(Float amount) {
        this.amount = amount;
    }

    // Getter and Setter for date
    /**
     * Gets the date and time of the payment.
     * @return date as LocalDateTime.
     */
    public LocalDateTime getDate() {
        return date;
    }

    /**
     * Sets the date and time of the payment.
     * @param date as LocalDateTime.
     */
    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    // Getter and Setter for paymentMethod
    /**
     * Gets the payment method (e.g., cash, card).
     * @return paymentMethod as String.
     */
    public String getPaymentMethod() {
        return paymentMethod;
    }

    /**
     * Sets the payment method (e.g., cash, card).
     * @param paymentMethod as String.
     */
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    // Getter and Setter for booking
    /**
     * Gets the associated booking for this payment.
     * @return booking as Booking object.
     */
    public Bookings getBooking() {
        return booking;
    }

    /**
     * Sets the associated booking for this payment.
     * @param booking as Booking object.
     */
    public void setBooking(Bookings booking) {
        this.booking = booking;
    }

}
