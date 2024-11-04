package com.FOT3.SFRMS.dto;

public class PaymentDTO {

    private Float amount;
    private String paymentMethod;
    private Integer bookingId;

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

    // Getter and Setter for bookingId
    /**
     * Gets the booking ID associated with this payment.
     * @return bookingId as Integer.
     */
    public Integer getBookingId() {
        return bookingId;
    }

    /**
     * Sets the booking ID associated with this payment.
     * @param bookingId as Integer.
     */
    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }
}


