// import React from 'react'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch,  faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from '../services/axios';
import toast, { Toaster } from 'react-hot-toast';


export const AdminNavbar = () => {
    const navigate = useNavigate();
    
       async function handleLogout() {
     const res = await api.post('/logout')
     toast.success(res.data.message)
     navigate('/admin/login')
  }
    return (
        <nav className="w-full bg-[#f1f1f2]  px-6 py-3 flex items-center justify-between shadow-md">
            <Toaster position="top-center" reverseOrder={false} />
            <div className=" font-mono flex justify-center items-center gap-6 w-[15%] ">
                <Link to={"/"}>
                    <h1 className='text-[#00000] text-2xl'>
                        SB
                    </h1>
                </Link>

            </div>

            <div className='flex flex-row gap-8 w-[55%] justify-end'>
                
                <Link to="/admin/home" className="hover:text-[#BFD8Eb]">
                    Dashboard
                </Link>
               
                <Link to="/admin/products" className="hover:text-[#BFD8Eb]">
                    Products
                </Link> 

                <Link to="/admin/category" className="hover:text-[#BFD8Eb]">
                    Category
                </Link>
                <Link to="/admin/users" className="hover:text-[#BFD8Eb]">
                    users
                </Link>
                   <Link to="/admin/orders" className="hover:text-[#BFD8Eb]">
                    orders
                </Link>

       
       
            </div>



            <div className="flex justify-end items-center gap-6 w-[30%] mr-10 ">

                <button
                    onClick={handleLogout}
                    className=" text-black border-2 rounded-lg px-5 py-1 border-gray-600 hover:bg-[#e3d788]"
                >
                    Logout
                </button>
             

            </div>

        </nav>
    )
}

export default AdminNavbar
