import React from 'react';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { CreatePost } from '../components/CreatePost';
import { CategoryFilter } from '../components/CategoryFilter';
import { PostCard } from '../components/PostCard';
import { WelcomeBanner } from '../components/WelcomeBanner';
import { SignedIn, SignedOut } from '../components/ClerkWrapper';
import { FaSearch, FaTimes, FaInbox, FaRedo } from 'react-icons/fa';

export const FeedPage = () => {
  const { 
    filteredPosts, 
    searchQuery, 
    setSearchQuery, 
    activeCategory, 
    setActiveCategory 
  } = useApp();

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* 3-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Column (Desktop: 3 cols) */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Center Column (Feed: 6 cols on lg, 8 cols on md, full on mobile) */}
        <main className="col-span-1 md:col-span-8 lg:col-span-6 space-y-4">
          
          {/* Welcome section for logged-out visitors */}
          <SignedOut>
            <WelcomeBanner />
          </SignedOut>

          {/* Create Post Card (only visible when signed in) */}
          <SignedIn>
            <CreatePost />
          </SignedIn>

          {/* Category Filter Pills & Sort Selector */}
          <CategoryFilter />

          {/* Active Search / Filter Banner if searching */}
          {searchQuery && (
            <div className="bg-coral-50 dark:bg-coral-950/40 border border-coral-200 dark:border-coral-800 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-coral-800 dark:text-coral-300">
              <div className="flex items-center gap-2">
                <FaSearch className="text-coral-500" />
                <span>Showing search results for: <strong>"{searchQuery}"</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-coral-600 dark:text-coral-400 hover:text-coral-800 font-semibold flex items-center gap-1"
              >
                Clear <FaTimes />
              </button>
            </div>
          )}

          {/* Feed Posts List */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-8 border border-gray-200 dark:border-gray-800 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-2xl">
                <FaInbox />
              </div>
              <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">No posts found</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {searchQuery 
                  ? `No workplace rants matching "${searchQuery}". Maybe it was deleted before HR noticed?`
                  : `No posts in category "${activeCategory}" yet.`}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                <FaRedo className="text-[10px]" /> Reset Feed Filters
              </button>
            </div>
          )}
        </main>

        {/* Right Column (Desktop: 3 cols on lg, hidden on md or moved down) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-18">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
};
