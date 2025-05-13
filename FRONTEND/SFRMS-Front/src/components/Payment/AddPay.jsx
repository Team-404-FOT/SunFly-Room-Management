import React, { useState, useEffect } from 'react';
import { Label, TextInput, Dropdown, Button, Table } from "flowbite-react";

function AddPay() {
  const token = localStorage.getItem("token"); // Assuming token is stored in local storage
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [cashPaid, setCashPaid] = useState('');
  const [balance, setBalance] = useState(null);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price
  const [error, setError] = useState(null); // State for error handling
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  // Fetch booking data from backend
  useEffect(() => {

    fetchBookedRooms();
  }, [token]);

  const fetchBookedRooms = async () => {
    try {
      const response = await fetch('http://localhost:8080/bookings/details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }
      const data = await response.json();
      setBookedRooms(data);
      console.log(data); // For debugging purposes
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  // Function to get the current date in the format YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    const result = bookedRooms.find(room =>
      room.roomNum === searchTerm || room.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (result) {
      setSelectedRoom({ ...result, checkOut: getCurrentDate() });
    } else {
      setSelectedRoom(null);
    }
  };

  const calculateBalance = () => {
    if (cashPaid && totalPrice) {
      setBalance(cashPaid - totalPrice);
    }
  };

  const fetchTotalPrice = async (bookingId, checkOut) => {
    try {
      const response = await fetch(`http://localhost:8080/bookings/calculate-amount?checkOut=${checkOut}&bookingId=${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch total price');
      }

      const data = await response.json();
      console.log("Full response data:", data); // Log the full response for debugging

      if (data['#result-set-1'] && Array.isArray(data['#result-set-1']) && data['#result-set-1'].length > 0) {
        const bookingData = data['#result-set-1'][0];
        console.log("Booking data:", bookingData); // Log booking data for inspection

        const totalCalculatedAmount = bookingData?.total_calculated_amount;
        const amountPerDay = bookingData?.amountPerDay;

        if (typeof totalCalculatedAmount === 'number') {
          setTotalPrice(totalCalculatedAmount);
          setError(null); // Clear any previous error
        } else if (typeof amountPerDay === 'number') {
          setTotalPrice(amountPerDay);
          setError('Showing daily rate as total amount');
        } else {
          console.warn("Unexpected data format: total_calculated_amount and amountPerDay are missing.");
          setError('Unexpected data format for total_calculated_amount and amountPerDay');
        }
      } else if (data.message) {
        // Handle the case where no valid booking is found
        console.warn(data.message); // Log the specific message
        setError(data.message); // Show the message as an error
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching total price:', error);
      setError('Error fetching total price');
    }
  };





  const handleCheckout = (room) => {
    const checkOutDate = getCurrentDate();
    setSelectedRoom({ ...room, checkOut: checkOutDate });
    fetchTotalPrice(room.bookingId, checkOutDate); // Call the function to get the total price
  };

  const handlePayment = async () => {
    if (selectedRoom) {
      try {
        console.log(selectedRoom);
        // Prepare payment data based on selected room details and user inputs
        const paymentData = {
          bookingId: selectedRoom.bookingId,
          type: selectedRoom.type,
          acType: selectedRoom.acType,
          cusName: selectedRoom.customerName,
          paymentMethod: paymentType,
          checkIn: `${selectedRoom.bookingDate}T00:00:00`, // Include time component
          checkOut: `${selectedRoom.checkOut}T00:00:00`,   // Include time component
          amount: totalPrice,
        };

        // Make POST request to add payment endpoint
        const response = await fetch('http://localhost:8080/bookings/add-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
          body: JSON.stringify(paymentData),
        });

        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to add payment');
        }

        // Successfully added payment, reset states and notify user
        console.log("Payment added successfully!");
        setSelectedRoom(null); // Clear selected room
        setPaymentType('');     // Clear payment type
        setCashPaid('');        // Clear cash paid input
        setBalance(null);       // Clear balance
        setTotalPrice(0);       // Reset total price
        fetchBookedRooms();

        // Show success alert
      setPaymentSuccess(true); // Set success state to true

      } catch (error) {
        console.error('Error adding payment:', error);
        setError('Failed to process payment'); // Display error message
      }
    }
  };

  if (paymentSuccess) {
    setTimeout(() => setPaymentSuccess(false), 3000); // Hide after 3 seconds
  }


  return (
    <div className="flex h-screen p-8 bg-gray-200">
      
      {/* Left Side: Search and Booked Rooms */}
      <div className="flex flex-col gap-6 w-1/2 p-6 bg-gray-200 rounded-lg shadow-lg overflow-y-auto">
        {/* Alert for Payment Success */}
      {paymentSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Payment added successfully!
        </div>
      )}

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
            <Table.HeadCell>AC Type</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookedRooms.map((room) => (
              <Table.Row key={room.bookingId} className="bg-white">
                <Table.Cell>{room.roomNum}</Table.Cell>
                <Table.Cell>{room.customerName}</Table.Cell>
                <Table.Cell>{room.type}</Table.Cell>
                <Table.Cell>{room.acType}</Table.Cell>
                <Table.Cell>
                  <Button size="xs" onClick={() => handleCheckout(room)} color="success">Checkout</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Right Side: Payment Window */}
      {selectedRoom && (
        <div className="flex flex-col gap-6 w-1/2 p-6 bg-gray-200 border border-gray-300 rounded-lg shadow-lg overflow-y-auto">
          <h3 className="font-semibold text-lg">Payment Details for Room {selectedRoom.roomNum}</h3>

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
              value={selectedRoom.type}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="AC Type" />
            <TextInput
              readOnly
              value={selectedRoom.acType}
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
            <Label value="Check-in Date" />
            <TextInput
              readOnly
              value={selectedRoom.bookingDate}
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
              value={`Rs.${totalPrice.toFixed(2)}`} // Display the calculated total price
              className="border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Payment Options */}
          <div className="w-full space-y-4">
            <div className="relative w-1/2">
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
                  setBalance(null);
                }}
                className="border border-gray-300 rounded-lg"
              />
              <Button onClick={calculateBalance} color="blue" size="sm">Calculate Balance</Button>
              {cashPaid && balance !== null && (
                <p className="text-gray-700 font-semibold">Balance: Rs.{balance}</p>
              )}
            </div>
          )}

          {/* Finalize Payment */}
          <Button onClick={handlePayment} color="green" className="w-full mt-4">Make Payment</Button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if any */}
        </div>
      )}
    </div>
  );
}

export default AddPay;
