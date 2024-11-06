package com.FOT3.SFRMS.entity;

import jakarta.persistence.*; // Import JPA annotations
import lombok.Data; // Lombok for generating getters and setters

@Entity
@Table(name = "rooms") // Specify the table name in the database
@Data // Lombok annotation to generate boilerplate code (getters, setters, etc.)
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    @Column(name = "room_num")
    private int roomNum;
    private String type;
    private String actype;
    private String description;
    private float amountPerDay;
    private boolean availability;

    public Rooms() {
    }

    public Rooms(int roomNum, String type, String actype, float amountPerDay, boolean availability, String description) {
        this.roomNum = roomNum;
        this.type = type;
        this.actype = actype;
        this.amountPerDay = amountPerDay;
        this.availability = availability;
        this.description = description;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public int getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(int roomNum) {
        this.roomNum = roomNum;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getActype() {
        return actype;
    }

    public void setActype(String actype) {
        this.actype = actype;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getAmountPerDay() {
        return amountPerDay;
    }

    public void setAmountPerDay(float amountPerDay) {
        this.amountPerDay = amountPerDay;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
}
