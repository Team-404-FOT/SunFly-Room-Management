import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiUserAdd, HiUserGroup, HiTable, HiPlusCircle, HiClipboardList,HiOutlineHome, HiCog, HiPlus, HiCurrencyDollar, HiBookOpen, HiClipboardCheck } from 'react-icons/hi'; 
import { useLocation } from 'react-router-dom';

export default function AdminSideBar() {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

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


          <Sidebar.Collapse icon={HiBookOpen} label="Booking" active={activeItem.startsWith('/booking')}>
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
            <Sidebar.Item
              href="/booking/history"
              icon={HiTable}
              active={activeItem === '/booking/history'}
              onClick={() => setActiveItem('/booking/history')}
            >
              History
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={HiOutlineHome} label="Rooms" active={activeItem.startsWith('/booking')}>
            <Sidebar.Item
              href="/Rooms/RoomManagement"
              icon={HiCog} 
              active={activeItem === '/Rooms/RoomManagement'}
              onClick={() => setActiveItem('/Rooms/RoomManagement')}
            >
              Room Management 
            </Sidebar.Item>
            <Sidebar.Item
              href="/Rooms/Addrooms"
              icon={HiPlus} 
              active={activeItem === '/Rooms/Addrooms'}
              onClick={() => setActiveItem('/Rooms/Addrooms')}
            >
              Create Rooms 
            </Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Item
            href="/payment"
            icon={HiCurrencyDollar} 
            active={activeItem === '/payment'}
            onClick={() => setActiveItem('/payment')}
          >
            Add Payment
          </Sidebar.Item>
          <Sidebar.Item
            href="/payment-history"
            icon={HiUserAdd} 
            active={activeItem === '/payment-history'}
            onClick={() => setActiveItem('/payment-history')}
          >
            Payment History
          </Sidebar.Item>

          <Sidebar.Item
            href="/register"
            icon={HiUserAdd}
            active={activeItem === '/register'}
            onClick={() => setActiveItem('/register')}
          >
            Add User
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/user-management"
            icon={HiUserGroup}
            active={activeItem === '/admin/user-management'}
            onClick={() => setActiveItem('/admin/user-management')}
          >
            Users Management
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