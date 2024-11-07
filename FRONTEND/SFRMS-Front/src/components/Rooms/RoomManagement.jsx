import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Modal, Alert } from 'flowbite-react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import RoomDetails from './RoomDetails';
import EditRoom from './EditRoom'; 

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);
  
  const itemsPerPage = 7;
  const baseURL = 'http://localhost:8080/rooms'; 
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/viewAll`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      } else {
        console.error('Failed to fetch rooms');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const totalPages = Math.ceil(rooms.length / itemsPerPage);
  const onPageChange = (page) => setCurrentPage(page);
  
  const filteredRooms = rooms.filter(room =>
    room.roomNum.toString().includes(searchTerm) || room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRoom = currentPage * itemsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (roomNum) => {
    setRoomToDelete(roomNum);
    setShowDeleteModal(true);
  };

  const deleteRoom = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseURL}/delete/${roomToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        setRooms(rooms.filter(room => room.roomNum !== roomToDelete));
        setShowDeleteModal(false);
      } else {
        console.error('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleEditClick = (room) => {
    setRoomToEdit(room);
    setShowEditModal(true);
  };

  const handleViewDetails = (room) => {
    setRoomDetails(room);
    setShowDetailsModal(true);
  };

  const updateRoom = async (updatedRoom) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${baseURL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRoom),
      });

      if (response.ok) {
        // Update local state
        const roomIndex = rooms.findIndex(room => room.roomNum === updatedRoom.roomNum);
        const newRooms = [...rooms];
        newRooms[roomIndex] = updatedRoom; 
        setRooms(newRooms); 
        setShowEditModal(false); 
      } else {
        const errorData = await response.text();
        console.error('Update failed:', errorData);
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className="overflow-x-auto ml-10 mr-10 mt-10">
      <div className="mb-5 flex justify-between">
        <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <input 
              type="search" 
              id="default-search" 
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Search By Room Number or Type" 
              required 
            />
          </div>
        </form>
        <Button className=' bg-sky-600' onClick={() => navigate('/Rooms/Addrooms')}>Add Room</Button>
      </div>

      <div>
        <Table>
          <Table.Head className="text-black">
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>AC Type</Table.HeadCell>
            <Table.HeadCell>Amount per Day</Table.HeadCell>
            <Table.HeadCell>Availability</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y divide-gray-700">
            {currentRooms.map((room, index) => (
              <Table.Row key={index} className="hover:bg-gray-200">
                <Table.Cell>{room.roomNum}</Table.Cell>
                <Table.Cell>{room.type}</Table.Cell>
                <Table.Cell>{room.actype}</Table.Cell>
                <Table.Cell>Rs. {room.amountPerDay}</Table.Cell>
                <Table.Cell>{room.availability ? 'Available' : 'Not Available'}</Table.Cell>
                <Table.Cell className="flex">
                  <FaEye className="text-green-500 mr-3 hover:text-green-700 cursor-pointer text-lg" onClick={() => handleViewDetails(room)} />
                  <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleEditClick(room)} />
                  <FaTrash className="text-red-500 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleDeleteClick(room.roomNum)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} size="md" onClose={() => setShowDeleteModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiInformationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this room?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteRoom}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Room Modal using EditRoom Component */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <Modal.Header>Edit Room</Modal.Header>
        <Modal.Body>
          <EditRoom
            room={roomToEdit}
            setRoom={setRoomToEdit}
            onUpdate={updateRoom} 
            closeModal={() => setShowEditModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Room Details Modal using RoomDetails Component */}
      <Modal show={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
        <Modal.Header>Room Details</Modal.Header>
        <Modal.Body>
          <RoomDetails room={roomDetails} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RoomManagement;
