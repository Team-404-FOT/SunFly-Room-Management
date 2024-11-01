package com.FOT3.SFRMS.repository;

import com.FOT3.SFRMS.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomsRepo extends JpaRepository<Rooms,Integer> {
}
