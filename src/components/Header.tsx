import React, { useState, useRef, useEffect } from 'react';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Bell,
  Menu,
  X,
  Home,
  Store,
  Grid,
  ChevronRight,
  Package,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { formatINR } from '../utils/format';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    notifications,
    unreadNotifsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    products,
    setSearchQuery: setGlobalSearch
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [notifsOpen, setNotifsOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifsRef = useRef<HTMLDivElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifsRef.current && !notifsRef.current.contains(event.target as Node)) {
        setNotifsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered products for live search preview
  const liveSearchResults = searchInput.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.shortDescription.toLowerCase().includes(searchInput.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setGlobalSearch(searchInput.trim());
      navigateTo('shop');
      setSearchOpen(false);
    }
  };

  const handleSelectSearchProduct = (productId: string) => {
    navigateTo('product-details', productId);
    setSearchOpen(false);
    setSearchInput('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-neutral-900 text-neutral-200 px-4 py-1.5 text-xs font-medium text-center">
        <span>✨ Spring Curation Event: Use code <strong className="text-amber-400 font-semibold tracking-wider">EASYYY10</strong> for 10% off + Free Shipping over ₹999</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                <ShoppingBag className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors">
                  Shop<span className="text-indigo-600">_Easyyy</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 -mt-1">
                  Modern Retail
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => navigateTo('home')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'shop'
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Shop</span>
            </button>

            <button
              onClick={() => navigateTo('categories')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'categories'
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Categories</span>
            </button>

            <button
              onClick={() => navigateTo('orders')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentView === 'orders'
                  ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </button>
          </nav>

          {/* Action Icons Right Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Button / Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
              title="Search products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications Bell Dropdown */}
            <div className="relative" ref={notifsRef}>
              <button
                onClick={() => setNotifsOpen(!notifsOpen)}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Popover Menu */}
              {notifsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="p-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                        Notifications ({notifications.length})
                      </span>
                    </div>
                    {unreadNotifsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-neutral-400">
                        No notifications right now
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationAsRead(notif.id);
                            if (notif.targetView) {
                              navigateTo(notif.targetView, notif.targetId);
                              setNotifsOpen(false);
                            }
                          }}
                          className={`p-3.5 text-left transition-colors cursor-pointer hover:bg-neutral-50 flex items-start gap-3 ${
                            !notif.read ? 'bg-indigo-50/30' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.read ? 'bg-transparent' : 'bg-indigo-600'}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <p className="text-xs font-semibold text-neutral-900 truncate">
                                {notif.title}
                              </p>
                              <span className="text-[10px] text-neutral-400 shrink-0">
                                {notif.time}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                              {notif.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => navigateTo('wishlist')}
              className={`relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors ${
                currentView === 'wishlist' ? 'text-indigo-600 bg-indigo-50' : ''
              }`}
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => navigateTo('cart')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                currentView === 'cart'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
              }`}
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span
                className={`ml-0.5 px-2 py-0.5 text-xs font-bold rounded-full tabular-nums ${
                  currentView === 'cart'
                    ? 'bg-white text-indigo-700'
                    : 'bg-neutral-900 text-white'
                }`}
              >
                {cartCount}
              </span>
            </button>

            {/* User Account Button */}
            <button
              onClick={() => navigateTo('account')}
              className={`p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors ${
                currentView === 'account' ? 'text-indigo-600 bg-indigo-50' : ''
              }`}
              title="Account profile"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Expandable Search Bar Drawer */}
      {searchOpen && (
        <div className="border-t border-neutral-200 bg-white py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-4xl mx-auto px-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-neutral-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search headphones, sneakers, jackets, watches, skincare..."
                className="w-full pl-12 pr-28 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 text-xs"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Live Search Instant Results */}
            {searchInput.trim() && (
              <div className="mt-3 bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-sm">
                {liveSearchResults.length > 0 ? (
                  <>
                    <div className="px-4 py-2 bg-neutral-50 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Matching Products ({liveSearchResults.length})
                    </div>
                    {liveSearchResults.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleSelectSearchProduct(prod.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-neutral-100">
                            <ProductVisual product={prod} aspect="square" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                              {prod.name}
                            </p>
                            <span className="text-xs text-neutral-500">
                              {prod.category} · {formatINR(prod.price)}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-4 text-center text-sm text-neutral-500">
                    No items found matching "{searchInput}". Press enter to browse all products.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-4 space-y-1">
            <button
              onClick={() => {
                navigateTo('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                navigateTo('shop');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'shop'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Store className="w-5 h-5" />
                <span>Shop Catalog</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                navigateTo('categories');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'categories'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Grid className="w-5 h-5" />
                <span>All Categories (8)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                navigateTo('orders');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'orders'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <span>My Orders</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                navigateTo('wishlist');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'wishlist'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 rounded-full text-neutral-600">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => {
                navigateTo('account');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'account'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <span>Account & Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
