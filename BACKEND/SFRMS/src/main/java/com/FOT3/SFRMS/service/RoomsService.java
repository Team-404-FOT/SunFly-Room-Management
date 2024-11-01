package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.entity.Rooms;
import com.FOT3.SFRMS.repository.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class RoomsService implements RoomService{


    @Autowired
    private RoomsRepo roomsRepo;
    @Override
    public Rooms saveRooms(Rooms room) {
        return roomsRepo.save(room);
    }


    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Rooms> getAllRooms() {
        String sql = "{CALL GetAllRooms()}";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Rooms.class));
    }

    public Rooms addRoom(Rooms room) {
        String sql = "{CALL AddRoom(?, ?, ?, ?, ?, ?)}";

        jdbcTemplate.update(sql,
                room.getRoomNum(),
                room.getType(),
                room.getACtype(),
                room.getDescription(),
                room.getAmountPerDay(),
                room.isAvailability()
        );

        return room;
    }


    public List<Map<String, Object>> getFilteredRooms(String roomType, String acType) {
        String sql = "SELECT * FROM rooms WHERE (type = ? OR ? IS NULL OR ? = '') AND (actype = ? OR ? IS NULL OR ? = '') AND (availability = true)";

        return jdbcTemplate.queryForList(sql, roomType, roomType, roomType, acType, acType, acType);
    }
}
