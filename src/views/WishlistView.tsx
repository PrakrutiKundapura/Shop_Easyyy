import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from '../components/ProductVisual';
import { formatINR } from '../utils/format';

export const WishlistView: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    moveWishlistToCart,
    addToCart,
    navigateTo,
    showToast
  } = useShop();

  const handleMoveAllToCart = () => {
    wishlist.forEach((p) => {
      addToCart(p, 1);
    });
    showToast('All wishlist items moved to cart!', 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-neutral-900">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto">
            Save items you adore by tapping the heart icon on any product card. We'll keep them organized for you right here.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Saved Favorites
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 mt-1">
            My Wishlist ({wishlist.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>

          <button
            onClick={handleMoveAllToCart}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Cart</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all"
          >
            {/* Visual Thumbnail */}
            <div
              onClick={() => navigateTo('product-details', product.id)}
              className="relative w-full aspect-square bg-neutral-100 cursor-pointer"
            >
              <ProductVisual product={product} aspect="square" />

              {/* Remove from wishlist top button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-rose-600 hover:bg-white shadow-xs flex items-center justify-center transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info and Actions */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  {product.category}
                </span>
                <h3
                  onClick={() => navigateTo('product-details', product.id)}
                  className="font-bold text-sm sm:text-base text-neutral-900 hover:text-indigo-600 transition-colors line-clamp-1 mt-0.5 cursor-pointer"
                >
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-extrabold text-neutral-900 tabular-nums">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-neutral-400 line-through tabular-nums">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 mt-4 flex items-center gap-2">
                <button
                  onClick={() => moveWishlistToCart(product)}
                  className="flex-1 py-2.5 bg-neutral-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => navigateTo('product-details', product.id)}
                  className="px-3 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
