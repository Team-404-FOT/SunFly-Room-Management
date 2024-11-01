package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.entity.Rooms;

import java.util.List;

public interface RoomService {
    public Rooms saveRooms(Rooms room);
    public List<Rooms> getAllRooms();
}
