import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FaRedoAlt, FaTrophy, FaCheck, FaVolumeUp } from 'react-icons/fa';
import { BINGO_WORDS } from '../data/mockSidebarData';

export const CorporateBingo = () => {
  const [selectedIndices, setSelectedIndices] = useState(() => {
    const saved = localStorage.getItem('linkedout_bingo');
    return saved ? JSON.parse(saved) : [1]; // "Per my last email" pre-selected as humor!
  });
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    localStorage.setItem('linkedout_bingo', JSON.stringify(selectedIndices));
    checkBingo(selectedIndices);
  }, [selectedIndices]);

  const toggleTile = (idx) => {
    if (selectedIndices.includes(idx)) {
      setSelectedIndices(selectedIndices.filter(i => i !== idx));
    } else {
      const next = [...selectedIndices, idx];
      setSelectedIndices(next);
      checkBingo(next);
    }
  };

  const checkBingo = (indices) => {
    // 3x3 winning patterns (rows, columns, diagonals)
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    const won = winLines.some(line => line.every(idx => indices.includes(idx)));
    if (won && !hasWon) {
      setHasWon(true);
      triggerCelebration();
    } else if (!won && hasWon) {
      setHasWon(false);
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF6B4A', '#FBBF24', '#34D399', '#60A5FA']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const resetBingo = () => {
    setSelectedIndices([]);
    setHasWon(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-base">☕</span>
          <h3 className="font-bold text-gray-900 text-sm">Meeting Bingo</h3>
        </div>
        <button
          type="button"
          onClick={resetBingo}
          className="text-gray-400 hover:text-coral-500 text-xs p-1 rounded transition-colors flex items-center gap-1"
          title="Reset Bingo Board"
        >
          <FaRedoAlt className="text-[10px]" /> <span className="text-[11px]">Reset</span>
        </button>
      </div>

      <p className="text-[11px] text-gray-500 mb-3">
        Hear a corporate buzzword in your sync? Click to mark it!
      </p>

      {/* Bingo Grid 3x3 */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {BINGO_WORDS.map((word, idx) => {
          const isSelected = selectedIndices.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleTile(idx)}
              className={`
                h-16 p-1.5 rounded-lg text-[10px] font-medium flex flex-col items-center justify-center transition-all leading-tight border relative select-none
                ${isSelected 
                  ? 'bg-coral-500 text-white border-coral-600 shadow-inner scale-[0.98]' 
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-coral-300 hover:bg-coral-50/50'}
              `}
            >
              {isSelected && (
                <span className="absolute top-1 right-1 text-[8px] bg-white/20 rounded-full p-0.5">
                  <FaCheck />
                </span>
              )}
              <span className="line-clamp-3">{word}</span>
            </button>
          );
        })}
      </div>

      {/* Bingo Notification Status */}
      {hasWon && (
        <div className="mt-3 p-2.5 bg-gradient-to-r from-coral-500 to-amber-500 rounded-lg text-white text-center shadow-md animate-bounceShort">
          <div className="font-extrabold text-xs flex items-center justify-center gap-1">
            <FaTrophy className="text-yellow-300" /> BINGO! SURVIVED THE SYNC! 🎉
          </div>
          <p className="text-[10px] text-coral-100 mt-0.5">
            You've reached peak corporate enlightenment. Claim your metaphorical pizza slice.
          </p>
        </div>
      )}
    </div>
  );
};
