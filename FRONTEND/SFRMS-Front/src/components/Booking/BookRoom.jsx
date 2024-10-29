import React, { useState, useEffect } from 'react';
import { Label, TextInput, Checkbox, Table, Button } from "flowbite-react";
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
  const [rooms, setRooms] = useState([]); // State to store room data
  const [roomType, setRoomType] = useState("");
  const [acType, setAcType] = useState("");
  const [checkInDate, setCheckInDate] = useState(""); // State for check-in date

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User might not be authenticated.");
    return;
  }

  useEffect(() => {
    // Set check-in date to today's date by default
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCheckInDate(formattedDate);
  }, []);

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

  // // Fetch room data
  // const fetchRooms = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/rooms/view", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setRooms(response.data);
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   }
  // };

  //filterd rooms
  const fetchFilteredRooms = async () => {
    try {
      const params = {};
      if (roomType) params.roomType = roomType;
      if (acType) params.acType = acType;

      const response = await axios.get("http://localhost:8080/rooms/filter", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching filtered rooms:", error);
    }
  };

  // useEffect(() => {
  //   fetchRooms(); // Fetch rooms on component mount
  // }, []);

  useEffect(() => {
    fetchFilteredRooms();
  }, [roomType, acType]);


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
              <div className=' w-full'>
                <Label htmlFor="room_type" value="Select Room Type" />
                <div className='flex'>

                  <select
                    id="room_type"
                    onChange={(e) => {
                      const selectedRoomType = e.target.value;
                      setRoomType(selectedRoomType);

                      // Deselect AC and Non-AC options when "All Room Types" is selected
                      if (selectedRoomType === "") {
                        setAcType(""); // Deselect both radio buttons
                      }
                    }}
                    className="mt-2 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block "
                  >
                    <option value="">All Room Types</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double Room</option>
                    <option value="family">Family Room</option>
                  </select>
                  <div className=' mt-3 ml-20'>
                    <input
                      type="radio"
                      id="ac"
                      name="ac_type"
                      value="ac"
                      onChange={(e) => setAcType(e.target.value)}
                      checked={acType === "ac"} // Check if this radio button should be selected
                      className="text-blue-500 m-2"
                    />
                    <Label htmlFor="ac" value="  AC" />
                  </div>
                  <div className='mt-3'>
                    <input
                      type="radio"
                      id="non_ac"
                      name="ac_type"
                      value="nonac"
                      onChange={(e) => setAcType(e.target.value)}
                      checked={acType === "nonac"} // Check if this radio button should be selected
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
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="mt-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block "
                    />
                  </div>
                </div>
                {/* available rooms */}
                <div className=' mt-4'>
                  <Label htmlFor="available_rooms" value="Available Rooms" />

                  <div className="overflow-x-auto max-h-80 border border-gray-300 rounded-lg">
                    {/* Room Table */}
                    <Table hoverable>
                      <Table.Head>
                        <Table.HeadCell className="p-4">
                        </Table.HeadCell>
                        <Table.HeadCell>Room Number</Table.HeadCell>
                        <Table.HeadCell>Room Type</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>AC Type</Table.HeadCell>
                        <Table.HeadCell>Price per Day</Table.HeadCell>
                        <Table.HeadCell>Availability</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {rooms.map((room) => (
                          <Table.Row key={room.roomId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="p-4">
                              <Checkbox />
                            </Table.Cell>
                            <Table.Cell>{room.room_num}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              {room.type}
                            </Table.Cell>
                            <Table.Cell>{room.description}</Table.Cell>
                            <Table.Cell>{room.actype || "N/A"}</Table.Cell>
                            <Table.Cell>Rs.{room.amount_per_day}</Table.Cell>
                            <Table.Cell>{room.availability ? "Available" : "Unavailable"}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </div>

              </div>
              <Button className="mt-4" onClick={() => alert("Room booked successfully!")}>Book Room</Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default BookRoom;
