import React from 'react';
import { Coffee, MapPin, Clock, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1c110a] text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-800/80">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-[#f3ede4] font-serif">
                Coffee
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mb-1" />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Handcrafting artisanal morning brews, specialty espresso flights, and organic bakery pairings since 2018.
            </p>
          </div>

          {/* Quick Hours */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Roastery Hours</span>
            </h4>
            <div className="text-xs space-y-1">
              <p className="text-stone-300">Mon – Fri: 6:30 AM – 7:00 PM</p>
              <p className="text-stone-300">Sat – Sun: 7:30 AM – 8:00 PM</p>
              <p className="text-amber-500/90 font-medium">Morning Happy Hour: 8:00 – 10:00 AM</p>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Location</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              452 Artisan Boulevard, Roasters District<br />
              San Francisco, CA 94107
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Get in Touch</span>
            </h4>
            <p className="text-xs text-stone-300">
              hello@coffeeartisan.com<br />
              +1 (415) 555-BREW
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Coffee. All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>and pure passion for coffee</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
