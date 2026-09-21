import React, { useState } from 'react';
import { ASSETS, TASTING_FLIGHT } from '../data/coffeeData';
import { TastingFlightItem } from '../types';

interface BarShowcaseSectionProps {
  onSelectFlight: (flight: TastingFlightItem) => void;
}

export const BarShowcaseSection: React.FC<BarShowcaseSectionProps> = ({ onSelectFlight }) => {
  const [activeFlight, setActiveFlight] = useState<TastingFlightItem | null>(null);

  return (
    <section 
      id="tasting-bar"
      className="relative w-full overflow-hidden bg-[#1f130d] text-white"
    >
      {/* Background Cafe Counter Image with Row of 4 Cups */}
      <div className="relative w-full min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center">
        {/* Full Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.barFlight}
            alt="Artisanal coffee flight lined up on wooden cafe counter"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Subtle gradient overlay to keep text on left completely crisp and readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-3/5" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-md space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Signature Barista Flight
            </span>

            <h2 
              id="bar-showcase-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Win Your Hour!
            </h2>

            <p 
              id="bar-showcase-desc"
              className="text-stone-300 text-sm sm:text-base leading-relaxed"
            >
              Take a sensory journey with our seasonal four-cup tasting flight. Compare bean origins, roast profiles, and extraction methods guided by our head barista.
            </p>

            <div className="pt-2">
              <button
                id="bar-showcase-btn"
                onClick={() => onSelectFlight(TASTING_FLIGHT[0])}
                className="px-6 py-2.5 rounded-full bg-[#4a2e1d] hover:bg-[#603b25] text-white font-bold text-xs sm:text-sm border border-amber-600/30 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Experience Flight
              </button>
            </div>
          </div>

          {/* Interactive tasting notes chips along the bottom bar */}
          <div className="mt-12 sm:mt-16 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TASTING_FLIGHT.map((flight) => (
              <button
                key={flight.id}
                onClick={() => {
                  setActiveFlight(flight);
                  onSelectFlight(flight);
                }}
                className={`text-left p-3 rounded-lg backdrop-blur-md transition-all duration-200 cursor-pointer ${
                  activeFlight?.id === flight.id
                    ? 'bg-amber-950/70 border border-amber-500/50 shadow-md'
                    : 'bg-black/40 hover:bg-black/60 border border-white/10'
                }`}
              >
                <div className="text-[11px] text-amber-300 font-semibold">{flight.cupType}</div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">{flight.name}</div>
                <div className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">{flight.notes}</div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
