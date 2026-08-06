import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Repeat, 
  ShoppingBag, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Star, 
  MapPin, 
  Award, 
  ChevronRight,
  ArrowRightLeft,
  Check,
  X
} from 'lucide-react';
import { Order, SwapOffer } from '../types';

interface MyOrdersViewProps {
  orders: Order[];
  swapOffers: SwapOffer[];
  onAcceptSwapOffer: (offerId: string) => void;
  onDeclineSwapOffer: (offerId: string) => void;
  onOpenRateOrder: (order: Order) => void;
}

export const MyOrdersView: React.FC<MyOrdersViewProps> = ({
  orders,
  swapOffers,
  onAcceptSwapOffer,
  onDeclineSwapOffer,
  onOpenRateOrder,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'swaps' | 'orders'>('swaps');

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-8 rounded-3xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold">Mis Pedidos & Trueques</h1>
        <p className="text-emerald-100/90 text-sm mt-1">
          Administra tus propuestas de intercambio activas, historial de compras y calificaciones.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-6 bg-emerald-900/60 p-1.5 rounded-2xl w-fit border border-emerald-700/60">
          <button
            onClick={() => setActiveTab('swaps')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'swaps'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>Propuestas de Trueque ({swapOffers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-emerald-950 shadow-md'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mis Compras ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'swaps' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Propuestas de Trueque Recibidas y Enviadas</h2>
            <span className="text-xs text-slate-500 font-medium">Revisar detalles & aceptar</span>
          </div>

          {swapOffers.length > 0 ? (
            <div className="space-y-4">
              {swapOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={offer.senderAvatar}
                        alt={offer.senderName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-xs">{offer.senderName}</span>
                        <span className="text-[11px] text-slate-400 block">{offer.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {offer.status === 'pending' && (
                        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Pendiente
                        </span>
                      )}
                      {offer.status === 'accepted' && (
                        <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Aceptado
                        </span>
                      )}
                      {offer.status === 'declined' && (
                        <span className="bg-rose-100 text-rose-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Rechazado
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Offered items vs Target Item */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                        Prenda solicitada de tu clóset:
                      </span>
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                        <img
                          src={offer.targetProduct.images[0]}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{offer.targetProduct.title}</h4>
                          <p className="text-[10px] text-slate-500">Talla {offer.targetProduct.size}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">
                        Prenda(s) que te ofrecen a cambio:
                      </span>
                      <div className="space-y-1">
                        {offer.offeredProducts.map(item => (
                          <div key={item.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-200">
                            <img src={item.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                              <p className="text-[10px] text-slate-500">Talla {item.size} • Ref. S/. {item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cash Adjustment and Note */}
                  {offer.cashAdjustment > 0 && (
                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
                      💵 Adicional ofrecido en dinero: + S/. {offer.cashAdjustment}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic">
                    "{offer.note}"
                  </p>

                  {/* Actions for Pending Offer */}
                  {offer.status === 'pending' && (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => onAcceptSwapOffer(offer.id)}
                        className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aceptar Propuesta de Trueque</span>
                      </button>

                      <button
                        onClick={() => onDeclineSwapOffer(offer.id)}
                        className="py-2.5 px-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Rechazar</span>
                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
              <p className="text-sm text-slate-500">No tienes propuestas de trueque pendientes.</p>
              <button
                onClick={() => navigate('/explore')}
                className="px-5 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-900 cursor-pointer"
              >
                Explorar prendas para proponer trueque
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Orders Tab */
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Historial de Compras y Pedidos</h2>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">Pedido #{order.id}</span>
                      <span className="text-xs text-slate-400 block">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full capitalize">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                        <img src={item.images[0]} alt="" className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-xs">{item.title}</h4>
                          <p className="text-[11px] text-slate-500">Vendedor: {item.seller?.name || 'ReVuelta Verified'}</p>
                        </div>
                        <span className="font-extrabold text-slate-900 text-sm">S/. {item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer & Rate trigger */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-amber-600 font-bold">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>+{order.ecoPointsEarned} EcoPuntos ganados</span>
                    </div>

                    {!order.isRated ? (
                      <button
                        onClick={() => onOpenRateOrder(order)}
                        className="py-2 px-4 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span>Calificar Prenda & Vendedor (+50 Pts)</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Ya calificado
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-3">
              <p className="text-sm text-slate-500">Aún no has realizado compras directas.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
