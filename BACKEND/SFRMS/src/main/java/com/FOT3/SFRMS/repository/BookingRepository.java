package com.FOT3.SFRMS.repository;

import com.FOT3.SFRMS.entity.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Bookings, Integer> {

    // Find bookings by customer ID
    /**
     * Finds all bookings for a specific customer.
     * @param customerId the ID of the customer.
     * @return List of bookings for the specified customer.
     */
    List<Bookings> findByCustomerId(Integer customerId);

    // Find bookings by room ID
    /**
     * Finds all bookings for a specific room.
     * @param roomId the ID of the room.
     * @return List of bookings for the specified room.
     */
    List<Bookings> findByRoomId(Integer roomId);

    // Find bookings by user ID (officer who booked the room)
    /**
     * Finds all bookings created by a specific user.
     * @param userId the ID of the user.
     * @return List of bookings created by the specified user.
     */
    List<Bookings> findByUserId(Integer userId);

    // Find active bookings (where in_booking = true)
    /**
     * Finds all active bookings.
     * @return List of active bookings.
     */
    @Query("SELECT b FROM Bookings b WHERE b.inBooking = true")
    List<Bookings> findActiveBookings();

    // Count bookings by room ID
    /**
     * Counts the number of bookings for a specific room.
     * @param roomId the ID of the room.
     * @return the count of bookings for the specified room.
     */
    @Query("SELECT COUNT(b) FROM Bookings b WHERE b.room.roomId = :roomId")
    long countByRoomId(@Param("roomId") Integer roomId);

    // Find a booking by its ID and customer ID for validation
    /**
     * Finds a booking by its ID and the customer ID.
     * This can be useful for verification purposes.
     * @param bookingId the ID of the booking.
     * @param customerId the ID of the customer.
     * @return an Optional containing the found booking, if any.
     */
    Optional<Bookings> findByIdAndCustomerId(Integer bookingId, Integer customerId);

    // Custom query to fetch bookings within a date range
    /**
     * Finds all bookings within a specified date range.
     * @param startDate the start date of the range.
     * @param endDate the end date of the range.
     * @return List of bookings within the date range.
     */
    @Query("SELECT b FROM Bookings b WHERE b.bookingDateAndTime BETWEEN :startDate AND :endDate")
    List<Bookings> findBookingsWithinDateRange(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
