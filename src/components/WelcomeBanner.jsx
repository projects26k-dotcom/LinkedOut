import React from 'react';
import { useClerk } from '@clerk/react';
import { NavLink } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaFire, FaMask, FaShieldAlt } from 'react-icons/fa';

export const WelcomeBanner = () => {
  const { openSignIn, openSignUp } = useClerk();

  const handleSignInClick = () => {
    if (openSignIn) {
      openSignIn();
    }
  };

  const handleSignUpClick = () => {
    if (openSignUp) {
      openSignUp();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 p-5 sm:p-6 transition-all relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-coral-500/5 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-coral-500 flex items-center justify-center shadow-md shadow-coral-500/25 flex-shrink-0">
            <span className="font-black text-white text-lg tracking-tight leading-none lowercase">
              out
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md leading-relaxed">
              Tired of corporate hustle cringe? You can browse all rants below. Join to react with laugh emojis, comment, or vent anonymously without HR looking! ☕
            </p>
          </div>
        </div>

        {/* Action Buttons in Coral */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full sm:w-auto pt-2 sm:pt-0">
          <button
            type="button"
            onClick={handleSignInClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border-2 border-coral-500 text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-950/50 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <FaSignInAlt className="text-xs" />
            <span>Sign in</span>
          </button>

          <button
            type="button"
            onClick={handleSignUpClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-coral-500/25 hover:scale-102"
          >
            <FaUserPlus className="text-xs" />
            <span>Join LinkedOut</span>
          </button>
        </div>
      </div>
    </div>
  );
};
