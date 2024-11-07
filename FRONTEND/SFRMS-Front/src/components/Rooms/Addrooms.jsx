import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function AddRoom() {
  
  const [roomNum, setRoomNum] = useState('');
  const [roomType, setRoomType] = useState('');
  const [acType, setAcType] = useState('');
  const [amountPerDay, setAmountPerDay] = useState('');
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const parsedAmountPerDay = parseFloat(amountPerDay);
    if (isNaN(parsedAmountPerDay) || parsedAmountPerDay <= 0) {
        setErrorMessage('Please enter a valid amount greater than zero.');
        return;
    }

    const roomData = {
        roomNum: parseInt(roomNum), 
        type: roomType,
        actype: acType,
        amountPerDay: parsedAmountPerDay,
        availability,
        description,
    };

    try {
        const response = await fetch('http://localhost:8080/rooms/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(roomData),
        });

        if (!response.ok) {
            const errorData = await response.text();
            setErrorMessage(errorData);
            return;
        }

        const savedRoom = await response.json();
        setSuccessMessage('Room registered successfully!');
        clearForm();
    } catch (error) {
        console.error('Error adding room:', error);
        setErrorMessage('An error occurred while adding the room.');
    } 
};


  const clearForm = () => {
    setRoomNum('');
    setRoomType('');
    setAcType('');
    setAmountPerDay('');
    setAvailability(true);
    setDescription('');
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 ">Add Room</h1>
      
      <form className="row g-3 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleSubmit}>

        {/* Success Message */}
        {successMessage && (
          <Alert color="success" onDismiss={() => setSuccessMessage('')} className="col-12 mb-4">
            <span className="font-medium">{successMessage}</span>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setErrorMessage('')} className="col-12 mb-4">
            <span className="font-medium">{errorMessage}</span>
          </Alert>
        )}

        {/* Room Number */}
        <div className="col-md-6">
          <Label htmlFor="roomNum" value="Room Number" />
          <TextInput
            id="roomNum"
            type="number"
            placeholder="Enter Room Number"
            required
            shadow
            value={roomNum}
            onChange={(e) => setRoomNum(e.target.value)}
          />
        </div>

        {/* Room Type Dropdown */}
        <div className="col-md-6">
          <Label htmlFor="roomType" value="Room Type:" />
          <select
            id="roomType"
            className="form-select shadow border border-blue-500 rounded-lg focus:ring focus:ring-blue-300 transition duration-200 ease-in-out w-full"
            required
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="" disabled>Select Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Family">Family</option>
          </select>
        </div>

        {/* AC Type Radio Buttons */}
        <div className="col-md-6">
          <Label value="AC Type" />
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                id="acTypeAC"
                name="acType"
                value="AC"
                checked={acType === "AC"}
                onChange={(e) => setAcType(e.target.value)}
                required
              />
              <span>AC</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                id="acTypeNonAC"
                name="acType"
                value="NonAC"
                checked={acType === "NonAC"}
                onChange={(e) => setAcType(e.target.value)}
              />
              <span>Non-AC</span>
            </label>
          </div>
        </div>

        {/* Amount per Day */}
        <div className="col-md-6">
          <Label htmlFor="amountPerDay" value="Amount per Day" />
          <TextInput
            id="amountPerDay"
            type="number"
            placeholder="Rs: Enter Amount per Day"
            required
            shadow
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
          />
        </div>

        {/* Room Description */}
        <div className="col-12">
          <Label htmlFor="description" value="Room Description" />
          <textarea
            id="description"
            className="form-control shadow mt-2 p-2 w-full border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter room description (e.g., room features, view, amenities)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>

        {/* Availability Checkbox */}
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="availability">
              Available
            </label>
          </div>
        </div>
        <br/>

        <div className="col-12">
          <Button type="submit" className="w-full btn btn-primary">Add Room</Button>
        </div>
      </form>
    </div>
  );
}

export default AddRoom;
