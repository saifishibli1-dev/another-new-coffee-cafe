import React from 'react';
import { ASSETS } from '../data/coffeeData';

interface PromoSplitSectionProps {
  onLearnMore: () => void;
  onClaimOffer: () => void;
}

export const PromoSplitSection: React.FC<PromoSplitSectionProps> = ({
  onLearnMore,
  onClaimOffer,
}) => {
  return (
    <section 
      id="why-choose-us" 
      className="w-full bg-[#f4ece3] py-10 sm:py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-xl border border-stone-300/40">
          
          {/* Left Block: Dark Espresso Brown "Why Choose Us?" */}
          <div className="lg:col-span-5 bg-[#3a2217] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-white relative">
            <div className="space-y-4">
              <h2 
                id="why-choose-us-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug"
              >
                Why Choose <br />Us?
              </h2>

              <p 
                id="why-choose-us-text"
                className="text-stone-300 text-sm sm:text-base leading-relaxed font-light"
              >
                We carefully select 100% fair-trade Arabica beans from high-altitude micro-lots around the world. Every bean is small-batch roasted in-house to unlock delicate floral, citrus, and honey notes that make every morning extraordinary.
              </p>
            </div>

            <div className="pt-8">
              <button
                id="why-choose-us-btn"
                onClick={onLearnMore}
                className="px-6 py-2.5 rounded-full bg-white text-[#3a2217] text-sm font-bold shadow hover:bg-stone-100 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Center Bridge Image: Pristine White Cup with Heart Foam Art on Saucer */}
          <div className="lg:col-span-2 bg-gradient-to-r from-[#3a2217] via-[#8d6951] to-[#e8d8c9] flex items-center justify-center p-4 lg:p-0 relative overflow-hidden">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-48 lg:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-[#e8d8c9] group">
              <img
                src={ASSETS.centerCup}
                alt="Artisan latte art cup on saucer"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Block: Warm Sand Beige "20% off from 8 - 10 am" */}
          <div className="lg:col-span-5 bg-[#ebdcd0] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-[#2b170e] relative">
            {/* Elegant decorative curved line accent on top right */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40">
              <svg width="72" height="72" viewBox="0 0 100 100" fill="none" stroke="#2b170e" strokeWidth="1.5">
                <path d="M10,90 Q90,90 90,10" />
              </svg>
            </div>

            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-900/80">
                Organic Artisan Roast & Bakery
              </span>

              <h3 
                id="promo-discount-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2b170e]"
              >
                20% off from 8 - 10 am
              </h3>

              <p 
                id="promo-discount-text"
                className="text-stone-700 text-sm sm:text-base leading-relaxed"
              >
                Start your day right! Enjoy twenty percent off all espresso-based beverages and fresh oven-baked sourdough pastries every morning between 8:00 AM and 10:00 AM.
              </p>
            </div>

            <div className="pt-8">
              <button
                id="promo-claim-btn"
                onClick={onClaimOffer}
                className="px-6 py-2.5 rounded-full bg-[#3a2217] hover:bg-[#25150e] text-white text-sm font-bold shadow hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Claim Offer
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
