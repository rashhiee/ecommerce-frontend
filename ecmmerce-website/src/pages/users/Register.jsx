import React from 'react'
import { useState ,useEffect} from 'react';
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/axios';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa'


function Register() {
 
   useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    },[])

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [Repassword, setRepassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");


  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();


  const handleData = async (e) => {
    // e.preventDefault();
    setEmailError('');
    setPassError('')
    try {
      const response = await api.post('/signup',
        { email, name, password, Repassword }
      );
      console.log(response);
      if (response.data.success) {
        navigate("/")
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
    <div className=" mt-[60px]  pt-5 flex justify-center items-center min-h-[100vh] bg-[#e6edf3]">

      <button
        onClick={() => navigate('/')}
        type="button"
        className=" absolute top-[100px] left-10 flex items-center text-gray-600 hover:text-blue-600 transition"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <form onSubmit={handleSubmit(handleData)} className="bg-white p-4 rounded-lg shadow-md w-[65vh]">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Register
        </h2>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-500 text-sm">Email</label>
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
          <p className='text-red-600 '>{emailError}</p>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-500 text-sm">Name</label>
          <input
            {...register('name', {
              required: 'name is required'
            })}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#BFD8Eb]"
          />
          {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
        </div>


        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-500 text-sm">Password</label>
          <input
            {...register('password', {
              required: 'password is required',
              minLength: {
                value: 6,
                message: 'Password must be contain 6 characters'
              }
            })}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b333a]"
          />
          <p className='text-red-600 '>{passError}</p>
          {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-500 text-sm">Confirm Password</label>
          <input
            {...register('Repassword', {
              required: 'Repassword is required',
              minLength: {
                value: 6,
                message: 'Repassword must be contain 6 characters'
              }
            })}
            onChange={(e) => setRepassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b333a]"
          />
          {errors.Repassword && <p className='text-red-600'>{errors.Repassword.message}</p>}
        </div>

        <div className='flex flex-col gap-5 items-center'>
          <button onClick={handleData} className="w-full bg-[#2b333a] text-white py-2 rounded hover:bg-[#314554] font-semibold">
            Submit
          </button>

          <Link className='text-gray-500 text-sm underline hover:text-black ' to='/login  '>login?</Link>

        </div>
      </form>
    </div>
  );
}



export default Register