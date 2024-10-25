package com.FOT3.SFRMS.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Data
@Getter
@Setter
public class Customers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cusId;
    private String firstName;
    private String lastName;
    private String nic;
    private String phoneNumber;

    @ManyToOne // Many customers can be associated with one user
    @JoinColumn(name = "userId", nullable = false)
    private OurUsers user; // This will hold the user who added the customer




}
