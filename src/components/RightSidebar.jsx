import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFire, FaShieldAlt, FaExternalLinkAlt, FaChevronRight } from 'react-icons/fa';
import { CorporateBingo } from './CorporateBingo';
import { TRENDING_TOPICS } from '../data/mockSidebarData';
import { useApp } from '../context/AppContext';

export const RightSidebar = () => {
  const { setSearchQuery, setActiveCategory, setIsGuidelinesOpen } = useApp();

  const handleTopicClick = (topic) => {
    setSearchQuery(topic.topic.replace('#', ''));
    if (topic.category) {
      setActiveCategory(topic.category);
    }
  };

  return (
    <aside className="w-full space-y-3.5">
      {/* Trending in the Office */}
      <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <FaFire className="text-amber-500 flex-shrink-0 text-sm" />
            <h3 className="font-bold text-gray-900 text-sm truncate">Trending in the Office</h3>
          </div>
          <span className="text-[10px] uppercase font-bold text-coral-600 bg-coral-50 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
            Live Vents
          </span>
        </div>

        <div className="space-y-2.5">
          {TRENDING_TOPICS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTopicClick(item)}
              className="w-full text-left group flex items-start justify-between py-1 hover:bg-gray-50 px-1.5 -mx-1.5 rounded-lg transition-colors"
            >
              <div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-coral-600 transition-colors line-clamp-1">
                  {idx + 1}. {item.topic}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                  <span>{item.count}</span>
                  <span>•</span>
                  <span className="text-coral-500 font-medium">{item.category}</span>
                </div>
              </div>
              <FaChevronRight className="text-[10px] text-gray-300 group-hover:text-coral-500 mt-1 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Corporate Bingo Interactive Widget */}
      <CorporateBingo />

      {/* Content Safety Guidelines Card */}
      <div className="bg-gradient-to-br from-gray-50 to-coral-50/40 rounded-xl p-4 border border-coral-200/70 shadow-card">
        <div className="flex items-center gap-2 text-coral-600 font-bold text-xs mb-2">
          <FaShieldAlt className="text-sm" /> Content Guidelines
        </div>
        <ul className="text-[11px] text-gray-600 space-y-1.5 list-disc list-inside leading-snug">
          <li><strong>No personal attacks:</strong> Roast the culture, not the intern.</li>
          <li><strong>No naming individuals:</strong> Protect coworkers' identities.</li>
          <li><strong>No confidential company info:</strong> Satire only; don't get subpoenaed.</li>
        </ul>
        <button
          type="button"
          onClick={() => setIsGuidelinesOpen(true)}
          className="mt-3 text-[11px] font-semibold text-coral-600 hover:text-coral-700 hover:underline flex items-center gap-1"
        >
          <span>Read Full Community Pledge</span>
          <FaExternalLinkAlt className="text-[9px]" />
        </button>
      </div>

      {/* LinkedOut Footer */}
      <footer className="px-2 text-center text-[11px] text-gray-400 space-y-1.5">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          <button type="button" onClick={() => setIsGuidelinesOpen(true)} className="hover:text-gray-600">Parody Policy</button>
          <a href="#about" onClick={(e) => { e.preventDefault(); alert("LinkedOut: The premier corporate satire network. No unsolicited recruiter InMails allowed."); }} className="hover:text-gray-600">About</a>
          <a href="#coffee" onClick={(e) => { e.preventDefault(); alert("Thanks for supporting the caffeine fuel fund! ☕"); }} className="hover:text-gray-600">Coffee Fund</a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy guarantee: We don't send weekly email digests titled 'People are looking at your profile'."); }} className="hover:text-gray-600">Privacy</a>
        </div>
        <p className="text-[10px] text-gray-400">
          LinkedOut Corporation © {new Date().getFullYear()} • "Where work gets real"
        </p>
      </footer>
    </aside>
  );
};
