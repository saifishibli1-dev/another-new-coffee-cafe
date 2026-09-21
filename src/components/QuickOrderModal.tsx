import React, { useState } from 'react';
import { X, Check, Coffee, Plus, Minus } from 'lucide-react';
import { CoffeeCardItem, FeatureItem, TastingFlightItem } from '../types';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: CoffeeCardItem | FeatureItem | TastingFlightItem | null;
  initialTitle?: string;
  onAddToCart: (item: { name: string; price: number; quantity: number; size: string; milk: string }) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  initialTitle,
  onAddToCart,
}) => {
  const [size, setSize] = useState<'Small' | 'Regular' | 'Large'>('Regular');
  const [milk, setMilk] = useState<'Whole' | 'Oat' | 'Almond' | 'None'>('Whole');
  const [temp, setTemp] = useState<'Hot' | 'Iced'>('Hot');
  const [quantity, setQuantity] = useState(1);
  const [orderedSuccess, setOrderedSuccess] = useState(false);

  if (!isOpen) return null;

  const itemName = 
    (selectedItem && 'title' in selectedItem ? selectedItem.title : undefined) ||
    (selectedItem && 'name' in selectedItem ? selectedItem.name : undefined) ||
    initialTitle ||
    'Specialty Handcrafted Brew';
  const basePrice = (selectedItem && 'price' in selectedItem ? selectedItem.price : undefined) || 4.75;
  const sizeMultiplier = size === 'Small' ? 0.9 : size === 'Large' ? 1.25 : 1.0;
  const milkExtra = (milk === 'Oat' || milk === 'Almond') ? 0.60 : 0;
  const totalPrice = ((basePrice * sizeMultiplier + milkExtra) * quantity);

  const handleConfirmOrder = () => {
    onAddToCart({
      name: `${itemName} (${temp}, ${size}, ${milk} milk)`,
      price: totalPrice,
      quantity,
      size,
      milk,
    });
    setOrderedSuccess(true);
    setTimeout(() => {
      setOrderedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        id="quick-order-dialog"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {orderedSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-inner">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Order Added!</h3>
            <p className="text-sm text-stone-500">
              Your barista order has been queued fresh at the counter.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">
                <Coffee className="w-4 h-4" />
                <span>Barista Station</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#2b170e]">
                {itemName}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Customized fresh to order with our signature single-origin espresso.
              </p>
            </div>

            {/* Temperature Option */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Temperature
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hot', 'Iced'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTemp(t)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                      temp === t
                        ? 'bg-[#3a2217] text-white border-[#3a2217]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {t === 'Hot' ? '☕ Hot Brew' : '🧊 Iced Crisp'}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Cup Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Small', 'Regular', 'Large'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      size === s
                        ? 'bg-[#3a2217] text-white border-[#3a2217]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {s} ({s === 'Small' ? '8oz' : s === 'Regular' ? '12oz' : '16oz'})
                  </button>
                ))}
              </div>
            </div>

            {/* Milk choice */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-2">
                Milk Choice
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Whole', 'Oat', 'Almond', 'None'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilk(m)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      milk === m
                        ? 'bg-amber-800 text-white border-amber-800'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Price Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-stone-200">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-stone-800 text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500 block">Total</span>
                <span className="text-xl font-black text-[#2b170e]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleConfirmOrder}
              className="w-full py-3 rounded-full bg-[#3a2217] hover:bg-[#25150e] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Add to Order • ${totalPrice.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
