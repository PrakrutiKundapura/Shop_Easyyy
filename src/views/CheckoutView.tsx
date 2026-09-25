import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle,
  Truck,
  ArrowLeft,
  QrCode
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, PaymentMethodType } from '../types';
import { ProductVisual } from '../components/ProductVisual';
import { formatINR } from '../utils/format';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartGrandTotal,
    appliedCoupon,
    shippingAddress,
    updateShippingAddress,
    placeOrder,
    navigateTo,
    showToast
  } = useShop();

  const [formData, setFormData] = useState<ShippingAddress>(shippingAddress);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');
  const [upiOption, setUpiOption] = useState<'gpay' | 'phonepe' | 'paytm' | 'id'>('gpay');
  const [upiId, setUpiId] = useState('prakruthi@okaxis');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim()) {
      showToast('Please fill all required address fields', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      navigateTo('shop');
      return;
    }

    setIsPlacing(true);

    setTimeout(() => {
      updateShippingAddress(formData);
      const newOrder = placeOrder(
        formData,
        paymentMethod,
        paymentMethod === 'upi'
          ? { upiId: upiOption === 'id' ? upiId : `${formData.fullName.toLowerCase().replace(/\s+/g, '')}@${upiOption}` }
          : paymentMethod === 'card'
          ? { cardLast4: cardNumber.slice(-4) }
          : undefined
      );

      setIsPlacing(false);
      setOrderComplete(newOrder);
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Payment Verified & Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 mt-2">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-neutral-600 max-w-md mx-auto">
            Order <strong className="text-neutral-900 font-mono">#{orderComplete.id}</strong> has been received and is being prepared for immediate dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-left shadow-xs space-y-4">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-neutral-100">
            <span className="text-neutral-500">Estimated Delivery:</span>
            <span className="font-bold text-neutral-900">{orderComplete.estimatedDelivery}</span>
          </div>

          <div className="flex justify-between items-center text-xs pb-3 border-b border-neutral-100">
            <span className="text-neutral-500">Shipping Address:</span>
            <span className="font-medium text-neutral-900 text-right">
              {orderComplete.shippingAddress.address}, {orderComplete.shippingAddress.city}, {orderComplete.shippingAddress.pincode}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs pb-3 border-b border-neutral-100">
            <span className="text-neutral-500">Payment Mode:</span>
            <span className="font-bold text-neutral-900 uppercase">
              {orderComplete.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm pt-1">
            <span className="font-bold text-neutral-900">Total Paid:</span>
            <span className="text-lg font-black text-indigo-600">
              {formatINR(orderComplete.grandTotal)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => navigateTo('orders')}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Track Order Live
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
        <div>
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Shopping Cart</span>
          </button>
          <h1 className="text-3xl font-extrabold text-neutral-900">
            Secure Checkout
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customer & Delivery & Payment */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Customer Contact */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>Customer Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Prakruthi Poojary"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Email Address (for invoice & tracking) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="prakruthipoojary7@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Phone Number (for courier SMS updates) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>Delivery Address</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Street Address / Flat / Floor *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="742 Evergreen Terrace, Suite 4B"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="San Francisco"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  State / Province *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder="California"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  PIN Code / Postal Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  placeholder="94107"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center pt-2">
                <span className="text-xs text-neutral-500">
                  Standard delivery: <strong>3-4 business days</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Selection */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Payment Method</span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-200'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Fastest</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">UPI Instant</h4>
                  <p className="text-[11px] text-neutral-500">GPay, PhonePe, Paytm, QR</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-200'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <CreditCard className="w-5 h-5 text-neutral-800" />
                  <span className="text-[10px] font-medium text-neutral-400">All Cards</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Credit / Debit Card</h4>
                  <p className="text-[11px] text-neutral-500">Visa, Mastercard, RuPay</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-200'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Banknote className="w-5 h-5 text-neutral-800" />
                  <span className="text-[10px] font-medium text-neutral-400">Doorstep</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">Cash on Delivery</h4>
                  <p className="text-[11px] text-neutral-500">Pay cash/UPI at doorstep</p>
                </div>
              </button>
            </div>

            {/* Sub-inputs for Selected Method */}
            <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Select UPI Provider
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', label: 'Google Pay' },
                      { id: 'phonepe', label: 'PhonePe' },
                      { id: 'paytm', label: 'Paytm' },
                      { id: 'id', label: 'Enter UPI ID' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setUpiOption(opt.id as any)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                          upiOption === opt.id
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-white text-neutral-700 border-neutral-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {upiOption === 'id' ? (
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Your UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourname@okaxis"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200 text-xs text-neutral-600">
                      <QrCode className="w-8 h-8 text-neutral-700 shrink-0" />
                      <span>
                        You will receive an instant payment request on your {upiOption.toUpperCase()} app upon placing this order.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        placeholder="CVV"
                        className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="text-xs text-neutral-600 space-y-1">
                  <p className="font-semibold text-neutral-900">
                    Pay in cash or UPI when your order is delivered to your door.
                  </p>
                  <p className="text-neutral-500">
                    A secure 4-digit delivery PIN will be sent via SMS when the delivery courier arrives.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Order Summary ({cart.length} unique items)
            </h2>

            {/* Cart Items Quick Mini-List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                      <ProductVisual product={item.product} aspect="square" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900 truncate max-w-[150px]">
                        {item.product.name}
                      </p>
                      <p className="text-neutral-400 text-[11px]">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-900 tabular-nums">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="space-y-2.5 text-xs border-t border-neutral-100 pt-4">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span className="font-bold tabular-nums">-{formatINR(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {cartShipping === 0 ? 'FREE' : formatINR(cartShipping)}
                </span>
              </div>

              <div className="flex justify-between text-neutral-600">
                <span>Estimated GST (18%)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {formatINR(cartTax)}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-base font-extrabold text-neutral-900">
                <span>Final Total</span>
                <span className="text-2xl text-indigo-600 tabular-nums">
                  {formatINR(cartGrandTotal)}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isPlacing}
              className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPlacing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <span>Place Order · {formatINR(cartGrandTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Security Guarantee Strip */}
            <div className="pt-2 text-center text-[11px] text-neutral-400 space-y-1">
              <div className="flex items-center justify-center gap-2 text-neutral-600 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Shop_Easyyy Buyer Protection Guaranteed</span>
              </div>
              <p>Safe & Encrypted 256-Bit SSL Checkout</p>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};
