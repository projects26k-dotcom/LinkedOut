import React from 'react';
import { useApp } from '../context/AppContext';
import { FaSortAmountDown, FaFire, FaClock, FaComments } from 'react-icons/fa';

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
    <div className="bg-white rounded-xl shadow-card p-3 border border-gray-200 space-y-2.5">
      {/* Category Pills Slider / Wrap */}
      <div className="relative">
        {/* Soft white fade gradient on the right edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-10 rounded-r-xl" />

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
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-coral-50 hover:text-coral-600 hover:border-coral-200'}
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-gray-200/70 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort options row */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100 text-gray-500">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-medium text-gray-500">Feed View:</span>
          <span className="font-semibold text-gray-800">
            {activeCategory === 'all' ? 'All Workplace Humor' : activeCategory}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px]">
          <span className="text-gray-400">Sort by:</span>
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setSortBy('recent')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                sortBy === 'recent' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Recent
            </button>
            <button
              type="button"
              onClick={() => setSortBy('top')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-0.5 ${
                sortBy === 'top' ? 'bg-white text-coral-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <FaFire className="text-[10px]" /> Top
            </button>
            <button
              type="button"
              onClick={() => setSortBy('debated')}
              className={`px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-0.5 ${
                sortBy === 'debated' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'
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
