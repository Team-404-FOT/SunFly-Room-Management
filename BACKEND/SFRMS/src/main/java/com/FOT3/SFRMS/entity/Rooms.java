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

}
