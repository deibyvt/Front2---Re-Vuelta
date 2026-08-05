export type TransactionType = 'sale' | 'swap' | 'both';

export type GarmentCondition = 'nuevo_con_etiqueta' | 'excelente' | 'buen_estado' | 'usado_aceptable';

export type Category = 'mujer' | 'hombre' | 'unisex' | 'calzado' | 'accesorios' | 'vintage';

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  location: string;
  bio: string;
  isVerifiedEco: boolean;
  memberSince: string;
  co2SavedKg: number;
  itemsSold: number;
  swapsDone: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  ecoPointsReward: number;
  images: string[];
  category: Category;
  size: string;
  brand: string;
  material: string;
  condition: GarmentCondition;
  transactionType: TransactionType;
  sellerId: string;
  seller: Seller;
  co2SavedKg: number;
  waterSavedLiters: number;
  likesCount: number;
  isFeatured?: boolean;
  createdAt: string;
  tags: string[];
}

export interface SwapOffer {
  id: string;
  targetProductId: string;
  targetProduct: Product;
  offeredProductIds: string[];
  offeredProducts: Product[];
  cashAdjustment: number; // positive means buyer pays extra, negative means seller pays
  note: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
  senderId: string;
  senderName: string;
  senderAvatar: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  type: 'buy' | 'swap';
  items: Product[];
  totalAmount: number;
  ecoPointsEarned: number;
  status: 'completado' | 'en_camino' | 'pendiente_punto_encuentro' | 'cancelado';
  date: string;
  shippingAddress: string;
  isRated?: boolean;
  rating?: number;
  comment?: string;
  swapOfferDetails?: {
    offeredItems: Product[];
    cashAdjustment: number;
  };
}

export interface Review {
  id: string;
  sellerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  itemName: string;
}

export interface EcoReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  code: string;
  category: 'descuento' | 'envio' | 'marca_eco' | 'donacion';
  iconName: string;
  expiresAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  ecoPoints: number;
  ecoTier: 'Semilla Circular' | 'Guardián Verde' | 'Eco Warrior' | 'Leyenda Sostenible';
  co2SavedKg: number;
  waterSavedLiters: number;
  treesEquivalent: number;
  myClosetItems: Product[];
  favoriteIds: string[];
}
