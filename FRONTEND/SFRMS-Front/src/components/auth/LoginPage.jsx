import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Carousel,
  Modal,
} from "flowbite-react";
import image4 from "../../assets/ss4.jpeg";
import image5 from "../../assets/ss5.jpeg";
import image6 from "../../assets/ss6.jpeg";
import Logo from "../../assets/300x300.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await UsersService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/profile");
      } else {
        setError(userData.message);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setShowModal(true);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Carousel */}
      <div className="w-1/2 h-screen hidden lg:flex justify-center items-center bg-gray-100">
        <div className="w-full h-full">
          <Carousel slide={true}>
            <img src={image4} alt="Slide 4" />
            <img src={image5} alt="Slide 5" />
            <img src={image6} alt="Slide 6" />
          </Carousel>
        </div>
      </div>

      {/* Right side: Login form */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <form className="flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded-md">
          <img src={Logo} alt="logo" className="w-40 h-40 mx-auto" />
          <h1 className="text-2xl font-semibold text-center mb-10">
            Room Management System
          </h1>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@example.com"
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="show-password">Show password</Label>
          </div>

          <Button
            className="bg-sky-500 hover:bg-sky-600"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>

      {/* Modal for Login Error */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Login Failed</Modal.Header>
        <Modal.Body>
          <p className="text-base text-gray-600">
            Please enter correct email and password.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
