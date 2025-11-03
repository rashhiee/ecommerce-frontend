import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa';
import { FiShoppingCart } from "react-icons/fi";
import api from '../../services/axios';
import { useNavigate } from 'react-router-dom';


const ShopUser = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false)
    useEffect(() => {
        async function getter() {
            try {
                const responce = await api.get('/api/product')
                // console.log(responce.data);
                setProducts(responce.data)
                setFilteredProducts(responce.data)
                window.scrollTo({ top: 0, behavior: "smooth" });

            } catch (error) {
                setError(true)
                console.log(error);

            }
        }
        getter();

    }, [])

    const handleSearch = async () => {
        if (!search.trim()) {
            setFilteredProducts(products);
            return;
        }


        try {
            const res = await api.post('/api/product/search', { word: search });
            setFilteredProducts(res.data);
        } catch (err) {
            console.error(err);
            setFilteredProducts([]);
        }
    };


    return (
        <div className='mt-[68px]'>

            <div className="w-full bg-[#1f262d] py-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-4">


                    <div className="overflow-hidden  shadow-lg">
                        <img
                            src="/images/jack&jones4.png"
                            alt="Shoe 1"
                            className="w-full h-64  hover:scale-105 transition duration-500"
                        />
                    </div>


                    <div className="overflow-hidden  shadow-lg">
                        <img
                            src="/images/jack&jones1.png"
                            alt="Shoe 2"
                            className="w-full h-64  hover:scale-105 transition duration-500"
                        />
                    </div>

                    <div className="overflow-hidden  shadow-lg">
                        <img
                            src="/images/jack&jones2.png"
                            alt="Shoe 3"
                            className="w-full h-64  hover:scale-105 transition duration-500"
                        />
                    </div>


                    <div className="overflow-hidden  shadow-lg">
                        <img
                            src="/images/jack&jones3.png"
                            alt="Shoe 4"
                            className="w-full h-64  hover:scale-105 transition duration-500"
                        />
                    </div>

                </div>
            </div>

            <div className='w-full flex flex-col gap-3 items-center '>
                <h1 className='font-bold p-1 text-2xl mt-8'>Discover the trending potentials</h1>
                <h1 className=' pb-5 text-sm '>find the perfect piece for your comfort</h1>
                <div className="w-[700px] mb-5 h-[50px] bg-white border border-black rounded-md flex items-center px-3 relative">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full h-full pr-10 outline-none text-gray-700 placeholder-gray-500"
                        onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
                    />
                    <FaSearch onClick={handleSearch} className="absolute right-3 text-gray-500 cursor-pointer" />
                </div>
            </div>

            <div className="w-full bg-gray-50 py-10">
                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Our Products
                    </h2>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-8">
                        {(filteredProducts ?? products)?.length > 0 ? (
                            (filteredProducts ?? products).map((product) => (
                                <div
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    key={product._id}
                                    className="bg-white rounded-sm shadow-md hover:shadow-xl transition duration-300 overflow-hidden hover:scale-105"
                                >
                                    <img
                                        src={product.imageUrl || `http://13.48.178.218/uploads/${product.image}`}
                                        alt={product.name}
                                        className={`w-full h-[220px] object-cover ${product.category ==
                                            "68f76822441ca1795000f0d2" ? "object-bottom" : "object-center"
                                            }`}
                                    />
                                    <div className="p-2 flex flex-col  ">
                                        <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>
                                        {/* <p className="text-gray-500 text-xs mt-1 truncate">{product.description}</p> */}
                                        <div className="flex items-center justify-between mt-3">
                                            <p className="text-black font-semibold text-sm">₹{product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center  text-gray-800 text-lg font-medium mt-10">
                                No products found
                            </div>
                        )}

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ShopUser