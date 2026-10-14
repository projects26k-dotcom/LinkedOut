import React, { useState } from 'react';
import { 
  FaUserSecret, 
  FaPaperPlane, 
  FaSmile, 
  FaTag, 
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const CreatePost = () => {
  const { currentUser, addPost, categories } = useApp();
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Funny Thought');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const emojiShortcuts = ['☕', '🤡', '📉', '🥱', '🗑️', '🏃‍♂️', '💀', '💸', '🤫'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPost({
      content: content.trim(),
      category,
      isAnonymous
    });

    setContent('');
    setIsFocused(false);
  };

  const handleAddEmoji = (emoji) => {
    setContent(prev => prev + ' ' + emoji);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200 transition-all duration-200">
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
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-10 h-10 rounded-full object-cover border border-coral-300"
                />
              )}
              {isAnonymous && (
                <span className="absolute -bottom-1 -right-1 bg-coral-500 text-white p-0.5 rounded-full text-[8px]" title="Anonymous Mode">
                  <FaEyeSlash />
                </span>
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                {isAnonymous ? (
                  <span className="text-gray-800 flex items-center gap-1">
                    Anonymous Employee <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded font-normal">Ghost</span>
                  </span>
                ) : (
                  <span>{currentUser.name}</span>
                )}
              </div>
              <p className="text-[11px] text-gray-400">
                {isAnonymous ? 'Your company and identity stay completely hidden' : currentUser.title}
              </p>
            </div>
          </div>

          {/* Anonymous Toggle Switch */}
          <label className="flex items-center gap-2 cursor-pointer select-none bg-gray-50 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200 transition-colors">
            <div className="relative">
              <input 
                type="checkbox" 
                checked={isAnonymous} 
                onChange={(e) => setIsAnonymous(e.target.checked)} 
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-coral-500"></div>
            </div>
            <span className={`text-xs font-semibold ${isAnonymous ? 'text-coral-600' : 'text-gray-600'}`}>
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
            onFocus={() => setIsFocused(true)}
            placeholder={
              isAnonymous 
                ? "Post office gossip or salary tea anonymously... what's happening at your company?" 
                : "Vent your 9-to-5 soul... what happened in that meeting that could've been an email?"
            }
            className="w-full bg-[#f9fafb] text-gray-900 text-sm p-3 rounded-lg border border-gray-200 focus:border-coral-400 focus:bg-white focus:outline-none resize-none transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Emoji Bar */}
        {(isFocused || content.length > 0) && (
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <FaSmile /> Quick:
            </span>
            {emojiShortcuts.map((em, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddEmoji(em)}
                className="hover:scale-125 transition-transform px-1 py-0.5 rounded text-sm hover:bg-gray-100"
              >
                {em}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Actions: Category Dropdown & Post Button */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <FaTag className="text-gray-400 text-xs hidden sm:inline" />
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-coral-400 cursor-pointer"
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
            <button
              type="submit"
              disabled={!content.trim()}
              className={`
                flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm
                ${content.trim() 
                  ? 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/25 hover:scale-102 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              <FaPaperPlane className="text-[10px]" />
              <span>Post to LinkedOut</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
