import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaFire, 
  FaEnvelope, 
  FaBell, 
  FaUserCircle, 
  FaSearch, 
  FaTimes, 
  FaShieldAlt, 
  FaPlusCircle, 
  FaCheck,
  FaLaughSquint
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { 
    currentUser, 
    searchQuery, 
    setSearchQuery, 
    unreadNotifications, 
    notifications,
    markNotificationsRead,
    setIsGuidelinesOpen
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const notifRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close notifications popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const navItemClass = ({ isActive }) => `
    flex flex-col items-center justify-center px-3 py-1.5 min-w-[64px] rounded-lg transition-all text-xs font-medium relative group outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-1
    ${isActive 
      ? 'text-coral-500 font-semibold border-b-2 border-coral-500 rounded-b-none' 
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
  `;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <NavLink 
            to="/" 
            className="flex items-center gap-2.5 group flex-shrink-0 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-1 rounded-xl"
          >
            {/* Clean LinkedOut Icon Badge */}
            <div className="w-9 h-9 rounded-xl bg-coral-500 flex items-center justify-center shadow-md shadow-coral-500/25 group-hover:scale-105 transition-transform flex-shrink-0 select-none">
              <span className="font-black text-white text-[16px] tracking-tight leading-none lowercase">
                out
              </span>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-gray-900 leading-none">
                Linked<span className="text-coral-500">Out</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide hidden sm:inline-block">
                Where work gets real
              </span>
            </div>
          </NavLink>

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center relative ml-2 w-64 lg:w-72"
          >
            <FaSearch className="absolute left-3 text-gray-400 text-sm pointer-events-none" />
            <input
              type="text"
              placeholder="Search gossip, rants, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#eef3f8] text-gray-800 text-sm pl-9 pr-8 py-1.5 rounded-full border border-transparent focus:border-coral-400 focus:bg-white focus:outline-none transition-all placeholder:text-gray-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                title="Clear search"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </form>
        </div>

        {/* Center / Right: Nav Icons */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search toggle */}
          <button 
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-coral-500 rounded-lg hover:bg-gray-100"
            aria-label="Toggle mobile search"
          >
            <FaSearch className="w-4 h-4" />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-1">
            <NavLink to="/" end className={navItemClass}>
              <FaHome className="text-lg mb-0.5" />
              <span>Home</span>
            </NavLink>

            <NavLink to="/trending" className={navItemClass}>
              <FaFire className="text-lg mb-0.5 text-amber-500" />
              <span>Trending</span>
            </NavLink>

            <NavLink to="/messages" className={navItemClass}>
              <div className="relative">
                <FaEnvelope className="text-lg mb-0.5" />
                <span className="absolute -top-1 -right-2 bg-coral-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                  2
                </span>
              </div>
              <span>Messages</span>
            </NavLink>

            {/* Notifications with interactive popover */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setShowNotifMenu(!showNotifMenu);
                  if (!showNotifMenu) markNotificationsRead();
                }}
                className={`flex flex-col items-center justify-center px-3 py-1.5 min-w-[64px] rounded-lg transition-all text-xs font-medium outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-1 ${
                  showNotifMenu ? 'text-coral-500 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <FaBell className="text-lg mb-0.5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-2 bg-coral-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse leading-tight">
                      {unreadNotifications}
                    </span>
                  )}
                </div>
                <span>Alerts</span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                      <FaLaughSquint className="text-coral-500" /> Office Notifications
                    </span>
                    <NavLink 
                      to="/notifications" 
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-coral-600 hover:underline font-medium"
                    >
                      View All
                    </NavLink>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                    {notifications.map(item => (
                      <div key={item.id} className="p-3 hover:bg-coral-50/40 transition-colors flex gap-3 text-xs">
                        <div className="w-8 h-8 rounded-full bg-coral-100 text-coral-600 flex items-center justify-center flex-shrink-0 font-bold overflow-hidden">
                          {item.avatar ? (
                            <img src={item.avatar} alt={item.actor} className="w-full h-full object-cover" />
                          ) : (
                            '🕶️'
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">
                            <span className="font-semibold">{item.actor}</span> {item.action}
                          </p>
                          <p className="text-gray-500 italic mt-0.5 line-clamp-1">{item.target}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/profile" className={navItemClass}>
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-5 h-5 rounded-full object-cover border border-coral-400 mb-0.5"
              />
              <span>Me ▼</span>
            </NavLink>
          </div>

          {/* Guidelines Shield Button */}
          <button
            type="button"
            onClick={() => setIsGuidelinesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-coral-600 hover:bg-coral-50 rounded-lg border border-gray-200 transition-colors outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-1"
            title="Read Satire & Safety Guidelines"
          >
            <FaShieldAlt className="text-coral-500" />
            <span className="hidden lg:inline">Guidelines</span>
          </button>
        </nav>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search gossip, meeting fails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#eef3f8] text-gray-800 text-sm pl-9 pr-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-coral-500"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400"
              >
                <FaTimes />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};
