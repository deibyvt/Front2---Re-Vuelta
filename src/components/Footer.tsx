import React from 'react';
import { Repeat, Heart, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-300 flex items-center justify-center text-emerald-950 font-bold">
                <Repeat className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">ReVuelta</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              La plataforma de moda circular y trueque sostenible que transforma la forma en que consumimos ropa en Latinoamérica.
            </p>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">Navegación</h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">Inicio & Tendencias</button></li>
              <li><button onClick={() => onNavigate('explore')} className="hover:text-white cursor-pointer">Catálogo Completo</button></li>
              <li><button onClick={() => onNavigate('publish')} className="hover:text-white cursor-pointer">Publicar Prenda o Trueque</button></li>
              <li><button onClick={() => onNavigate('rewards')} className="hover:text-white cursor-pointer">EcoPuntos & Impacto</button></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">Puntos Ecológicos</h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li>Punto Kennedy - Miraflores</li>
              <li>Punto Jockey Plaza - Surco</li>
              <li>Punto San Blas - Cusco</li>
              <li>Punto Yanahuara - Arequipa</li>
            </ul>
          </div>

          {/* Eco Pledge */}
          <div className="space-y-2 bg-emerald-900/60 p-4 rounded-2xl border border-emerald-800/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Compromiso Cero Plástico
            </h4>
            <p className="text-[11px] text-emerald-200 leading-relaxed">
              Todos los envíos ReVuelta usan empaques compostables de fécula de maíz y entregas en ciclomotores eléctricos.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-emerald-900/80 text-center text-xs text-emerald-400/80 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ReVuelta - Moda Circular Sostenible.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" /> por el planeta y la moda consciente.
          </p>
        </div>

      </div>
    </footer>
  );
};
