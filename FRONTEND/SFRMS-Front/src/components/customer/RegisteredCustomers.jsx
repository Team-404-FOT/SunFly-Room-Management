import React, { useState } from 'react';
import { Table, Pagination } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function RegisteredCustomers() {
  const customers = [
    { firstName: 'Ashen', lastName: 'Kavindu', nic: '200064603572', phone: '0718045695' },
    { firstName: 'Thisara', lastName: 'Bandara', nic: '200076543572', phone: '0752020695' },
    { firstName: 'Chathumina', lastName: 'Dilashan', nic: '200035512072', phone: '0798077795' },
    { firstName: 'Dinuka', lastName: 'Sandeepa', nic: '200099654372', phone: '0776545776' },
    { firstName: 'Nimali', lastName: 'Fernando', nic: '200045678912', phone: '0712345678' },
    { firstName: 'Kavindu', lastName: 'Perera', nic: '200098765432', phone: '0758765432' },
    { firstName: 'Sashini', lastName: 'Jayasinghe', nic: '200123456789', phone: '0791234567' },
    { firstName: 'Ravindu', lastName: 'Wickramasinghe', nic: '200156789012', phone: '0786543210' },
    { firstName: 'Dilani', lastName: 'Perera', nic: '200067890123', phone: '0719876543' },
    { firstName: 'Tharindu', lastName: 'Jayawardena', nic: '200098765678', phone: '0756543210' },
    { firstName: 'Sanduni', lastName: 'Karunarathne', nic: '200043218765', phone: '0798765432' },
    { firstName: 'Pramudi', lastName: 'Gunarathne', nic: '200012345678', phone: '0781234567' },

  ];

  const itemsPerPage = 7;  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.nic.includes(searchTerm)
  );

  // Get current customers to display
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="overflow-x-auto ml-10 mr-10 mt-10 ">
      <div className='mb-5'>
        <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              id="default-search" 
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search By Customer NIC" 
              required 
            />
            <button 
              type="submit" 
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div>
        <Table>
          <Table.Head className="text-black">
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>NIC</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-700">
            {currentCustomers.map((customer, index) => (
              <Table.Row key={index} className="bg-gray-800 hover:bg-gray-700">
                <Table.Cell className="text-white">{customer.firstName}</Table.Cell>
                <Table.Cell className="text-white">{customer.lastName}</Table.Cell>
                <Table.Cell className="text-white">{customer.nic}</Table.Cell>
                <Table.Cell className="text-white">{customer.phone}</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" />
                  <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
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
          totalPages={Math.ceil(filteredCustomers.length / itemsPerPage)}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
}

export default RegisteredCustomers;
