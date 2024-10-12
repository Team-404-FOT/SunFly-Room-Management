import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await UsersService.login(email, password);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate('/profile');
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => setError(""), 5000);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen"> {/* Center vertically and horizontally */}
            <form className="flex flex-col gap-4 w-full max-w-md p-6 bg-white shadow-md rounded-md">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput
                        id="email1"
                        type="email"
                        placeholder="name@flowbite.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput
                        id="password1"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    )
}
