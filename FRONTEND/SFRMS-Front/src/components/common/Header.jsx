import React from 'react'
import { Navbar, Button } from 'flowbite-react'
import Logo from '../../assets/300x300.png'

export default function Header() {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

  const handleLogout = () => {
    // Add your logout logic here, e.g., removing token and redirecting
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SunFly Room Booking System</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {isAuthenticated && (
          <Button className=' bg-sky-600' onClick={handleLogout}>Log Out</Button> // Show only if logged in
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
