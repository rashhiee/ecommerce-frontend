import React from 'react'

const AdminOrders = () => {


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {/* ===== HEADER ===== */}
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
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-sm">
                        Back
                    </button>
                </div>
            </div>

            {/* ===== ORDERS CONTAINER ===== */}
            <div className="space-y-6">
                {/* === Single Order Card === */}
                <form className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border border-gray-200 p-6">
                    {/* --- Order Header --- */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-4 mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Order ID: <span className="text-blue-600">#ORD-2025-0012</span>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Date: 2025-10-20</p>
                        </div>

                        <div className="mt-3 sm:mt-0">
                            <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full shadow-sm transition">
                                Delivered
                            </span>
                        </div>
                    </div>

                    {/* --- Order Details Grid --- */}
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                        {/* Customer */}
                        <div className="flex flex-col">
                            <h4 className="text-gray-700 font-medium mb-2">Customer</h4>
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 00-3-3.87M4 21v-2a4 4 0 013-3.87m9-7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-gray-800">Muhammed Rashid</p>
                                    <p className="text-sm text-gray-500">rashid@example.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="flex flex-col">
                            <h4 className="text-gray-700 font-medium mb-2">Payment</h4>
                            <p className="text-gray-900 font-semibold">₹2,499</p>
                            <p className="text-sm text-gray-500">Online Payment</p>
                        </div>

                        {/* Shipping Address */}
                        <div className="flex flex-col">
                            <h4 className="text-gray-700 font-medium mb-2">Shipping Address</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                123, MG Road, Kochi, Kerala, 682001
                            </p>
                        </div>
                    </div>

                    {/* --- Editable Status + Button --- */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-3">
                            <label className="text-gray-700 font-medium">Update Status:</label>
                            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                                <option>Pending</option>
                                <option>Processing</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
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

                {/* === No Orders Placeholder === */}
                <div className="text-center text-gray-500 italic py-8">No orders found</div>
            </div>
        </div>

    )
}

export default AdminOrders