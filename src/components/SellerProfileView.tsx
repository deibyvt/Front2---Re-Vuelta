import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Leaf, 
  Repeat, 
  ShoppingBag, 
  Award,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { Seller, Product, Review } from '../types';
import { ProductCard } from './ProductCard';
import { SAMPLE_REVIEWS } from '../data/mockData';

interface SellerProfileViewProps {
  seller: Seller | null;
  products: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickSwap: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const SellerProfileView: React.FC<SellerProfileViewProps> = ({
  seller,
  products,
  onBack,
  onSelectProduct,
  onAddToCart,
  onQuickSwap,
  favorites,
  onToggleFavorite,
}) => {
  if (!seller) return null;

  const [activeTab, setActiveTab] = React.useState<'closet' | 'reviews'>('closet');

  const sellerProducts = products.filter(p => p.sellerId === seller.id || p.seller.id === seller.id);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la vista anterior</span>
      </button>

      {/* Seller Header Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md">
        
        {/* Top Cover */}
        <div className="h-32 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 relative">
          <div className="absolute top-4 right-4 bg-emerald-800/80 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-700/60">
            Miembro desde {seller.memberSince}
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-xl bg-white"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900">{seller.name}</h1>
                  {seller.isVerifiedEco && (
                    <ShieldCheck className="w-5 h-5 text-emerald-600" title="Vendedor Eco-Verificado" />
                  )}
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {seller.location}
                </p>
              </div>
            </div>

            {/* Rating Pill */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <div>
                <p className="text-sm font-extrabold text-slate-900">{seller.rating} / 5.0</p>
                <p className="text-[10px] text-amber-800 font-medium">{seller.reviewsCount} evaluaciones</p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 text-sm leading-relaxed mb-6 max-w-2xl italic">
            "{seller.bio}"
          </p>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-center text-xs">
            <div>
              <p className="text-lg font-extrabold text-emerald-700">🌱 {seller.co2SavedKg} kg</p>
              <p className="text-slate-500 text-[11px]">CO₂ Ahorrado</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900">📦 {seller.itemsSold}</p>
              <p className="text-slate-500 text-[11px]">Ventas Completadas</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-teal-700">🔄 {seller.swapsDone}</p>
              <p className="text-slate-500 text-[11px]">Trueques Realizados</p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('closet')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'closet'
                ? 'border-emerald-600 text-emerald-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Clóset Abierto ({sellerProducts.length} prendas)
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-emerald-600 text-emerald-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Reseñas & Evaluaciones ({seller.reviewsCount})
          </button>
        </div>

      </div>

      {/* Tab Content */}
      {activeTab === 'closet' ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Prendas disponibles en el Clóset de {seller.name}</h2>
          {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onQuickSwap={onQuickSwap}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 space-y-2">
              <p className="text-sm text-slate-500">Este vendedor no tiene otras prendas activas en este momento.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Opiniones de compradores anteriores</h2>
          <div className="space-y-3">
            {SAMPLE_REVIEWS.map(rev => (
              <div key={rev.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={rev.reviewerAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{rev.reviewerName}</h4>
                      <p className="text-[10px] text-slate-400">{rev.date} • Prenda: {rev.itemName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
