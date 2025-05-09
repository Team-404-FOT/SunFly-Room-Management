package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.entity.Rooms;
import com.FOT3.SFRMS.repository.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RoomsService implements RoomService {

    @Autowired
    private RoomsRepo roomsRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Rooms saveRooms(Rooms room) {
        return roomsRepo.save(room);
    }

    public List<Rooms> getAllRooms() {
        String sql = "{CALL GetAllRooms()}";

        try {
            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Rooms.class));
        } catch (DataAccessException e) {
            String errorMessage = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "Error retrieving rooms from the database.";
            throw new ServiceException("Failed to retrieve all rooms: " + errorMessage, e);
        }
    }

    public Rooms addRoom(Rooms room) {
        String sql = "{CALL AddRoom(?, ?, ?, ?, ?, ?)}";

        try {
            jdbcTemplate.update(sql,
                    room.getRoomNum(),
                    room.getType(),
                    room.getActype(),
                    room.getDescription(),
                    room.getAmountPerDay(),
                    room.isAvailability()
            );
            return room;
        } catch (DataAccessException e) {
            String errorMessage = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "Error adding room.";
            throw new ServiceException("Failed to add room: " + errorMessage, e);
        }
    }

    public List<Map<String, Object>> getFilteredRooms(String roomType, String acType) {
        String sql = "SELECT * FROM rooms WHERE (type = ? OR ? IS NULL OR ? = '') AND (actype = ? OR ? IS NULL OR ? = '') AND (availability = true)";

        try {
            return jdbcTemplate.queryForList(sql, roomType, roomType, roomType, acType, acType, acType);
        } catch (DataAccessException e) {
            String errorMessage = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "Error filtering rooms.";
            throw new ServiceException("Failed to filter rooms: " + errorMessage, e);
        }
    }


    public Rooms updateRoom(Rooms room) {
        String sql = "{CALL UpdateRoom(?, ?, ?, ?, ?, ?)}";

        try {
            // Validate the input room
            if (room == null) {
                throw new ServiceException("Room object cannot be null.");
            }

            // Check if the room exists before updating
            Rooms existingRoom = roomsRepo.findById(room.getRoomId())
                    .orElseThrow(() -> new ServiceException("Room not found with ID: " + room.getRoomId()));

            // Execute the update operation
            jdbcTemplate.update(sql,
                    room.getRoomNum(),
                    room.getType(),
                    room.getActype(),
                    room.getDescription(),
                    room.getAmountPerDay(),
                    room.isAvailability()
            );

            // Return the updated room object
            return roomsRepo.findById(room.getRoomId())
                    .orElseThrow(() -> new ServiceException("Failed to retrieve updated room."));
        } catch (DataAccessException e) {
            String errorMessage = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "Database access error.";
            throw new ServiceException("Failed to update room: " + errorMessage, e);
        } catch (ServiceException e) {
            throw e;
        } catch (Exception e) {
            throw new ServiceException("An unexpected error occurred while updating room: " + e.getMessage(), e);
        }
    }


    public void deleteRoom(Integer roomNum) {
        String sql = "DELETE FROM rooms WHERE room_num = ?";

        try {
            //Rooms existingRoom = roomsRepo.findById(roomNum).orElseThrow(() -> new ServiceException("Room not found"));
            jdbcTemplate.update(sql, roomNum);
        } catch (DataAccessException e) {
            String errorMessage = e.getMostSpecificCause() != null ? e.getMostSpecificCause().getMessage() : "Error deleting room.";
            throw new ServiceException("Failed to delete room with number " + roomNum + ": " + errorMessage, e);
        }
    }


}

// Custom exception class for service errors
class ServiceException extends RuntimeException {
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }

    public ServiceException(String message) {
        super(message);
    }
}
