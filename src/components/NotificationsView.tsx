import React from 'react';
import { Bell, Sparkles } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white shadow-lg border border-emerald-100 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-700">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Notificaciones</h1>
              <p className="text-sm text-slate-500">Aquí verás alertas sobre pedidos, trueques y mensajes.</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            <Sparkles className="w-4 h-4" /> Actualizado recientemente
          </span>
        </div>

        <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50 p-10 text-center">
          <Sparkles className="mx-auto mb-4 w-12 h-12 text-emerald-500" />
          <p className="text-sm leading-7 text-slate-600 max-w-xl mx-auto">
            No tienes notificaciones nuevas por ahora, pero aquí aparecerán tus actualizaciones de pedidos, trueques y mensajes cuando lleguen.
          </p>
        </div>
      </div>
    </div>
  );
};
