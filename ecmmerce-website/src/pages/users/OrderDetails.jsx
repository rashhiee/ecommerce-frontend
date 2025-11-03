import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/axios";


const OrderSuccess = () => {
    const [showData, setShowData] = useState(false);
    const [order, setOrder] = useState([])


    const location = useLocation();
    const navigate = useNavigate();

    const orderState = location.state?.order
    console.log("the order", orderState);



    useEffect(() => {
        if (orderState) {
            setOrder([orderState]);
            setShowData(true)
            const timer = setTimeout(() => setShowData(false), 5000);
            return () => clearTimeout(timer);

        } else {
            latestOrder();
        }

    }, []);

    const latestOrder = async () => {
        try {
            const res = await api.get("/api/orders");
            setOrder(res.data);
            console.log("users", res.data);

        } catch (err) {
            console.error("Failed to fetch order:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
        
            {showData && (
                <div className="bg-white shadow-2xl rounded-2xl p-8 text-center animate-fadeIn w-full max-w-md mb-10">
                    <h1 className="text-3xl font-bold text-green-500 mb-4 animate-pulse">
                         Thank You for Your Purchase!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Your order has been placed successfully. We’ll send you a confirmation email shortly.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}

           
            <h2 className="  mt-[80px] text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-gray-500 pb-2 w-full max-w-6xl text-center">
                {order.length > 1 ? "Your Orders" : "Order Details"}
            </h2>

          
            {order.length === 0 ? (
                <p className="text-gray-600 text-lg">Loading your orders...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {order.map((ord, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-transform duration-300 border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold text-blue-700 mb-2 truncate">
                                Order ID: <span className="text-gray-600 font-normal">{ord._id}</span>
                            </h3>
                            <p className="text-gray-700 mb-1">
                                <strong>Total:</strong> ₹{ord.totalAmount}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <strong>Payment:</strong> {ord.paymentMethod}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Status:</strong>{" "}
                                <span className={`font-semibold ${ord.orderStatus === "placed" ? "text-green-600" : "text-red-500"}`}>
                                    {ord.orderStatus}
                                </span>
                            </p>

                            <h4 className="font-semibold text-gray-800 mt-4 mb-1">Shipping:</h4>
                            <p className="text-gray-700 text-sm mb-4">
                                {ord.address?.firstName} {ord.address?.lastName},<br />
                                {ord.address?.address}, {ord.address?.city}, {ord.address?.state},{" "}
                                {ord.address?.country} - {ord.address?.pincode}
                            </p>

                            <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
                            <ul className="divide-y text-sm">
                                {ord.items?.map((item, i) => (
                                    <li key={i} className="py-1 flex justify-between">
                                        <span>{item.productId?.name}</span>
                                        <span>x{item.quantity}</span>
                                        <span>₹{item.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            <footer className="mt-16 w-full max-w-6xl text-center py-6 border-t border-gray-300 text-gray-500">
                © SHOE BOX. All rights reserved.
            </footer>
        </div>
    );
};

export default OrderSuccess;
