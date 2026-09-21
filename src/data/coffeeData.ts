import { NavItem, FeatureItem, CoffeeCardItem, TastingFlightItem } from '../types';
import heroCupImg from '../assets/images/coffee_hero_cup_1789958951598.jpg';
import centerCupImg from '../assets/images/coffee_center_cup_1789958967011.jpg';
import barFlightImg from '../assets/images/coffee_bar_flight_1789958981744.jpg';
import icedGlassImg from '../assets/images/coffee_iced_glass_1789959000037.jpg';

export const ASSETS = {
  heroCup: heroCupImg,
  centerCup: centerCupImg,
  barFlight: barFlightImg,
  icedGlass: icedGlassImg,
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Menu', href: '#features' },
  { label: 'Our Story', href: '#why-choose-us' },
  { label: 'Listing', href: '#visit-us' },
  { label: 'Contact', href: '#tasting-bar' },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    subtitle: 'Pure & Intense',
    description: 'Full-bodied single origin shot with thick golden-russet crema and lingering caramel notes.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80',
    tags: ['Bold', '9 Bar', 'Single Origin'],
  },
  {
    id: 'latte',
    title: 'Latte',
    subtitle: 'Silky & Balanced',
    description: 'Velvety micro-foamed milk poured gently over freshly extracted double espresso.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80',
    tags: ['Smooth', 'Whole Milk / Oat', 'Latte Art'],
  },
  {
    id: 'cappuccino',
    title: 'Cappuccino',
    subtitle: 'Classic & Airy',
    description: 'Harmonious balance of espresso, steamed milk, and rich cloud-like foam with cocoa dust.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=400&q=80',
    tags: ['Aromatic', 'Cocoa Dust', 'Traditional'],
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    subtitle: 'Smooth & Crisp',
    description: 'Steeped cold for 18 hours to extract natural cocoa sweetness with delightfully low acidity.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80',
    tags: ['18h Steep', 'Refreshing', 'Low Acid'],
  },
];

export const VISIT_US_CARDS: CoffeeCardItem[] = [
  {
    id: 'card-flat-white',
    name: 'Caramel Macchiato',
    category: 'Espresso Specialty',
    price: 4.50,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and caramel drizzle.',
    temperatures: ['Hot', 'Iced'],
  },
  {
    id: 'card-latte-art',
    name: 'Vanilla Velvet Latte',
    category: 'Handcrafted',
    price: 4.75,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    description: 'Rich espresso balanced with organic vanilla bean syrup, warm milk, and delicate tulip foam art.',
    temperatures: ['Hot', 'Iced'],
  },
  {
    id: 'card-iced-blend',
    name: 'Nitro Cold Brew',
    category: 'Cold Specialty',
    price: 5.25,
    rating: 5.0,
    reviewsCount: 340,
    image: icedGlassImg,
    description: 'Infused with nitrogen as it pours from the tap for an ultra-creamy head and velvety mouthfeel.',
    temperatures: ['Iced'],
  },
  {
    id: 'card-dark-mocha',
    name: 'Artisan Dark Mocha',
    category: 'Signature Blend',
    price: 4.95,
    rating: 4.9,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    description: 'Artisanal 70% dark Belgian chocolate melted into a double espresso and topped with steamed cream.',
    temperatures: ['Hot', 'Iced'],
  },
];

export const TASTING_FLIGHT: TastingFlightItem[] = [
  {
    id: 'tf-1',
    name: 'Ethiopian Yirgacheffe',
    type: 'Single Origin Pour Over',
    notes: 'Jasmine, Bergamot, Meyer Lemon',
    cupType: 'Glass Goblet',
  },
  {
    id: 'tf-2',
    name: 'Guatemala Antigua',
    type: 'Medium Roast Flat White',
    notes: 'Milk Chocolate, Candied Walnut, Apple',
    cupType: 'Glass Mug',
  },
  {
    id: 'tf-3',
    name: 'Sumatra Mandheling',
    type: 'Dark Roast French Press',
    notes: 'Cedarwood, Brown Sugar, Dark Cacao',
    cupType: 'Glass Handle Cup',
  },
  {
    id: 'tf-4',
    name: 'Barista Reserve Ristretto',
    type: 'Double Ristretto Shot',
    notes: 'Caramel Crema, Toasted Hazelnut',
    cupType: 'Ceramic Demitasse',
  },
];
