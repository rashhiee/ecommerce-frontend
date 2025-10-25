import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#f4f0eae1] text-[#484137e1] transition-all duration-500 hover:py-12 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Company Section */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-3">SHOE BOX</h2>
          <p className="text-sm leading-relaxed">
            Your trusted destination for premium footwear.  
            Fast shipping, easy returns, and 24/7 customer care.
          </p>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">FAQ</li>
            <li className="hover:text-white transition">Shipping & Returns</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Newsletter</h3>
          <p className="text-sm mb-3">
            Stay updated with new arrivals and exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md text-gray-900 focus:outline-none"
            />
            <button className="bg-[#eab308] text-black px-4 py-2 rounded-r-md hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-yellow-500" /> support@shoebox.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-yellow-500" /> +91 98765 43210
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-yellow-500 mt-1" /> 
              <span>
                123 Shoe Street, Kochi,<br /> Kerala, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} SHOE BOX. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
