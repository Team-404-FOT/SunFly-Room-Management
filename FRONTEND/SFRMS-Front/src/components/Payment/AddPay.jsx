import React, { useState } from 'react';
import { Label, TextInput, Dropdown, Button, Table } from "flowbite-react";

function AddPay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [cashPaid, setCashPaid] = useState('');
  const [balance, setBalance] = useState(null);

  // Dummy data for booked rooms
  const bookedRooms = [
    { id: 1, roomNumber: "R001", customerName: "John Doe", roomType: "Double", price: 1000, checkIn: "2024-10-01", checkOut: "2024-10-10" },
    { id: 2, roomNumber: "R002", customerName: "Jane Smith", roomType: "Single", price: 700, checkIn: "2024-10-05", checkOut: "2024-10-12" },
    // Add more dummy data as needed
  ];

  const handleSearch = () => {
    const result = bookedRooms.find(room => room.roomNumber === searchTerm || room.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    setSelectedRoom(result || null);
  };

  const calculateBalance = () => {
    if (cashPaid && selectedRoom) {
      setBalance(cashPaid - selectedRoom.price);
    }
  };

  const handlePayment = () => {
    if (selectedRoom) {
      console.log("Payment made for room:", selectedRoom.roomNumber);
      setSelectedRoom(null);
      setPaymentType('');
      setCashPaid('');
      setBalance(null);
    }
  };

  return (
    <div className="flex h-screen p-8 bg-gray-100"> {/* Light gray background for the whole page */}
      {/* Left Side: Search and Booked Rooms */}
      <div className="flex flex-col gap-6 w-1/2 p-6 bg-gray-200 rounded-lg shadow-lg overflow-y-auto"> {/* Changed to bg-gray-200 */}
        
        {/* Search Section */}
        <form className="flex items-center gap-4 mb-6" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <TextInput
            id="simple-search"
            placeholder="Search by room number or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg"
          />
          <Button type="submit" color="blue">Search</Button>
        </form>

        {/* Booked Rooms List */}
        <h3 className="font-semibold text-lg mb-4">Booked Rooms</h3>
        <Table className="w-full text-left">
          <Table.Head>
            <Table.HeadCell>Room No</Table.HeadCell>
            <Table.HeadCell>Customer</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookedRooms.map((room) => (
              <Table.Row key={room.id} className="bg-white">
                <Table.Cell>{room.roomNumber}</Table.Cell>
                <Table.Cell>{room.customerName}</Table.Cell>
                <Table.Cell>{room.roomType}</Table.Cell>
                <Table.Cell>
                  <Button size="xs" onClick={() => setSelectedRoom(room)} color="success">Checkout</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Right Side: Payment Window */}
      {selectedRoom && (
        <div className="flex flex-col gap-6 w-1/2 p-6 bg-gray-200 border border-gray-200 rounded-lg shadow-lg overflow-y-auto"> {/* Changed to bg-gray-200 */}
          <h3 className="font-semibold text-lg">Payment Details for Room {selectedRoom.roomNumber}</h3>
          
          {/* Room and Payment Information */}
          <div className="space-y-2">
            <Label value="Customer" />
            <TextInput
              readOnly
              value={selectedRoom.customerName}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="Room Type" />
            <TextInput
              readOnly
              value={selectedRoom.roomType}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="Check-in Date" />
            <TextInput
              readOnly
              value={selectedRoom.checkIn}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="Check-out Date" />
            <TextInput
              readOnly
              value={selectedRoom.checkOut}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="Total Price" />
            <TextInput
              readOnly
              value={`$${selectedRoom.price}`}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Payment Options */}
          <div className="w-full space-y-4">
            <div className="relative w-1/2"> {/* Adjusting the width of dropdown */}
              <Dropdown label="Select Payment Method" dismissOnClick={true}>
                <Dropdown.Item onClick={() => setPaymentType('Card')}>Card</Dropdown.Item>
                <Dropdown.Item onClick={() => setPaymentType('Cash')}>Cash</Dropdown.Item>
              </Dropdown>
            </div>
          </div>

          {/* Cash Payment Section */}
          {paymentType === 'Cash' && (
            <div className="space-y-4">
              <Label htmlFor="cashPaid" value="Cash Paid" />
              <TextInput
                id="cashPaid"
                type="number"
                placeholder="Enter amount paid"
                onChange={(e) => {
                  setCashPaid(e.target.value);
                  setBalance(null); // Reset balance when cash paid changes
                }}
                className="border border-gray-300 rounded-lg"
              />
              <Button onClick={calculateBalance} color="blue" size="sm">Calculate Balance</Button>
              {cashPaid && balance !== null && (
                <p className="text-gray-700 font-semibold">Balance: ${balance}</p>
              )}
            </div>
          )}

          {/* Finalize Payment */}
          <Button onClick={handlePayment} color="green" className="w-full mt-4">Make Payment</Button>
        </div>
      )}
    </div>
  );
}

export default AddPay;
