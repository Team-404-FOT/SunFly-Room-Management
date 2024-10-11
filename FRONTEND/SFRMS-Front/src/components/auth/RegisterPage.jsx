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
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name:" />
                </div>
                <TextInput id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Email:" />
                </div>
                <TextInput id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput id="password" type="password" name="password" value={formData.password} onChange={handleInputChange} required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="role" value="Role:" />
                </div>
                <TextInput id="role" type="text" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter your role" required shadow />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree" className="flex">
                    I agree with the&nbsp;
                    <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                        terms and conditions
                    </Link>
                </Label>
            </div>
            <Button type="submit">Register</Button>
        </form>
    );
}

export default RegisterPage;