import React from 'react';
import { 
  Award, 
  TreePine, 
  Droplets, 
  Wind, 
  Gift, 
  Check, 
  Tag, 
  Truck, 
  Copy,
  Sparkles,
  Zap
} from 'lucide-react';
import { UserProfile, EcoReward } from '../types';
import { ECO_REWARDS } from '../data/mockData';

interface EcoPointsDashboardProps {
  user: UserProfile;
  onRedeemReward: (reward: EcoReward) => void;
}

export const EcoPointsDashboard: React.FC<EcoPointsDashboardProps> = ({
  user,
  onRedeemReward,
}) => {
  const [claimedCode, setClaimedCode] = React.useState<{ code: string; title: string } | null>(null);

  const handleRedeem = (reward: EcoReward) => {
    if (user.ecoPoints < reward.pointsCost) return;
    onRedeemReward(reward);
    setClaimedCode({ code: reward.code, title: reward.title });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Header Banner with Eco Points Balance */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-8 md:p-10 rounded-3xl shadow-xl border border-emerald-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-emerald-800/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-700/80 inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Nivel Actual: {user.ecoTier}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Tus EcoPuntos & Impacto
            </h1>
            <p className="text-emerald-100/90 text-sm max-w-xl">
              Cada trueque o compra de segunda vida acumula EcoPuntos. Canjéalos por descuentos, envíos sostenibles gratuitos y donaciones ecológicas.
            </p>
          </div>

          <div className="bg-emerald-900/80 border border-emerald-700/80 p-6 rounded-2xl text-center min-w-[200px] backdrop-blur-md">
            <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Saldo de Puntos</p>
            <p className="text-4xl font-extrabold text-amber-300 my-1">{user.ecoPoints}</p>
            <p className="text-[11px] text-teal-200 font-medium">EcoPuntos Disponibles</p>
          </div>
        </div>

        {/* Impact Counters Grid */}
        <div className="mt-8 pt-6 border-t border-emerald-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center justify-center gap-2 text-teal-300 mb-1">
              <Wind className="w-5 h-5" />
              <span className="text-2xl font-bold">{user.co2SavedKg} kg</span>
            </div>
            <p className="text-xs text-emerald-200">CO₂ Evitado a la Atmósfera</p>
          </div>

          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center justify-center gap-2 text-emerald-300 mb-1">
              <Droplets className="w-5 h-5 text-teal-300" />
              <span className="text-2xl font-bold">{user.waterSavedLiters.toLocaleString()} L</span>
            </div>
            <p className="text-xs text-emerald-200">Litros de Agua Ahorrados</p>
          </div>

          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-emerald-800/60">
            <div className="flex items-center justify-center gap-2 text-amber-300 mb-1">
              <TreePine className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-bold">~{user.treesEquivalent} Árboles</span>
            </div>
            <p className="text-xs text-emerald-200">Equivalente en Reforestación</p>
          </div>
        </div>
      </div>

      {/* Claimed Code Notification */}
      {claimedCode && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 flex items-center justify-between text-emerald-950 font-medium text-xs shadow-md animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">¡Premio Canjeado: {claimedCode.title}!</p>
              <p className="text-emerald-800">Usa el código en tu próximo checkout: <strong className="font-mono bg-emerald-200 px-2 py-0.5 rounded text-slate-900">{claimedCode.code}</strong></p>
            </div>
          </div>
          <button
            onClick={() => setClaimedCode(null)}
            className="text-xs font-bold underline px-3 py-1 text-emerald-800"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Rewards Store Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Catálogo de Recompensas Canjeables</h2>
          <p className="text-slate-500 text-xs">Usa tus EcoPuntos acumulados para desbloquear beneficios exclusivos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECO_REWARDS.map((reward) => {
            const canAfford = user.ecoPoints >= reward.pointsCost;
            return (
              <div
                key={reward.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {reward.category.replace('_', ' ')}
                    </span>
                    <span className="text-amber-600 font-extrabold text-sm flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {reward.pointsCost} Pts
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{reward.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{reward.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Validez: {reward.expiresAt}</span>
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Canjear Beneficio' : `Faltan ${reward.pointsCost - user.ecoPoints} Pts`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
