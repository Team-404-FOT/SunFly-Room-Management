package com.FOT3.SFRMS.controller;


import com.FOT3.SFRMS.entity.Rooms;
import com.FOT3.SFRMS.repository.RoomsRepo;
import com.FOT3.SFRMS.service.RoomsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/rooms")
public class RoomsController {

    @Autowired
     RoomsService roomsService;

    @GetMapping("/view")
    public ResponseEntity<List<Rooms>> getAllRooms() {
        List<Rooms> rooms = roomsService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }


    @PostMapping("/add")
    public ResponseEntity<Rooms> addRoom(@RequestBody Rooms room) {
        Rooms newRoom = roomsService.addRoom(room);
        return ResponseEntity.ok(newRoom);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Map<String, Object>>> filterRooms(
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) String acType
    ) {
        List<Map<String, Object>> rooms = roomsService.getFilteredRooms(roomType, acType);
        return ResponseEntity.ok(rooms);
    }




}
