import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,  faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="w-full bg-[#f1f1f2]  px-6 py-3 flex items-center justify-between shadow-md">
            <div className=" font-mono flex justify-center items-center gap-6 w-[15%] ">
                <Link to={"/"}>
                    <h1 className='text-[#00000] text-[30px]'>
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
                    onClick={() => navigate('/logout')}
                    className="bg-[#BFD8Eb] text-white px-5 py-1 rounded hover:bg-[#BFD8Eb]"
                >
                    Logout
                </button>
             

            </div>

        </nav>
    )
}

export default AdminNavbar
