import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UsersService';
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";


function UpdateUser() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [openModal, setOpenModal] = useState(true);


    const onCloseModal = () => {
        setOpenModal(false);
        navigate("/profile")
    };
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '',
        password: ''
    });

    useEffect(() => {
        fetchUserDataById(userId); // Pass the userId to fetchUserDataById
    }, [userId]); //wheen ever there is a chane in userId, run this

    const fetchUserDataById = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
            const { name, email, role } = response.ourUsers;
            setUserData({ name, email, role, password: ''});
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmDelete = window.confirm('Are you sure you want to update this user?');
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                const res = await UserService.updateUser(userId, userData, token);
                console.log(res)
                // Redirect to profile page or display a success message
                navigate("/profile")
            }

        } catch (error) {
            console.error('Error updating user profile:', error);
            alert(error)
        }
    };

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Update User</h2>
                <div className="auth-container max-w-md mx-auto bg-white rounded-lg mt-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">Role:</label>
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                disabled={userData.role === 'ADMIN'}  // Freeze for ADMIN
                            >
                                <option value="">Select Role</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-sky-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Update
                        </button>
                    </form>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default UpdateUser;