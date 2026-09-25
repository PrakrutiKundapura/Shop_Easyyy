import React, { useState } from 'react';
import {
  ShoppingBag,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing to Shop_Easyyy news!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Shop<span className="text-indigo-400">_Easyyy</span>
              </span>
            </div>

            <p className="text-neutral-400 max-w-sm leading-relaxed">
              Everything you love, all in one place. Delivering elevated daily essentials, audio precision, Italian knitwear, and home accents with frictionless 1-click checkout.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Stay in the loop
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Subscribed! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('categories')}
                  className="hover:text-white transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="hover:text-white transition-colors"
                >
                  Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('cart')}
                  className="hover:text-white transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('orders')}
                  className="hover:text-white transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('account')}
                  className="hover:text-white transition-colors"
                >
                  Account Profile
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('Free shipping on orders > ₹999', 'info')}>
                  Shipping Rates
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('30-day money-back guarantee', 'info')}>
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('Support team: support@shopeasyyy.com', 'info')}>
                  Contact Support (24/7)
                </span>
              </li>
            </ul>
          </div>

          {/* Policies & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Security & Policy
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('All payments 256-bit encrypted', 'info')}>
                  256-Bit SSL Protection
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('100% Genuine Certified', 'info')}>
                  Authenticity Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('Cash on Delivery available nationwide', 'info')}>
                  Cash on Delivery Terms
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => showToast('Strict zero data-sharing policy', 'info')}>
                  Privacy Constitution
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} <strong>Shop_Easyyy</strong> Inc. All rights reserved. Built for seamless digital commerce.
          </p>

          {/* Verified Payment Trust Logos */}
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="px-2 py-1 bg-neutral-900 rounded font-mono text-[10px] font-bold text-neutral-300 border border-neutral-800">
              UPI
            </span>
            <span className="px-2 py-1 bg-neutral-900 rounded font-mono text-[10px] font-bold text-neutral-300 border border-neutral-800">
              VISA
            </span>
            <span className="px-2 py-1 bg-neutral-900 rounded font-mono text-[10px] font-bold text-neutral-300 border border-neutral-800">
              MASTERCARD
            </span>
            <span className="px-2 py-1 bg-neutral-900 rounded font-mono text-[10px] font-bold text-neutral-300 border border-neutral-800">
              RUPAY
            </span>
            <span className="px-2 py-1 bg-neutral-900 rounded font-mono text-[10px] font-bold text-neutral-300 border border-neutral-800">
              COD
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
