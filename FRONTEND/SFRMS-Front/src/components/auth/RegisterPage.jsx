import React, { useState } from 'react';
import UserService from '../service/UsersService';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register method from UserService

            const token = localStorage.getItem('token');
            await UserService.register(formData, token);

            // Clear the form fields after successful registration
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '',
                city: ''
            });
            alert('User registered successfully');
            navigate('/admin/user-management');

        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        }
    };

    return (
        <div className="mx-auto bg-slate-100 h-screen p-5">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Register</h1>
            <form className="flex max-w-md flex-col bg-white gap-6 p-8 rounded-lg shadow-md mx-auto" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                        Your password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    />
                </div>

                <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input id="agree" type="checkbox" className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500" />
                    <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                        I agree with the&nbsp;
                        <a href="#" className="text-cyan-600 hover:underline">
                            terms and conditions
                        </a>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;