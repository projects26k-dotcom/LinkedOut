import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaFire, 
  FaEnvelope, 
  FaBell, 
  FaSearch, 
  FaTimes, 
  FaShieldAlt, 
  FaLaughSquint,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { UserButton, useClerk, useUser } from '@clerk/react';
import { SignedIn, SignedOut } from './ClerkWrapper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    unreadNotifications, 
    notifications,
    markNotificationsRead,
    setIsGuidelinesOpen
  } = useApp();

  const { isDark, toggleTheme } = useTheme();
  const { openSignIn, openSignUp } = useClerk();
  const { user } = useUser();

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
      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}
  `;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xs transition-colors">
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
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                Linked<span className="text-coral-500">Out</span>
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide hidden sm:inline-block">
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
              className="w-full bg-[#eef3f8] dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm pl-9 pr-8 py-1.5 rounded-full border border-transparent focus:border-coral-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-0.5 rounded-full"
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
            className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-coral-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  showNotifMenu ? 'text-coral-500 font-semibold' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm flex items-center gap-1.5">
                      <FaLaughSquint className="text-coral-500" /> Office Notifications
                    </span>
                    <NavLink 
                      to="/notifications" 
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-coral-600 dark:text-coral-400 hover:underline font-medium"
                    >
                      View All
                    </NavLink>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                    {notifications.map(item => (
                      <div key={item.id} className="p-3 hover:bg-coral-50/40 dark:hover:bg-coral-950/30 transition-colors flex gap-3 text-xs">
                        <div className="w-8 h-8 rounded-full bg-coral-100 dark:bg-coral-950 text-coral-600 flex items-center justify-center flex-shrink-0 font-bold overflow-hidden">
                          {item.avatar ? (
                            <img src={item.avatar} alt={item.actor} className="w-full h-full object-cover" />
                          ) : (
                            '🕶️'
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200">
                            <span className="font-semibold">{item.actor}</span> {item.action}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 italic mt-0.5 line-clamp-1">{item.target}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Signed In: Clerk UserButton */}
            <SignedIn>
              <div className="flex flex-col items-center justify-center px-2 py-1 min-w-[56px] text-xs font-medium text-gray-500 dark:text-gray-400 group">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: 'w-7 h-7 border-2 border-coral-400 shadow-xs hover:scale-105 transition-transform',
                      userButtonTrigger: 'outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500',
                    }
                  }} 
                />
                <span className="text-[10px] mt-0.5 leading-none">Me ▼</span>
              </div>
            </SignedIn>

            {/* Signed Out: Sign In & Join buttons */}
            <SignedOut>
              <div className="flex items-center gap-2 ml-1">
                <button
                  type="button"
                  onClick={() => openSignIn ? openSignIn() : navigate('/sign-in')}
                  className="px-3 py-1.5 text-xs font-bold text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-950/50 rounded-lg transition-colors border border-coral-200 dark:border-coral-800/80"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => openSignUp ? openSignUp() : navigate('/sign-up')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-coral-500 hover:bg-coral-600 text-white rounded-lg transition-colors shadow-xs shadow-coral-500/20"
                >
                  Join
                </button>
              </div>
            </SignedOut>
          </div>

          {/* Theme Toggle (Dark / Light Mode) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-coral-500 dark:text-gray-400 dark:hover:text-coral-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun className="w-4 h-4 text-amber-400" /> : <FaMoon className="w-4 h-4 text-gray-600" />}
          </button>

          {/* Guidelines Shield Button */}
          <button
            type="button"
            onClick={() => setIsGuidelinesOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-coral-600 hover:bg-coral-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-1"
            title="Read Satire & Safety Guidelines"
          >
            <FaShieldAlt className="text-coral-500" />
            <span className="hidden lg:inline">Guidelines</span>
          </button>
        </nav>
      </div>

      {/* Mobile Expandable Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <FaSearch className="absolute left-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search gossip, meeting fails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#eef3f8] dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm pl-9 pr-8 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-coral-500"
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
