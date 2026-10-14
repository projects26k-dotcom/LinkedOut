import React, { useState } from 'react';
import { 
  FaUserSecret, 
  FaPaperPlane, 
  FaSmile, 
  FaTag, 
  FaEyeSlash,
  FaSignInAlt
} from 'react-icons/fa';
import { useUser, useClerk } from '@clerk/react';
import { useApp } from '../context/AppContext';

export const CreatePost = () => {
  const { addPost, categories } = useApp();
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Funny Thought');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const emojiShortcuts = ['☕', '🤡', '📉', '🥱', '🗑️', '🏃‍♂️', '💀', '💸', '🤫'];

  // User details from Clerk
  const authorName = isSignedIn && user 
    ? (user.fullName || user.firstName || user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Employee')
    : 'Guest Employee';

  const authorAvatar = isSignedIn && user 
    ? user.imageUrl 
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';

  const authorTitle = isSignedIn && user?.unsafeMetadata?.title 
    ? String(user.unsafeMetadata.title) 
    : 'Employee';

  const authorCompany = isSignedIn && user?.unsafeMetadata?.company 
    ? String(user.unsafeMetadata.company) 
    : 'Company not set';

  const handleInputFocus = () => {
    if (!isSignedIn) {
      if (openSignIn) openSignIn();
      return;
    }
    setIsFocused(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      if (openSignIn) openSignIn();
      return;
    }

    if (!content.trim()) return;

    addPost({
      content: content.trim(),
      category,
      isAnonymous,
      authorDetails: {
        name: authorName,
        avatar: authorAvatar,
        title: authorTitle,
        company: authorCompany
      }
    });

    setContent('');
    setIsFocused(false);
  };

  const handleAddEmoji = (emoji) => {
    if (!isSignedIn) {
      if (openSignIn) openSignIn();
      return;
    }
    setContent(prev => prev + ' ' + emoji);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-4 border border-gray-200 dark:border-gray-800 transition-all duration-200">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Top Header: Avatar / Anonymous Indicator & Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              {isAnonymous ? (
                <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg shadow-sm border border-gray-700">
                  <FaUserSecret />
                </div>
              ) : (
                <img 
                  src={authorAvatar} 
                  alt={authorName} 
                  className="w-10 h-10 rounded-full object-cover border border-coral-300 dark:border-coral-800"
                />
              )}
              {isAnonymous && (
                <span className="absolute -bottom-1 -right-1 bg-coral-500 text-white p-0.5 rounded-full text-[8px]" title="Anonymous Mode">
                  <FaEyeSlash />
                </span>
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                {isAnonymous ? (
                  <span className="text-gray-800 dark:text-gray-200 flex items-center gap-1">
                    Anonymous Employee <span className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 py-0.2 rounded font-normal">Ghost</span>
                  </span>
                ) : (
                  <span>{authorName}</span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                {isAnonymous 
                  ? 'Your company and identity stay completely hidden' 
                  : (isSignedIn ? `${authorTitle} • ${authorCompany}` : 'Sign in to post from your corporate persona')}
              </p>
            </div>
          </div>

          {/* Anonymous Toggle Switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/60 px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)} 
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-coral-500"></div>
            </div>
            <span className={`text-xs font-semibold ${isAnonymous ? 'text-coral-600 dark:text-coral-400' : 'text-gray-600 dark:text-gray-300'}`}>
              Anonymous
            </span>
          </label>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={isFocused || content.length > 0 ? 3 : 2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleInputFocus}
            onClick={!isSignedIn ? handleInputFocus : undefined}
            placeholder={
              !isSignedIn
                ? "Click here to sign in and share your workplace gossip or funny thoughts..."
                : (isAnonymous 
                  ? "Post office gossip or salary tea anonymously... what's happening at your company?" 
                  : "Vent your 9-to-5 soul... what happened in that meeting that could've been an email?")
            }
            className="w-full bg-[#f9fafb] dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm p-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-coral-400 focus:bg-white dark:focus:bg-gray-900 focus:outline-none resize-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Emoji Bar */}
        {(isFocused || content.length > 0) && (
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
              <FaSmile /> Quick:
            </span>
            {emojiShortcuts.map((em, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddEmoji(em)}
                className="hover:scale-125 transition-transform px-1 py-0.5 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {em}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Actions: Category Dropdown & Post Button */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <FaTag className="text-gray-400 text-xs hidden sm:inline" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-coral-400 cursor-pointer"
            >
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {content.length > 0 && (
              <span className={`text-[11px] ${content.length > 280 ? 'text-coral-500 font-bold' : 'text-gray-400'}`}>
                {content.length} chars
              </span>
            )}
            
            {!isSignedIn ? (
              <button
                type="button"
                onClick={() => openSignIn?.()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/25 transition-all shadow-xs"
              >
                <FaSignInAlt className="text-[10px]" />
                <span>Sign in to Post</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!content.trim()}
                className={`
                  flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs
                  ${content.trim() 
                    ? 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/25 hover:scale-102 cursor-pointer' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}
                `}
              >
                <FaPaperPlane className="text-[10px]" />
                <span>Post to LinkedOut</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
