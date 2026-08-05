import React from 'react';
import { X, UserCheck, ShieldCheck, MapPin, Award } from 'lucide-react';
import { UserProfile } from '../types';
import { DEMO_USER_PROFILE, MOCK_SELLERS } from '../data/mockData';

interface UserSwitcherModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onSwitchUser: (newUser: UserProfile) => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  currentUser,
  onClose,
  onSwitchUser,
}) => {
  const profiles: UserProfile[] = [
    DEMO_USER_PROFILE,
    {
      id: 's2',
      name: 'Mateo & Co.',
      email: 'mateo.eco@revuelta.pe',
      avatar: MOCK_SELLERS.s2.avatar,
      location: MOCK_SELLERS.s2.location,
      ecoPoints: 890,
      ecoTier: 'Leyenda Sostenible',
      co2SavedKg: 210.0,
      waterSavedLiters: 48000,
      treesEquivalent: 9,
      favoriteIds: ['p1', 'p2'],
      myClosetItems: []
    },
    {
      id: 's3',
      name: 'Sofía EcoCloset',
      email: 'sofia.artisan@revuelta.pe',
      avatar: MOCK_SELLERS.s3.avatar,
      location: MOCK_SELLERS.s3.location,
      ecoPoints: 620,
      ecoTier: 'Eco Warrior',
      co2SavedKg: 88.0,
      waterSavedLiters: 22000,
      treesEquivalent: 4,
      favoriteIds: ['p4'],
      myClosetItems: []
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Simulador de Experiencia
          </span>
          <h3 className="text-xl font-bold text-slate-900">Cambiar Perfil de Usuario Demo</h3>
          <p className="text-xs text-slate-500">
            Prueba la app desde la perspectiva de comprador, truequero o vendedor top.
          </p>
        </div>

        <div className="space-y-3">
          {profiles.map((profile) => {
            const isSelected = currentUser.id === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => {
                  onSwitchUser(profile);
                  onClose();
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">{profile.name}</h4>
                    {isSelected && <UserCheck className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {profile.location}
                  </p>
                  <p className="text-[10px] text-amber-700 font-semibold mt-0.5">
                    ⭐ {profile.ecoTier} • {profile.ecoPoints} EcoPts
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
