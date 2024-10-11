import React, { useState, useEffect } from 'react';
import UserService from '../service/UsersService';
import { Link } from 'react-router-dom';



function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Profile Information</h2>
            <p className="text-gray-700 mb-2">
                <span className="font-semibold">Name:</span> {profileInfo.name}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">Email:</span> {profileInfo.email}
            </p>
            {profileInfo.role === "ADMIN" && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
                    <Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
                </button>
            )}
        </div>
    );
}

export default ProfilePage;