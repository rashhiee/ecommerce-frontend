import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-[#f1f4f6] text-black min-h-screen py-12 mt-[68px]">
      <div className="max-w-6xl mx-auto px-6">
       
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">Contact Us</h1>
          <p className="text-black">
            We’d love to hear from you. Reach out for queries, feedback, or support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
     
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-black mb-4">Our Office</h2>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1" />
              <p>
                Muttam ,kalamassery,<br />
                Kochi, Kerala, India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-yellow-500 text-xl" />
              <p>+91 9048543681</p>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-500 text-xl" />
              <p>rashiee973@gmail.com</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-black mb-2">Business Hours</h3>
              <p className="text-black">Mon - Sat: 9:00 AM - 6:00 PM</p>
              <p className="text-black">Sunday: Closed</p>
            </div>
          </div>

          <div className="bg-[#2b333a] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Send us a Message
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block  text-gray-400 text-sm mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block  text-gray-400 text-sm mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="Type your message..."
                  className="w-full p-3 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

       
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
          <iframe
            title="ShoeBox Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.802203329906!2d76.26730497465372!3d9.975226890141217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d5142bfa9d9%3A0x2a05b87b3ebabc0b!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1697836000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
