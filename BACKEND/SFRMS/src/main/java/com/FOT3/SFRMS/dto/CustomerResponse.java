package com.FOT3.SFRMS.dto;

public class CustomerResponse {
    private int cusId;
    private String firstName;
    private String lastName;
    private String nic;
    private String phoneNumber;

    // Constructor
    public CustomerResponse(int cusId, String firstName, String lastName, String nic, String phoneNumber) {
        this.cusId = cusId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nic = nic;
        this.phoneNumber = phoneNumber;
    }

    // Getters and Setters

    public int getCusId() {
        return cusId;
    }

    public void setCusId(int cusId) {
        this.cusId = cusId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
