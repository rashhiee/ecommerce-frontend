import React, { useState, useEffect } from 'react'
import api from '../../services/axios';
import { useNavigate } from 'react-router-dom';



const AdminOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrder] = useState([]);
    useEffect(() => {
        async function getter() {
            const res = await api.get('/admin/orders')
            console.log(res.data);
            setOrder(res.data)

        }
        getter();
    }, [])

     const  handleSubmit = async (newStatus,id) => {
          const res = await api.put(`/admin/orders/${id}`,{status:newStatus})
          console.log(res.data);
          
     }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Manage Orders</h2>
                    <p className="text-gray-500 mt-1">Track and manage all customer orders efficiently</p>
                </div>

                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-64 shadow-sm"
                    />
                    <button 
                    onClick={() => navigate('/admin/home')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-sm">
                        Back
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {orders && orders.length > 0 ? (
                    orders.map((order, index) => (
                        <form
                            key={index}
                            className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-200 p-6"
                        >
                           
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Order ID: <span className="text-blue-600">#{order._id}</span>
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Date: {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="mt-3 sm:mt-0">
                                    <span
                                        className={`px-3 py-1 text-sm font-medium rounded-full shadow-sm transition ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                           
                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                               
                                <div className="flex flex-col">
                                    <h4 className="text-gray-700 font-medium mb-2">Customer</h4>
                                    <div className="flex items-center gap-3">
                                        <svg
                                            xmlns="https://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-blue-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {order.userId?.name || "User ID: " + order.userId}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {order.address?.email || ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h4 className="text-gray-700 font-medium mb-2">Payment</h4>
                                    <p className="text-gray-900 font-semibold">
                                        ₹{order.totalAmount?.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                                </div>

                              
                                <div className="flex flex-col">
                                    <h4 className="text-gray-700 font-medium mb-2">Shipping Address</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {order.address
                                            ? `${order.address?.address}, ${order.address?.city}, ${order.address?.state}, ${order.address?.pincode}`
                                            : "Address not available"}
                                    </p>
                                </div>
                            </div>

                            
                            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-3">
                                    <label className="text-gray-700 font-medium">Update Status:</label>
                                    <select
                                        onChange={(e)=> handleSubmit(e.target.value,order._id)}
                                        defaultValue={order.orderStatus || "shipped"}
                                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    >
                                        <option>shipped</option>
                                        <option>pending</option>
                                        <option>delivered</option>
                                        <option>placed</option>
                                        <option>cancelled</option>

                                    </select>   
                                </div>

                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4 sm:mt-0 font-medium shadow-sm hover:shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ))
                ) : (
                    <div className="text-center text-gray-500 italic py-8">
                        No orders found
                    </div>
                )}
            </div>

        </div>


    )
}

export default AdminOrders