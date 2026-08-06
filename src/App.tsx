import React from 'react';
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
import { LoginPromptModal } from './components/LoginPromptModal';

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
  const [currentTab, setCurrentTab] = React.useState<string>('home');
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
  const [loginPromptOpen, setLoginPromptOpen] = React.useState<boolean>(false);
  const [loginPromptAction, setLoginPromptAction] = React.useState<string>('ver esta sección');
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('revuelta_isLoggedIn') === 'true';
  });
  const [exploreInitialQuery, setExploreInitialQuery] = React.useState<string>('');

  const openLoginPrompt = (action: string) => {
    setLoginPromptAction(action);
    setLoginPromptOpen(true);
  };

  const closeLoginPrompt = () => setLoginPromptOpen(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser(DEMO_USER_PROFILE);
    setLoginPromptOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(GUEST_USER);
    setLoginPromptOpen(false);
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('revuelta_isLoggedIn', isLoggedIn ? 'true' : 'false');
    window.localStorage.setItem('revuelta_user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  const handleNavigate = (tab: string) => {
    const protectedTabs: Record<string, string> = {
      publish: 'publicar una prenda',
      cart: 'ver tu carrito de compras',
      orders: 'ver tus pedidos y trueques',
      rewards: 'ver EcoPuntos e impacto',
      notifications: 'ver tus notificaciones'
    };

    if (!isLoggedIn && protectedTabs[tab]) {
      openLoginPrompt(`iniciar sesión para ${protectedTabs[tab]}`);
      return;
    }

    setSelectedSeller(null);
    setCurrentTab(tab);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  // Favorites Handler
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Publish Garment Handler
  const handlePublishProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 50,
      myClosetItems: [newProduct, ...prev.myClosetItems]
    }));
  };

  // Swap Offer Handler
  const handleCreateSwapOffer = (offerData: Omit<SwapOffer, 'id' | 'createdAt'>) => {
    const newOffer: SwapOffer = {
      ...offerData,
      id: `so_${Date.now()}`,
      createdAt: 'Hace un momento'
    };
    setSwapOffers(prev => [newOffer, ...prev]);
  };

  const handleAcceptSwapOffer = (offerId: string) => {
    setSwapOffers(prev =>
      prev.map(o => (o.id === offerId ? { ...o, status: 'accepted' as const } : o))
    );
    setUser(prev => ({ ...prev, ecoPoints: prev.ecoPoints + 100 }));
  };

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
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedSeller(null);
          handleNavigate(tab);
        }}
        user={user}
        isLoggedIn={isLoggedIn}
        cartCount={totalCartCount}
        pendingSwapsCount={pendingSwapsCount}
        onOpenSearch={() => {
          setSelectedSeller(null);
          handleNavigate('explore');
        }}
        onOpenUserSwitcher={() => {
          if (!isLoggedIn) {
            openLoginPrompt('iniciar sesión para ver el perfil');
            return;
          }
          setUserSwitcherOpen(true);
        }}
        onRequestLogin={(action: string) => openLoginPrompt(action)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* If a seller profile is currently being inspected */}
        {selectedSeller ? (
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
          <>
            {currentTab === 'home' && (
              <HomeView
                products={products}
                sellers={Object.values(MOCK_SELLERS)}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onQuickSwap={(p) => setSwapTargetProduct(p)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onNavigate={handleNavigate}
                onSelectSeller={(s) => setSelectedSeller(s)}
              />
            )}

            {currentTab === 'explore' && (
              <ExploreView
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={handleAddToCart}
                onQuickSwap={(p) => setSwapTargetProduct(p)}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                initialQuery={exploreInitialQuery}
              />
            )}

            {currentTab === 'publish' && (
              <PublishView
                user={user}
                onPublishProduct={handlePublishProduct}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'cart' && (
              <CartCheckoutView
                cart={cart}
                user={user}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onClearCart={handleClearCart}
                onPlaceOrder={handlePlaceOrder}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'orders' && (
              <MyOrdersView
                orders={orders}
                swapOffers={swapOffers}
                onAcceptSwapOffer={handleAcceptSwapOffer}
                onDeclineSwapOffer={handleDeclineSwapOffer}
                onOpenRateOrder={(o) => setRatingTargetOrder(o)}
                onNavigate={handleNavigate}
              />
            )}

            {currentTab === 'rewards' && (
              <EcoPointsDashboard
                user={user}
                onRedeemReward={handleRedeemReward}
              />
            )}

            {currentTab === 'notifications' && (
              <NotificationsView />
            )}
          </>
        )}

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

      {loginPromptOpen && (
        <LoginPromptModal
          actionLabel={loginPromptAction}
          onClose={closeLoginPrompt}
          onLogin={handleLogin}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
