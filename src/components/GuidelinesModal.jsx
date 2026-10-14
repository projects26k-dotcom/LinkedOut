import React from 'react';
import { FaShieldAlt, FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

export const GuidelinesModal = () => {
  const { isGuidelinesOpen, setIsGuidelinesOpen } = useApp();

  if (!isGuidelinesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsGuidelinesOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center text-2xl">
            <FaShieldAlt />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">LinkedOut Code of Conduct</h2>
            <p className="text-xs text-gray-500">Where work gets real, without landing in HR court</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div className="p-3 bg-coral-50/70 border border-coral-200 rounded-xl text-xs text-coral-800 flex items-start gap-2">
            <FaExclamationTriangle className="text-coral-500 text-base mt-0.5 flex-shrink-0" />
            <span>
              <strong>The Golden Rule:</strong> Punch up at absurd corporate culture, endless meetings, and jargon. Never punch down at individual colleagues or interns.
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                <FaCheck />
              </span>
              <div>
                <strong className="text-gray-900 block font-semibold">1. No Personal Attacks</strong>
                <p className="text-gray-600">
                  Satirize behaviors and bureaucratic corporate absurdity, never specific humans. Harassment and bullying are strictly prohibited.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                <FaCheck />
              </span>
              <div>
                <strong className="text-gray-900 block font-semibold">2. No Naming Individuals (Doxxing)</strong>
                <p className="text-gray-600">
                  Do not mention real first-and-last names, direct personal emails, phone numbers, or private internal Slack messages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                <FaCheck />
              </span>
              <div>
                <strong className="text-gray-900 block font-semibold">3. No Confidential Company Secrets</strong>
                <p className="text-gray-600">
                  Keep proprietary codebase details, non-public earnings releases, and non-disclosure trade secrets to yourself. We roast the coffee, not the SEC filings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] mt-0.5 flex-shrink-0">
                <FaCheck />
              </span>
              <div>
                <strong className="text-gray-900 block font-semibold">4. Use Anonymous Mode Wisely</strong>
                <p className="text-gray-600">
                  Anonymous posts protect you from retribution when sharing salary bands, layoff tea, or office gossip. Use it responsibly to help other workers.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={() => setIsGuidelinesOpen(false)}
            className="w-full sm:w-auto px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            I Swear to Keep Work Real & Fun
          </button>
        </div>
      </div>
    </div>
  );
};
