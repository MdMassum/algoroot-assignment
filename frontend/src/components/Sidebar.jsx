import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nav = [
    { label: 'Tasks', href: '/home' },
    { label: 'Profile', href: '/profile' },
  ];

  const handleLogout = async () => {
    try {
      dispatch(signOutStart());
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { withCredentials: true });
      if (response.data.success === false) {
        dispatch(signOutFailure(response.data.message));
        toast.error(response.data.message);
        return;
      }
      toast.success("Logout Successful");
      dispatch(signOutSuccess());
      navigate('/admin/login');
    } catch (error) {
      dispatch(signOutFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Mobile Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-50 text-3xl text-green-700 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen bg-[#f2fbf4] border-r w-64 shadow-2xl z-40 flex flex-col items-center transition-transform duration-300 ease-in-out text-black
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-green-700 text-3xl font-bold my-6">AlgoRoot</h1>
        <div className="flex flex-col w-full px-4 gap-5 text-center items-center">
          {nav.map((item) => (
            <NavLink
              to={item.href}
              key={item.href}
              className={({ isActive }) =>
                `flex items-center w-48 bg-[#62b179] text-white gap-2 pl-2 py-2 font-semibold rounded-sm transition-colors duration-300 
                ${isActive ? ' border-l-4 border-[#497d58]' : 'hover:opacity-90 border-l-4 border-transparent'}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        
        <div 
          onClick={handleLogout}
          className='flex w-full rounded-md gap-1 items-center justify-center px-4 mt-2 cursor-pointer'
        >
          <p className='ml-2 w-48 mt-96 md:mt-72 py-2 bg-[#62b179] hover:opacity-90 hover:border-l-4 hover:border-[#497d58] rounded-sm px-3 text-white font-semibold'>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
