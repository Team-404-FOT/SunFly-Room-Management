package com.FOT3.SFRMS.repository;

import com.FOT3.SFRMS.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payments, Integer> {
    Optional<Payments> findByBooking_Id(Integer bookingId);
}
