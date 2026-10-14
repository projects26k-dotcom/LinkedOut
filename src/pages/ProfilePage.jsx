import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';
import { useApp } from '../context/AppContext';
import { LeftSidebar } from '../components/LeftSidebar';
import { PostCard } from '../components/PostCard';
import {
  FaEdit,
  FaCheck,
  FaAward,
  FaCoffee,
  FaMapMarkerAlt,
  FaBuilding,
  FaEnvelope,
  FaLaughSquint
} from 'react-icons/fa';

export const ProfilePage = () => {
  const { user } = useUser();
  const { currentUser, setCurrentUser, posts, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Read real Clerk user data with safe fallbacks
  const realName = user 
    ? (user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Employee')
    : currentUser.name;

  const realAvatar = user?.imageUrl || currentUser.avatar;
  const realEmail = user?.primaryEmailAddress?.emailAddress || '';
  const realTitle = user?.unsafeMetadata?.title ? String(user.unsafeMetadata.title) : 'Employee';
  const realCompany = user?.unsafeMetadata?.company ? String(user.unsafeMetadata.company) : 'Company not set';
  const realBio = user?.unsafeMetadata?.bio ? String(user.unsafeMetadata.bio) : currentUser.bio;
  const realLocation = user?.unsafeMetadata?.location ? String(user.unsafeMetadata.location) : currentUser.location;

  const [formData, setFormData] = useState({
    name: realName,
    title: realTitle,
    company: realCompany,
    bio: realBio,
    location: realLocation,
  });

  // Sync formData whenever Clerk user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: realName,
        title: realTitle,
        company: realCompany,
        bio: realBio,
        location: realLocation,
      });
    }
  }, [user]);

  const userPosts = posts.filter(p => !p.isAnonymous && (p.author.name === realName || p.author.name === currentUser.name));

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (user) {
        // Update Clerk user's unsafeMetadata
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            title: formData.title.trim() || 'Employee',
            company: formData.company.trim() || 'Company not set',
            bio: formData.bio.trim(),
            location: formData.location.trim(),
          }
        });
      }

      setCurrentUser(prev => ({
        ...prev,
        name: formData.name,
        title: formData.title,
        company: formData.company,
        bio: formData.bio,
        location: formData.location,
      }));

      setIsEditing(false);
      addToast('Corporate persona updated! 👔', 'success');
    } catch (err) {
      console.error('Failed to update profile:', err);
      addToast('Failed to save changes. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-card border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
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
                    src={realAvatar}
                    alt={realName}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-lg"
                  />
                  <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" title="Status: Online" />
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 border border-gray-300 dark:border-gray-700 hover:border-coral-500 text-gray-700 dark:text-gray-200 hover:text-coral-600 rounded-full text-xs font-bold transition-colors shadow-2xs"
                >
                  <FaEdit /> {isEditing ? 'Cancel Edit' : 'Edit Persona'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Corporate Job Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Senior Meeting Dodger"
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-coral-500 text-gray-900 dark:text-white"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Company / Workplace</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Corp & Co."
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-coral-500 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Office Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Home Office"
                        className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-coral-500 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Email (from Clerk)</label>
                      <input
                        type="text"
                        value={realEmail}
                        disabled
                        className="w-full p-2 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Relatable Bio</label>
                    <textarea
                      rows={2}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Share your work survival motto..."
                      className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-coral-500 text-gray-900 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaCheck /> {isSaving ? 'Saving to Clerk...' : 'Save Corporate Persona'}
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <h1 className="text-xl font-black text-gray-900 dark:text-white">{realName}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{realTitle}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <FaBuilding className="text-coral-500" /> {realCompany}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-amber-500" /> {realLocation}
                    </span>
                    {realEmail && (
                      <span className="flex items-center gap-1">
                        <FaEnvelope className="text-blue-500" /> {realEmail}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-coral-600 dark:text-coral-400 font-semibold">
                      <FaCoffee /> {currentUser.coffeeCount} cups downed
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 pt-2 leading-relaxed max-w-2xl bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                    "{realBio}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Satirical Badges Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-5 border border-gray-200 dark:border-gray-800 transition-colors">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaAward className="text-amber-500 text-base" /> Workplace Honors & Badges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {currentUser.badges.map((badge, idx) => (
                <div key={idx} className="p-3 bg-gradient-to-br from-gray-50 to-coral-50/30 dark:from-gray-800 dark:to-coral-950/20 rounded-xl border border-gray-200 dark:border-gray-700 text-center space-y-1">
                  <span className="text-2xl">{badge.icon}</span>
                  <h3 className="font-bold text-xs text-gray-800 dark:text-gray-200">{badge.label}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User's Public Vents */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FaLaughSquint className="text-coral-500" /> My Public LinkedOut Posts ({userPosts.length})
            </h2>

            {userPosts.length > 0 ? (
              <div className="space-y-4">
                {userPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500 dark:text-gray-400">
                You haven't posted any non-anonymous rants yet. Anonymous posts are kept separate for your corporate safety! 🕵️
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
};
