import React, { useState } from 'react';
import { Label, TextInput } from "flowbite-react";
import axios from "axios";

function BookRoom() {
  const [nicQuery, setNicQuery] = useState("");
  const [matchedNICs, setMatchedNICs] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    phoneNumber: "",
  });

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might not be authenticated.");
    return;
  }

  // Fetch matched NICs from the database as the user types
  const fetchNICs = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/customers/search-customer-nic`, {
        params: { query },
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatchedNICs(response.data);
    } catch (error) {
      console.error("Error fetching NICs:", error);
    }
  };

  // Fetch customer details by selected NIC
  const fetchCustomerDetails = async (nic) => {
    try {
      const response = await axios.get(`http://localhost:8080/customers/get-customer-by-nic`, {
        params: { nic },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomerDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  const handleNicChange = (e) => {
    const value = e.target.value;
    setNicQuery(value);

    if (value.length >= 1) {
      fetchNICs(value);
    } else {
      setMatchedNICs([]);
    }
  };

  const handleNICSelect = (nic) => {
    setNicQuery(nic);
    setMatchedNICs([]);
    fetchCustomerDetails(nic);
  };

  return (
    <div className="flex justify-between bg-gray-100 mx-auto gap-2 h-full w-full">
      <div className="w-1/3 bg-gray-100 p-4 border-r-2">
        <div className="flex flex-col gap-4 w-full">
          <h4 className="text-xl font-semibold text-gray-800 mb-4 ml-3 ">Search Customer</h4>
          <form className="flex items-center mb-4">
            <div className="w-full relative">
              <Label htmlFor="first_name" value="NIC/Passpot No." className='ps-10 p-2.5' />
              <TextInput
                type="text"
                id="nic-search"
                placeholder="Search Customer NIC/PP No."
                value={nicQuery}
                onChange={handleNicChange}
                className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                required
              />

              {matchedNICs.length > 0 && (
                <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg z-10">
                  {matchedNICs.map((nic) => (
                    <div
                      key={nic}
                      onClick={() => handleNICSelect(nic)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {nic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <div className="items-center ml-3">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="first_name" value="First Name" />
              </div>
              <TextInput
                id="f_name"
                type="text"
                sizing="sm"
                className="w-full"
                value={customerDetails.firstName}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="l_name"
                type="text"
                sizing="sm"
                className="w-full"
                value={customerDetails.lastName}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nicNo" value="NIC" />
              </div>
              <TextInput
                id="nic"
                type="text"
                sizing="sm"
                className="w-full"
                value={customerDetails.nic}
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone_number" value="Phone Number" />
              </div>
              <TextInput
                id="phone_no"
                type="text"
                sizing="sm"
                className="w-full"
                value={customerDetails.phoneNumber}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-gray-100 p-4">
        {/* Additional content for the right side */}
        <div className='flex flex-col gap-4 w-full'>
          <h4 className="text-xl font-semibold text-gray-800 mb-4  ">Book Room</h4>
          <form className="flex items-center mb-4">
            <div className="w-full">
              <Label htmlFor="room_type" value="Select Room Type" />
              <div className='flex'>

                <select
                  id="room_type"
                  className="mt-2 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block "
                >
                  <option value="single">Single Room</option>
                  <option value="double">Double Room</option>
                  <option value="triple">Family Room</option>
                </select>
                <div className=' mt-3 ml-20'>
                  <input
                    type="radio"
                    id="ac"
                    name="room_type"
                    value="ac"
                    className="text-blue-500 m-2"
                  />
                  <Label htmlFor="ac" value="  AC" />
                </div>
                <div className='mt-3'>
                  <input
                    type="radio"
                    id="non_ac"
                    name="room_type"
                    value="non_ac"
                    className="text-blue-500 m-2 ml-14"
                  />
                  <Label htmlFor="non_ac" value="  Non A/C" />
                </div>

              </div>
              <div className='flex gap-4 mt-4'>

                <div className='w-1/2'>
                  <Label htmlFor="check_in" value="Check In Date" />
                  <TextInput
                    id="check_in"
                    type="date"
                    className="mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block "
                  />
                </div>
              </div>
              {/* available rooms */}
              <div className=' mt-4'>
                <Label htmlFor="available_rooms" value="Available Rooms" />
                Map the available rooms here
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default BookRoom;
