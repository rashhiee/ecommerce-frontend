import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import api from "../services/axios";
import Login from "../services/login";

const Navbar = () => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("isAuth");
    return saved ? JSON.parse(saved) : false;
  });
  const [loading, setLoading] = useState(true);
  const [Cart, setCart] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    async function getter() {
      try {

        const res = await api.get('/auth/check')
        console.log("value ", res);
        setAuth(res.data.isAuth);
        localStorage.setItem("isAuth", JSON.stringify(res.data.isAuth));
      } catch (error) {
        console.log(error)
        setAuth(false);
        localStorage.setItem("isAuth", "false");
      } finally {
        setLoading(false);
      }

    }
    getter();
  }, [])

  useEffect(() => {

    async function getterCart() {
      if (!auth) return;
      try {
        const carts = await api.get("/cart")
        console.log(carts.data);
        setCart(carts.data.items);
      } catch (error) {
        console.log(error);

      }
    }

    getterCart();

  }, [auth])

 

  async function handleLogout() {
    console.log("logoutee");
    const res = await api.post('/logout')
    alert(res.data.message)
    setAuth(false);
    setCart([])
    localStorage.setItem("isAuth", "false");
  }

  if (loading) {
    return (
      <nav className="w-full bg-[#f4f0eae1] text-[#2b333a] px-3 py-3 shadow-md fixed top-0 left-0 z-50 flex justify-center items-center">
        <span className="text-sm text-gray-600">Loading...</span>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-[#f4f0eae1] text-[#2b333a] px-3 py-3 shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-5 mx-auto">

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


        <div className="flex items-center gap-6  ">
          {auth ? (

            <button onClick={handleLogout} className="w-[80px] h-[40px] border-2 rounded-lg border-[#2b333a] hover:bg-[#eeecb1] ">logout</button>
          ) :
            <button onClick={() => navigate('/login')} className="w-[80px] h-[40px] border-2 rounded-lg border-[#2b333a] hover:bg-[#eeecb1] ">login</button>


          }
          <div className="relative">
            <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faCartShopping} className="text-2xl cursor-pointer hover:text-[#eeecb1] transition-colors" />
            {Cart.length > 0 ? (

              <span class="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-xs text-red-50 font-serif">{Cart.length}</span>
            ) : (
              <span></span>
            )

            }
          </div>

          {/* <FontAwesomeIcon icon={faUser} className="text-xl cursor-pointer hover:text-[#eeecb1] transition-colors" /> */}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
