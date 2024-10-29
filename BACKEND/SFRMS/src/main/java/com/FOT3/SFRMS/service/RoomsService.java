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
        String sql = "SELECT * FROM rooms";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Rooms.class));
    }

    public Rooms addRoom(Rooms room) {
        String sql = "INSERT INTO rooms (room_num, type, actype, description,amount_per_day, availability) VALUES (?,?, ?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(sql, new String[]{"roomId"});
                ps.setInt(1, room.getRoomNum());
                ps.setString(2, room.getType());
                ps.setString(3, room.getACtype());
                ps.setString(4, room.getDescription());
                ps.setFloat(5,room.getAmountPerDay());
                ps.setBoolean(6, room.isAvailability());
                return ps;
            }
        }, keyHolder);

        room.setRoomId(keyHolder.getKey().intValue());
        return room;
    }


    public List<Map<String, Object>> getFilteredRooms(String roomType, String acType) {
        String sql = "SELECT * FROM rooms WHERE (type = ? OR ? IS NULL OR ? = '') AND (actype = ? OR ? IS NULL OR ? = '')";

        return jdbcTemplate.queryForList(sql, roomType, roomType, roomType, acType, acType, acType);
    }
}
