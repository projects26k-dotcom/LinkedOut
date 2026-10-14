import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFire, FaEnvelope, FaBell, FaUser, FaBookmark } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const MobileBottomNav = () => {
  const { unreadNotifications, savedPostsCount } = useApp();

  const getNavClass = ({ isActive }) => `
    flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-colors
    ${isActive ? 'text-coral-500 font-bold' : 'text-gray-500 hover:text-gray-900'}
  `;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-2 flex justify-around items-center h-14">
      <NavLink to="/" end className={getNavClass}>
        <FaHome className="text-xl mb-0.5" />
        <span className="text-[10px]">Feed</span>
      </NavLink>

      <NavLink to="/trending" className={getNavClass}>
        <FaFire className="text-xl mb-0.5" />
        <span className="text-[10px]">Trending</span>
      </NavLink>

      <NavLink to="/saved" className={getNavClass}>
        <div className="relative">
          <FaBookmark className="text-lg mb-0.5" />
          {savedPostsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-coral-500 text-white text-[9px] px-1 rounded-full font-bold">
              {savedPostsCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Saved</span>
      </NavLink>

      <NavLink to="/messages" className={getNavClass}>
        <div className="relative">
          <FaEnvelope className="text-xl mb-0.5" />
          <span className="absolute -top-1 -right-2 bg-coral-500 text-white text-[9px] px-1 rounded-full font-bold">
            2
          </span>
        </div>
        <span className="text-[10px]">Messages</span>
      </NavLink>

      <NavLink to="/profile" className={getNavClass}>
        <FaUser className="text-xl mb-0.5" />
        <span className="text-[10px]">Profile</span>
      </NavLink>
    </div>
  );
};
