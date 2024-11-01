package com.FOT3.SFRMS.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "rooms")
@Data
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;
    private int roomNum;
    private String type; //Single, double, family
    private String ACtype; //ac , nonac
    private String description;
    private float amountPerDay; //
    private boolean availability; //if booked set false, else set true


    public Rooms() {

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

    public String getACtype() {
        return ACtype;
    }

    public void setACtype(String ACtype) {
        this.ACtype = ACtype;
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
