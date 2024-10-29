package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.dto.CustomerResponse;
import com.FOT3.SFRMS.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomersService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    @Autowired
//    private CustomersRepository customersRepository;

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
        String sql = "SELECT first_name, last_name, nic, phone_number FROM customers WHERE nic = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{nic}, (rs, rowNum) ->
                new CustomerResponse(
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("nic"),
                        rs.getString("phone_number")
                ));
    }
    
    public List<String> searchCustomerNICs(String query) {
        String sql = "SELECT nic FROM customers WHERE nic LIKE ?";
        return jdbcTemplate.queryForList(sql, new Object[]{"%" + query + "%"}, String.class);
    }

}