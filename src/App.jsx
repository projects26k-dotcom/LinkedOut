import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/Toast';
import { GuidelinesModal } from './components/GuidelinesModal';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { FeedPage } from './pages/FeedPage';
import { TrendingPage } from './pages/TrendingPage';
import { SavedPage } from './pages/SavedPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#f3f2ef] dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans pb-16 sm:pb-8 selection:bg-coral-200 dark:selection:bg-coral-900 selection:text-coral-900 dark:selection:text-coral-100 transition-colors">
          {/* Top Sticky Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/saved" 
                element={
                  <ProtectedRoute>
                    <SavedPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              
              {/* Clerk Auth Pages with React Router */}
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />

              <Route path="*" element={<FeedPage />} />
            </Routes>
          </div>

          {/* Guidelines Policy Modal */}
          <GuidelinesModal />

          {/* Floating Action Feedback Toasts */}
          <ToastContainer />

          {/* Mobile Bottom Navigation Bar */}
          <MobileBottomNav />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
