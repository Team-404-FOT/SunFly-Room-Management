import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';

function AddCustomer() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg h-auto">
         
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="First Name" />
          </div>
          <TextInput id="f_name" type="text" placeholder="Enter First Name" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Last Name" />
          </div>
          <TextInput id="l_name" type="text" placeholder="Enter Last Name" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="nic" value="Customer NIC" />
          </div>
          <TextInput id="nic" type="text" placeholder="Enter NIC" required shadow />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Phone Number" />
          </div>
          <TextInput id="phone-number" type="tel" placeholder="Enter phone number" required maxLength={10} pattern="[0-9]{10}" shadow onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')} />
        </div>

        <Button type="submit">Register</Button>
      </form>
    </div>
  )
}

export default AddCustomer;
