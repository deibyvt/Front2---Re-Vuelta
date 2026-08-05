import React from 'react';
import { X, Star, Award, CheckCircle2 } from 'lucide-react';

interface ReviewModalProps {
  orderId: string;
  itemName: string;
  sellerName: string;
  onClose: () => void;
  onSubmitReview: (orderId: string, rating: number, comment: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  orderId,
  itemName,
  sellerName,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(orderId, rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Calificación Registrada!</h3>
            <p className="text-xs text-slate-600">
              Has recibido <strong className="text-emerald-700">+50 EcoPuntos adicionales</strong> por aportar reputación transparente a la comunidad.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Valoración de la Prenda
              </span>
              <h3 className="text-lg font-bold text-slate-900">{itemName}</h3>
              <p className="text-xs text-slate-500">Vendedor: {sellerName}</p>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1 text-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700">¿Qué tal estuvo el estado real vs anunciado?</label>
              <div className="flex items-center justify-center gap-2 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tu reseña o comentarios:</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Cuéntanos si la prenda llegó limpia, bien empaquetada o la amabilidad en el punto de encuentro..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Ganas +50 EcoPuntos al enviar tu reseña sincera.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Enviar Calificación
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
