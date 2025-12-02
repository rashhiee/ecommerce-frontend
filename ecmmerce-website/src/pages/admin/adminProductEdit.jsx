import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/axios'
import toast, { Toaster } from 'react-hot-toast'
// import { FaArrowLeft } from 'react-icons/fa'


const AdminProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams()

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    size:[],
    image: ""
  })

  // const [datas, setData] = useState([]);
  const [categ, setCateg] = useState([]);
  const [preview, setPreview] = useState('')

  useEffect(() => {
    async function getter() {

      console.log(" Fetching product from:", `/admin/products/${id}`);
      const response = await api.get(`/admin/product/${id}`)
      console.log("product", response);

      // setData(response.data);
      const product = response.data;

      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category?._id || product.category || "",
        size: Array.isArray(product.size) ? product.size : [],
        image: product.image || "",
      });
      setPreview(product.image || "");
      console.log("prr");

      const responsetwo = await api.get('/admin/category')

      console.log("category", responsetwo);

      setCateg(responsetwo.data)

    }
    getter();
  }, [id])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]))
      console.log("files", files);

    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      form.size.forEach((s) => formData.append("size[]", s));
      formData.append('image', form.image)





      const detail = await api.put(`/admin/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (detail.data.success) {
        toast.success(detail.data.message)
        navigate('/admin/products')
      } else {

        toast.error(detail.data.message)

      }

    } catch (error) {
      console.error(error)
    }
  }





  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            type="button"
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
        </div>

        <form onSubmit={handleData} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
            <input
              value={form.name}
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
              value={form.description}
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
              value={form.price}
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
              value={form.category || ""}
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

          <div className='mb-4'>
            <label className="block font-medium text-gray-700 mb-2">Available Sizes</label>
            <div className='flex flex-wrap gap-3'>
              {[6, 7, 8, 9, 10, 11].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      size: prev.size.includes(s)
                        ? prev.size.filter((item) => item !== s)
                        : [...prev.size, s],
                    }))
                  }
                  className={`px-4 py-2 rounded-md border transition-all duration-300 ${form.size.includes(s)
                    ? "bg-yellow-500 text-black border-yellow-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {form.size.length > 0 && (
              <div className="mt-3 text-sm text-gray-600">
                Selected sizes: {form.size.join(", ")}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Product Image</label>

            {preview && (
              <img
                src={
                  preview.startsWith('blob')
                    ? preview
                    : `import/${preview.startsWith('/uploads/') ? preview : '/uploads/' + preview}`
                }

                alt="preview"
                className="w-32 h-32 object-cover mb-3 border rounded"
              />
            )}

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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminProductEdit