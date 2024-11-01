import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Modal, Alert } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiInformationCircle } from 'react-icons/hi';
import EditModal from './Updaterooms'; // Import your EditModal component
import AddRoom from './Addrooms'; // Import your AddRoom component

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false); // State to toggle add room modal
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/Rooms/viewAll', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          console.error('Access denied: You do not have permission to view this resource.');
          return;
        }

        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredRooms = rooms.filter(room =>
    room.roomNum.includes(searchTerm) || room.roomType.includes(searchTerm)
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
    setShowModal(true);
  };

  const deleteRoom = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/Rooms/delete/${roomToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRooms(rooms.filter(room => room.roomNum !== roomToDelete));
        setShowModal(false);
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

  const handleEditSubmit = async (updatedRoom) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/rooms/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRoom),
      });

      if (response.ok) {
        setRooms(rooms.map(rm => 
          rm.roomNum === updatedRoom.roomNum ? updatedRoom : rm
        ));
        setShowEditModal(false);
      } else {
        console.error('Failed to update room');
      }
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const toggleAddRoom = () => {
    setShowAddRoom(!showAddRoom);
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
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search By Room Number or Type" 
              required 
            />
          </div>
        </form>
        <Button onClick={toggleAddRoom}>Add Room</Button>
      </div>

      <div>
        <Table>
          <Table.Head className="text-black">
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Amount per Day</Table.HeadCell>
            <Table.HeadCell>Availability</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-700">
            {currentRooms.map((room, index) => (
              <Table.Row key={index} className="bg-gray-800 hover:bg-gray-700">
                <Table.Cell className="text-white">{room.roomNum}</Table.Cell>
                <Table.Cell className="text-white">{room.roomType}</Table.Cell>
                <Table.Cell className="text-white">{room.amountPerDay}</Table.Cell>
                <Table.Cell className="text-white">{room.availability ? 'Available' : 'Not Available'}</Table.Cell>
                <Table.Cell className="flex">
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
          totalPages={Math.ceil(filteredRooms.length / itemsPerPage)}
          onPageChange={onPageChange}
          showIcons
        />
      </div>

      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
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
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSubmit}
        selectedRoom={roomToEdit}
      />

      {showAddRoom && (
        <AddRoom onClose={toggleAddRoom} onSubmit={(newRoom) => {
          setRooms([...rooms, newRoom]);
          toggleAddRoom(); // Close modal after adding
        }} />
      )}
    </div>
  );
}

export default RoomManagement;
