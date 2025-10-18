import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/axios';
import { FaArrowLeft, FaPlus } from 'react-icons/fa'

const AdminCategoryPut = () => {

    const { id } = useParams();
    console.log(id);
    
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: ""
    });

    useEffect(() => {
        async function getter() {
            try {
                const detail = await api.get(`/admin/category/${id}`)
                console.log(detail);
                console.log("hii");
                

                setForm(detail.data)
            } catch (error) {
                console.error(error)
            }


        }
        getter();
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleData = async (e) => {
        e.preventDefault();
        try {
            const responce = await api.put(`/admin/category/${id}`, form)
            console.log(responce);
            console.log("helloo");
            if (responce.data.success) {
                
                alert(responce.data.message)
            }else{
                if (!responce.data.success) {
                    alert(responce.data.message)
                }
            }
            
            navigate('/admin/category')

        } catch (error) {
            console.error("Error adding category:", error);
            alert(" Failed to update category.");
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
            <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/admin/category')}
                        type="button"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">Update Category</h2>
                </div>

                {/* Form */}
                <form

                    onSubmit={handleData}
                    method="POST" action="/api/categories" className="space-y-6">
                    {/* Category Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Category Name"
                            required
                            className="peer w-full border border-gray-300 rounded-lg p-3 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-transparent"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-3 top-3 text-gray-500 text-sm 
                  transition-all duration-200
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                  peer-valid:-top-2 peer-valid:text-sm peer-valid:text-blue-600
                  bg-white px-1"
                        >
                            Category Name
                        </label>
                    </div>


                    {/* Description */}
                    <div className="relative">
                        <textarea
                            onChange={handleChange}
                            value={form.description}
                            name="description"
                            rows="3"
                            placeholder="Description"
                            required
                            className="peer w-full border border-gray-300 rounded-lg p-3 bg-transparent 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                  placeholder-transparent resize-none"
                        ></textarea>
                        <label
                            htmlFor="description"
                            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                  peer-valid:-top-2 peer-valid:text-sm peer-valid:text-blue-600
                  bg-white px-1"
                        >
                            Description
                        </label>
                    </div>


                    {/* Image URL */}
                    <div className="relative">
                        <input
                            onChange={handleChange}
                            value={form.image}
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            required
                            className="peer w-full border border-gray-300 rounded-lg p-3 bg-transparent 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                  placeholder-transparent"
                        />
                        <label
                            htmlFor="image"
                            className="absolute left-3 top-3 text-gray-500 text-sm transition-all duration-200
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600
                  peer-valid:-top-2 peer-valid:text-sm peer-valid:text-blue-600
                  bg-white px-1"
                        >
                            Image URL
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={() => navigate('/admin/category')}
                            type="reset"
                            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
                        >
                            <FaPlus /> Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminCategoryPut