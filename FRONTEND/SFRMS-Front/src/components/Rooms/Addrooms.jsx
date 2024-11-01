import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function AddRoom() {
  const [roomNum, setRoomNum] = useState('');
  const [roomType, setRoomType] = useState('');
  const [acType, setAcType] = useState('');
  const [amountPerDay, setAmountPerDay] = useState('');
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState(''); // New state for Room Description
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Increase the amountPerDay by 1000 before submission
    const updatedAmountPerDay = parseInt(amountPerDay); 

    const roomData = {
      roomNum,
      roomType,
      acType,
      amountPerDay: updatedAmountPerDay,
      availability,
      description, // Include Room Description in the data
    };

    try {
      const response = await fetch('http://localhost:8080/rooms/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      });

      if (response.status === 409) {
        setErrorMessage(true);
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => setErrorMessage(false), 3000);
        setTimeoutId(newTimeoutId);
        return;
      }

      if (!response.ok) throw new Error('Error adding room');

      setSuccessMessage(true);
      clearForm();
      setTimeout(() => setSuccessMessage(false), 2000);

    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const clearForm = () => {
    setRoomNum('');
    setRoomType('');
    setAcType('');
    setAmountPerDay('');
    setAvailability(true);
    setDescription(''); // Clear description field
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">ADD ROOMS</h1>
      
      <form className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg" onSubmit={handleSubmit}>

        {/* Success Message */}
        {successMessage && (
          <Alert color="success" onDismiss={() => setSuccessMessage(false)}>
            <span className="font-medium">Room registered successfully!</span>
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setErrorMessage(false)}>
            <span className="font-medium">Duplicate room entry! Please try again.</span>
          </Alert>
        )}

        {/* Room Number */}
        <div>
          <Label htmlFor="roomNum" value="Room Number" />
          <TextInput
            id="roomNum"
            type="text"
            placeholder="Enter Room Number"
            required
            shadow
            value={roomNum}
            onChange={(e) => setRoomNum(e.target.value)}
          />
        </div>

       {/* Room Type Dropdown */}
<div className="mb-4"> {/* Add margin-bottom for spacing */}
  <Label htmlFor="roomType" value="Room Type :" />
  <select
    id="roomType"
    className="form-select shadow border border-blue-500 rounded-lg focus:ring focus:ring-blue-300 transition duration-200 ease-in-out"
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
        <div>
          <Label htmlFor="acType" value="AC Type" />
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
                value="Non-AC"
                checked={acType === "Non-AC"}
                onChange={(e) => setAcType(e.target.value)}
              />
              <span>Non-AC</span>
            </label>
          </div>
        </div>

        {/* Amount per Day */}
        <div>
          <Label htmlFor="amountPerDay" value="Amount per Day" />
          <TextInput
            id="amountPerDay"
            type="number"
            placeholder="Rs :Enter Amount per Day"
            required
            shadow
            value={amountPerDay}
            onChange={(e) => setAmountPerDay(e.target.value)}
          />
        </div>

        {/* Room Description */}
        <div className="flex flex-col items-center">
          <Label htmlFor="description" value="Room Description" className="text-center mb-2" />
          <textarea
            id="description"
            className="form-control shadow mt-2 p-2 w-full max-w-lg overflow-y-auto resize-none" // Ensure the scrollbar appears
            placeholder="Enter room description (e.g., room features, view, amenities)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6" // Increased rows for a larger text area
            required
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <Label htmlFor="availability" value="Available" />
          <input
            id="availability"
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
        </div>

        <Button type="submit">Add Room</Button>
      </form>
    </div>
  );
}

export default AddRoom;
