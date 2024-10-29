package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.dto.CustomerRequest;
import com.FOT3.SFRMS.dto.CustomerViewResponse;
import com.FOT3.SFRMS.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomersController {

    @Autowired
    private CustomersService customersService;

    @PostMapping("/add")
    public ResponseEntity<String> addCustomer(@RequestBody CustomerRequest customerRequest) {
        customersService.addNewCustomer(customerRequest.getFirstName(),
                customerRequest.getLastName(),
                customerRequest.getNic(),
                customerRequest.getPhoneNumber(),
                customerRequest.getUserId());
        return ResponseEntity.ok("Customer added successfully");
    }

    @GetMapping("/viewAll")
    public ResponseEntity<List<CustomerViewResponse>> getAllCustomers() {
        List<CustomerViewResponse> customers = customersService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

}