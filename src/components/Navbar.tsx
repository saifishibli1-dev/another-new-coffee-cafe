import React, { useState } from 'react';
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_ITEMS } from '../data/coffeeData';

interface NavbarProps {
  onOpenOrderModal: (title?: string) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <header className="w-full bg-[#f3ede4]/90 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#home"
          id="brand-logo-link"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2b170e] font-serif group-hover:text-amber-800 transition-colors">
            Coffee
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mb-2"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <a
                key={item.label}
                id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={item.href}
                onClick={() => setActiveItem(item.label)}
                className={`relative text-sm lg:text-base font-semibold transition-colors duration-200 py-1 ${
                  isActive 
                    ? 'text-[#2b170e]' 
                    : 'text-stone-600 hover:text-[#2b170e]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#42261a] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            id="nav-quick-order-btn"
            onClick={() => onOpenOrderModal('Order Today')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-bold bg-[#3d2317] hover:bg-[#2b170e] text-white rounded-full shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Order Brew</span>
          </button>

          <button
            id="nav-cart-trigger"
            onClick={() => onOpenOrderModal()}
            className="relative p-2.5 rounded-full text-stone-700 hover:bg-stone-200/50 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="View Order"
          >
            <ShoppingBag className="w-5 h-5 text-[#2b170e]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-700 text-white text-[11px] font-bold flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:text-[#2b170e] hover:bg-stone-200/50 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f3ede4] border-b border-stone-300 px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => {
                setActiveItem(item.label);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-base font-semibold text-[#2b170e] hover:text-amber-800 border-b border-stone-200/60"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal('Order Today');
              }}
              className="w-full py-2.5 text-center text-sm font-bold bg-[#3d2317] text-white rounded-full"
            >
              Order Ahead
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
