import React from "react";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../../services/axios";

const AdminCategory = () => {

  const [category, setCategory] = useState([])

  useEffect(() => {
    async function fetcData() {

      const response = await api.get('/admin/category',)
      console.log(response);
      setCategory(response.data)
    }

    fetcData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 flex flex-col items-center">

      {/* Header */}

      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Categories
        </h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Table */}

      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-x-auto animate-fade-in">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-100 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">No.</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Category Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((cate, index) => (
                <tr
                  key={cate._id || index}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-gray-600">{index + 1}</td>

                  <td className="px-6 py-4">
                    <img
                      src={cate.image || "https://via.placeholder.com/50"}
                      alt={cate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">{cate.name}</td>

                  <td className="px-6 py-4 text-gray-600">{cate.description}</td>

                  <td className="px-6 py-8 text-right flex items-center justify-end gap-3">
                    <button className="text-white rounded-sm py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-all">
                      Edit
                    </button>
                    <button className="text-white rounded-sm py-2 px-4 bg-red-600 hover:bg-red-700 transition-all">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-gray-500 text-sm"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminCategory;
