import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/axios'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { CartContext } from '../../components/ContextCart';


const Cart = () => {

    const {decrement} = useContext(CartContext)
    const [cart, setCart] = useState({});
    const [render, setRender] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getter() {
            try {
                const res = await api.get('/api/cart')
                // console.log(res.data);
                setCart(res.data);
                // console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getter()



    }, [render])


    const changeQty = (productId, delta) => {
        setCart((prevCart) => {
            const updatedItems = prevCart.items
                .map((item) => {
                    if (item.productId._id === productId) {
                        const newQty = Math.max(item.quantity + delta, 0);
                        return { ...item, quantity: newQty };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);

            const newTotal = updatedItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );

            return {
                ...prevCart,
                items: updatedItems,
                totalAmount: newTotal,
            };
        });
    };



    const deleteItem = async (id) => {

        // console.log(id);
        const deleted = await api.delete(`/api/cart/${id._id}`)
        setCart(deleted.data);
        alert(deleted.data.message);
        setRender(true)
        decrement();

    };


    const handleProceed = async () => {
        console.log("this is checkrout", cart);

        if (cart.items?.length === 0) {
            alert("Cart is empty!");
        }

        try {
            const res = await api.put("/api/carts", cart);
            console.log(cart);

            navigate("/orders");
        } catch (error) {
            console.log(error)
        }

    };

    

    return (

        <div className="min-h-screen mt-[70px] bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                    <p className="text-gray-600 mt-2">
                        {cart.items?.length || 0} items in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-4">
                        {cart.items?.length > 0 ? (
                            cart.items.map((item) => (
                                <div
                                    key={item.productId._id}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`http://13.48.178.218/uploads/${item.image || "placeholder.jpg"}`}
                                                    alt={item.productId.name || "Product"}
                                                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {item.productId.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-3">
                                                    Price: ₹{item.price}
                                                </p>

                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-medium text-gray-700">Qty:</span>
                                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                        <button
                                                            onClick={() =>
                                                                changeQty(item.productId._id, - 1)
                                                            }
                                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                                                        >
                                                            <FaMinus className="text-gray-700" />
                                                        </button>

                                                        <span className="w-12 h-10 flex items-center justify-center font-medium border-x border-gray-300">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => changeQty(item.productId._id, 1)}
                                                            className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
                                                        >
                                                            <FaPlus className="text-gray-700" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-between">
                                                <button
                                                    onClick={() => deleteItem(item.productId)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                                                >
                                                    <FaTrash className="w-5 h-5" />
                                                </button>
                                                <p className="text-xl font-bold text-gray-900">
                                                    ₹{item.price * item.quantity}
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Your cart is empty.</p>
                        )}

                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium">₹{cart.totalAmount}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span className="font-medium">Included</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-gray-900 text-lg font-bold">
                                        <span>Total</span>
                                        <span>₹{cart.totalAmount}</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleProceed} className="w-full bg-[#2b333a] hover:bg-[#394148] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                                Proceed to Checkout
                            </button>

                            <button onClick={() => navigate('/shop')} className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart