import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CategoriesView } from './views/CategoriesView';
import { CartView } from './views/CartView';
import { WishlistView } from './views/WishlistView';
import { CheckoutView } from './views/CheckoutView';
import { OrdersView } from './views/OrdersView';
import { AccountView } from './views/AccountView';
import { ProductDetailsView } from './views/ProductDetailsView';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'categories':
        return <CategoriesView />;
      case 'cart':
        return <CartView />;
      case 'wishlist':
        return <WishlistView />;
      case 'checkout':
        return <CheckoutView />;
      case 'orders':
        return <OrdersView />;
      case 'account':
        return <AccountView />;
      case 'product-details':
        return <ProductDetailsView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
