import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Award, 
  Truck, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CartItem, UserProfile, Order } from '../types';

interface CartCheckoutViewProps {
  cart: CartItem[];
  user: UserProfile;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
}

export const CartCheckoutView: React.FC<CartCheckoutViewProps> = ({
  cart,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
}) => {
  const navigate = useNavigate();
  const [usePointsDiscount, setUsePointsDiscount] = React.useState(false);
  const [deliveryMethod, setDeliveryMethod] = React.useState<'punto_encuentro' | 'envio_domicilio'>('punto_encuentro');
  const [shippingAddress, setShippingAddress] = React.useState('Av. Conquistadores 450, San Isidro');
  const [paymentMethod, setPaymentMethod] = React.useState<'yape' | 'tarjeta' | 'efectivo'>('yape');
  const [isPlaced, setIsPlaced] = React.useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const pointsDiscountAmount = usePointsDiscount ? Math.min(Math.floor(user.ecoPoints / 10), 30) : 0;
  const shippingCost = deliveryMethod === 'envio_domicilio' ? 10 : 0;
  const grandTotal = Math.max(0, subtotal - pointsDiscountAmount + shippingCost);
  const totalEcoPointsEarned = cart.reduce((sum, item) => sum + item.product.ecoPointsReward * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      type: 'buy',
      items: cart.map(i => i.product),
      totalAmount: grandTotal,
      ecoPointsEarned: totalEcoPointsEarned,
      status: deliveryMethod === 'punto_encuentro' ? 'pendiente_punto_encuentro' : 'en_camino',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      shippingAddress: deliveryMethod === 'punto_encuentro' ? 'Punto Ecológico ReVuelta - Parque Kennedy' : shippingAddress,
      isRated: false
    };

    onPlaceOrder(newOrder);
    setIsPlaced(true);
  };

  if (isPlaced) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-2xl space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">¡Pedido Confirmado!</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Gracias por elegir ropa pre-amada y evitar el desperdicio textil. Hemos enviado los detalles de coordinación a tu correo.
        </p>

        <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>¡Has ganado +{totalEcoPointsEarned} EcoPuntos!</span>
          </div>
          <p className="text-xs text-emerald-200">
            Tu saldo actual es ahora de <strong>{user.ecoPoints + totalEcoPointsEarned} EcoPuntos</strong>.
          </p>
        </div>

        <div className="pt-2">
            <button
            onClick={() => {
              setIsPlaced(false);
              navigate('/orders');
            }}
            className="w-full py-3.5 bg-emerald-800 text-white rounded-xl font-bold text-sm hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            Ver estado en Mis Pedidos
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-sm space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Tu carrito está vacío</h2>
        <p className="text-slate-500 text-xs">
          Explora miles de prendas únicas de vendedores sostenibles y dales una segunda vida.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-3 bg-emerald-800 text-white rounded-xl font-bold text-xs hover:bg-emerald-900 transition-colors cursor-pointer"
        >
          Explorar Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Carrito de Compras & Checkout</h1>
        <p className="text-slate-500 text-sm">Revisa tus prendas seleccionadas y completa tu pedido circular</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Prendas en Carrito ({cart.length})</span>
              <button
                onClick={onClearCart}
                className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
              >
                Vaciar Carrito
              </button>
            </h3>

            <div className="divide-y divide-slate-100">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-100"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{product.title}</h4>
                    <p className="text-xs text-slate-500">
                      Talla {product.size} • {product.brand}
                    </p>
                    <p className="text-xs font-bold text-emerald-800 mt-1">
                      S/. {product.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Método de Entrega Ecológico
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('punto_encuentro')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  deliveryMethod === 'punto_encuentro'
                    ? 'border-emerald-600 bg-emerald-950 text-white shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-teal-300" />
                  <p className="text-xs font-bold">Punto de Encuentro Eco</p>
                </div>
                <p className="text-[11px] opacity-80">Gratis • Parque Kennedy o Jockey Plaza</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('envio_domicilio')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  deliveryMethod === 'envio_domicilio'
                    ? 'border-emerald-600 bg-emerald-950 text-white shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="w-4 h-4 text-teal-300" />
                  <p className="text-xs font-bold">Envío en Ciclomotor (S/. 10)</p>
                </div>
                <p className="text-[11px] opacity-80">Entrega Cero Emisiones en 24h-48h</p>
              </button>
            </div>

            {deliveryMethod === 'envio_domicilio' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Envío</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Action */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Redeem EcoPoints */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 border border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                Canjear EcoPuntos
              </span>
              <span className="text-xs font-mono text-emerald-200">{user.ecoPoints} Pts disponibles</span>
            </div>

            <p className="text-xs text-emerald-100">
              Canjea tus puntos acumulados para obtener hasta S/. 30 de descuento directo en tu compra.
            </p>

            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={usePointsDiscount}
                onChange={(e) => setUsePointsDiscount(e.target.checked)}
                className="w-4 h-4 accent-amber-400 cursor-pointer"
              />
              <span className="text-xs font-bold text-amber-300">
                Usar puntos (-S/. {Math.min(Math.floor(user.ecoPoints / 10), 30)})
              </span>
            </label>
          </div>

          {/* Payment Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Resumen del Pedido
            </h3>

            <div className="space-y-2 text-xs text-slate-600 border-b border-slate-100 pb-3">
              <div className="flex justify-between">
                <span>Subtotal prendas</span>
                <span className="font-bold text-slate-900">S/. {subtotal}</span>
              </div>

              {usePointsDiscount && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento EcoPuntos</span>
                  <span>- S/. {pointsDiscountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Costo de envío</span>
                <span className="font-bold text-slate-900">
                  {shippingCost > 0 ? `S/. ${shippingCost}` : 'Gratis'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-bold text-slate-900">Total a Pagar</span>
              <span className="text-2xl font-extrabold text-emerald-900">S/. {grandTotal}</span>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Método de Pago</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'yape', label: 'Yape / Plin' },
                  { id: 'tarjeta', label: 'Tarjeta' },
                  { id: 'efectivo', label: 'Contraentrega' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === p.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCheckout} className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirmar Pedido (S/. {grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
