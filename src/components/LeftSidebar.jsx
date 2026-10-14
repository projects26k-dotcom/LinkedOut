import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaBookmark, 
  FaCoffee, 
  FaBuilding, 
  FaFire, 
  FaUserShield,
  FaArrowRight
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const LeftSidebar = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    savedPostsCount, 
    activeCategory, 
    setActiveCategory,
    addToast
  } = useApp();

  const handleCoffeeClick = () => {
    setCurrentUser(prev => ({
      ...prev,
      coffeeCount: (prev.coffeeCount || 0) + 1,
      quietQuittingScore: Math.min(100, prev.quietQuittingScore + 1)
    }));
    addToast('Lukewarm office coffee consumed! +1 Zen power ☕', 'info');
  };

  return (
    <aside className="w-full space-y-3">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-200">
        {/* Banner */}
        <div className="h-16 w-full relative bg-gradient-to-r from-coral-400 via-coral-500 to-amber-500">
          <img 
            src={currentUser.banner} 
            alt="Banner" 
            className="w-full h-full object-cover mix-blend-overlay opacity-80"
          />
        </div>

        {/* Avatar & Profile Info */}
        <div className="px-4 pb-4 pt-0 relative flex flex-col items-center text-center">
          <NavLink to="/profile" className="group">
            <div className="-mt-9 mb-2 relative">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Status: Pretending to work" />
            </div>
          </NavLink>

          <NavLink to="/profile" className="hover:underline">
            <h2 className="font-bold text-gray-900 text-base leading-tight">
              {currentUser.name}
            </h2>
          </NavLink>
          
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 px-1">
            {currentUser.title}
          </p>

          <p className="text-[11px] text-gray-400 mt-1 flex items-center justify-center gap-1">
            <FaBuilding className="text-gray-400 text-[10px]" /> {currentUser.company}
          </p>

          {/* Quiet Quitting Index */}
          <div className="w-full mt-4 pt-3 border-t border-gray-100 text-left">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-500 font-medium">Quiet Quitting Rating</span>
              <span className="font-bold text-coral-600">{currentUser.quietQuittingScore}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-coral-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentUser.quietQuittingScore}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">Level: Elite Calendar Defender</span>
          </div>

          {/* Quick Profile Stats */}
          <div className="w-full mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-1.5 bg-gray-50 rounded-lg">
              <div className="font-bold text-gray-800 text-sm">{currentUser.postCount}</div>
              <div className="text-[10px] text-gray-500">Office Vents</div>
            </div>
            <button 
              type="button"
              onClick={handleCoffeeClick}
              className="p-1.5 bg-coral-50 hover:bg-coral-100 rounded-lg text-coral-700 transition-colors cursor-pointer group"
              title="Click to drink coffee!"
            >
              <div className="font-bold text-coral-600 text-sm flex items-center justify-center gap-1 group-hover:scale-110 transition-transform">
                <FaCoffee className="text-xs" /> {currentUser.coffeeCount}
              </div>
              <div className="text-[10px] text-coral-500 font-medium">+ Sip Coffee</div>
            </button>
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="border-t border-gray-100 px-3 py-2 bg-gray-50/60">
          <NavLink
            to="/saved"
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group
              ${isActive || activeCategory === 'saved'
                ? 'bg-coral-100/70 text-coral-700 font-semibold' 
                : 'text-gray-700 hover:bg-white hover:text-coral-600'}
            `}
          >
            <div className="flex items-center gap-2">
              <FaBookmark className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span>My Saved Posts</span>
            </div>
            <span className="bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs">
              {savedPostsCount}
            </span>
          </NavLink>

          <NavLink
            to="/trending"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-white hover:text-amber-600 transition-all mt-1 group"
          >
            <div className="flex items-center gap-2">
              <FaFire className="text-amber-500 group-hover:scale-110 transition-transform" />
              <span>Trending Watercooler</span>
            </div>
            <FaArrowRight className="text-[10px] text-gray-400 group-hover:translate-x-0.5 transition-transform" />
          </NavLink>
        </div>
      </div>

      {/* Workplace Humor Tip Card */}
      <div className="bg-white rounded-xl shadow-card p-3.5 border border-gray-200 text-xs">
        <div className="flex items-center gap-2 text-coral-600 font-semibold mb-1.5">
          <FaUserShield /> LinkedOut Survival Tip #42
        </div>
        <p className="text-gray-600 text-[11px] leading-relaxed">
          "If you don't know what to reply in a thread, just react with 👍 and never open the notification again."
        </p>
      </div>
    </aside>
  );
};
