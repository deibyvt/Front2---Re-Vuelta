import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Repeat,
  PlusCircle,
  Search,
  Sparkles,
  User,
  Award,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  isLoggedIn: boolean;
  cartCount: number;
  pendingSwapsCount: number;
  onOpenUserSwitcher: () => void;
  onRequestLogin: (action: string, fromPath?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  isLoggedIn,
  cartCount,
  pendingSwapsCount,
  onOpenUserSwitcher,
  onRequestLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'orders', label: 'Mis Pedidos & Trueques', icon: Repeat, badge: pendingSwapsCount },
    { id: 'rewards', label: 'EcoPuntos & Impacto', icon: Award },
  ];

  const goTo = (path: string, protectedRoute = false, actionLabel?: string) => {
    if (protectedRoute && !isLoggedIn) {
      onRequestLogin(actionLabel || 'iniciar sesión', path);
      return;
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md text-emerald-50 border-b border-emerald-800/60 shadow-lg">
      <div className="bg-emerald-800/70 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-700/50">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>¡Lleva la moda circular más lejos! Gana +100 EcoPuntos por cada trueque completado esta semana.</span>
        <button
          onClick={() => goTo('/rewards', true, 'iniciar sesión para ver premios')}
          className="underline hover:text-white font-semibold ml-1 cursor-pointer"
        >
          Ver premios
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 py-3 lg:py-0">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-3 min-w-[180px]">
              <Link to="/" className="flex items-center gap-2.5 group text-left">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-emerald-950 shadow-md group-hover:scale-105 transition-transform">
                  <Repeat className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">ReVuelta</span>
                  <span className="block text-[10px] font-medium tracking-wider uppercase text-emerald-300/90 -mt-1">Moda Circular</span>
                </div>
              </Link>

              <NavLink to="/" className="hidden sm:inline-flex items-center justify-center rounded-full border border-emerald-700/70 bg-emerald-900/70 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-emerald-900 transition">Inicio</NavLink>

              <NavLink to="/explore" className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-400 transition">
                <Search className="w-4 h-4" />
                <span>Explorar</span>
              </NavLink>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => goTo('/notifications', true, 'iniciar sesión para ver notificaciones')}
                className="p-2.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-900/80 transition-colors"
                title="Notificaciones"
              >
                <Bell className="w-5 h-5" />
              </button>

              <button
                onClick={() => goTo('/cart', true, 'iniciar sesión para ver tu carrito')}
                className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${location.pathname === '/cart' ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:text-white hover:bg-emerald-900/80'}`}
                title="Carrito de Compras"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-400 text-emerald-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-950">{cartCount}</span>
                )}
              </button>

              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    onRequestLogin('iniciar sesión para ver perfil', '/');
                    return;
                  }
                  onOpenUserSwitcher();
                }}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-emerald-900/80 border border-emerald-700/60 transition-all cursor-pointer group"
                title={isLoggedIn ? 'Cambiar usuario o ver perfil' : 'Iniciar sesión'}
              >
                {isLoggedIn ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-400/80 group-hover:ring-teal-300" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-800/90 flex items-center justify-center text-emerald-200">
                    <User className="w-5 h-5" />
                  </div>
                )}
                {isLoggedIn && <span className="hidden sm:inline-block text-xs font-medium text-emerald-100 pr-1 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>}
              </button>

              <button
                onClick={() => goTo('/publish', true, 'iniciar sesión para publicar')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-semibold hover:opacity-95 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publicar prenda</span>
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-emerald-200 hover:text-white rounded-lg focus:outline-none">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-800/60 bg-emerald-950/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center gap-1 py-3 justify-end">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === `/${item.id}`;
              const isProtected = item.id !== 'explore';
              return (
                <button
                  key={item.id}
                  onClick={() => goTo(`/${item.id}`, isProtected, `iniciar sesión para ver ${item.label.toLowerCase()}`)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${isActive ? 'bg-emerald-800/80 text-white font-semibold' : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? <span className="ml-1 bg-amber-400 text-emerald-950 font-bold text-[11px] px-1.5 py-0.2 rounded-full">{item.badge}</span> : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-800/80 bg-emerald-950 px-4 pt-3 pb-6 space-y-2">
          <button onClick={() => { navigate('/explore'); setMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-emerald-950 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-400 transition mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Explorar catálogo</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === `/${item.id}`;
            const isProtected = item.id !== 'explore';
            return (
              <button key={item.id} onClick={() => { goTo(`/${item.id}`, isProtected, `iniciar sesión para ver ${item.label.toLowerCase()}`); setMobileMenuOpen(false); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-emerald-800 text-white font-semibold' : 'text-emerald-200 hover:bg-emerald-900/60'}`}>
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-2 py-0.5 rounded-full">{item.badge}</span> : null}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
