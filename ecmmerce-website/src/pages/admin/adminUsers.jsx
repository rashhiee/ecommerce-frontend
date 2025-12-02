import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowLeft , FaUsers } from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'
import api from '../../services/axios'


useNavigate

const AdminUsers = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState([]);


    useEffect(() => {
        async function getter() {
            try {
                const UserData = await api.get('/admin/users')
                console.log(UserData);
                setForm(UserData.data);
            } catch (error) {
                console.error(error)
            }

        }
        getter();
    }, []);

    const handleActive = async (id, newStatus) => {
        try {
            const change = await api.put(`/admin/users/${id}`, { status: newStatus })
            setForm(prev =>
                prev.map(u => (u._id === id ? { ...u, status: newStatus } : u))
            );

        } catch (error) {
            console.error(error)
        }cr

    }



    return (

        <div className=" bg-gray-50 min-h-screen p-12 ">

            {/* <Toaster position="top-center" reverseOrder={false} /> */}

         
        
           <div className='border border-gray-400 shadow-sm hover:shadow-md transition-all rounded-lg '>

         
            
            <div className='p-7 flex  items-center gap-5 '>
                <FaUsers size={36} />
                <h1 className='text-3xl font-bold' >  Users Management</h1>
            </div>

            <div className="flex items-center justify-start gap-10 mb-4 p-6">
                <button
                    onClick={() => navigate('/admin/home')}
                    type="button"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
                <div className="flex items-center w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>
           

            <div className="overflow-x-auto bg-white rounded-lg shadow m-10  ">
                <table className="w-full text-left border-collapse ">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-700">Customer</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">User ID</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Join Date</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 font-semibold text-gray-700 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {form.length > 0 ? (
                            form.map((user, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <svg
                                            xmlns="https://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-gray-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-medium text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-gray-700">{user._id}</td>
                                    <td className="px-6 py-4 text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-sm font-medium rounded-full ${user.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        {
                                            user.status === "active" ? (
                                                <button onClick={() => handleActive(user._id, "inactive")} className="text-green-600 hover:text-green-800 mr-2">
                                                    <svg
                                                        xmlns="https://www.w3.org/2000/svg"
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </button>

                                            ) : (
                                                <button onClick={() => handleActive(user._id, "active")} className="text-red-500 hover:text-red-700">
                                                    <svg
                                                        xmlns="https://www.w3.org/2000/svg"
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.953 9.953 0 012.241-3.597m3.757-2.312A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.053 5.092M15 12a3 3 0 00-4.243-2.829M3 3l18 18"
                                                        />
                                                    </svg>
                                                </button>
                                            )
                                        }


                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
           </div>  
         
        </div>

    )
}

export default AdminUsers