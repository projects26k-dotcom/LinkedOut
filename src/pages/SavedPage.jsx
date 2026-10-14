import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { PostCard } from '../components/PostCard';
import { FaBookmark, FaArrowLeft } from 'react-icons/fa';

export const SavedPage = () => {
  const { posts } = useApp();
  const savedPosts = posts.filter(p => p.isSaved);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Center Saved Feed */}
        <main className="col-span-1 md:col-span-8 lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-4 border border-gray-200 dark:border-gray-800 flex items-center justify-between transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-coral-100 dark:bg-coral-950 text-coral-600 dark:text-coral-400 flex items-center justify-center text-lg">
                <FaBookmark />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">My Saved Posts</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {savedPosts.length} secret {savedPosts.length === 1 ? 'gem' : 'gems'} stashed for future office survival
                </p>
              </div>
            </div>

            <NavLink 
              to="/" 
              className="text-xs text-coral-600 dark:text-coral-400 hover:text-coral-700 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-coral-50 dark:hover:bg-coral-950/40 transition-colors"
            >
              <FaArrowLeft className="text-[10px]" /> Back to Feed
            </NavLink>
          </div>

          {savedPosts.length > 0 ? (
            <div className="space-y-4">
              {savedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-10 border border-gray-200 dark:border-gray-800 text-center space-y-3 transition-colors">
              <div className="w-16 h-16 mx-auto rounded-full bg-coral-50 dark:bg-coral-950/50 text-coral-400 flex items-center justify-center text-3xl">
                <FaBookmark />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">No saved posts yet</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Whenever you find an office joke or salary reality check that hits too close to home, click the bookmark icon to save it here!
              </p>
              <NavLink
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Browse Office Feed
              </NavLink>
            </div>
          )}
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-18">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
};
