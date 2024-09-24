import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineLogout } from 'react-icons/hi';
import classNames from 'classnames';
import { DashboardTop } from '../../constants/userLinks';

function Sidebar({ isSidebarOpen, toggleSidebar, setIsModalOpen }) {
  const handleClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={classNames(
        'fixed z-40 h-screen flex flex-col w-60 py-3 border-r-2 pb-16 bg-white transition-transform',
        {
          'transform -translate-x-full': !isSidebarOpen,
          'md:transform md:translate-x-0': true,
        }
      )}
    >
      <div className='flex-1 overflow-y-auto'>
        <div className='grid grid-cols-1 '>
          {DashboardTop.map((item) => {
            return (
              <SidebarLink
                key={item.key}
                item={{ ...item, label: item.key }}
                handleClick={handleClick}
              />
            );
          })}
        </div>
      </div>

      <div className='mb-3'>
        <div
          onClick={() => setIsModalOpen(true)}
          className='block text-xs font-medium hover:bg-[#e7f6ff] mx-4 rounded-lg'
        >
          <div className='flex items-center justify-between px-4 py-2 cursor-pointer'>
            <div className='flex items-center'>
              <h1 className='mr-2 text-xl text-[#979797]'>
                {<HiOutlineLogout />}
              </h1>
              <h1 className='text-sm font-semibold text-[#979797]'>exit</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ item, handleClick }) {
  const { pathname } = useLocation();
  const isActive = pathname === item.path;

  return (
    <Link
      to={item.path}
      onClick={handleClick}
      className={classNames(
        'block text-xs font-medium hover:bg-[#e7f6ff] mx-4 rounded-lg',
        { 'bg-[#e7f6ff] rounded-lg': isActive }
      )}
    >
      <div className='flex items-center justify-between px-4 py-2 cursor-pointer'>
        <div className='flex items-center'>
          <span
            className={classNames('mr-2 text-xl', {
              'text-[#2d9cdb]': isActive,
              'text-[#979797]': !isActive,
            })}
          >
            {<item.icon />}
          </span>
          <span
            className={classNames('text-sm font-semibold', {
              'text-[#2d9cdb]': isActive,
              'text-[#979797]': !isActive,
            })}
          >
            {item.label}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Sidebar;
