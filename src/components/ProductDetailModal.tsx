import React from 'react';
import { 
  X, 
  Heart, 
  Repeat, 
  ShoppingBag, 
  ShieldCheck, 
  Award, 
  MapPin, 
  MessageCircle, 
  Share2, 
  Sparkles,
  Check,
  Leaf
} from 'lucide-react';
import { Product, Seller } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onProposeSwap: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onViewSeller: (seller: Seller) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onProposeSwap,
  isFavorite,
  onToggleFavorite,
  onViewSeller,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState('');
  const [chatSent, setChatSent] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatSent(true);
    setChatMessage('');
    setTimeout(() => setChatSent(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 bg-slate-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white shadow-inner border border-slate-200/80">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Transaction Badge */}
              <div className="absolute top-3 left-3">
                {product.transactionType === 'both' && (
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> Venta o Trueque
                  </span>
                )}
                {product.transactionType === 'swap' && (
                  <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                    <Repeat className="w-3.5 h-3.5" /> Exclusivo Trueque
                  </span>
                )}
                {product.transactionType === 'sale' && (
                  <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    Solo Venta
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx ? 'border-emerald-600 ring-2 ring-emerald-400' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Environmental Impact Box */}
          <div className="mt-6 bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-4 rounded-2xl border border-emerald-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1">
                <Leaf className="w-4 h-4 text-emerald-400" />
                Impacto Ecológico Estimado
              </span>
              <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-[10px] text-teal-200">
                Verificado ReVuelta
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 text-center">
              <div className="bg-emerald-800/40 p-2 rounded-xl">
                <p className="text-lg font-bold text-teal-300">-{product.co2SavedKg} kg</p>
                <p className="text-[10px] text-emerald-200">Emisiones CO₂ Ahorradas</p>
              </div>
              <div className="bg-emerald-800/40 p-2 rounded-xl">
                <p className="text-lg font-bold text-emerald-300">-{product.waterSavedLiters} L</p>
                <p className="text-[10px] text-emerald-200">Agua Preservada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Garment Details & Seller Actions */}
        <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto space-y-6 max-h-[85vh]">
          
          {/* Header & Price */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="uppercase tracking-wider font-semibold text-emerald-700">{product.brand}</span>
              <button
                onClick={() => onToggleFavorite(product.id)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isFavorite ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {product.title}
            </h2>

            <div className="mt-3 flex items-baseline justify-between">
              <div>
                {product.transactionType === 'swap' ? (
                  <span className="text-2xl font-extrabold text-emerald-800">
                    Disponible para Trueque
                  </span>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-slate-900">
                      S/. {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        Precio original: S/. {product.originalPrice}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* EcoPoints Bonus Badge */}
              <div className="flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300">
                <Award className="w-4 h-4 text-amber-600" />
                <span>+{product.ecoPointsReward} EcoPuntos</span>
              </div>
            </div>
          </div>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <span className="text-slate-400 block">Talla</span>
              <span className="font-bold text-slate-800 text-sm">{product.size}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Estado</span>
              <span className="font-semibold text-emerald-800 capitalize">{product.condition.replace(/_/g, ' ')}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Material</span>
              <span className="font-semibold text-slate-800">{product.material}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Categoría</span>
              <span className="font-semibold text-slate-800 capitalize">{product.category}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Descripción</h4>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Seller Profile Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">{product.seller.name}</h4>
                    {product.seller.isVerifiedEco && (
                      <ShieldCheck className="w-4 h-4 text-emerald-600" title="Eco-Verificado" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {product.seller.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onViewSeller(product.seller)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline cursor-pointer"
              >
                Ver Clóset
              </button>
            </div>
          </div>

          {/* Quick Chat with Seller */}
          <form onSubmit={handleSendQuestion} className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              ¿Tienes alguna pregunta para {product.seller.name.split(' ')[0]}?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ej: ¿Tiene algún detalle no visible en fotos?..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors cursor-pointer flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </div>
            {chatSent && (
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ¡Mensaje enviado al vendedor!
              </p>
            )}
          </form>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {product.transactionType !== 'sale' && (
              <button
                onClick={() => {
                  onClose();
                  onProposeSwap(product);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white font-bold text-sm hover:opacity-95 shadow-lg transition-all cursor-pointer"
              >
                <Repeat className="w-5 h-5 text-teal-300" />
                <span>Proponer Trueque (Intercambiar)</span>
              </button>
            )}

            {product.transactionType !== 'swap' && (
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Añadir al Carrito (S/. {product.price})</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? '¡Enlace copiado al portapapeles!' : 'Compartir esta prenda'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
