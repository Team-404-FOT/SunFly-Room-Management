import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiUserAdd, HiUserGroup,HiClipboardList,HiPlusCircle, HiTable } from "react-icons/hi";
import { useLocation } from 'react-router-dom';

export default function UserSideBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  // Update active item based on current location path
  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  return (
    <Sidebar className='mr-0 h-screen'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Sidebar.Collapse icon={HiUserGroup} label="Customers" active={activeItem.startsWith('/customer')}>
            <Sidebar.Item
              href="/customer/add"
              icon={HiPlusCircle}
              active={activeItem === '/customer/add'}
              onClick={() => setActiveItem('/customer/add')}
            >
              Add
            </Sidebar.Item>
            <Sidebar.Item
              href="/customer/RegisteredCustomers"
              icon={HiClipboardList}
              active={activeItem === '/customer/RegisteredCustomers'}
              onClick={() => setActiveItem('/customer/RegisteredCustomers')}
            >
              Registered
            </Sidebar.Item>
          </Sidebar.Collapse>


          <Sidebar.Collapse icon={HiUserGroup} label="Booking" active={activeItem.startsWith('/booking')}>
            <Sidebar.Item
              href="/booking/add"
              icon={HiPlusCircle}
              active={activeItem === '/booking/add'}
              onClick={() => setActiveItem('/booking/add')}
            >
              Create 
            </Sidebar.Item>
            <Sidebar.Item
              href="/booking/registeredBookings"
              icon={HiClipboardList}
              active={activeItem === '/booking/registeredBookings'}
              onClick={() => setActiveItem('/booking/registeredBookings')}
            >
              Booked Rooms 
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href="/payment"
            icon={HiUserAdd} // Replace with an appropriate icon
            active={activeItem === '/payment'}
            onClick={() => setActiveItem('/payment')}
          >
            Add Payment
          </Sidebar.Item>
          <Sidebar.Item
            href="/Rooms/Addrooms"
            icon={HiUserAdd} // Replace with an appropriate icon
            active={activeItem === '/Rooms/Addrooms'}
            onClick={() => setActiveItem('/Rooms/Addrooms')}
          >
            Add Rooms
          </Sidebar.Item>
          
          
          <Sidebar.Item
            href="/Rooms/RoomManagement"
            icon={HiUserAdd} // Replace with an appropriate icon
            active={activeItem === '/Rooms/RoomManagement'}
            onClick={() => setActiveItem('/Rooms/RoomManagement')}
          >
            Rooms Management
          </Sidebar.Item>
          
          <Sidebar.Item
            href="/profile"
            icon={HiUser}
            active={activeItem === '/profile'}
            onClick={() => setActiveItem('/profile')}
          >
            Profile
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}