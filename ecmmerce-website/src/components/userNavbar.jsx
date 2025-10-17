import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch,  faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const UserNavbar = () => {
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
                    Products
                </Link>
                <Link to="/category" className="hover:text-[#BFD8Eb]">
                    Category
                </Link>
                <div className="flex items-center border border-black text-black w-[200px] h-[30px] px-2 rounded-[10px]">
                    <FontAwesomeIcon icon={faSearch} className="text-black" />
                    <div className="h-6 w-px bg-black mx-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-black placeholder-gray outline-none flex-1"
                    />
                </div>
            </div>



            <div className="flex justify-end items-center gap-6 w-[30%] mr-10 ">
                <Link to="/help" className="hover:text-[#BFD8Eb]">
                    Help
                    <FontAwesomeIcon icon={faAngleDown} size="sm" />

                </Link>


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

export default UserNavbar
