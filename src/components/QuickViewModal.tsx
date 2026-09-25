import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { formatINR } from '../utils/format';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useShop();

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isSaved = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors ? product.colors[0] : undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setQuickViewProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setQuickViewProduct(null);
    navigateTo('checkout');
  };

  const handleViewFullDetails = () => {
    const prodId = product.id;
    setQuickViewProduct(null);
    navigateTo('product-details', prodId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Showcase */}
          <div className="p-6 bg-neutral-50/70 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs">
              <ProductVisual product={product} aspect="square" />
            </div>
            <button
              onClick={handleViewFullDetails}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Full Product Page & Reviews →
            </button>
          </div>

          {/* Details & Selection */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {product.category}
                </span>
                <span className="text-neutral-300">·</span>
                <div className="flex items-center gap-1 text-xs text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span className="font-semibold text-neutral-800 tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-neutral-900 tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-400 line-through tabular-nums">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                {product.shortDescription}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <span className="block text-xs font-semibold text-neutral-700 mb-2">
                    Color: <span className="font-normal text-neutral-500">{selectedColor?.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          selectedColor?.name === c.name
                            ? 'scale-110 border-indigo-600 ring-2 ring-indigo-200'
                            : 'border-neutral-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <span className="block text-xs font-semibold text-neutral-700 mb-2">
                    Size: <span className="font-normal text-neutral-500">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          selectedSize === s
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-semibold text-neutral-700">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-sm text-neutral-600 hover:bg-neutral-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-sm text-neutral-600 hover:bg-neutral-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-400">
                  {product.stockCount} left in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border border-neutral-200 transition-colors ${
                    isSaved
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-neutral-600 hover:text-rose-600 hover:bg-neutral-50'
                  }`}
                  title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Buy Now with 1-Click
              </button>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{product.deliveryDays}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Genuine 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
