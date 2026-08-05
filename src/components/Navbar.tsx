import React from 'react';
import { 
  ShoppingBag, 
  Repeat, 
  PlusCircle, 
  Search, 
  Sparkles, 
  Package, 
  User, 
  Award, 
  Heart,
  Leaf,
  Menu,
  X
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  cartCount: number;
  pendingSwapsCount: number;
  onOpenSearch: () => void;
  onOpenUserSwitcher: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  user,
  cartCount,
  pendingSwapsCount,
  onOpenSearch,
  onOpenUserSwitcher,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Leaf },
    { id: 'explore', label: 'Explorar', icon: Search },
    { id: 'publish', label: 'Publicar Prenda', icon: PlusCircle, highlight: true },
    { id: 'orders', label: 'Mis Pedidos & Trueques', icon: Repeat, badge: pendingSwapsCount },
    { id: 'rewards', label: 'EcoPuntos & Impacto', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md text-emerald-50 border-b border-emerald-800/60 shadow-lg">
      {/* Top Eco Announcement bar */}
      <div className="bg-emerald-800/70 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-700/50">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>¡Lleva la moda circular más lejos! Gana +100 EcoPuntos por cada trueque completado esta semana.</span>
        <button 
          onClick={() => setCurrentTab('rewards')}
          className="underline hover:text-white font-semibold ml-1 cursor-pointer"
        >
          Ver premios
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-emerald-950 shadow-md group-hover:scale-105 transition-transform">
                <Repeat className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
                  ReVuelta
                </span>
                <span className="block text-[10px] font-medium tracking-wider uppercase text-emerald-300/90 -mt-1">
                  Moda Circular
                </span>
              </div>
            </button>
          </div>

          {/* Search bar quick trigger */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center gap-2.5 bg-emerald-900/60 hover:bg-emerald-900/90 text-emerald-200 text-sm px-4 py-2 rounded-full border border-emerald-700/50 transition-all text-left shadow-inner group"
            >
              <Search className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-emerald-300/70">Buscar denim vintage, casacas, trueques...</span>
              <kbd className="ml-auto hidden lg:inline-block px-2 py-0.5 text-[10px] font-mono bg-emerald-800/80 rounded text-emerald-300 border border-emerald-700">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-semibold text-sm hover:opacity-95 hover:shadow-md transition-all ml-1 cursor-pointer"
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
                    isActive 
                      ? 'bg-emerald-800/80 text-white font-semibold' 
                      : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1 bg-amber-400 text-emerald-950 font-bold text-[11px] px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: EcoPoints badge, Cart, User Profile Switcher */}
          <div className="flex items-center gap-2.5">
            {/* EcoPoints Pill */}
            <button
              onClick={() => setCurrentTab('rewards')}
              className="flex items-center gap-1.5 bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 border border-emerald-700/70 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer"
              title="Tus EcoPuntos acumulados"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{user.ecoPoints} Pts</span>
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={() => setCurrentTab('cart')}
              className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                currentTab === 'cart' 
                  ? 'bg-emerald-800 text-white' 
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/80'
              }`}
              title="Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-400 text-emerald-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-emerald-950">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar / Switcher */}
            <button
              onClick={onOpenUserSwitcher}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-emerald-900/80 border border-emerald-700/60 transition-all cursor-pointer group"
              title="Cambiar usuario o ver perfil"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-400/80 group-hover:ring-teal-300"
              />
              <span className="hidden sm:inline-block text-xs font-medium text-emerald-100 pr-1 max-w-[100px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>

            {/* Mobile Menu Toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-200 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-800/80 bg-emerald-950 px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 bg-emerald-900 text-emerald-200 px-4 py-2.5 rounded-xl text-sm border border-emerald-800 mb-3"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Buscar catálogo o trueques...</span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-emerald-800 text-white font-semibold' : 'text-emerald-200 hover:bg-emerald-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="bg-amber-400 text-emerald-950 font-bold text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
