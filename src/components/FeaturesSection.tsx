import React from 'react';
import { FEATURES_DATA } from '../data/coffeeData';
import { FeatureItem } from '../types';

interface FeaturesSectionProps {
  onSelectItem: (item: FeatureItem) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectItem }) => {
  return (
    <section 
      id="features"
      className="w-full bg-[#f8f3ec] py-14 sm:py-20 border-b border-stone-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="features-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2b170e]"
          >
            Features
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-md mx-auto">
            Discover our core handcrafted drink styles, roasted and prepared by master baristas.
          </p>
        </div>

        {/* 4 Feature Columns with thin vertical dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-300">
          {FEATURES_DATA.map((item, idx) => (
            <div
              key={item.id}
              id={`feature-item-${item.id}`}
              onClick={() => onSelectItem(item)}
              className="flex flex-col items-center text-center px-4 sm:px-6 group cursor-pointer transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Circular Coffee Badge */}
              <div className="relative mb-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover group-hover:rotate-6 transition-transform duration-500"
                  />
                </div>
                {/* Subtle subtle golden indicator ring */}
                <div className="absolute inset-0 rounded-full border-2 border-amber-600/30 pointer-events-none" />
              </div>

              {/* Title */}
              <h3 
                id={`feature-heading-${item.id}`}
                className="text-xl sm:text-2xl font-bold text-[#2b170e] mb-2 group-hover:text-amber-800 transition-colors"
              >
                {item.title}
              </h3>

              {/* Description */}
              <p 
                id={`feature-desc-${item.id}`}
                className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs font-normal"
              >
                {item.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                {item.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-amber-900 bg-amber-100/60 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
