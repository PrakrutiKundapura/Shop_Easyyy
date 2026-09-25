import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  X,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVisual } from '../components/ProductVisual';
import { formatINR } from '../utils/format';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    isInWishlist,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartGrandTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    couponError,
    navigateTo,
    clearCart
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCouponCode(couponInput);
      if (ok) setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Your shopping cart is empty
          </h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our curated catalog and discover your next favorite item.
          </p>
        </div>
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Order Review
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 mt-1">
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('shop')}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <span className="text-neutral-300">|</span>
          <button
            onClick={clearCart}
            className="text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors"
          >
            Empty Cart
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden shadow-xs">
            {cart.map((item) => {
              const itemSubtotal = item.product.price * item.quantity;
              const isSaved = isInWishlist(item.product.id);

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      onClick={() => navigateTo('product-details', item.product.id)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-neutral-200/80 cursor-pointer"
                    >
                      <ProductVisual product={item.product} aspect="square" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                        {item.product.category}
                      </span>
                      <h3
                        onClick={() => navigateTo('product-details', item.product.id)}
                        className="text-sm sm:text-base font-bold text-neutral-900 hover:text-indigo-600 transition-colors truncate cursor-pointer"
                      >
                        {item.product.name}
                      </h3>

                      {/* Variant tags */}
                      <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
                        {item.selectedColor && (
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-neutral-300"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span>{item.selectedColor.name}</span>
                          </div>
                        )}
                        {item.selectedSize && (
                          <span>Size: <strong>{item.selectedSize}</strong></span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm font-semibold text-neutral-900 tabular-nums pt-1">
                        {formatINR(item.product.price)}{' '}
                        <span className="text-neutral-400 font-normal text-xs">each</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Stepper, Item Total & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                    
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-xs font-bold text-neutral-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-neutral-900 tabular-nums">
                        {formatINR(itemSubtotal)}
                      </span>
                    </div>

                    {/* Action buttons (Wishlist & Trash) */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleWishlist(item.product)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          isSaved
                            ? 'text-rose-600 bg-rose-50'
                            : 'text-neutral-400 hover:text-rose-600 hover:bg-neutral-100'
                        }`}
                        title={isSaved ? 'In Wishlist' : 'Save for later'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick trust guarantee note */}
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>
              Every order is backed by our <strong>30-Day Money-Back Guarantee</strong> with zero restocking fees.
            </span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Order Summary
            </h2>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                  </div>
                  <span className="font-bold tabular-nums">
                    -{formatINR(cartDiscount)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-neutral-600">
                <div className="flex items-center gap-1">
                  <span>Shipping</span>
                  {cartShipping === 0 && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  )}
                </div>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {cartShipping === 0 ? 'FREE' : formatINR(cartShipping)}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-600">
                <span>Estimated GST (18%)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {formatINR(cartTax)}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex items-baseline justify-between text-base sm:text-lg font-extrabold text-neutral-900">
                <span>Grand Total</span>
                <span className="text-xl sm:text-2xl text-indigo-600 tabular-nums">
                  {formatINR(cartGrandTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Have a Promo Code?
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-900">
                        {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-emerald-700">
                        {appliedCoupon.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-emerald-700 hover:text-emerald-900"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. EASYYY10"
                    className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-xs text-rose-600 mt-2 font-medium">
                  {couponError}
                </p>
              )}

              <p className="text-[11px] text-neutral-400 mt-2">
                Tip: Try <strong>EASYYY10</strong> (10% off) or <strong>WELCOME20</strong> (orders &gt; ₹2,499)
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigateTo('checkout')}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => navigateTo('shop')}
                className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
