import React from 'react';
import { Coffee, Star, Sparkles } from 'lucide-react';
import { VISIT_US_CARDS } from '../data/coffeeData';
import { CoffeeCardItem } from '../types';

interface MorningSpecialSectionProps {
  onSelectCard: (item: CoffeeCardItem) => void;
  onOrderAhead: () => void;
  onViewMenu: () => void;
}

export const MorningSpecialSection: React.FC<MorningSpecialSectionProps> = ({
  onSelectCard,
  onOrderAhead,
  onViewMenu,
}) => {
  return (
    <section 
      id="visit-us"
      className="w-full bg-[#f8f3eb] py-14 sm:py-20 border-b border-stone-200/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Morning Happy - */}
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold">
              <Coffee className="w-3.5 h-3.5 text-amber-800" />
              <span>Fresh Morning Specials</span>
            </div>

            <h2 
              id="morning-happy-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2b170e]"
            >
              Morning Happy -
            </h2>

            <p 
              id="morning-happy-desc"
              className="text-stone-600 text-sm sm:text-base leading-relaxed"
            >
              Start each day with handcrafted perfection. From smooth velvet flat whites to single-origin pour overs, experience coffee roasted fresh daily by our certified master baristas.
            </p>

            {/* Action buttons (Light pill + Dark brown pill) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="morning-order-ahead-btn"
                onClick={onOrderAhead}
                className="px-6 py-2.5 rounded-full bg-white text-[#2b170e] border border-stone-300 font-bold text-xs sm:text-sm shadow-sm hover:bg-stone-50 hover:shadow hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Order Ahead
              </button>

              <button
                id="morning-view-menu-btn"
                onClick={onViewMenu}
                className="px-6 py-2.5 rounded-full bg-[#3a2217] hover:bg-[#25150e] text-white font-bold text-xs sm:text-sm shadow hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                View Menu
              </button>
            </div>
          </div>

          {/* Right Column: Visit Us TODAY & 4 Drink Cards */}
          <div className="lg:col-span-8 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 
                id="visit-us-today-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b170e]"
              >
                Visit Us TODAY
              </h3>

              {/* Decorative 4-point sparkle icon matching the screenshot */}
              <div className="text-amber-800/80 pr-2">
                <Sparkles className="w-6 h-6 stroke-[1.5]" />
              </div>
            </div>

            {/* 4 Cards in Horizontal Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {VISIT_US_CARDS.map((item) => (
                <div
                  key={item.id}
                  id={`drink-card-${item.id}`}
                  onClick={() => onSelectCard(item)}
                  className="bg-white rounded-xl p-2.5 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-stone-200/80 hover:border-amber-700/40 cursor-pointer group flex flex-col justify-between"
                >
                  {/* Image container */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-stone-100 mb-3 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#2b170e] line-clamp-1 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h4>
                    
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="line-clamp-1">{item.category}</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
