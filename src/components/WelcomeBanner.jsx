import React from 'react';
import { useClerk } from '@clerk/react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaFire, FaMask, FaCoffee } from 'react-icons/fa';

export const WelcomeBanner = () => {
  const { openSignIn, openSignUp } = useClerk();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    if (openSignIn) {
      openSignIn();
    } else {
      navigate('/sign-in');
    }
  };

  const handleSignUpClick = () => {
    if (openSignUp) {
      openSignUp();
    } else {
      navigate('/sign-up');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 p-5 sm:p-6 transition-all relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-coral-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      <div className="relative z-10 space-y-3.5">
        {/* Header: Logo, Title, Badge & Subtitle */}
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-coral-500 flex items-center justify-center shadow-md shadow-coral-500/25 flex-shrink-0 select-none">
            <span className="font-black text-white text-base sm:text-lg tracking-tight leading-none lowercase">
              out
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                Linked<span className="text-coral-500">Out</span>
              </h2>
              <span className="text-[10px] uppercase font-bold text-coral-600 bg-coral-50 dark:bg-coral-950/60 dark:text-coral-400 px-2 py-0.5 rounded-full border border-coral-200 dark:border-coral-900">
                Unfiltered
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
              Where work gets real
            </p>
          </div>
        </div>

        {/* Description Body */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Tired of corporate hustle cringe? You can browse all rants below. Join to react with laugh emojis, comment, or vent anonymously without HR looking! ☕
        </p>

        {/* Value Props / Highlight Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 font-medium">
            <FaMask className="text-coral-500 text-xs" /> 100% Anonymous Mode
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 font-medium">
            <FaFire className="text-amber-500 text-xs" /> Unfiltered Gossip
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800/80 font-medium">
            <FaCoffee className="text-amber-700 dark:text-amber-500 text-xs" /> Zero Cringe
          </span>
        </div>

        {/* Action Buttons in Dedicated Bottom Row */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleSignInClick}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-coral-500 text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-950/50 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <FaSignInAlt className="text-xs" />
            <span>Sign in</span>
          </button>

          <button
            type="button"
            onClick={handleSignUpClick}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-coral-500/25 hover:shadow-coral-500/35 cursor-pointer"
          >
            <FaUserPlus className="text-xs" />
            <span>Join LinkedOut</span>
          </button>
        </div>
      </div>
    </div>
  );
};

