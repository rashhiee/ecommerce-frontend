import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/axios'

const AdminProductEdit = () => {
const navigate = useNavigate();
const {id} = useParams()

  const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
    })

    useEffect(() => {
      async function getter() {
        const response = await api.get(`/admin/product${id}`)
        setForm(response.data);
      }
      getter();
    },[])  

   
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleData = async () => {
       try {
            const detail = await api.put(`/admin/products/${id}`)
            console.log(detail);

            if (detail.data.success) {
              alert(detail.data.message)
            }else{
              if (!detail.data.success) {
                alert(detail.data.message)
              }
            }
            
       } catch (error) {
         console.error(error)
       }
    }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            type="button"
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Add New Category</h2>
        </div>

        <form onSubmit={handleData} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              onClick={handleChange}
              name="description"
              rows="4"
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              placeholder="Enter product price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              onChange={handleChange}
              name="category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">select category</option>
              {categ.length > 0 &&
                categ.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))
              }


            </select>
          </div> 


          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Image</label>
            <input
              onChange={handleChange}
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminProductEdit