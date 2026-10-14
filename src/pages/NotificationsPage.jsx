import React from 'react';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { FaBell, FaCheckDouble, FaLaughSquint, FaBookmark, FaAward } from 'react-icons/fa';

export const NotificationsPage = () => {
  const { notifications, markNotificationsRead } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Center Notifications */}
        <main className="col-span-1 md:col-span-8 lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center text-lg">
                <FaBell />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">Notifications & Alerts</h1>
                <p className="text-xs text-gray-500">Live signals from your corporate network</p>
              </div>
            </div>

            <button
              type="button"
              onClick={markNotificationsRead}
              className="text-xs font-semibold text-coral-600 hover:text-coral-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-coral-50 transition-colors"
            >
              <FaCheckDouble className="text-[10px]" /> Mark all read
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-card border border-gray-200 divide-y divide-gray-100 overflow-hidden">
            {notifications.map(item => (
              <div 
                key={item.id} 
                className={`p-4 flex items-start gap-3.5 transition-colors ${
                  item.read ? 'hover:bg-gray-50' : 'bg-coral-50/30 hover:bg-coral-50/60'
                }`}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center text-lg">
                    {item.avatar ? (
                      <img src={item.avatar} alt={item.actor} className="w-full h-full object-cover" />
                    ) : (
                      '🕶️'
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center text-xs">
                    {item.type === 'laugh' && '😂'}
                    {item.type === 'save' && '🔖'}
                    {item.type === 'badge' && '🏆'}
                    {item.type === 'gossip' && '🤫'}
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-xs text-gray-800 leading-relaxed">
                    <span className="font-bold">{item.actor}</span> {item.action}
                  </p>
                  <p className="text-xs text-gray-500 italic mt-0.5 bg-gray-50 p-2 rounded-lg border border-gray-100">
                    {item.target}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1.5 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-18">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
};
