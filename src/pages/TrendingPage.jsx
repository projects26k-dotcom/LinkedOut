import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { TRENDING_TOPICS } from '../data/mockSidebarData';
import { FaFire, FaChartLine, FaLaughSquint, FaArrowRight, FaCommentAlt } from 'react-icons/fa';

export const TrendingPage = () => {
  const { posts, setSearchQuery, setActiveCategory } = useApp();
  const navigate = useNavigate();

  // Top 3 most laughed posts
  const topLaughedPosts = [...posts].sort((a, b) => b.likesCount - a.likesCount).slice(0, 3);

  const handleSelectTrend = (item) => {
    setSearchQuery(item.topic.replace('#', ''));
    if (item.category) setActiveCategory(item.category);
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Center Trending Section */}
        <main className="col-span-1 md:col-span-8 lg:col-span-6 space-y-4">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-coral-500 via-coral-600 to-amber-500 text-white p-6 rounded-2xl shadow-card relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-white inline-block mb-2">
                Watercooler Wire
              </span>
              <h1 className="text-xl sm:text-2xl font-black">Trending Workplace Humors</h1>
              <p className="text-xs text-white/90 mt-1 max-w-md">
                The most relatable rants, savage boss memes, and unhinged meeting chronicles rocking corporate offices today.
              </p>
            </div>
          </div>

          {/* Trending Topics Grid */}
          <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <FaFire className="text-coral-500" /> Hot Workplace Topics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRENDING_TOPICS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTrend(item)}
                  className="text-left p-3 rounded-xl border border-gray-200 hover:border-coral-400 hover:bg-coral-50/40 transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full">
                      #{idx + 1} • {item.tag}
                    </span>
                    <span className="text-[10px] text-gray-400">{item.count}</span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 group-hover:text-coral-600 transition-colors">
                    {item.topic}
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                    <span>Category: <strong>{item.category}</strong></span>
                    <span className="text-coral-500 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View feed <FaArrowRight className="text-[8px]" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hall of Fame / Top Laughed Posts */}
          <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              <FaLaughSquint className="text-amber-500" /> Hall of Fame: Top Laughed Posts
            </h2>

            <div className="space-y-3">
              {topLaughedPosts.map((post, idx) => (
                <div key={post.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-coral-500 text-white flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {post.isAnonymous ? 'Anonymous Employee' : post.author?.name}
                    </span>
                    <span className="text-[11px] font-bold text-coral-600 bg-coral-100 px-2 py-0.5 rounded-full">
                      😂 {post.likesCount} laughs
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 italic line-clamp-3">
                    "{post.content}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                    <span>{post.category}</span>
                    <button 
                      type="button" 
                      onClick={() => { setSearchQuery(post.author.name); navigate('/'); }}
                      className="text-coral-600 hover:underline font-semibold"
                    >
                      Read full thread & comments
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
