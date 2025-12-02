import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f4f0eae1] text-[#484137e1] py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* COLUMN 1 — BRAND INFO */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-3">SHOE BOX</h2>
          <p className="text-sm leading-relaxed">
            Your trusted destination for premium footwear.
            Fast shipping, easy returns, and 24/7 customer care.
          </p>
        </div>

        {/* COLUMN 2 — RESOURCES + HELP */}
        <div className="grid grid-cols-2 gap-10">

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Find A Store</li>
              <li className="hover:text-black cursor-pointer">Become A Member</li>
              <li className="hover:text-black cursor-pointer">Running Shoe Finder</li>
              <li className="hover:text-black cursor-pointer">Product Advice</li>
              <li className="hover:text-black cursor-pointer">Nike Coaching</li>
              <li className="hover:text-black cursor-pointer">Send Us Feedback</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Help</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Get Help</li>
              <li className="hover:text-black cursor-pointer">Order Status</li>
              <li className="hover:text-black cursor-pointer">Delivery</li>
              <li className="hover:text-black cursor-pointer">Returns</li>
              <li className="hover:text-black cursor-pointer">Payment Options</li>
              <li className="hover:text-black cursor-pointer">Contact Us On Nike.com Inquiries</li>
              <li className="hover:text-black cursor-pointer">Contact Us On All Other Inquiries</li>
            </ul>
          </div>

        </div>

        {/* COLUMN 3 — COMPANY + GUIDES */}
        <div className="grid grid-cols-2 gap-10">

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">About Nike</li>
              <li className="hover:text-black cursor-pointer">News</li>
              <li className="hover:text-black cursor-pointer">Careers</li>
              <li className="hover:text-black cursor-pointer">Investors</li>
              <li className="hover:text-black cursor-pointer">Sustainability</li>
              <li className="hover:text-black cursor-pointer">Impact</li>
              <li className="hover:text-black cursor-pointer">Report a Concern</li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3">Guides</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-black cursor-pointer">Terms of Sale</li>
              <li className="hover:text-black cursor-pointer">Terms of Use</li>
              <li className="hover:text-black cursor-pointer">Nike Privacy Policy</li>
              <li className="hover:text-black cursor-pointer">Privacy Settings</li>
            </ul>
          </div>

        </div>

      </div>

      {/* BOTTOM LINE */}
      <div className="mt-10 pt-5 border-t border-gray-400 text-center text-sm text-gray-600">
        India <br />
        © {new Date().getFullYear()} SHOE BOX. All Rights Reserved.
      </div>
    </footer>

  );
};

export default Footer;
