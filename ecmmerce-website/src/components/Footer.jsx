import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#2b333a] text-white py-6  shadow-inner flex flex-col items-center">

  <h1 className="text-2xl font-bold mb-2">SHOE BOX</h1>

  <p className="mb-2">Fast Shipping | Easy Returns | 24/7 Support</p>

  <p className="text-sm">&copy; {new Date().getFullYear()} SHOE BOX. All rights reserved.</p>
</footer>

  );
};

export default Footer;
