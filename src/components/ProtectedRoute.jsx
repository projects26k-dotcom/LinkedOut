import React from 'react';
import { useAuth } from '@clerk/react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 rounded-full border-2 border-coral-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
