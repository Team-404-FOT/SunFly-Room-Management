import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import UserService from '../service/UsersService';
 

function AddCustomer() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Store timeout ID

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = await getCurrentUserId(token);

    const customerData = {
      firstName,
      lastName,
      nic,
      phoneNumber,
      userId,
    };

    try {
      const response = await fetch('http://localhost:8080/customers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(customerData),
      });

      if (response.status === 403) {
        setErrorMessage(true);
        return;
      }

      if (response.status === 409) {
        const errorResponse = await response.json();
        if (errorResponse.message === 'Duplicate entry') {
          setErrorMessage(true);

          // Clear any existing timeout
          if (timeoutId) clearTimeout(timeoutId);

          // Set new timeout to hide message after 3 seconds
          const newTimeoutId = setTimeout(() => setErrorMessage(false), 3000);
          setTimeoutId(newTimeoutId); // Store the new timeout ID
        }
        return;
      }

      if (!response.ok) throw new Error('Error adding customer');

      setSuccessMessage(true);
      clearForm();
      console.log('Customer added successfully');
      setTimeout(() => setSuccessMessage(false), 2000);

    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const getCurrentUserId = async (token) => {
    try {
      const response = await UserService.getYourProfile(token);
      return response.ourUsers.id;
    } catch (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
  };

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setNic('');
    setPhoneNumber('');
  };

  useEffect(() => {
    return () => {
      // Clear timeout on component unmount
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <img src="\src\assets\userLogo.png" alt="Logo" className="mb-4 w-24 h-24 " />
       
      <h1 className="text-2xl font-bold mb-6">Customer Registration</h1>
      
      <form className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg h-auto" onSubmit={handleSubmit}>
          {/* Logo */}
      

        {/* Success Message */}
        {successMessage && (
          <Alert color="success" onDismiss={() => setSuccessMessage(false)}>
            <span className="font-medium">Customer registered successfully!</span>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setErrorMessage(false)}>
            <span className="font-medium">Duplicate entry! Please try again.</span>
          </Alert>
        )}

        <div>
          <div className="mb-2 block">
            <Label htmlFor="f_name" value="First Name" />
          </div>
          <TextInput 
            id="f_name" 
            type="text" 
            placeholder="Enter First Name" 
            required 
            shadow 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="l_name" value="Last Name" />
          </div>
          <TextInput 
            id="l_name" 
            type="text" 
            placeholder="Enter Last Name" 
            required 
            shadow 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="nic" value="Customer NIC" />
          </div>
          <TextInput 
            id="nic" 
            type="text" 
            placeholder="Enter NIC" 
            required 
            shadow 
            value={nic} 
            onChange={(e) => setNic(e.target.value)} 
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone-number" value="Phone Number" />
          </div>
          <TextInput 
            id="phone-number" 
            type="tel" 
            placeholder="Enter phone number" 
            required 
            maxLength={10} 
            pattern="[0-9]{10}" 
            shadow 
            value={phoneNumber} 
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
              setPhoneNumber(e.target.value);
            }} 
          />
        </div>

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

export default AddCustomer;
