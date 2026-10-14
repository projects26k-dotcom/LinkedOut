import React from 'react';
import { useApp } from '../context/AppContext';
import { FaFire, FaComments } from 'react-icons/fa';

export const CategoryFilter = () => {
  const { 
    categories, 
    activeCategory, 
    setActiveCategory, 
    sortBy, 
    setSortBy,
    posts 
  } = useApp();

  const getCategoryCount = (catId) => {
    if (catId === 'all') return posts.length;
    return posts.filter(p => p.category === catId).length;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-card p-3 border border-gray-200 dark:border-gray-800 space-y-2.5 transition-colors">
      {/* Category Pills Slider / Wrap */}
      <div className="relative">
        {/* Soft fade gradient on the right edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent z-10 rounded-r-xl" />

        {/* Horizontally scrollable pill row */}
        <div className="flex items-center gap-2 overflow-x-auto flex-nowrap whitespace-nowrap scroll-smooth snap-x snap-mandatory py-1 pr-10 text-xs no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium whitespace-nowrap flex-shrink-0 snap-start transition-all border select-none
                  ${isActive 
                    ? 'bg-coral-500 text-white border-coral-600 shadow-sm shadow-coral-500/20' 
                    : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-coral-50 dark:hover:bg-coral-950/40 hover:text-coral-600 dark:hover:text-coral-400 hover:border-coral-200 dark:hover:border-coral-800'}
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-gray-200/70 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort options row */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Feed View:</span>
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {activeCategory === 'all' ? 'All Workplace Humor' : activeCategory}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <span className="text-gray-400 dark:text-gray-500">Sort by:</span>
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setSortBy('recent')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                sortBy === 'recent' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-2xs' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={() => setSortBy('top')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-0.5 ${
                sortBy === 'top' ? 'bg-white dark:bg-gray-700 text-coral-600 dark:text-coral-400 shadow-2xs' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <FaFire className="text-[10px]" /> Top
            </button>
            <button
              type="button"
              onClick={() => setSortBy('debated')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-0.5 ${
                sortBy === 'debated' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <FaComments className="text-[10px]" /> Buzzing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
