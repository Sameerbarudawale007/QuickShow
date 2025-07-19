import React from 'react';
import { assets } from '../../assets/assets';
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  };

  const adminNavlinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
      className='h-[calc(100vh-64px)] flex flex-col items-center border-r border-gray-300/30 py-6 md:py-10 px-2 md:px-4 w-full md:max-w-60 bg-black shadow-sm'
    >
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={user.imageUrl}
        alt='sidebar'
        className='h-12 w-12 md:h-16 md:w-16 rounded-full mx-auto cursor-pointer shadow-md'
      />
      <p className='mt-2 text-sm md:text-base font-semibold text-gray-700 hidden md:block'>
        {user.firstName} {user.lastName}
      </p>

      <div className='mt-6 w-full'>
        {adminNavlinks.map((link, index) => (
          <NavLink
            to={link.path}
            end
            key={index}
            className={({ isActive }) =>
              `relative flex items-center gap-3 py-3 px-3 md:px-6 rounded-lg transition-all duration-300 group ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-500 hover:bg-gray-100'
              }`
            }
          >
            <link.icon className='h-5 w-5' />
            <span className='hidden md:inline'>{link.name}</span>
            <span className='absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-l-lg transition-all duration-300 bg-primary' />
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
