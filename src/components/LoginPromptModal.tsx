import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface LoginPromptModalProps {
  actionLabel?: string;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
  actionLabel = 'acceder a esta información',
  onClose,
  onLogin,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="relative max-w-md w-full rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500 hover:text-slate-800"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Inicia sesión para continuar</h2>
            <p className="text-sm text-slate-600 mt-2">
              Necesitas iniciar sesión para {actionLabel}. Luego podrás ver esa información y seguir navegando.
            </p>
          </div>
          <button
            onClick={onLogin}
            className="w-full rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition"
          >
            Iniciar sesión
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
