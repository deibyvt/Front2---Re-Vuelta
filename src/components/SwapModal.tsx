import React from 'react';
import { X, Repeat, ArrowRightLeft, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Product, UserProfile, SwapOffer } from '../types';

interface SwapModalProps {
  targetProduct: Product | null;
  user: UserProfile;
  onClose: () => void;
  onSubmitSwapOffer: (offer: Omit<SwapOffer, 'id' | 'createdAt'>) => void;
}

export const SwapModal: React.FC<SwapModalProps> = ({
  targetProduct,
  user,
  onClose,
  onSubmitSwapOffer,
}) => {
  if (!targetProduct) return null;

  const [selectedMyItemIds, setSelectedMyItemIds] = React.useState<string[]>(
    user.myClosetItems.length > 0 ? [user.myClosetItems[0].id] : []
  );
  const [cashAdjustment, setCashAdjustment] = React.useState<number>(0);
  const [note, setNote] = React.useState<string>(
    `¡Hola ${targetProduct.seller.name.split(' ')[0]}! Me encanta tu ${targetProduct.title}. Te propongo intercambiarlo por prenda(s) de mi clóset. ¿Coordinamos el trueque?`
  );
  const [submitted, setSubmitted] = React.useState(false);

  // Calculate estimated value of offered items
  const offeredItems = user.myClosetItems.filter(i => selectedMyItemIds.includes(i.id));
  const totalOfferedValue = offeredItems.reduce((acc, curr) => acc + curr.price, 0) + cashAdjustment;
  const targetValue = targetProduct.price || 80;
  const matchPercentage = Math.min(Math.round((totalOfferedValue / targetValue) * 100), 150);

  const toggleItemSelection = (id: string) => {
    setSelectedMyItemIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMyItemIds.length === 0) return;

    onSubmitSwapOffer({
      targetProductId: targetProduct.id,
      targetProduct,
      offeredProductIds: selectedMyItemIds,
      offeredProducts: offeredItems,
      cashAdjustment,
      note,
      status: 'pending',
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-teal-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Repeat className="w-4 h-4" />
            <span>Propuesta de Trueque Directo</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold">
            Intercambiar con {targetProduct.seller.name}
          </h2>
        </div>

        {submitted ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">¡Propuesta de Trueque Enviada!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              {targetProduct.seller.name} ha recibido tu notificación. Puedes ver el estado de esta propuesta en <strong>Mis Pedidos & Trueques</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Target Item vs My Item Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              
              {/* Target Item */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Deseas recibir:
                </span>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <img
                    src={targetProduct.images[0]}
                    alt={targetProduct.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{targetProduct.title}</h4>
                    <p className="text-[11px] text-slate-500">Talla {targetProduct.size} • S/. {targetProduct.price}</p>
                    <span className="text-[10px] text-emerald-700 font-medium">De {targetProduct.seller.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Offered Items summary */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Ofreces ({offeredItems.length} prenda{offeredItems.length > 1 ? 's' : ''}):
                </span>
                {offeredItems.length > 0 ? (
                  <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                    {offeredItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-emerald-200 text-xs">
                        <span className="font-medium text-slate-800 truncate max-w-[140px]">{item.title}</span>
                        <span className="font-mono text-emerald-700 font-bold">S/. {item.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
                    Selecciona al menos 1 prenda de tu clóset abajo.
                  </div>
                )}
              </div>

            </div>

            {/* Select items from My Closet */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. Elige prenda(s) de tu clóset para el intercambio:
              </label>

              {user.myClosetItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.myClosetItems.map((item) => {
                    const isSelected = selectedMyItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItemSelection(item.id)}
                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/60 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 accent-emerald-600 cursor-pointer"
                        />
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{item.title}</h5>
                          <p className="text-[11px] text-slate-500">Talla {item.size} • S/. {item.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs">
                  Aún no tienes prendas publicadas en tu clóset.{' '}
                  <button type="button" onClick={onClose} className="underline font-bold">
                    Publica una prenda primero
                  </button>.
                </div>
              )}
            </div>

            {/* Cash Adjustment */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  2. ¿Agregar diferencia en dinero a favor del otro vendedor?
                </label>
                <span className="text-xs font-bold text-emerald-800">
                  {cashAdjustment > 0 ? `+ S/. ${cashAdjustment}` : 'Sin ajuste'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={cashAdjustment}
                onChange={(e) => setCashAdjustment(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Añadir un pequeño incentivo en dinero aumenta la probabilidad de que acepten tu propuesta de trueque.
              </p>
            </div>

            {/* Balance Match Indicator */}
            <div className="flex items-center justify-between bg-emerald-950 text-white p-4 rounded-2xl">
              <div>
                <p className="text-xs text-emerald-300 font-semibold">Equilibrio de Propuesta</p>
                <p className="text-lg font-bold text-teal-300">{matchPercentage}% de coincidencia de valor</p>
              </div>
              <div className="text-right text-xs text-emerald-200 font-mono">
                Valor ofrecido: S/. {totalOfferedValue}
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                3. Mensaje personalizado para el vendedor:
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={selectedMyItemIds.length === 0}
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                selectedMyItemIds.length > 0
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Repeat className="w-4 h-4" />
              <span>Enviar Propuesta de Trueque</span>
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
