export type ProductCategory = 
  | 'all'
  | 'tops' 
  | 'bottoms' 
  | 'outerwear' 
  | 'dresses' 
  | 'bags' 
  | 'footwear' 
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  collection: string;
  price: number; // in INR base (e.g. 2490)
  originalPrice?: number;
  description: string;
  editorialQuote?: string;
  details: string[];
  materials: string;
  care: string;
  sustainability: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: Record<string, number>;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // multiplier against INR
  format: (amount: number) => string;
}

export interface ShippingDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryMethod: 'standard' | 'express' | 'eco';
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: CurrencyCode;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  status: 'processing' | 'confirmed' | 'shipped';
}

export interface FilterState {
  category: ProductCategory;
  collection: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  selectedColors: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}
