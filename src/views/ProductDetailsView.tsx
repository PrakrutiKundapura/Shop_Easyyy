import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  Check,
  Share2,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from '../components/ProductVisual';
import { ProductCard } from '../components/ProductCard';
import { ProductColor } from '../types';
import { formatINR } from '../utils/format';

export const ProductDetailsView: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    showToast
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const isSaved = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Synchronize variant choices when navigating to another product
  React.useEffect(() => {
    setSelectedColor(product.colors ? product.colors[0] : undefined);
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
    setActiveImageIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.id !== product.id))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    } else {
      showToast('Sharing link prepared', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-neutral-900 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button
          onClick={() => navigateTo('shop', undefined, product.category)}
          className="hover:text-neutral-900 transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Grid: Gallery Left + Sticky Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Product Imagery Showcase */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-8 flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
            {/* Primary Visual */}
            <div className="w-full max-w-md aspect-square">
              <ProductVisual
                product={product}
                variant={product.galleryImages?.[activeImageIdx] || product.primaryImage}
                aspect="square"
              />
            </div>

            {/* Float badge */}
            {product.badge && (
              <span className="absolute top-6 left-6 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg bg-neutral-900 text-white shadow-sm z-20">
                {product.badge}
              </span>
            )}

            {/* Share & Wishlist quick actions */}
            <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-neutral-900 hover:bg-white shadow-xs flex items-center justify-center transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-10 h-10 rounded-full shadow-xs flex items-center justify-center transition-colors ${
                  isSaved
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-rose-600 hover:bg-white'
                }`}
                title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery Switcher with real photos */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {(product.galleryImages || [product.primaryImage]).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-neutral-100 shrink-0 transition-all cursor-pointer ${
                  activeImageIdx === idx
                    ? 'border-indigo-600 ring-2 ring-indigo-200 scale-105'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {product.category}
              </span>
              <span className="text-neutral-300">·</span>
              <div className="flex items-center gap-1.5 text-xs text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="font-bold text-neutral-900 tabular-nums">
                  {product.rating}
                </span>
                <span className="text-neutral-500">
                  ({product.reviewsCount} customer reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Price block */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-extrabold text-neutral-900 tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-neutral-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Save {product.discountPercent}%
                </span>
              )}
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200 space-y-5">
            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2.5">
                  <span>Selected Color:</span>
                  <span className="text-neutral-500 font-normal">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`group relative w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor?.name === c.name
                          ? 'border-indigo-600 ring-4 ring-indigo-100 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor?.name === c.name && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto filter drop-shadow-xs" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-800 mb-2.5">
                  <span>Choose Size:</span>
                  <span className="text-neutral-500 font-normal">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        selectedSize === s
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Stock */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-neutral-800">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors text-sm font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>In Stock ({product.stockCount} left)</span>
              </div>
            </div>

            {/* Purchase CTA buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Buy Now
              </button>
            </div>

            {/* Trust and Delivery Accordion Box */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-3 text-xs text-neutral-700">
                <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-900">Delivery:</span>{' '}
                  {product.deliveryDays} · Free shipping over ₹499
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-700">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-900">Returns:</span>{' '}
                  {product.returnPolicy}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-semibold text-neutral-900">Authenticity:</span>{' '}
                  100% Genuine guaranteed or 2x refund
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Tabs Section: Specifications, Features, Reviews */}
      <section className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-10 shadow-xs">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-4">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'specs'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Product Specifications
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'features'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Key Highlights ({product.features.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
              activeTab === 'reviews'
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            Customer Reviews ({product.reviews.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-neutral-100">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      {key}
                    </dt>
                    <dd className="mt-1 text-xs sm:text-sm text-neutral-900 sm:col-span-2 font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-2xl space-y-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-neutral-50 rounded-xl space-y-2 border border-neutral-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">{rev.userName}</span>
                      {rev.verified && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-1.5 py-0.2 rounded">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              You Might Also Like
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900 mt-0.5">
              Related Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Explore More →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};
