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

export default function App() {
  const [currentTab, setCurrentTab] = React.useState<string>('home');
  const [user, setUser] = React.useState<UserProfile>(DEMO_USER_PROFILE);
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
  const [exploreInitialQuery, setExploreInitialQuery] = React.useState<string>('');

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

  const pendingSwapsCount = swapOffers.filter(s => s.status === 'pending').length;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setSelectedSeller(null);
          setCurrentTab(tab);
        }}
        user={user}
        cartCount={totalCartCount}
        pendingSwapsCount={pendingSwapsCount}
        onOpenSearch={() => {
          setSelectedSeller(null);
          setCurrentTab('explore');
        }}
        onOpenUserSwitcher={() => setUserSwitcherOpen(true)}
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
                onNavigate={(tab) => setCurrentTab(tab)}
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
                onNavigate={(tab) => setCurrentTab(tab)}
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
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'orders' && (
              <MyOrdersView
                orders={orders}
                swapOffers={swapOffers}
                onAcceptSwapOffer={handleAcceptSwapOffer}
                onDeclineSwapOffer={handleDeclineSwapOffer}
                onOpenRateOrder={(o) => setRatingTargetOrder(o)}
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'rewards' && (
              <EcoPointsDashboard
                user={user}
                onRedeemReward={handleRedeemReward}
              />
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
        />
      )}

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setSelectedSeller(null);
        setCurrentTab(tab);
      }} />

    </div>
  );
}
