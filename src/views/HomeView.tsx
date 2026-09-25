import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Sparkles,
  Percent,
  CheckCircle,
  Star,
  Shirt,
  Footprints,
  Smartphone,
  Home,
  Briefcase,
  Shapes,
  Gift
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_CONFIG } from '../data/products';
import { ProductVisual } from '../components/ProductVisual';
import { formatINR } from '../utils/format';

export const HomeView: React.FC = () => {
  const { products, navigateTo, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter curated collections
  const featuredProducts = products.filter((p) => p.badge === 'Featured').slice(0, 4);
  const trendingProducts = products.filter((p) => p.badge === 'Trending').slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === 'New Arrival' || p.badge === 'Bestseller').slice(0, 4);

  // Category Icon resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-indigo-600" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6 text-sky-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-pink-600" />;
      case 'Home':
        return <Home className="w-6 h-6 text-amber-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-orange-600" />;
      case 'Shapes':
        return <Shapes className="w-6 h-6 text-teal-600" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-purple-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      showToast('Subscribed to VIP insider offers!', 'success');
      setNewsletterEmail('');
    } else {
      showToast('Please enter a valid email address', 'error');
    }
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white pt-12 pb-20 lg:py-24 rounded-b-3xl">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Online Shopping Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Welcome to <span className="text-indigo-400">Shop_Easyyy</span>
              </h1>

              <p className="text-lg sm:text-xl text-neutral-300 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
                Everything you love, all in one place. Discover handpicked electronics, timeless fashion, home essentials, and luxury lifestyle pieces delivered right to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => navigateTo('categories')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold rounded-xl backdrop-blur-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Categories</span>
                </button>
              </div>

              {/* Value proposition badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 text-left">
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Free Delivery</p>
                  <p className="text-sm font-bold text-white">Orders over ₹499</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Easy Returns</p>
                  <p className="text-sm font-bold text-white">30-Day Guarantee</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Authentic</p>
                  <p className="text-sm font-bold text-white">100% Verified</p>
                </div>
              </div>
            </div>

            {/* Right Hero Product Spotlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-800/80 p-6 flex flex-col items-center">
                  <div className="w-full max-w-xs aspect-square">
                    <ProductVisual product={products[0]} aspect="square" />
                  </div>
                  <div className="mt-4 text-center w-full">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Product of the Week
                    </span>
                    <h2 className="text-lg font-bold text-white truncate mt-1">
                      {products[0].name}
                    </h2>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-xl font-black text-white">
                        {formatINR(products[0].price)}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        {formatINR(products[0].originalPrice)}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        Save {products[0].discountPercent}%
                      </span>
                    </div>
                    <button
                      onClick={() => navigateTo('product-details', products[0].id)}
                      className="mt-4 w-full py-2.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-bold rounded-lg transition-colors"
                    >
                      View Spotlight Deal
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Fast & Free Shipping</h4>
              <p className="text-xs text-neutral-500">Free courier delivery on all orders over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">30-Day Easy Returns</h4>
              <p className="text-xs text-neutral-500">Hassle-free refunds with door pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">100% Secure Checkout</h4>
              <p className="text-xs text-neutral-500">UPI, Cards, and Cash on Delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">24/7 Dedicated Support</h4>
              <p className="text-xs text-neutral-500">Live assistance for every purchase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Explore Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigateTo('shop', undefined, cat.name)}
              className="group flex flex-col items-center p-4 bg-white hover:bg-neutral-50 border border-neutral-200/80 hover:border-indigo-300 rounded-2xl shadow-2xs hover:shadow-sm transition-all text-center focus:outline-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 group-hover:bg-indigo-50 flex items-center justify-center mb-3 transition-colors">
                {getCategoryIcon(cat.icon)}
              </div>
              <span className="text-xs font-bold text-neutral-800 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offers / Discount Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 border border-neutral-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Percent className="w-3.5 h-3.5" />
                <span>Limited-Time Offer</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Get Flat 20% OFF On Your Entire Order
              </h3>
              <p className="text-sm text-neutral-300 max-w-xl">
                Upgrade your lifestyle with unbeatable value. Use coupon code <strong className="text-white font-mono bg-neutral-800 px-2 py-1 rounded-md border border-neutral-700">WELCOME20</strong> at checkout for 20% off on all orders above ₹799.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-colors cursor-pointer"
              >
                Claim Discount Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Shopper Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              Trending Right Now
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Fresh Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <span>Shop New</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Real Customer Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Loved by 50,000+ Happy Shoppers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Read authentic verified reviews from customers who shop easy every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed italic mb-4">
                "The SonicPro ANC headphones arrived in just 2 days. The noise cancellation makes my daily subway commute completely quiet. Super easy checkout with UPI!"
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                MV
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">Marcus Vance</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed italic mb-4">
                "Ordered the Italian Wool Overcoat and the French Linen set. The fabric quality rival luxury retail stores charging triple. Shop_Easyyy is now my go-to."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">
                SM
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">Sophia Martinez</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed italic mb-4">
                "The live order tracking timeline is so helpful. I knew the exact minute my package was out for delivery. Truly frictionless experience."
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-neutral-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                DC
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">David Chen</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-neutral-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Join the Shop_Easyyy Circle
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Subscribe & Unlock ₹500 Off
            </h2>
            <p className="text-sm text-indigo-200">
              Be the first to hear about secret sales, seasonal releases, and personalized shopping recommendations.
            </p>

            {subscribed ? (
              <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-emerald-300 font-medium text-sm flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>You're subscribed! Check your inbox for your ₹500 discount coupon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-[11px] text-indigo-300/80">
              Zero spam. Unsubscribe anytime with 1 click.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
