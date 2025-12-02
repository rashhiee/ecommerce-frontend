import React, { useEffect } from 'react'
import { useState } from 'react';
import api from './axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { FaArrowLeft } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast';



function Login({ heading, apiEndPoint, apiDirection }) {
   
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
  },[])

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
         localStorage.setItem("isAuth", "true");
         toast.success('login success')
         navigate(apiDirection)
           window.location.reload();

      }
      else if (response.data.message.includes('email')) {
        setEmailError(response.data.message);
        console.log(response.data.message);
      }
      else if (response.data.message.includes('password')) {
        setPasswordError(response.data.message)
        console.log("erroree", response.data.message);

      }
      else {
        if (response.data.message.includes('page')) {
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
    <div className="flex pt-12 justify-center items-center min-h-[100vh] bg-[#e6edf3] relative ">
       <Toaster position="top-center" reverseOrder={false} />
      <button
                onClick={() => navigate('/')}
                type="button"
                className=" absolute top-[100px] left-10 flex items-center text-gray-600 hover:text-blue-600 transition"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>

      <form onSubmit={handleSubmit(handleData)}  className="bg-white p-5 rounded-lg shadow-lg w-120  ">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {heading}
        </h2>


        <div className="mb-8 ">
          <label htmlFor='email' className="block mb-2 font-semibold text-gray-500 text-sm">Email</label>
          <input
            name='email'
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
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b333a]"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}


        </div>


        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-500 text-sm">Password</label>
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
            className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-[#2b333a]"
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
        <div className='flex flex-col gap-5 items-center'>
          <button onClick={handleData} className="w-full bg-[#2b333a] text-white py-2 rounded hover:bg-[#314554] font-semibold">
            Submit
          </button>

          <Link className='text-gray-500 text-sm underline hover:text-black ' to='/register'>singup?</Link>

        </div>

      </form>
    </div>
  );
}



export default Login