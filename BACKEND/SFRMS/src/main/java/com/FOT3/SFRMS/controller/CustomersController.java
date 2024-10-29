package com.FOT3.SFRMS.controller;

import com.FOT3.SFRMS.dto.CustomerRequest;

import com.FOT3.SFRMS.dto.CustomerResponse;

import com.FOT3.SFRMS.dto.CustomerViewResponse;

import com.FOT3.SFRMS.service.CustomersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;


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


    // New endpoint to get all customer NIC numbers
    @GetMapping("/get-all-nics")
    public ResponseEntity<List<String>> getAllCustomerNics() {
        List<String> nicList = customersService.getAllCustomerNics();
        return ResponseEntity.ok(nicList);
    }


    // New method to get customer details by NIC
    @GetMapping("/get-customer-by-nic")
    public ResponseEntity<CustomerResponse> getCustomerByNic(@RequestParam String nic) {
        CustomerResponse customer = customersService.findCustomerByNic(nic);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search-customer-nic")
    public ResponseEntity<List<String>> searchCustomerNIC(@RequestParam String query) {
        List<String> matchedNICs = customersService.searchCustomerNICs(query);
        return ResponseEntity.ok(matchedNICs);

    @GetMapping("/viewAll")
    public ResponseEntity<List<CustomerViewResponse>> getAllCustomers() {
        List<CustomerViewResponse> customers = customersService.getAllCustomers();
        return ResponseEntity.ok(customers);

    }

}