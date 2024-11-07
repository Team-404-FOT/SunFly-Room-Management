import React from 'react';
import { Button } from 'flowbite-react';

function EditRoom({ room, setRoom, onUpdate, closeModal }) {
  if (!room) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(room); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Room Number */}
      <div>
        <label className="block font-medium mb-1">Room Number:</label>
        <input 
          type="text" 
          value={room.roomNum || ''} 
          onChange={(e) => setRoom({ ...room, roomNum: e.target.value })} 
          required 
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          readOnly
        />
      </div>

      {/* Room Type Dropdown */}
      <div>
        <label className="block font-medium mb-1">Room Type:</label>
        <select
          value={room.type || ''}
          onChange={(e) => setRoom({ ...room, type: e.target.value })}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="" disabled>Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Family">Family</option>
        </select>
      </div>

      {/* AC Type Dropdown */}
      <div>
        <label className="block font-medium mb-1">AC Type:</label>
        <select
          value={room.actype || ''} 
          onChange={(e) => setRoom({ ...room, acType: e.target.value })}
          required
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="" disabled>Select AC Type</option>
          <option value="AC">AC</option>
          <option value="NonAC">Non-AC</option>
        </select>
      </div>

      {/* Amount Per Day */}
      <div>
        <label className="block font-medium mb-1">Amount Per Day:</label>
        <input 
          type="number" 
          value={room.amountPerDay || ''} 
          onChange={(e) => setRoom({ ...room, amountPerDay: e.target.value })} 
          required 
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>

      {/* Room Description */}
      <div>
        <label className="block font-medium mb-1">Room Description:</label>
        <textarea 
          value={room.description || ''} 
          onChange={(e) => setRoom({ ...room, description: e.target.value })} 
          required 
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
        />
      </div>

      {/* Availability Checkbox */}
      <div className="mb-4">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={room.availability || false} 
            onChange={(e) => setRoom({ ...room, availability: e.target.checked })} 
            className="mr-2"
          />
          Available
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end">
        <Button type="submit" className="mr-2">Update Room</Button>
        <Button color="gray" onClick={closeModal}>Cancel</Button>
      </div>
    </form>
  );
}

export default EditRoom;
