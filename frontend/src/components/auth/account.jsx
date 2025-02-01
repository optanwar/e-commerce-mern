import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { logout } from '../../slices/authSlice';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
 