import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../services/axios";
import Login from "../services/login";

const Navbar = () => {
  const [auth,setAut] =useState(false)
  useEffect(() => {
    async function getter() {
      const res = await api.get('/auth/check')
      console.log("value ",res);
      setAut(res.data.isAuth);

      
    }
    getter();
  },[])
  const navigate = useNavigate();
  
  //  async function handleLogout() {
  //    const res = await api.
  // }

  return (
    <nav className="w-full bg-[#f4f0eae1] text-[#2b333a] px-6 py-3 shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <div className="">
          <Link to="/" className="text-xl  font-bold tracking-wide">
            SB
          </Link>
        </div>

       
        <div className="hidden md:flex items-center gap-10 text-md font-medium">
          <Link to="/shop" className="hover:text-[#eeecb1] transition-colors">Shop</Link>
          <Link to="/order/details" className="hover:text-[#eeecb1] transition-colors">Orders</Link>
          <Link to="/contact" className="hover:text-[#eeecb1] transition-colors">Contact</Link>
        </div>

     
        <div className="flex items-center gap-6">
          {auth?(

            <button onClick={() => handleLogout } className="w-[80px] h-[40px] border-2 rounded-lg border-[#2b333a] hover:bg-[#eeecb1] ">logout</button>
          ):
          <button className="w-[80px] h-[40px] border-2 rounded-lg border-[#2b333a] hover:bg-[#eeecb1] ">login</button>

          
        }
          <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faCartShopping} className="text-xl cursor-pointer hover:text-[#eeecb1] transition-colors" />
          <FontAwesomeIcon icon={faUser} className="text-xl cursor-pointer hover:text-[#eeecb1] transition-colors" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
