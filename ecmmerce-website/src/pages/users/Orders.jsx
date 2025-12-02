import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../components/ContextCart';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const Orders = () => {
    const {decrement} = useContext(CartContext)
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        payment : ""
    })

    useEffect(() => {
        async function Getter() {
            const res = await api.get('/cart')
            console.log(res.data);
            setCart(res.data);
        }
        Getter();
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form , [e.target.name]:e.target.value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
       const res = await api.post('/order',{address:form} )
       toast.success("order placed successfully")
       navigate('/order/details', { state: { order: res.data.order } })
       decrement();
        console.log("vanuu",res.data);
       } catch (error) {
         console.log(error)
         toast.error("some error ocuured")
       }
    }




    return (

        <div className="mt-[75px] min-h-screen bg-gray-50 flex flex-col justify-center items-start py-10 px-4">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="text-2xl font-semibold text-[#982020] mb-6 border-b pb-3">
                Secure Checkout
            </h1>
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                        Proceed to Checkout
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    <textarea
                        onChange={handleChange}
                        name="address"
                        placeholder="Address"
                        className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        rows="3"
                        required
                    ></textarea>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="city"
                            placeholder="City"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="state"
                            placeholder="State"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            onChange={handleChange}
                            type="text"
                            name="country"
                            placeholder="Country"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                        <input
                            onChange={handleChange}
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                            required
                        />
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Payment Method
                        </h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 text-gray-700">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    name="payment"
                                    value="bank transfer"
                                    className="w-4 h-4 accent-blue-500"
                                    required
                                />
                                Credit / Debit Card
                            </label>
                            <label className="flex items-center gap-3 text-gray-700">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    name="payment"
                                    value="cash on delivery"
                                    className="w-4 h-4 accent-blue-500"
                                />
                                Cash on Delivery
                            </label>
                            <label className="flex items-center gap-3 text-gray-700">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    name="payment"
                                    value="UPI"
                                    className="w-4 h-4 accent-blue-500"
                                />
                                UPI / Net Banking
                            </label>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <button
                            type="submit"
                            className="w-full bg-[#2b333a] hover:bg-[#4e5a65] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
                        >
                            Proceed Order
                        </button>
                    </div>
                </form>


                <div className="flex flex-col gap-6">

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <p>Subtotal</p>
                            <p>₹{cart.totalAmount}</p>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <p>Shipping</p>
                            <p className="text-green-600 font-medium">Free</p>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-gray-900 mt-4 border-t pt-4">
                            <p>Total</p>
                            <p>₹{cart.totalAmount}</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Products</h3>
                        <div className="space-y-4">
                            {cart?.items?.length > 0 ? (
                                cart.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border-b pb-3 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item?.productId?.image ? `${import.meta.env.VITE_IMAGE_URL}${item.productId.image}` : "https://via.placeholder.com/60"}
                                                alt={item?.productId?.name || "Product"}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {item?.productId?.name}
                                                </p>
                                                {item?.selectedSize && (
                                                    <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                                                )}
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800">
                                                ₹{item?.productId?.price?.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Total: ₹{(item?.productId?.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-6">No products in your cart.</p>
                            )}
                        </div>
                    </div>



                    <div className="text-center text-gray-500 text-sm pt-6 border-t">
                        © 2025 YourStore. All rights reserved.
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Orders