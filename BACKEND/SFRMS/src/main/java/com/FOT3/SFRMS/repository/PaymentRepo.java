package com.FOT3.SFRMS.repository;

import com.FOT3.SFRMS.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payments,Integer> {
}
