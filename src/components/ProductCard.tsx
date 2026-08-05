import React from 'react';
import { Heart, Repeat, ShoppingBag, Eye, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickSwap: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onQuickSwap,
  isFavorite,
  onToggleFavorite,
}) => {
  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'nuevo_con_etiqueta': return 'Nuevo c/ etiqueta';
      case 'excelente': return 'Excelente estado';
      case 'buen_estado': return 'Buen estado';
      default: return 'Usado con vida';
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Favorite Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
          }`}
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Transaction Type Tag Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.transactionType === 'both' && (
            <span className="bg-emerald-600/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm flex items-center gap-1">
              <Repeat className="w-3 h-3" /> Venta o Trueque
            </span>
          )}
          {product.transactionType === 'swap' && (
            <span className="bg-amber-500/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm flex items-center gap-1">
              <Repeat className="w-3 h-3" /> Solo Trueque
            </span>
          )}
          {product.transactionType === 'sale' && (
            <span className="bg-slate-900/80 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm">
              Solo Venta
            </span>
          )}
        </div>

        {/* Eco Savings Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-medium bg-emerald-950/80 text-emerald-100 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-emerald-800/50">
          <span className="flex items-center gap-1 text-teal-300 font-semibold">
            🌱 -{product.co2SavedKg}kg CO₂
          </span>
          <span className="text-emerald-200">
            💧 {product.waterSavedLiters}L agua
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Seller & Size Line */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <div className="flex items-center gap-1.5">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-medium text-slate-700 truncate max-w-[110px]">
                {product.seller.name}
              </span>
              {product.seller.isVerifiedEco && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="Vendedor Eco-Verificado" />
              )}
            </div>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
              Talla {product.size}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-semibold text-slate-900 text-sm line-clamp-2 hover:text-emerald-700 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Condition & Brand */}
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
            <span className="bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded-md border border-emerald-200/60">
              {getConditionLabel(product.condition)}
            </span>
            <span className="text-slate-400">•</span>
            <span className="truncate">{product.brand}</span>
          </div>
        </div>

        {/* Pricing & Rewards */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              {product.transactionType === 'swap' ? (
                <span className="text-emerald-700 font-bold text-base">
                  Trueque Directo
                </span>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-slate-900">
                    S/. {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      S/. {product.originalPrice}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* EcoPoints Bonus */}
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              <Award className="w-3 h-3 text-amber-600" />
              <span>+{product.ecoPointsReward} Pts</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {product.transactionType !== 'sale' ? (
              <button
                onClick={() => onQuickSwap(product)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>Trueque</span>
              </button>
            ) : (
              <button
                onClick={() => onSelect(product)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Prenda</span>
              </button>
            )}

            {product.transactionType !== 'swap' ? (
              <button
                onClick={() => onAddToCart(product)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Comprar</span>
              </button>
            ) : (
              <button
                onClick={() => onSelect(product)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Detalles</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
