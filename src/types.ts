export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags?: string[];
}

export interface CoffeeCardItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  temperatures: ('Hot' | 'Iced')[];
}

export interface TastingFlightItem {
  id: string;
  name: string;
  type: string;
  notes: string;
  cupType: string;
}
