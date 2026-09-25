import React from 'react';
import { Star, Heart, Eye, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from './ProductVisual';
import { formatINR } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    navigateTo,
    addToCart,
    cart,
    updateCartQuantity,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const isSaved = isInWishlist(product.id);

  // Check if any variant of this product is in the cart
  const cartItem = cart.find((item) => item.product.id === product.id);

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleCardClick = () => {
    navigateTo('product-details', product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 cursor-pointer"
    >
      {/* Image Container with Floating Overlays */}
      <div className="relative w-full overflow-hidden bg-neutral-100">
        <ProductVisual product={product} aspect="square" />

        {/* Top Badges & Actions Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
          {product.badge ? (
            <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-900 text-white shadow-xs pointer-events-auto">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          {/* Action buttons (Wishlist & Quick View) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-neutral-700 hover:text-neutral-900 hover:bg-white shadow-xs flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0"
              title="Quick view product"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={handleWishlistClick}
              className={`w-8 h-8 rounded-full shadow-xs flex items-center justify-center transition-all ${
                isSaved
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-rose-600 hover:bg-white'
              }`}
              title={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-label="Wishlist toggle"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Discount Ribbon Tag */}
        {product.discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md shadow-2xs">
              {product.discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="font-medium tracking-wide uppercase text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span className="font-semibold text-neutral-800 text-xs tabular-nums">
                {product.rating}
              </span>
              <span className="text-neutral-400 text-[11px]">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-sm sm:text-base text-neutral-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short tagline/description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-neutral-900 tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-neutral-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 font-medium">
              Free delivery available
            </span>
          </div>

          {/* Add to Cart or Stepper */}
          {cartItem ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-neutral-100 border border-neutral-200 rounded-lg p-1"
            >
              <button
                onClick={() => updateCartQuantity(cartItem.id, -1)}
                className="w-6 h-6 rounded-md bg-white hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shadow-2xs"
                title="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 text-xs font-bold text-neutral-900 tabular-nums">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateCartQuantity(cartItem.id, 1)}
                className="w-6 h-6 rounded-md bg-white hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shadow-2xs"
                title="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs group/btn"
              title="Add to shopping cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-neutral-300 group-hover/btn:text-white" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
