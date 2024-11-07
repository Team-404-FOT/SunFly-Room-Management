import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegisterPage';
import UserService from './components/service/UsersService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import Header from './components/common/Header';
import AdminSideBar from './components/sideBars/AdminSideBar';
import UserSideBar from './components/sideBars/UserSidebar';
import AddCustomer from './components/customer/AddCustomer';
import BookRoom from './components/Booking/BookRoom';
import RegisteredCustomers from './components/customer/RegisteredCustomers';
import AddPay from './components/Payment/AddPay';
import BookingDetails from './components/Booking/BookingDetails';
import Addrooms from './components/Rooms/Addrooms';
import RoomManagement from './components/Rooms/RoomManagement';
import { useEffect } from "react";
import PaymentHistory from './components/Payment/PaymentHistory';




function App() {
  const location = useLocation(); // To determine current route

  const removeToken = () => {
    //  removing token 
    localStorage.removeItem('token');
  };

  useEffect(() => {
    // Call removeToken when navigating to /login
    if (location.pathname === '/login') {
      removeToken();
    }
  }, [location]);

  // Define routes where the admin sidebar should appear
  const adminRoutes = [
    "/admin/user-management",
    "/register",
    "/update-user/",
    "/profile",
    "/customer/add",
    "/booking/add",
    "/booking",
    "/payment",
    "/Rooms/Addrooms",
    "/Rooms/RoomManagement",
    "/customer/RegisteredCustomers",
    "/booking/registeredBookings",
    "/payment-history"
  ];

  // Function to check if the current route is an admin route
  const isAdminRoute = adminRoutes.some((route) => location.pathname.startsWith(route));

  // Define routes where the user sidebar should appear
  const userRoutes = ["/profile", "/customer/add", "/booking/add", "/payment", "/Rooms/Addrooms", "/Rooms/RoomManagement", "/customer/RegisteredCustomers", "/booking/registeredBookings","/payment-history"];

  // Function to check if the current route is a user route
  const isUserRoute = userRoutes.some((route) => location.pathname.startsWith(route));

  return (

    <div className="App">
      {/* Conditionally render Header only if not on the LoginPage */}
      {location.pathname !== '/login' && <Header />}
      <div className="flex">
        {/* Conditionally render the admin sidebar */}
        {UserService.adminOnly() && isAdminRoute && <AdminSideBar />}

        {/* Conditionally render the admin sidebar */}
        {UserService.isUser() && isUserRoute && <UserSideBar />}

        {/* Main content area */}
        <div className={`content ${UserService.adminOnly() && isAdminRoute ? 'w-full' : 'w-full'}`}>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/customer/add" element={<AddCustomer />} />
            <Route path="/booking/add" element={<BookRoom />} />
            <Route path="/payment" element={<AddPay />} />
            <Route path="/payment-history" element={<PaymentHistory/>}/>
            <Route path="/Rooms/Addrooms" element={<Addrooms />} />
            <Route path="/Rooms/RoomManagement" element={<RoomManagement />} />
            <Route path="/customer/RegisteredCustomers" element={<RegisteredCustomers />} />
            <Route path="/booking/registeredBookings" element={<BookingDetails />} />

            {/* Admin-only routes */}
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />

              </>
            )}

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default App;