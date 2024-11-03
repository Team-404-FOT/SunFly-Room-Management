package com.FOT3.SFRMS.service;

// Custom Exception for Resource Not Found
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

