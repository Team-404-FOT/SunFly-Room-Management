import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Label, Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

function Updaterooms({ isOpen, onClose, onSubmit, selectedRoom }) {
  const [roomNum, setRoomNum] = useState('');
  const [roomType, setRoomType] = useState('');
  const [acType, setAcType] = useState('');
  const [amountPerDay, setAmountPerDay] = useState('');
  const [availability, setAvailability] = useState(true);
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (selectedRoom) {
      setRoomNum(selectedRoom.roomNum || '');
      setRoomType(selectedRoom.roomType || '');
      setAcType(selectedRoom.acType || '');
      setAmountPerDay(selectedRoom.amountPerDay || '');
      setAvailability(selectedRoom.availability || true);
      setDescription(selectedRoom.description || '');
    }
  }, [isOpen, selectedRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const updatedRoomData = {
      roomNum,
      roomType,
      acType,
      amountPerDay: parseInt(amountPerDay),
      availability,
      description,
    };

    try {
      const response = await fetch(`http://localhost:8080/rooms/update/${selectedRoom.roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRoomData),
      });

      if (!response.ok) throw new Error('Error updating room');

      setSuccessMessage(true);
      clearForm();
      setTimeout(() => {
        setSuccessMessage(false);
        onClose(); // Close the modal after successful update
      }, 2000);

    } catch (error) {
      setErrorMessage(true);
      if (timeoutId) clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => setErrorMessage(false), 3000);
      setTimeoutId(newTimeoutId);
      console.error('Error updating room:', error);
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
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Room Details</h3>

          {/* Success Message */}
          {successMessage && (
            <Alert color="success" onDismiss={() => setSuccessMessage(false)}>
              <span className="font-medium">Room updated successfully!</span>
            </Alert>
          )}

          {/* Error Message */}
          {errorMessage && (
            <Alert color="failure" icon={HiInformationCircle} onDismiss={() => setErrorMessage(false)}>
              <span className="font-medium">Error updating room! Please try again.</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Room Number */}
            <div>
              <Label htmlFor="roomNum" value="Room Number" />
              <TextInput
                id="roomNum"
                type="text"
                required
                value={roomNum}
                onChange={(e) => setRoomNum(e.target.value)}
              />
            </div>

            {/* Room Type Dropdown */}
            <div>
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
                required
                value={amountPerDay}
                onChange={(e) => setAmountPerDay(e.target.value)}
              />
            </div>

            {/* Room Description */}
            <div>
              <Label htmlFor="description" value="Room Description" />
              <textarea
                id="description"
                className="form-control shadow mt-2 p-2 w-full resize-none"
                placeholder="Enter room description (e.g., room features, view, amenities)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
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

            <Button type="submit">Update Room</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Updaterooms;
