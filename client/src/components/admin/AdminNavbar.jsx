import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const AdminNavbar = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='flex items-center justify-between px-4 md:px-10 h-16 border-b border-gray-300/30 bg-black sticky top-0 z-50 shadow-sm'
    >
      <Link to='/' className='cursor-pointer'>
        <img
          src={assets.logo}
          alt="Logo"
          className='w-32 md:w-40 h-auto transition-transform duration-200 hover:scale-105'
        />
      </Link>
    </motion.div>
  );
};

export default AdminNavbar;
