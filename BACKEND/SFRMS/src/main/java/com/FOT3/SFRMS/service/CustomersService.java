package com.FOT3.SFRMS.service;

import com.FOT3.SFRMS.repository.CustomersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

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


}