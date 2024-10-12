import React, { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { HiUser, HiUserAdd, HiUserGroup, HiTable } from "react-icons/hi";
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