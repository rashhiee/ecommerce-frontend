import React from 'react'
import { useState } from 'react';
import api from './axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"

function Login({ heading, apiEndPoint, apiDirection }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [session, setSession] = useState('');
  // const [errors ,setErrors] = useState<{email: string , password:string}>({
  //    email : "",
  //    password : ""
  // })

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const handleData = async (e) => {
    // e.preventDefault();

    setPasswordError('');
    setEmailError('');
    setSession('');

    try {
      const response = await api.post(apiEndPoint,
        { email, password }
      )
      console.log(response);
      if (response.data.success) {
        console.log("okkk");

        navigate( apiDirection )
      }
      else if (response.data.message.includes('email')) {
        setEmailError(response.data.message);
        console.log(response.data);
      }
      else if (response.data.message.includes('password')) {
        setPasswordError(response.data.message)
      }
      else {
        if (response.data.message.includes('users')) {
          setSession(response.data.message)
        }
      }

    } catch (err) {
      // console.log(error);

      if (err.response && err.response.data && err.response.data.message) {

        setEmailError(err.response.data.message);

      }
    }



  }

  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-[#e6edf3]">
      <form onSubmit={handleSubmit(handleData)} className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {heading}
        </h2>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email'
              }
            })}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}


        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}

            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
          <p className='text-red-600'>{passwordError}</p>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
          <p className='text-red-600'>{session}</p>
        </div>

        {/* <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div> */}

        <button onClick={handleData} className="w-full bg-[#BFD8Eb] text-black py-2 rounded hover:bg-[#a8cde8] font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
}



export default Login