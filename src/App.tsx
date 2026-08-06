import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { LoginView } from './components/LoginView';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SwapModal } from './components/SwapModal';
import { PublishView } from './components/PublishView';
import { CartCheckoutView } from './components/CartCheckoutView';
import { MyOrdersView } from './components/MyOrdersView';
import { NotificationsView } from './components/NotificationsView';
import { ReviewModal } from './components/ReviewModal';
import { SellerProfileView } from './components/SellerProfileView';
import { EcoPointsDashboard } from './components/EcoPointsDashboard';
import { UserSwitcherModal } from './components/UserSwitcherModal';

import { 
  INITIAL_PRODUCTS, 
  DEMO_USER_PROFILE, 
  INITIAL_SWAP_OFFERS, 
  INITIAL_ORDERS,
  MOCK_SELLERS
} from './data/mockData';
import { Product, Seller, CartItem, Order, SwapOffer, EcoReward, UserProfile } from './types';

const GUEST_USER: UserProfile = {
  id: 'guest',
  name: 'Invitado',
  email: '',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  location: 'Modo invitado',
  ecoPoints: 0,
  ecoTier: 'Semilla Circular',
  co2SavedKg: 0,
  waterSavedLiters: 0,
  treesEquivalent: 0,
  myClosetItems: [],
  favoriteIds: []
};

export default function App() {
  
  const [user, setUser] = React.useState<UserProfile>(() => {
    if (typeof window === 'undefined') return GUEST_USER;
    const storedUser = window.localStorage.getItem('revuelta_user');
    if (storedUser) {
      return JSON.parse(storedUser) as UserProfile;
    }
    return GUEST_USER;
  });
  const [products, setProducts] = React.useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [orders, setOrders] = React.useState<Order[]>(INITIAL_ORDERS);
  const [swapOffers, setSwapOffers] = React.useState<SwapOffer[]>(INITIAL_SWAP_OFFERS);
  const [favorites, setFavorites] = React.useState<string[]>(user.favoriteIds);

  // Modals & Target Selections
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [swapTargetProduct, setSwapTargetProduct] = React.useState<Product | null>(null);
  const [selectedSeller, setSelectedSeller] = React.useState<Seller | null>(null);
  const [ratingTargetOrder, setRatingTargetOrder] = React.useState<Order | null>(null);
  const [userSwitcherOpen, setUserSwitcherOpen] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('revuelta_isLoggedIn') === 'true';
  });
  const [exploreInitialQuery, setExploreInitialQuery] = React.useState<string>('');
  const navigate = useNavigate();

  const requestLogin = (action: string, redirectTo?: string) => {
    const path = redirectTo || '/';
    navigate('/login', { state: { from: { pathname: path }, actionLabel: action } });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser(DEMO_USER_PROFILE);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(GUEST_USER);
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('revuelta_isLoggedIn', isLoggedIn ? 'true' : 'false');
    window.localStorage.setItem('revuelta_user', JSON.stringify(user));
  }, [isLoggedIn, user]);


  const handleDeclineSwapOffer = (offerId: string) => {
    setSwapOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, status: 'declined' as const } : o))
    );
  };

  // Order Placement Handler
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + newOrder.ecoPointsEarned
    }));
    handleClearCart();
  };

  // Review Handler
  const handleSubmitReview = (orderId: string, rating: number, comment: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, isRated: true, rating, comment } : o))
    );
    setUser(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 50 }));
  };

  // Redeem Reward Handler
  const handleRedeemReward = (reward: EcoReward) => {
    setUser(prev => ({ ...prev, ecoPoints: Math.max(0, prev.ecoPoints - reward.pointsCost) }));
  };

  // Cart handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(ci => ci.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(ci => (ci.product.id === productId ? { ...ci, quantity } : ci)));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(ci => ci.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  // Favorites
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        const next = prev.filter(id => id !== productId);
        setUser(u => ({ ...u, favoriteIds: next }));
        return next;
      }
      const next = [productId, ...prev];
      setUser(u => ({ ...u, favoriteIds: next }));
      return next;
    });
  };

  // Swap offers
  const handleCreateSwapOffer = (offer: Omit<SwapOffer, 'id' | 'createdAt'>) => {
    const newOffer: SwapOffer = {
      ...offer,
      id: `swap_${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as SwapOffer;
    setSwapOffers(prev => [newOffer, ...prev]);
  };

  const handleAcceptSwapOffer = (offerId: string) => {
    setSwapOffers(prev => prev.map(o => (o.id === offerId ? { ...o, status: 'accepted' } : o)));
  };

  // Publish product handler
  const handlePublishProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    // reward user with some eco points
    setUser(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 50 }));
  };

  const pendingSwapsCount = isLoggedIn
    ? swapOffers.filter(s => s.status === 'pending').length
    : 0;
  const totalCartCount = isLoggedIn
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Main Navigation */}
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
        cartCount={totalCartCount}
        pendingSwapsCount={pendingSwapsCount}
        onOpenUserSwitcher={() => {
          if (!isLoggedIn) {
            requestLogin('iniciar sesión para ver el perfil', '/');
            return;
          }
          setUserSwitcherOpen(true);
        }}
        onRequestLogin={(action: string, fromPath?: string) => requestLogin(action, fromPath)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Routes>
          <Route path="/" element={
            selectedSeller ? (
              <SellerProfileView
                seller={selectedSeller}
                products={products}
                onBack={() => setSelectedSeller(null)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onQuickSwap={(p) => setSwapTargetProduct(p)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <HomeView
                products={products}
                sellers={Object.values(MOCK_SELLERS)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onQuickSwap={(p) => setSwapTargetProduct(p)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectSeller={(s) => setSelectedSeller(s)}
              />
            )
          } />

          <Route path="/explore" element={
            <ExploreView
              products={products}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onQuickSwap={(p) => setSwapTargetProduct(p)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              initialQuery={exploreInitialQuery}
            />
          } />

          <Route path="/publish" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PublishView user={user} onPublishProduct={handlePublishProduct} /></ProtectedRoute>} />

          <Route path="/cart" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CartCheckoutView cart={cart} user={user} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveCartItem} onClearCart={handleClearCart} onPlaceOrder={handlePlaceOrder} /></ProtectedRoute>} />

          <Route path="/orders" element={<ProtectedRoute isLoggedIn={isLoggedIn}><MyOrdersView orders={orders} swapOffers={swapOffers} onAcceptSwapOffer={handleAcceptSwapOffer} onDeclineSwapOffer={handleDeclineSwapOffer} onOpenRateOrder={(o) => setRatingTargetOrder(o)} /></ProtectedRoute>} />

          <Route path="/rewards" element={<ProtectedRoute isLoggedIn={isLoggedIn}><EcoPointsDashboard user={user} onRedeemReward={handleRedeemReward} /></ProtectedRoute>} />

          <Route path="/notifications" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NotificationsView /></ProtectedRoute>} />

          <Route path="/login" element={<LoginView onLogin={handleLogin} />} />

          <Route path="*" element={<HomeView products={products} sellers={Object.values(MOCK_SELLERS)} onSelectProduct={(p) => setSelectedProduct(p)} onAddToCart={handleAddToCart} onQuickSwap={(p) => setSwapTargetProduct(p)} favorites={favorites} onToggleFavorite={handleToggleFavorite} onSelectSeller={(s) => setSelectedSeller(s)} />} />
        </Routes>
      </main>

      {/* Global Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onProposeSwap={(p) => setSwapTargetProduct(p)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onViewSeller={(s) => {
          setSelectedProduct(null);
          setSelectedSeller(s);
        }}
      />

      <SwapModal
        targetProduct={swapTargetProduct}
        user={user}
        onClose={() => setSwapTargetProduct(null)}
        onSubmitSwapOffer={handleCreateSwapOffer}
      />

      {ratingTargetOrder && (
        <ReviewModal
          orderId={ratingTargetOrder.id}
          itemName={ratingTargetOrder.items[0]?.title || 'Prenda ReVuelta'}
          sellerName={ratingTargetOrder.items[0]?.seller?.name || 'Vendedor Eco'}
          onClose={() => setRatingTargetOrder(null)}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {userSwitcherOpen && (
        <UserSwitcherModal
          currentUser={user}
          onClose={() => setUserSwitcherOpen(false)}
          onSwitchUser={(newUser) => setUser(newUser)}
          onLogout={handleLogout}
        />
      )}

      {/* Login prompt replaced by /login route; handled via `requestLogin` */}

      {/* Footer */}
      <Footer />

    </div>
  );
}
