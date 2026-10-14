import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaBookmark, 
  FaCoffee, 
  FaBuilding, 
  FaFire, 
  FaUserShield,
  FaArrowRight,
  FaEdit,
  FaCheck,
  FaSignInAlt
} from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/react';
import { useApp } from '../context/AppContext';

export const LeftSidebar = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    savedPostsCount, 
    activeCategory, 
    addToast
  } = useApp();

  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Derived user details from Clerk when logged in
  const displayName = isSignedIn && user 
    ? (user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Employee')
    : 'Guest Employee';

  const avatarUrl = isSignedIn && user 
    ? user.imageUrl 
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';

  const currentTitle = isSignedIn && user?.unsafeMetadata?.title 
    ? String(user.unsafeMetadata.title) 
    : (isSignedIn ? 'Employee' : 'Corporate Lurker');

  const currentCompany = isSignedIn && user?.unsafeMetadata?.company 
    ? String(user.unsafeMetadata.company) 
    : (isSignedIn ? 'Company not set' : 'Secret Cubicle');

  const handleStartEdit = () => {
    setJobTitle(currentTitle);
    setCompany(currentCompany);
    setIsEditingMetadata(true);
  };

  const handleSaveMetadata = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          title: jobTitle.trim() || 'Employee',
          company: company.trim() || 'Company not set'
        }
      });
      setIsEditingMetadata(false);
      addToast('Profile title and company updated! 👔', 'success');
    } catch (err) {
      console.error('Failed to update Clerk user metadata:', err);
      addToast('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card overflow-hidden border border-gray-200 dark:border-gray-800 transition-colors">
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
          <NavLink to={isSignedIn ? "/profile" : "#"} onClick={(e) => { if (!isSignedIn) { e.preventDefault(); openSignIn?.(); } }} className="group">
            <div className="-mt-9 mb-2 relative">
              <img 
                src={avatarUrl} 
                alt={displayName} 
                className="w-16 h-16 rounded-full object-cover border-3 border-white dark:border-gray-900 shadow-md group-hover:scale-105 transition-transform"
              />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${isSignedIn ? 'bg-emerald-500' : 'bg-gray-400'}`} title={isSignedIn ? "Status: Online" : "Status: Guest"} />
            </div>
          </NavLink>

          <NavLink to={isSignedIn ? "/profile" : "#"} onClick={(e) => { if (!isSignedIn) { e.preventDefault(); openSignIn?.(); } }} className="hover:underline">
            <h2 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
              {displayName}
            </h2>
          </NavLink>
          
          {/* Job Title and Company Display or Form */}
          {isSignedIn ? (
            isEditingMetadata ? (
              <form onSubmit={handleSaveMetadata} className="w-full mt-2 text-left bg-gray-50 dark:bg-gray-800/80 p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Coffee Drinker"
                    className="w-full mt-0.5 px-2 py-1 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-coral-500 text-gray-900 dark:text-gray-100"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Initech Corp"
                    className="w-full mt-0.5 px-2 py-1 text-xs bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:border-coral-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsEditingMetadata(false)}
                    className="px-2 py-1 text-[11px] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-2.5 py-1 text-[11px] bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-md shadow-xs flex items-center gap-1"
                  >
                    {isSaving ? 'Saving...' : <><FaCheck className="text-[9px]" /> Save</>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-1 flex flex-col items-center">
                <div className="flex items-center justify-center gap-1.5 group">
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 px-1">
                    {currentTitle}
                  </p>
                  <button
                    type="button"
                    onClick={handleStartEdit}
                    className="text-gray-400 hover:text-coral-500 p-1 rounded-md transition-colors text-[10px]"
                    title="Edit Title & Company"
                  >
                    <FaEdit />
                  </button>
                </div>

                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 flex items-center justify-center gap-1">
                  <FaBuilding className="text-[10px]" /> {currentCompany}
                </p>
              </div>
            )
          ) : (
            <div className="mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Browsing as Guest
              </p>
              <button
                type="button"
                onClick={() => openSignIn ? openSignIn() : null}
                className="mt-2 text-xs font-bold text-coral-600 dark:text-coral-400 hover:underline flex items-center justify-center gap-1"
              >
                <FaSignInAlt className="text-[10px]" /> Sign in to edit profile
              </button>
            </div>
          )}

          {/* Quiet Quitting Index */}
          <div className="w-full mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-left">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-gray-500 dark:text-gray-400 font-medium">Quiet Quitting Rating</span>
              <span className="font-bold text-coral-600 dark:text-coral-400">{currentUser.quietQuittingScore}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-coral-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentUser.quietQuittingScore}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">Level: Elite Calendar Defender</span>
          </div>

          {/* Quick Profile Stats */}
          <div className="w-full mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="font-bold text-gray-800 dark:text-gray-200 text-sm">{currentUser.postCount}</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Office Vents</div>
            </div>
            <button 
              type="button"
              onClick={handleCoffeeClick}
              className="p-1.5 bg-coral-50 hover:bg-coral-100 dark:bg-coral-950/40 dark:hover:bg-coral-950/70 rounded-lg text-coral-700 dark:text-coral-400 transition-colors cursor-pointer group"
              title="Click to drink coffee!"
            >
              <div className="font-bold text-coral-600 dark:text-coral-400 text-sm flex items-center justify-center gap-1 group-hover:scale-110 transition-transform">
                <FaCoffee className="text-xs" /> {currentUser.coffeeCount}
              </div>
              <div className="text-[10px] text-coral-500 dark:text-coral-400 font-medium">+ Sip Coffee</div>
            </button>
          </div>
        </div>

        {/* Shortcuts Section */}
        <div className="border-t border-gray-100 dark:border-gray-800 px-3 py-2 bg-gray-50/60 dark:bg-gray-800/50">
          <NavLink
            to="/saved"
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group
              ${isActive || activeCategory === 'saved'
                ? 'bg-coral-100/70 dark:bg-coral-950/60 text-coral-700 dark:text-coral-400 font-semibold' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-coral-600'}
            `}
          >
            <div className="flex items-center gap-2">
              <FaBookmark className="text-coral-500 group-hover:scale-110 transition-transform" />
              <span>My Saved Posts</span>
            </div>
            <span className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-2xs">
              {savedPostsCount}
            </span>
          </NavLink>

          <NavLink
            to="/trending"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-amber-600 transition-all mt-1 group"
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
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-3.5 border border-gray-200 dark:border-gray-800 text-xs transition-colors">
        <div className="flex items-center gap-2 text-coral-600 dark:text-coral-400 font-semibold mb-1.5">
          <FaUserShield /> LinkedOut Survival Tip #42
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-[11px] leading-relaxed">
          "If you don't know what to reply in a thread, just react with 👍 and never open the notification again."
        </p>
      </div>
    </aside>
  );
};
