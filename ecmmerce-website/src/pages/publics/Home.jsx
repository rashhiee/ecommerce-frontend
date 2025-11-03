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

      const res = await api.get(`/api/category/${category}`)
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
        className="relative mt-[66px] w-full h-screen bg-cover bg-center bg-no-repeat"

        style={{ backgroundImage: "url('/images/mainpage.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 flex items-center justify-start h-full px-10 md:px-20">
          <div className="max-w-md text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Step Into Style</h1>
            <p className="text-lg md:text-xl mb-6">
              Discover the latest trends and timeless classics — all in one place.
            </p>
            <button className="bg-[#2b333a] text-white px-6 py-2 rounded-lg hover:bg-[#2c89a6] transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className='bg-white w-full h-auto p-12 flex justify-center'>
        <div className='flex flex-col gap-5  items-center'>
          <h1 className='font-bold p-1 text-2xl'> Trending now </h1>
          <div className="flex w-full gap-2 p-2 h-[500px]">
            <img
              src="/images/vans3.png.png"
              alt="Image 1"
              className="w-1/3 h-full "
            />
            <img
              src="/images/vans4.png.png"
              alt="Image 2"
              className="w-1/3 h-full "
            />
            <img
              src="/images/vans2.png.png"
              alt="Image 3"
              className="w-1/3 h-full "
            />
          </div>


          <div className='w-auto h-auto   px-6 bg-[#e8e2d9e1] rounded-[8px] flex justify-between items-center'>
            {['men', 'women', 'kids'].map((cat) => (
              <div
                key={cat}
                onClick={() => handleClick(cat)}
                className={`py-3 px-6 rounded-[6px] cursor-pointer transition ${selectedCategory === cat
                  ? 'bg-[#e9e4dde1] text-white'
                  : 'hover:bg-[#f4f0eae1]'
                  }`}
              >
                <p className='font-medium capitalize'>{cat}</p>
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
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {products.slice(0, 8).map((p) => (
                <div
                  onClick={() => navigate(`/product/${p._id}`)}
                  key={p._id}
                  className="bg-white shadow-md rounded-sm overflow-hidden hover:scale-105 transition"
                >
                  <img
                    src={`http://13.48.178.218/uploads/${p.image}`}
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

      <div className='bg-black w-full py-5 flex gap-5 justify-center items-center text-white mt-10'>

        <p>Be the first to know about new arrivals</p>
        <button
          onClick={() => navigate('/register')}
          className='px-5 py-4 bg-red-600 font-mono rounded-md'>Signup</button>

      </div>

    </div>


  )
}

export default HomePage