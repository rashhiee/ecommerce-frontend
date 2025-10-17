import React from "react";
import { FaBoxOpen, FaUsers, FaClipboardList, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const DashboardCard = ({ icon: Icon, title, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4
                 hover:scale-[1.03] hover:shadow-xl transition-all duration-300 cursor-pointer
                 transform hover:-translate-y-1 w-full sm:w-auto"
    >
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        <Icon size={26} />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-500">
          View & manage {title.toLowerCase()}
        </p>
      </div>
    </div>
  );
};


const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-10">
      
    
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in">
        Dashboard Overview
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 
                   w-full max-w-6xl transition-all duration-500 ease-in-out animate-slide-up"
      >
        <DashboardCard icon={FaTags} title="Categories" path="/admin/category" />
        <DashboardCard icon={FaBoxOpen} title="Products" path="/admin/products" />
        <DashboardCard icon={FaUsers} title="Users" path="/admin/users" />
        <DashboardCard icon={FaClipboardList} title="Orders" path="/admin/orders" />
      </div>

      <div className="mt-10 text-gray-600 text-center text-sm sm:text-base animate-fade-in px-2">
        Welcome Admin! Select a module above to begin.
      </div>
    </div>
  );
};

export default AdminDashboard;
