import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-white px-4 py-3 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        
    
        <div className="font-mono flex justify-center items-center w-full sm:w-[15%]">
          <Link to={"/"}>
            <h1 className="text-[#000000ad] text-[32px] xl:text-[32px] lg:text-[28px] md:text-[24px] sm:text-[20px] xs:text-[18px] font-semibold transition-all duration-200">
              SHOE BOX
            </h1>
          </Link>
        </div>

       
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full sm:w-[55%] justify-center sm:justify-end gap-2">
          <div className="flex gap-4 sm:gap-8 justify-center sm:justify-start flex-wrap">
            <Link to="/product" className="hover:text-[#BFD8Eb] text-sm sm:text-base">
              Products
            </Link>
            <Link to="/category" className="hover:text-[#BFD8Eb] text-sm sm:text-base">
              Category
            </Link>
          </div>

      
          <div className="hidden md:flex items-center border border-black text-black w-[200px] h-[30px] px-2 rounded-[10px] mt-1 sm:mt-0">
            <FontAwesomeIcon icon={faSearch} className="text-black" />
            <div className="h-6 w-px bg-black mx-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-black placeholder-gray outline-none flex-1"
            />
          </div>
        </div>

    
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full sm:w-[30%] justify-center sm:justify-end gap-2">
     
          <Link to="/help" className="hidden lg:block hover:text-[#BFD8Eb] text-sm sm:text-base">
            Help
            <FontAwesomeIcon icon={faAngleDown} size="sm" className="ml-1" />
          </Link>

          <div className="flex gap-2 sm:gap-4 justify-center sm:justify-end flex-wrap">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#BFD8Eb] text-black px-5 py-1 rounded hover:bg-[#BFD8Eb] text-sm sm:text-base"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-black px-4 py-0.5 border-2 border-black rounded hover:bg-[#BFD8Eb] text-sm sm:text-base"
            >
              Register
            </button>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
