import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';

export default function BookingDetails() {
    const token = localStorage.getItem("token");
    const [activeBookings, setActiveBookings] = useState([]);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // Search states
    const [nicSearch, setNicSearch] = useState('');
    const [roomNumSearch, setRoomNumSearch] = useState('');

    useEffect(() => {
        fetchActiveBookingData();
    }, []);

    const fetchActiveBookingData = async () => {
        try {
            const response = await fetch('http://localhost:8080/bookings/active', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setActiveBookings(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching active bookings:', error);
        }
    };

    // Delete booking function
    const deleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:8080/bookings/delete/${bookingId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }

            // Remove the deleted booking from the state
            setActiveBookings(activeBookings.filter(booking => booking.bookingId !== bookingId));
            console.log(`Booking ${bookingId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    // Filtered bookings based on search terms
    const filteredBookings = activeBookings.filter(booking =>
        (!nicSearch || booking.nic?.toLowerCase().includes(nicSearch.toLowerCase())) &&
        (!roomNumSearch || booking.roomNum.toString().includes(roomNumSearch))
    );

    // Pagination calculations
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

    // Change page function
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='w-full h-full p-5 bg-gray-100'>
            <div>
                <h1 className='mb-5 text-2xl'>Available Bookings</h1>

                {/* Search Inputs */}
                <div className="flex space-x-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by NIC/PP Number"
                        value={nicSearch}
                        onChange={(e) => setNicSearch(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-1/3"
                    />
                    <input
                        type="text"
                        placeholder="Search by Room Number"
                        value={roomNumSearch}
                        onChange={(e) => setRoomNumSearch(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-1/3"
                    />
                </div>

                <div className="h-4/6">
                    <Table className=' shadow-lg rounded-md'>
                        <Table.Head>
                            <Table.HeadCell className=' bg-sky-200'>Booking ID</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Booking Date</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200 text-center'>Room Number</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Customer Name</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Phone Number</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>NIC/PP Number</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Room Type</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>AC Type</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Special Note</Table.HeadCell>
                            <Table.HeadCell className=' bg-sky-200'>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {currentBookings.map(booking => (
                                <Table.Row key={booking.bookingId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {booking.bookingId}
                                    </Table.Cell>
                                    <Table.Cell>{booking.bookingDateAndTime}</Table.Cell>
                                    <Table.Cell className=' text-center'>{booking.roomNum}</Table.Cell>
                                    <Table.Cell>{booking.customerName}</Table.Cell>
                                    <Table.Cell>{booking.phoneNumber}</Table.Cell>
                                    <Table.Cell>{booking.nic}</Table.Cell>
                                    <Table.Cell>{booking.type}</Table.Cell>
                                    <Table.Cell>{booking.acType}</Table.Cell>
                                    <Table.Cell>{booking.specialNote || 'N/A'}</Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={() => deleteBooking(booking.bookingId)}
                                            className="text-red-500 cursor-pointer hover:underline"
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-end mt-4">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-200 p-2 rounded"
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-200 p-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
