import React from 'react';
import { 
  Repeat, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Award, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  Users,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Product, Seller } from '../types';
import { ProductCard } from './ProductCard';

interface HomeViewProps {
  products: Product[];
  sellers: Seller[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickSwap: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onNavigate: (tab: string) => void;
  onSelectSeller: (seller: Seller) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  sellers,
  onSelectProduct,
  onAddToCart,
  onQuickSwap,
  favorites,
  onToggleFavorite,
  onNavigate,
  onSelectSeller,
}) => {
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'swap' | 'sale'>('all');

  const filteredProducts = React.useMemo(() => {
    if (activeFilter === 'swap') {
      return products.filter(p => p.transactionType === 'swap' || p.transactionType === 'both');
    }
    if (activeFilter === 'sale') {
      return products.filter(p => p.transactionType === 'sale' || p.transactionType === 'both');
    }
    return products;
  }, [products, activeFilter]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section with Eco Impact Design */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-8 md:p-12 lg:p-16 border border-emerald-800/80 shadow-2xl">
        {/* Subtle Background Organic Accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold backdrop-blur-md">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Mercado de Moda Circular & Trueque Sostenible</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Dale una <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">ReVuelta</span> a tu clóset.
          </h1>

          <p className="text-emerald-100/90 text-base md:text-lg leading-relaxed max-w-2xl">
            Intercambia prendas sin gastar dinero o compra ropa pre-amada con impacto positivo.
            Cada transacción ahorra miles de litros de agua y evita emisiones de CO₂.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('explore')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 font-bold text-sm hover:opacity-95 shadow-lg hover:shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Explorar Catálogo</span>
            </button>

            <button
              onClick={() => onNavigate('publish')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-semibold text-sm border border-emerald-700/80 backdrop-blur-md transition-all cursor-pointer"
            >
              <Repeat className="w-4 h-4 text-teal-300" />
              <span>Publicar Prenda o Trueque</span>
            </button>
          </div>
        </div>

        {/* Floating Impact Stats Banner */}
        <div className="mt-12 pt-8 border-t border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 backdrop-blur-md">
            <p className="text-2xl md:text-3xl font-extrabold text-teal-300">4,820+</p>
            <p className="text-xs text-emerald-200 mt-1 font-medium">Prendas en Circulación</p>
          </div>
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 backdrop-blur-md">
            <p className="text-2xl md:text-3xl font-extrabold text-amber-300">58.4 ton</p>
            <p className="text-xs text-emerald-200 mt-1 font-medium">CO₂ Evitado</p>
          </div>
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 backdrop-blur-md">
            <p className="text-2xl md:text-3xl font-extrabold text-emerald-400">12.8M L</p>
            <p className="text-xs text-emerald-200 mt-1 font-medium">Agua Ahorrada</p>
          </div>
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/50 backdrop-blur-md">
            <p className="text-2xl md:text-3xl font-extrabold text-amber-400">98.5%</p>
            <p className="text-xs text-emerald-200 mt-1 font-medium">Sat. Trueques Exitosos</p>
          </div>
        </div>
      </section>

      {/* "Cómo Funciona el Trueque ReVuelta" Section */}
      <section className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-200/60">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            El poder de la economía circular
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            ¿Cómo funciona el Trueque en 3 pasos?
          </h2>
          <p className="text-slate-600 text-sm">
            Renueva tu armario sin dinero. Cambia lo que no usas por tesoros pre-amados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-lg flex items-center justify-center">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Publica tu prenda</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Sube fotos claras, indica la talla, marca y estado. Marca si aceptas trueque, venta o ambos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-lg flex items-center justify-center">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Envía o recibe propuestas</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Elige prendas del clóset del otro usuario o propone una diferencia en dinero para equiparar el valor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm relative space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 font-extrabold text-lg flex items-center justify-center">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Punto de Encuentro Eco</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Coordinen entrega presencial en puntos seguros ReVuelta o usen envío ecológico a domicilio. ¡Y ganan EcoPuntos!
            </p>
          </div>
        </div>
      </section>

      {/* Main Garment Catalog Display */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Prendas Destacadas</h2>
            <p className="text-slate-500 text-sm">Explora las últimas adiciones y prendas con trueque abierto</p>
          </div>

          {/* Transaction Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({products.length})
            </button>
            <button
              onClick={() => setActiveFilter('swap')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'swap'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Trueque Abierto</span>
            </button>
            <button
              onClick={() => setActiveFilter('sale')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'sale'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>En Venta</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('explore')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <span>Ver todo el catálogo ({products.length} prendas)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Featured Eco Closets / Sellers Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Eco-Clósets Destacados</h2>
            <p className="text-slate-500 text-sm">Vendedores verificados con mayor impacto circular</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <div
              key={seller.id}
              onClick={() => onSelectSeller(seller)}
              className="p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-500/80 hover:shadow-lg transition-all cursor-pointer group bg-slate-50/50 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {seller.name}
                      </h3>
                      {seller.isVerifiedEco && (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Eco-Verificado" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{seller.location}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-0.5">
                      <span>★ {seller.rating}</span>
                      <span className="text-slate-400">({seller.reviewsCount} reseñas)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 italic">
                  "{seller.bio}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-emerald-800 font-medium">
                <span className="bg-emerald-100 px-2.5 py-1 rounded-full">
                  🍃 {seller.co2SavedKg}kg CO₂ evitado
                </span>
                <span className="text-slate-500">
                  {seller.swapsDone} trueques
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
