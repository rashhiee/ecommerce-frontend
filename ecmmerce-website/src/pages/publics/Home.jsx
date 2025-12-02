import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../services/axios'
import { useNavigate } from 'react-router-dom'
// import { faSearch,  } from "@fortawesome/free-solid-svg-icons";
import { FaSearch } from 'react-icons/fa';



const HomePage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('men')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const fetchProducts = async (category) => {
    try {

      setLoading(true)
      setError(null)

      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await api.get(`/category/${category}`)
      setProducts(res.data || [])
      // console.log("products",res.data);

    } catch (err) {
      console.error(err)
      setError('Failed to load products')
    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(selectedCategory)
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCategory])

  const handleClick = (cat) => {
    setSelectedCategory(cat);
  }

  const handleShowAll = () => {
    navigate("/product/:name")
  }


  return (
    <div className='w-full h-auto '>
      <div
        className="relative mt-[60px] w-full h-[60vh] sm:h-[70vh] md:h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/mainpage.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 flex items-center justify-center md:justify-start h-full px-4 sm:px-8 md:px-20">
          <div className="max-w-md sm:max-w-lg text-center md:text-left text-white">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">Step Into Style</h1>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              Discover the latest trends and timeless classics — all in one place.
            </p>
            <button className="bg-[#2b333a] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-[#2c89a6] transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white w-full h-auto py-12 flex justify-center">
        <div className="flex flex-col gap-8 w-full max-w-7xl items-center px-4">

          <h1 className="font-bold text-2xl">Find Your Perfect Fit</h1>

          {/* Images */}
          <div className="flex flex-col sm:flex-row w-full ">

            <img
              src="/images/pintu5.jpg"
              alt="Image 1"
              className="
          w-full sm:w-1/3 object-cover 
          h-[240px] 
          sm:h-[350px] 
          lg:h-[380px] 
          xl:h-[450px] 
          2xl:h-[550px]
        "
            />

            <img
              src="/images/pintu8.jpg"
              alt="Image 2"
              className="
          w-full sm:w-1/3 object-cover 
          h-[240px] 
          sm:h-[350px] 
          lg:h-[380px] 
          xl:h-[450px] 
          2xl:h-[550px]
        "
            />

            <img
              src="/images/pintu9.jpg"
              alt="Image 3"
              className="
          w-full sm:w-1/3 object-cover 
          h-[240px] 
          sm:h-[350px] 
          lg:h-[380px] 
          xl:h-[450px] 
          2xl:h-[550px]
        "
            />
          </div>

          {/* Category Buttons */}
          <div className="flex gap-3 px-6 py-2 bg-[#e8e2d9e1] rounded-[8px]">
            {['men', 'women', 'kids'].map((cat) => (
              <div
                key={cat}
                onClick={() => handleClick(cat)}
                className={`py-3 px-6 rounded-[6px] cursor-pointer transition 
            ${selectedCategory === cat
                    ? 'bg-[#2b333a] text-white'
                    : 'hover:bg-[#f4f0eae1]'
                  }`}
              >
                <p className="font-medium capitalize">{cat}</p>
              </div>
            ))}
          </div>

        </div>
      </div>



      <div className="w-full max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : Array.isArray(products) && products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {products.slice(0, 8).map((p) => (
                <div
                  onClick={() => navigate(`/product/${p._id}`)}
                  key={p._id}
                  className="bg-white shadow-md rounded-sm overflow-hidden hover:scale-105 transition"
                >
                  <img
                    src={`${import.meta.env.VITE_IMAGE_URL}${p.image}`}
                    alt={p.name}
                    className={`w-full h-[220px] object-cover ${p.category.name == "men" ? "object-bottom" : "object-center"
                      }`}
                  />
                  <div className="p-2 flex flex-col gap-2 items-center ">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {/* <p className="text-gray-700 hidden ">{p.description}</p> */}
                    <p className="text-gray-700">₹{p.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {products.length > 8 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleShowAll}
                  className="px-6 py-2 bg-[#000000] text-white rounded hover:bg-[#353636]"
                >
                  Show All
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500 py-10">
            No products found for {selectedCategory}.
          </p>
        )}
      </div>

      <div className='bg-black w-full py-5 flex flex-col sm:flex-row gap-5 justify-center items-center text-white mt-10'>

        <p>Be the first to know about new arrivals</p>
        <button
          onClick={() => navigate('/register')}
          className='px-5 py-4 bg-red-600 font-mono rounded-md'>Signup</button>

      </div>

    </div>


  )
}

export default HomePage