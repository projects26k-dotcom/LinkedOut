import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ToastContainer } from './components/Toast';
import { GuidelinesModal } from './components/GuidelinesModal';

// Pages
import { FeedPage } from './pages/FeedPage';
import { TrendingPage } from './pages/TrendingPage';
import { SavedPage } from './pages/SavedPage';
import { MessagesPage } from './pages/MessagesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-[#f3f2ef] flex flex-col font-sans pb-16 sm:pb-8 selection:bg-coral-200 selection:text-coral-900">
          {/* Top Sticky Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<FeedPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
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
