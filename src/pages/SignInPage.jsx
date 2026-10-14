import React from 'react';
import { SignIn } from '@clerk/react';
import { NavLink } from 'react-router-dom';

export const SignInPage = () => {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f3f2ef] dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      {/* Brand Header */}
      <div className="mb-6 text-center">
        <NavLink to="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-coral-500 flex items-center justify-center shadow-md shadow-coral-500/25 group-hover:scale-105 transition-transform">
            <span className="font-black text-white text-base tracking-tight leading-none lowercase">
              out
            </span>
          </div>
          <div className="text-left">
            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
              Linked<span className="text-coral-500">Out</span>
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium block">
              Where work gets real
            </span>
          </div>
        </NavLink>
      </div>

      {/* Clerk SignIn Component */}
      <div className="w-full flex justify-center">
        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up" 
        />
      </div>
    </div>
  );
};
