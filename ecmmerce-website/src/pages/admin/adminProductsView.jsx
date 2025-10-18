import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/axios'
import { FaArrowLeft, FaPlus } from 'react-icons/fa'
import { motion } from "framer-motion";




const AdminProductsView = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState("");

    useEffect(() => {
        async function getter() {
            const responce = await api.get('/admin/product')
            console.log(responce);
            setProduct(responce.data)

        }
        getter();
    }, [])

    return (
        <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Product List
        </h1>
        <button
          onClick={() => navigate("/admin/product/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Table */}
      <motion.div
        className="w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100 border-b text-gray-700">
              <tr>
                <th className="p-3 text-left border-r font-semibold">No.</th>
                <th className="p-3 text-left border-r font-semibold">Image</th>
                <th className="p-3 text-left border-r font-semibold">Product Name</th>
                <th className="p-3 text-left border-r font-semibold">Description</th>
                <th className="p-3 text-left border-r font-semibold">Category</th>
                <th className="p-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 ? (
                product.map((p, index) => (
                  <motion.tr
                    key={p._id}
                    className="border-b hover:bg-gray-50 transition"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="p-3 border-r text-gray-700">{index + 1}</td>
                    <td className="p-3 border-r">
                      {p.image ? (
                        <img
                          src={`http://localhost:3030${p.image}`}
                          alt={p.name}
                          className="w-24 h-[80px] rounded-lg  shadow-sm"
                        />
                      ) : (
                        <div className="text-gray-400 italic">No image</div>
                      )}
                    </td>
                    <td className="p-3 border-r font-medium text-gray-800">{p.name}</td>
                    <td className="p-3 border-r text-gray-600">{p.description}</td>
                    <td className="p-3 border-r text-gray-700">
                      {p.category?.name || "No category"}
                    </td>
                    <td className="px-6 py-8 text-right flex items-center justify-end gap-3">
                      <button
                       onClick={() => navigate(`/admin/product/${p._id}`)}
                       className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>


    )
}

export default AdminProductsView

// {
//     p.image ? (
//         <img
//             src={p.image ? `http://localhost:3030${p.image}` : "https://via.placeholder.com/50"}
//             alt={p.name}
//             className="w-20 h-20 rounded"
//         />

//     ) : (
//         "No image"
//     )
// }