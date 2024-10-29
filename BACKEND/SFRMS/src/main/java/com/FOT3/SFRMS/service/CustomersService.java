package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.dto.CustomerViewResponse;
import com.FOT3.SFRMS.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

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



    // Method to fetch data from the existing CustomerView
    public List<CustomerViewResponse> getAllCustomers() {
        String sql = "SELECT * FROM CustomerView";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            CustomerViewResponse customer = new CustomerViewResponse();
            customer.setFirstName(rs.getString("first_name"));
            customer.setLastName(rs.getString("last_name"));
            customer.setNic(rs.getString("nic"));
            customer.setPhoneNumber(rs.getString("phone_number"));
            return customer;
        });
    }
}