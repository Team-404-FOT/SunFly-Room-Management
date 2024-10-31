package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.entity.Rooms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class RoomsService {

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
        String sql = "{CALL GetFilteredRooms(?, ?)}";
        return jdbcTemplate.queryForList(sql, roomType, acType);
    }
}
