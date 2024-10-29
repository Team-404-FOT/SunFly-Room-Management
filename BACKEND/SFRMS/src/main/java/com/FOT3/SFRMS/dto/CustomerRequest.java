package com.FOT3.SFRMS.dto;

import lombok.Data;

@Data
public class CustomerRequest {

    private String firstName;
    private String lastName;
    private String nic;
    private String phoneNumber;
    private int userId;
    private int CusId;
}
