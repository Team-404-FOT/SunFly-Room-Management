package com.FOT3.SFRMS.service;


import com.FOT3.SFRMS.dto.CustomerResponse;

import com.FOT3.SFRMS.dto.CustomerViewResponse;

import com.FOT3.SFRMS.repository.CustomersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import java.util.Map;


@Service
public class CustomersService {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void addNewCustomer(String firstName, String lastName, String nic, String phoneNumber, int userId) {
        String sql = "CALL AddNewCustomer(?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, firstName, lastName, nic, phoneNumber, userId);
    }

    // New method to retrieve all NIC numbers
    public List<String> getAllCustomerNics() {
        String sql = "SELECT nic FROM customers";
        return jdbcTemplate.queryForList(sql, String.class);
    }

    // New method to retrieve customer details by NIC
    public CustomerResponse findCustomerByNic(String nic) {
        String sql = "{CALL GetCustomerByNic(?)}";
        return jdbcTemplate.queryForObject(sql, new Object[]{nic}, (rs, rowNum) ->
                new CustomerResponse(
                        rs.getInt("cus_id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("nic"),
                        rs.getString("phone_number")
                ));
    }

    public List<String> searchCustomerNICs(String query) {
        String sql = "SELECT SearchCustomerNICs(?)";
        String jsonResult = jdbcTemplate.queryForObject(sql, new Object[]{query}, String.class);

        // Parse JSON result into a list of strings
        ObjectMapper mapper = new ObjectMapper();
        List<String> nicList = new ArrayList<>();
        try {
            nicList = mapper.readValue(jsonResult, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return nicList;
    }


    public List<CustomerViewResponse> getAllCustomers() {
        String sql = "SELECT * FROM CustomerView";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            CustomerViewResponse customer = new CustomerViewResponse();
            customer.setCusId(rs.getInt("cus_id"));  // Set cus_id
            customer.setFirstName(rs.getString("first_name"));
            customer.setLastName(rs.getString("last_name"));
            customer.setNic(rs.getString("nic"));
            customer.setPhoneNumber(rs.getString("phone_number"));
            return customer;
        });
    }

    // Method to delete registered customer by their NIC
    public void deleteCustomerByNIC(String customerNIC) {
        String sql = "CALL DeleteCustomerByNIC(?)";
        jdbcTemplate.update(sql, customerNIC);
    }



    // Method to update customer information by cus_id
    public String updateCustomerInfo(int cusId, String firstName, String lastName, String nic, String phoneNumber) {
        String sql = "SELECT update_customer_info(?, ?, ?, ?, ?) AS result";
        return jdbcTemplate.queryForObject(sql, new Object[]{cusId, firstName, lastName, nic, phoneNumber}, String.class);
    }
}