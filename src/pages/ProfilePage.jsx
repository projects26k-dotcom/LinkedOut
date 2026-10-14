import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { PostCard } from '../components/PostCard';
import {
  FaEdit,
  FaCheck,
  FaAward,
  FaCoffee,
  FaMapMarkerAlt,
  FaBuilding,
  FaBriefcase,
  FaShieldAlt,
  FaLaughSquint
} from 'react-icons/fa';

export const ProfilePage = () => {
  const { currentUser, setCurrentUser, posts, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    title: currentUser.title,
    company: currentUser.company,
    bio: currentUser.bio,
    location: currentUser.location,
  });

  const userPosts = posts.filter(p => !p.isAnonymous && p.author.name === currentUser.name);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
    addToast('Corporate persona updated! 👔', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">

        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-18">
          <LeftSidebar />
        </div>

        {/* Center Profile Main */}
        <main className="col-span-1 md:col-span-8 lg:col-span-9 space-y-4">
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-200 overflow-hidden">
            {/* Banner */}
            <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-coral-400 via-coral-500 to-amber-500 relative">
              <img
                src={currentUser.banner}
                alt="Banner"
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
            </div>

            {/* Profile Content */}
            <div className="px-6 pb-6 pt-0 relative">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-4">
                <div className="relative inline-block">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" title="Status: Online" />
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 border border-gray-300 hover:border-coral-500 text-gray-700 hover:text-coral-600 rounded-full text-xs font-bold transition-colors shadow-2xs"
                >
                  <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Personal'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Company / Workplace</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-gray-700 block mb-1">Corporate Job Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-gray-700 block mb-1">Relatable Bio</label>
                    <textarea
                      rows={2}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coral-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <FaCheck /> Save Corporate Persona
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <h1 className="text-xl font-black text-gray-900">{currentUser.name}</h1>
                  <p className="text-sm text-gray-600 font-medium">{currentUser.title}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <FaBuilding className="text-coral-500" /> {currentUser.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-amber-500" /> {currentUser.location}
                    </span>
                    <span className="flex items-center gap-1 text-coral-600 font-semibold">
                      <FaCoffee /> {currentUser.coffeeCount} cups downed
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 pt-2 leading-relaxed max-w-2xl bg-gray-50 p-3 rounded-xl border border-gray-100">
                    "{currentUser.bio}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Satirical Badges Section */}
          <div className="bg-white rounded-xl shadow-card p-5 border border-gray-200">
            <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaAward className="text-amber-500 text-base" /> Workplace Honors & Badges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentUser.badges.map((badge, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-br from-gray-50 to-coral-50/30 rounded-xl border border-gray-200 text-center space-y-1">
                  <span className="text-2xl">{badge.icon}</span>
                  <h3 className="font-bold text-xs text-gray-800">{badge.label}</h3>
                  <p className="text-[10px] text-gray-500">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User's Public Vents */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FaLaughSquint className="text-coral-500" /> My Public LinkedOut Posts ({userPosts.length})
            </h2>

            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-gray-200 text-center text-xs text-gray-500">
                You haven't posted any non-anonymous rants yet. Anonymous posts are kept separate for your corporate safety! 🕵️
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};
