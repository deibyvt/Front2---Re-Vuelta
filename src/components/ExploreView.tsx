import React from 'react';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  Repeat, 
  ShoppingBag, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { Product, Category, GarmentCondition, TransactionType } from '../types';
import { ProductCard } from './ProductCard';

interface ExploreViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickSwap: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  initialQuery?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onQuickSwap,
  favorites,
  onToggleFavorite,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = React.useState<string>('all');
  const [selectedCondition, setSelectedCondition] = React.useState<string>('all');
  const [selectedSize, setSelectedSize] = React.useState<string>('all');
  const [maxPrice, setMaxPrice] = React.useState<number>(300);
  const [sortBy, setSortBy] = React.useState<'recent' | 'price_low' | 'price_high' | 'points'>('recent');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Todas las Categorías' },
    { id: 'mujer', label: 'Mujer' },
    { id: 'hombre', label: 'Hombre' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'calzado', label: 'Calzado' },
    { id: 'accesorios', label: 'Accesorios' },
    { id: 'vintage', label: 'Vintage 80s/90s' },
  ];

  const sizes = ['all', 'S', 'M', 'L', 'XL', '41 EUR (8.5 US)', 'Única (40x35cm)'];

  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      // Search text filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesBrand && !matchesDesc && !matchesTag) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Transaction type filter
      if (selectedTransaction !== 'all') {
        if (selectedTransaction === 'swap' && p.transactionType === 'sale') return false;
        if (selectedTransaction === 'sale' && p.transactionType === 'swap') return false;
      }

      // Condition filter
      if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && p.size !== selectedSize) {
        return false;
      }

      // Price filter
      if (p.price > maxPrice && p.transactionType !== 'swap') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'points') return b.ecoPointsReward - a.ecoPointsReward;
      return 0; // recent default
    });
  }, [products, searchQuery, selectedCategory, selectedTransaction, selectedCondition, selectedSize, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTransaction('all');
    setSelectedCondition('all');
    setSelectedSize('all');
    setMaxPrice(300);
    setSortBy('recent');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedTransaction !== 'all' || 
    selectedCondition !== 'all' || 
    selectedSize !== 'all' ||
    maxPrice < 300;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Search Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white rounded-3xl p-6 md:p-8 shadow-md">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Explora el Catálogo Circular
          </h1>
          <p className="text-emerald-100 text-sm">
            Encuentra prendas de segunda vida, colecciones vintage y trueques directos en tu zona.
          </p>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por prenda, marca (ej: Levi's, Veja, Patagonia), o estilo..."
              className="w-full bg-emerald-900/80 text-white placeholder-emerald-300/60 pl-12 pr-10 py-3.5 rounded-2xl border border-emerald-700/80 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-emerald-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Reset */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="recent">Más Recientes</option>
              <option value="price_low">Precio: Menor a Mayor</option>
              <option value="price_high">Precio: Mayor a Menor</option>
              <option value="points">Mayor Recompensa EcoPuntos</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter Row: Transaction type, Condition, Max Price */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          {/* Transaction Type */}
          <div>
            <label className="block text-slate-600 font-medium mb-1.5">Tipo de Oferta</label>
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSelectedTransaction('all')}
                className={`py-1 rounded-lg font-semibold cursor-pointer ${selectedTransaction === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-600'}`}
              >
                Todas
              </button>
              <button
                onClick={() => setSelectedTransaction('swap')}
                className={`py-1 rounded-lg font-semibold cursor-pointer ${selectedTransaction === 'swap' ? 'bg-emerald-800 text-white shadow' : 'text-slate-600'}`}
              >
                Trueque
              </button>
              <button
                onClick={() => setSelectedTransaction('sale')}
                className={`py-1 rounded-lg font-semibold cursor-pointer ${selectedTransaction === 'sale' ? 'bg-emerald-600 text-white shadow' : 'text-slate-600'}`}
              >
                Venta
              </button>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-slate-600 font-medium mb-1.5">Estado de la Prenda</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 text-slate-800 rounded-xl px-3 py-1.5 font-medium cursor-pointer"
            >
              <option value="all">Cualquier Estado</option>
              <option value="nuevo_con_etiqueta">Nuevo con etiqueta</option>
              <option value="excelente">Excelente Estado</option>
              <option value="buen_estado">Buen Estado</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex justify-between text-slate-600 font-medium mb-1.5">
              <span>Precio Máximo</span>
              <span className="font-bold text-emerald-800">S/. {maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> prendas encontradas</span>
        {hasActiveFilters && (
          <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
            Filtros activos
          </span>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length > 0 ? (
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
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-lg font-bold text-slate-900">No encontramos prendas con esos filtros</h3>
          <p className="text-xs text-slate-500">
            Prueba cambiar los criterios de búsqueda, ajustar el rango de precio o limpiar los filtros.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-emerald-800 text-white rounded-xl font-semibold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      )}

    </div>
  );
};
