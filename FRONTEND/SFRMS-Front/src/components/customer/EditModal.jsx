import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Label } from 'flowbite-react';

function EditModal({ isOpen, onClose, onSubmit, selectedCustomer }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (selectedCustomer) {
      setFirstName(selectedCustomer.firstName || '');
      setLastName(selectedCustomer.lastName || '');
      setNic(selectedCustomer.nic || '');
      setPhoneNumber(selectedCustomer.phoneNumber || '');
    }
  }, [isOpen, selectedCustomer]);

  const handleSubmit = () => {
    const formData = {
      cusId: selectedCustomer.cusId,
      firstName,
      lastName,
      nic,
      phoneNumber,
    };
    onSubmit(formData);
  };

  return (
    <Modal show={isOpen} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Customer</h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="firstName" value="First Name" />
            </div>
            <TextInput
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="lastName" value="Last Name" />
            </div>
            <TextInput
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="nic" value="NIC" />
            </div>
            <TextInput
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="phoneNumber" value="Phone Number" />
            </div>
            <TextInput
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
