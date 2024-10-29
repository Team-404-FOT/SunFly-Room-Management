import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiUserAdd, HiUserGroup, HiTable,HiPlusCircle,HiClipboardList  } from "react-icons/hi";
import { useLocation } from 'react-router-dom';

export default function AdminSideBar() {
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
    icon={HiClipboardList }
    active={activeItem === '/customer/RegisteredCustomers'}
    onClick={() => setActiveItem('/customer/RegisteredCustomers')}
  >
    Registered
  </Sidebar.Item>
</Sidebar.Collapse>


          <Sidebar.Item
            href="/booking"
            icon={HiUserAdd}
            active={activeItem === '/booking'}
            onClick={() => setActiveItem('/booking')}
          >
            Booking
          </Sidebar.Item>

          <Sidebar.Item
            href="/payment"
            icon={HiUserAdd} // Replace with an appropriate icon
            active={activeItem === '/payment'}
            onClick={() => setActiveItem('/payment')}
          >
            Add Payment
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
          <Sidebar.Item
            href="/signup"
            icon={HiTable}
            active={activeItem === '/signup'}
            onClick={() => setActiveItem('/signup')}
          >
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}