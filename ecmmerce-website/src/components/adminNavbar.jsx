import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,  faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="w-full bg-[#ffffff]  px-6 py-3 flex items-center justify-between shadow-md">
            <div className=" font-mono flex justify-center items-center gap-6 w-[15%] ">
                <Link to={"/"}>
                    <h1 className='text-[#000000ad] text-[30px]'>
                        SHOE BOX
                    </h1>
                </Link>

            </div>

            <div className='flex flex-row gap-8 w-[55%] justify-end'>
                
                <Link to="/product" className="hover:text-[#BFD8Eb]">
                    Dashboard
                </Link>
               
                <Link to="/product" className="hover:text-[#BFD8Eb]">
                    Products
                </Link> 

                <Link to="/category" className="hover:text-[#BFD8Eb]">
                    Category
                </Link>
                   <Link to="/product" className="hover:text-[#BFD8Eb]">
                    orders
                </Link>

                <Link to="/category" className="hover:text-[#BFD8Eb]">
                    users
                </Link>
       
       
            </div>



            <div className="flex justify-end items-center gap-6 w-[30%] mr-10 ">

                <button
                    onClick={() => navigate('/logout')}
                    className="bg-[#BFD8Eb] text-black px-5 py-1 rounded hover:bg-[#BFD8Eb]"
                >
                    Logout
                </button>
             

            </div>

        </nav>
    )
}

export default AdminNavbar
