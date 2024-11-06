import React from 'react';
import { FaBed, FaSnowflake, FaMoneyBillWave, FaAlignLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function RoomDetails({ room }) {
  if (!room) return null;
  
  return (
    <div className="max-w-lg mx-auto bg-white overflow-hidden p-5">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          <FaBed className="inline-block mr-2 text-blue-500" />
          Room Number: {room.roomNum}
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <FaAlignLeft className="text-gray-500 mr-2" />
          <p className="text-gray-700"><strong>Type:</strong> {room.type}</p>
        </div>

        <div className="flex items-center">
          <FaSnowflake className="text-blue-500 mr-2" />
          <p className="text-gray-700"><strong>AC Type:</strong> {room.actype}</p>
        </div>

        <div className="flex items-center">
          <FaMoneyBillWave className="text-green-500 mr-2" />
          <p className="text-gray-700">
            <strong>Amount Per Day:</strong> Rs. {room.amountPerDay}
          </p>
        </div>

        <div className="flex items-center">
          {room.availability ? (
            <>
              <FaCheckCircle className="text-green-500 mr-2" />
              <p className="text-gray-700 font-medium">Available</p>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500 mr-2" />
              <p className="text-gray-700 font-medium">Not Available</p>
            </>
          )}
        </div>

        <div className="flex items-start">
          <FaAlignLeft className="text-gray-500 mr-2 mt-1" />
          <p className="text-gray-700">
            <strong>Description:</strong> 
          </p>
          <br/>
        </div>

        <div>
            <p>
                {room.description}
            </p>
        </div>

      </div>
    </div>
  );
}

export default RoomDetails;
