import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { PromoSplitSection } from './components/PromoSplitSection';
import { MorningSpecialSection } from './components/MorningSpecialSection';
import { BarShowcaseSection } from './components/BarShowcaseSection';
import { Footer } from './components/Footer';
import { QuickOrderModal } from './components/QuickOrderModal';
import { CoffeeCardItem, FeatureItem, TastingFlightItem } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CoffeeCardItem | FeatureItem | TastingFlightItem | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('Custom Handcrafted Brew');
  const [cartCount, setCartCount] = useState(0);

  const handleOpenOrder = (title?: string) => {
    setSelectedItem(null);
    setModalTitle(title || 'Custom Handcrafted Brew');
    setIsModalOpen(true);
  };

  const handleSelectFeature = (item: FeatureItem) => {
    setSelectedItem(item);
    setModalTitle(item.title);
    setIsModalOpen(true);
  };

  const handleSelectCard = (item: CoffeeCardItem) => {
    setSelectedItem(item);
    setModalTitle(item.name);
    setIsModalOpen(true);
  };

  const handleSelectFlight = (flight: TastingFlightItem) => {
    setSelectedItem(flight);
    setModalTitle(flight.name);
    setIsModalOpen(true);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-[#2b170e] flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar 
        onOpenOrderModal={handleOpenOrder} 
        cartCount={cartCount} 
      />

      <main className="flex-1 w-full">
        {/* 2. Hero Section: "Savor the Perfect Brew!" */}
        <HeroSection
          onOpenOrderModal={() => handleOpenOrder('Savor the Perfect Brew')}
          onExploreMenu={() => scrollToSection('features')}
        />

        {/* 3. Features Section: 4 Columns with Dividers (Espresso, Latte, Cappuccino, Cold Brew) */}
        <FeaturesSection 
          onSelectItem={handleSelectFeature} 
        />

        {/* 4. Split Promo Section: "Why Choose Us?" (Dark Brown) + Center Latte Cup + "20% off from 8 - 10 am" (Warm Sand) */}
        <PromoSplitSection
          onLearnMore={() => handleOpenOrder('Our Single Origin Story')}
          onClaimOffer={() => handleOpenOrder('Morning Happy Hour: 20% Off')}
        />

        {/* 5. Morning Happy & Visit Us TODAY Section (4 Drink Cards & Sparkle Accent) */}
        <MorningSpecialSection
          onSelectCard={handleSelectCard}
          onOrderAhead={() => handleOpenOrder('Morning Special Order')}
          onViewMenu={() => scrollToSection('features')}
        />

        {/* 6. Bottom Showcase Bar Section: "Win Your Hour!" & 4 Coffee Glasses on Wooden Cafe Counter */}
        <BarShowcaseSection 
          onSelectFlight={handleSelectFlight} 
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* Interactive Quick Order / Customizer Modal */}
      <QuickOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedItem={selectedItem}
        initialTitle={modalTitle}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
