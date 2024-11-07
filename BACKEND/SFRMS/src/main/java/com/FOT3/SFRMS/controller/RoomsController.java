package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.entity.Rooms;
import com.FOT3.SFRMS.service.RoomsService;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rooms")
public class RoomsController {

    @Autowired
    private RoomsService roomsService;

    @GetMapping("/viewAll")
    public ResponseEntity<List<Rooms>> getRooms() {
        List<Rooms> rooms = roomsService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/view")
    public ResponseEntity<List<Rooms>> getAllRooms() {
        List<Rooms> rooms = roomsService.getAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @PostMapping("/add")
    public ResponseEntity<Rooms> addRoom(@RequestBody Rooms room) {
        try {
            Rooms newRoom = roomsService.addRoom(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(newRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Send null body for conflict
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Rooms> createRoom(@RequestBody Rooms room) {
        try {
            Rooms savedRoom = roomsService.addRoom(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // Send null body for conflict
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Map<String, Object>>> filterRooms(
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) String acType
    ) {
        List<Map<String, Object>> rooms = roomsService.getFilteredRooms(roomType, acType);
        return ResponseEntity.ok(rooms);
    }

    @PutMapping("/update")
    public ResponseEntity<Rooms> updateRoom(@RequestBody Rooms room) {
        try {
            Rooms updatedRoom = roomsService.updateRoom(room);
            return ResponseEntity.ok(updatedRoom);
        } catch (ServiceException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Not found error
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // General error
        }
    }



    @DeleteMapping("/delete/{roomNum}")
    public ResponseEntity<Void> deleteRoom(@PathVariable String roomNum) {
        try {
            Integer roomNumInt = Integer.valueOf(roomNum);
            roomsService.deleteRoom(roomNumInt);
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (ServiceException e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
