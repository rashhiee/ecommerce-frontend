import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#2b333a] text-white px-6 py-5 shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Left: Logo */}
        <div className="">
          <Link to="/" className="text-xl  font-bold tracking-wide">
            SB
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-10 text-md font-medium">
          <Link to="/shop" className="hover:text-[#BFD8Eb] transition-colors">Shop</Link>
          <Link to="/orders" className="hover:text-[#BFD8Eb] transition-colors">Orders</Link>
          <Link to="/contact" className="hover:text-[#BFD8Eb] transition-colors">Contact</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <FontAwesomeIcon icon={faSearch} className="text-xl cursor-pointer hover:text-[#BFD8Eb] transition-colors" />
          <FontAwesomeIcon icon={faCartShopping} className="text-xl cursor-pointer hover:text-[#BFD8Eb] transition-colors" />
          <FontAwesomeIcon icon={faUser} className="text-xl cursor-pointer hover:text-[#BFD8Eb] transition-colors" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
