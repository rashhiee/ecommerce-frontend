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

      const res = await api.get(`/product/${category}`)
      setProducts(res.data || [])
      console.log(res.data);

    } catch (err) {
      console.error(err)
      setError('Failed to load products')
    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(selectedCategory)
  }, [selectedCategory])

  const handleClick = (cat) => {
    setSelectedCategory(cat);
  }

  const handleShowAll = () => {
    navigate("/product/:name")
  }


  return (
    <div className='w-full h-auto'>
      <div
        className="relative mt-[68px] w-full h-screen bg-cover bg-center bg-no-repeat"

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
        <div className='flex flex-col  items-center'>
          <h1 className='font-bold p-1 text-2xl'>Discover the trending potentials</h1>
          <h1 className=' pb-5 text-sm '>find the perfect piece for your comfort</h1>
          <div className="w-[700px] mb-5 h-[50px] bg-white border border-black rounded-md flex items-center px-3 relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full pr-10 outline-none text-gray-700 placeholder-gray-500"
            />
            <FaSearch className="absolute right-3 text-gray-500 cursor-pointer" />
          </div>


          <div className='w-auto h-auto  px-6 bg-[#e8e2d9e1] rounded-[8px] flex justify-between items-center'>
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
                  key={p._id}
                  className="bg-white shadow-md rounded-sm overflow-hidden hover:scale-105 transition"
                >
                  <img
                    src={`http://localhost:3030/uploads/${p.image}`}
                    alt={p.name}
                    className="w-full h-48 hover:object-cover"
                  />
                  <div className="p-4 flex flex-col gap-2 items-center ">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-gray-700 hidden ">{p.description}</p>
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
    </div>


  )
}

export default HomePage