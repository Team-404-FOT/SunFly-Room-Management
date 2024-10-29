import React, { useState } from 'react';
import { Label, TextInput, Dropdown, Button } from "flowbite-react";

function AddPay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);
  const [paymentView, setPaymentView] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [cashPaid, setCashPaid] = useState('');
  const [balance, setBalance] = useState(null);

  // Dummy customer and room data
  const dummyCustomerData = {
    firstName: "John",
    lastName: "Doe",
    nic: "123456789V",
    roomNumber: "R001",
    roomType: "Double Room",
    checkIn: "2024-10-01",
    checkOut: "2024-10-10",
    price: 1000 // Total price for the stay
  };

  // Mock API Call for search
  const handleSearch = () => {
    if (searchTerm) {
      setCustomerDetails(dummyCustomerData);
    } else {
      setCustomerDetails(null);
    }
  };

  const calculateBalance = () => {
    if (cashPaid) {
      const total = dummyCustomerData.price; // Using dummy total price
      setBalance(cashPaid - total);
    }
  };

  const handlePayment = () => {
    console.log("Payment made!");
  };

  return (
    <div className="flex max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg gap-8">
      {/* Left Side */}
      <div className="flex flex-col gap-6 w-2/5">
        
        {/* Search Section */}
        <form className="flex items-center gap-4" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <TextInput
            id="simple-search"
            placeholder="Search by room number or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            className="flex-1 border border-gray-300 rounded-lg"
          />
          <Button type="submit" color="blue">Search</Button>
        </form>

        {/* Customer Details */}
        {customerDetails && (
          <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-2">
            <h3 className="font-semibold text-lg">Customer Details</h3>
            <p className="text-gray-700">Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
            <p className="text-gray-700">NIC: {customerDetails.nic}</p>
            <Button onClick={() => setPaymentView(true)} color="success" size="sm">Proceed to Payment</Button>
          </div>
        )}
      </div>

      {/* Payment Window */}
      {paymentView && (
        <div className="flex flex-col gap-6 w-3/5 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold text-lg">Payment Details</h3>
          
          {/* Room and Payment Information */}
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Room No:</strong> {customerDetails.roomNumber}</p>
            <p><strong>Room Type:</strong> {customerDetails.roomType}</p>
            <p><strong>Check-in Date:</strong> {customerDetails.checkIn}</p>
            <p><strong>Check-out Date:</strong> {customerDetails.checkOut}</p>
            <p><strong>Total Price:</strong> ${customerDetails.price}</p>
          </div>

          {/* Payment Options */}
          <div className="space-y-4">
            <Dropdown label="Select Payment Method" dismissOnClick={false} className="w-48">
              <Dropdown.Item onClick={() => setPaymentType('Card')}>Card</Dropdown.Item>
              <Dropdown.Item onClick={() => setPaymentType('Cash')}>Cash</Dropdown.Item>
            </Dropdown>
          </div>

          {/* Cash Payment Section */}
          {paymentType === 'Cash' && (
            <div className="space-y-4">
              <Label htmlFor="cashPaid" value="Cash Paid" />
              <TextInput
                id="cashPaid"
                type="number"
                placeholder="Enter amount paid"
                onChange={(e) => setCashPaid(e.target.value)}
                className="border border-gray-300 rounded-lg"
              />
              <Button onClick={calculateBalance} color="blue" size="sm">Calculate Balance</Button>
              {balance !== null && (
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
