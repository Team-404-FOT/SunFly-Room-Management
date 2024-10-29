import React, { useState, useEffect } from 'react';
import { Table, Pagination, Button, Modal } from 'flowbite-react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import EditModal from './EditModal';

function RegisteredCustomers() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/customers/viewAll', {
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
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.nic.includes(searchTerm)
  );

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (nic) => {
    setCustomerToDelete(nic);
    setShowModal(true);
  };

  const deleteCustomer = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/customers/delete/${customerToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCustomers(customers.filter(customer => customer.nic !== customerToDelete));
        setShowModal(false);
      } else {
        console.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditClick = (customer) => {
    setCustomerToEdit(customer);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (updatedCustomer) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/customers/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCustomer),
      });

      if (response.ok) {
        setCustomers(customers.map(cust => 
          cust.cusId === updatedCustomer.cusId ? updatedCustomer : cust
        ));
        setShowEditModal(false);
      } else {
        console.error('Failed to update customer');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="overflow-x-auto ml-10 mr-10 mt-10">
    <div className="mb-5">
      <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
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
                <Table.Cell className="text-white">{customer.phoneNumber}</Table.Cell>
                <Table.Cell className="flex">
                  <FaEdit className="text-blue-500 mr-3 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleEditClick(customer)} />
                  <FaTrash className="text-red-500 hover:text-blue-700 cursor-pointer text-lg" onClick={() => handleDeleteClick(customer.nic)} />
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

      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this customer?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteCustomer}>
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
        selectedCustomer={customerToEdit}
      />
    </div>
  );
}

export default RegisteredCustomers;
