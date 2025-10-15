import React from 'react'
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import api from '../assets/services/axios';


function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPassError('')
    try {
      const response = await api.post('/signup',
        { email, name, password, Repassword }
      );
      console.log(response);
      if (response.data.success) {
        navigate("/home")
      } else if (response.data.message.includes('email')) {
        setEmailError(response.data.message)
      } else if (response.data.message.includes('password')) {
        setPassError(response.data.message)
      }


    } catch (err) {
      console.log(err);
      
      if (err.response && err.response.data.message) {
        if (err.response.data.message.includes('email')) {
          setEmailError(err.response.data.message);
        }
      }
    }
  }



  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#e6edf3]">
      <form onSubmit={handleData} className="bg-white p-4 rounded-lg shadow-md w-[60vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3d2a09ad]">
          Register
        </h2>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
          <p className='text-red-600 '>{emailError}</p>
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
          <p className='text-red-600 '>{passError}</p>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
          <input
            onChange={(e) => setRepassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
        </div>

        <button type='submit' className="w-full bg-[#BFD8Eb] text-black py-2 rounded hover:bg-[#add0eb] font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}



export default Register