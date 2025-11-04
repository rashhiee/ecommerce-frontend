import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/axios'
import { FaArrowLeft } from 'react-icons/fa'


const AdminProductAdd = () => {

    const navigate = useNavigate();
    const [categ, setCateg] = useState([])
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        size: [],
        image: ""
    })

    const allSizes = [6, 7, 8, 9, 10, 11];

    useEffect(() => {
        async function getter() {
            const catData = await api.get('/admin/category')
            setCateg(catData.data);
        }
        getter();
    }, [])


    const handleData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('price', form.price);
            formData.append('category', form.category);
            form.size.forEach((s) => formData.append("size[]", s));
            formData.append('image', form.image);

            const response = await api.post('/admin/product', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            console.log(response);
            if (!response.data.success) {
                alert(response.data.messsage)
            }
            else {
                if (response.data.success) {
                    alert(response.data.message)
                    navigate('/admin/products')
                }
            }

        } catch (error) {
            console.error(error);
            alert(" Failed to add category.");
        }
    }


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const toggleSize = (size) => {
        setForm((prev) => {
            if (prev.size.includes(size)) {

                return { ...prev, size: prev.size.filter((s) => s !== size) };
            } else {

                return { ...prev, size: [...prev.size, size] };
            }
        });
    };


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
                    <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
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
                            onChange={handleChange}
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
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium mb-2">Available Sizes</p>
                        <div className="flex flex-wrap gap-2">
                            {allSizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleSize(size)}
                                    className={`px-3 py-1 rounded-full border text-sm font-medium transition ${form.size.includes(size)
                                            ? "bg-yellow-500 text-white border-yellow-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
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

export default AdminProductAdd