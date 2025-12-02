import React, { useState, useEffect, useContext ,useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/axios';
import { FaHeart } from 'react-icons/fa';
import { CartContext } from '../../components/ContextCart';
import toast, { Toaster } from 'react-hot-toast';


const Proucts = () => {

      const scrollRef = useRef(null);

    const { increment } = useContext(CartContext)

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(6);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [catProducts, setCatProducts] = useState([]);
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);




    useEffect(() => {
        async function getter() {
            try {

                const response = await api.get(`/product/${id}`)
                // console.log(response.data);
                if (!response.data || response.data === "product not found") {
                    setError('Product not found');
                } else {
                    setProduct(response.data);
                    // console.log(response.data);
                    const prod = response.data;

                    if (prod?.category?.name) {
                        const categoryName = prod.category.name;
                        // console.log(categoryName);

                        const categoryRes = await api.get(`/category/${categoryName}`);
                        console.log(categoryRes);
                        setCatProducts(categoryRes.data);

                        //    const others = (categoryRes.data.products || []).filter((p) => p._id !== id);
                        //      console.log(others);

                    }

                    window.scrollTo({ top: 0, behavior: "smooth" });



                }
            } catch (error) {
                console.log(error);
                setError('failed to fetch')
            } finally {
                setLoading(false)
            }

        }
        getter()
    }, [id])

    const handleCart = async (id) => {
        // console.log("hii");
        async function getter() {
            try {
                const res = await api.get('/auth/check');
                const Authdata = res.data.isAuth
                // console.log(Authdata);

                setAuth(Authdata);

                if (!Authdata) {
                    toast.error('login please')
                    return;
                } else {

                    const response = await api.post('/cart', { productId: id, selectedSize: selectedSize })
                    console.log("kitty", response.data);
                    const data = response.data

                    if (!data.existingItem) {
                        increment()
                    }

                    toast.success("product add to cart")

                }


            } catch (error) {
                console.log(error);
                setAuth(false)

            }
        }
        getter()

    }

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };



    return (

        <div className='mb-[50px]'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-[90%] md:w-[80%] mt-[120px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row p-4 sm:p-6 md:p-8 gap-6">

                <div className="md:w-1/2 w-full flex justify-center items-center">
                    <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full max-h-[380px] sm:max-h-[430px] object-cover object-bottom"
                    />
                </div>

                <div className="md:w-1/2 w-full flex flex-col justify-between">
                    <div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                            {product.name}
                        </h2>

                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                        <div>
                            <hr className="border-gray-300 mb-2" />
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
                                <p className="text-lg font-semibold text-yellow-600">
                                    ₹{product.price?.toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500 line-through">
                                    ₹{(product.price / 0.7)?.toFixed(2)}
                                </p>
                                <span className="text-green-600 font-semibold">30% OFF</span>
                            </div>
                            <p className="text-sm text-gray-500">*Price includes all taxes</p>
                            <hr className="border-gray-300 mt-3 mb-3" />
                        </div>

                        <div className="mb-4">
                            <label className="block font-medium text-gray-700 mb-1">Select Size</label>
                            <div className="flex flex-wrap gap-3">
                                {[6, 7, 8, 9, 10, 11].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 rounded-md border transition-all duration-300 ${selectedSize === s
                                            ? "bg-yellow-500 text-black border-yellow-600"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                            onClick={() => handleCart(product._id)}
                            className="flex-1 bg-[#bdaa8ee1] text-[#433e37e1] font-semibold py-3 rounded-md hover:bg-[#ca9b54e1] transition-all"
                        >
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-[#2b333a] text-[#f4f0eae1] font-semibold py-3 rounded-md hover:bg-[#141b21] transition-all">
                            faviortes
                        </button>
                    </div>
                </div>

            </div>


            <div className="w-full h-auto p-5 mt-10">

                {/* HEADER LINE WITH ARROWS */}
                <div className="flex justify-between items-center px-1 mb-5">
                    <h2 className="text-lg font-thin">You Might Also Like</h2>

                    {/* Scroll Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={scrollLeft}
                            className="w-10 h-10 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-200"
                        >
                            ◀
                        </button>

                        <button
                            onClick={scrollRight}
                            className="w-10 h-10 flex items-center justify-center border rounded-full  text-gray-500 hover:bg-gray-200"
                        >
                            ▶
                        </button>
                    </div>
                </div>

                {/* SCROLL AREA */}
                <div
                    ref={scrollRef}
                    className="flex gap-2 overflow-x-auto px-2 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                >
                    {catProducts.map((p) => (
                        <div
                            key={p._id}
                            onClick={() => navigate(`/product/${p._id}`)}
                            className="flex-shrink-0 w-[200px] bg-white border border-gray-200 
        rounded-sm shadow-sm hover:shadow-lg transition cursor-pointer snap-start"
                        >
                            <img
                                src={`https://shoeboxee.duckdns.org/api${p.image?.startsWith("/uploads/") ? p.image : "/uploads/" + p.image}`}
                                alt={p.name}
                                className="w-full h-[200px] object-cover object-bottom"
                            />
                            <div className="p-2 text-center">
                                <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>

    )
}

export default Proucts