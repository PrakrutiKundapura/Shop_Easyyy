import React, { useState } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  MapPin,
  Calendar,
  X,
  CreditCard,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { ProductVisual } from '../components/ProductVisual';
import { formatINR } from '../utils/format';

export const OrdersView: React.FC = () => {
  const { orders, navigateTo } = useShop();
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
          <Package className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-neutral-900">
            No Orders Placed Yet
          </h2>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto">
            Once you place your first order on Shop_Easyyy, real-time shipment updates and timelines will appear right here.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-neutral-900 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Purchase History
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 mt-1">
            My Orders ({orders.length})
          </h1>
        </div>

        <button
          onClick={() => navigateTo('shop')}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => {
          const statusColors = {
            Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
            Processing: 'bg-amber-50 text-amber-700 border-amber-200',
            Shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
            'Out for Delivery': 'bg-purple-50 text-purple-700 border-purple-200',
            Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }[order.status] || 'bg-neutral-100 text-neutral-700 border-neutral-200';

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-sm transition-shadow"
            >
              {/* Order Meta Header Bar */}
              <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Order ID
                    </span>
                    <span className="font-mono font-bold text-neutral-900 text-sm">
                      #{order.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Order Date
                    </span>
                    <span className="font-medium text-neutral-800">
                      {order.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Total Amount
                    </span>
                    <span className="font-extrabold text-neutral-900 text-sm tabular-nums">
                      {formatINR(order.grandTotal)}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-500 uppercase tracking-wider text-[10px] font-bold block">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-semibold border text-xs ${statusColors}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking & Details Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOrderForTracking(order)}
                    className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Order</span>
                  </button>

                  <button
                    onClick={() => setSelectedOrderForDetails(order)}
                    className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 font-semibold rounded-lg text-xs border border-neutral-300 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Order Items Rows */}
              <div className="divide-y divide-neutral-100 p-4 sm:p-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 first:pt-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        onClick={() => navigateTo('product-details', item.product.id)}
                        className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-neutral-200 cursor-pointer"
                      >
                        <ProductVisual product={item.product} aspect="square" />
                      </div>
                      <div>
                        <h4
                          onClick={() => navigateTo('product-details', item.product.id)}
                          className="text-sm font-bold text-neutral-900 hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                          <span>{item.product.category}</span>
                          <span>·</span>
                          <span>Qty: <strong>{item.quantity}</strong></span>
                          {item.selectedSize && (
                            <>
                              <span>·</span>
                              <span>Size: {item.selectedSize}</span>
                            </>
                          )}
                          {item.selectedColor && (
                            <>
                              <span>·</span>
                              <span>Color: {item.selectedColor.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between">
                      <span className="text-sm font-bold text-neutral-900 tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => navigateTo('product-details', item.product.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Buy Again
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Order Timeline Modal */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Live Shipment Tracker
                </span>
                <h3 className="text-lg font-bold text-neutral-900">
                  Order #{selectedOrderForTracking.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery address & carrier pill */}
            <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-neutral-900">
                <span>Courier: ShopEasy Express Logistics</span>
                <span className="text-indigo-600">AWB #9482018471</span>
              </div>
              <p className="text-neutral-500">
                Destination: {selectedOrderForTracking.shippingAddress.address}, {selectedOrderForTracking.shippingAddress.city}
              </p>
            </div>

            {/* Interactive Timeline */}
            <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {selectedOrderForTracking.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                      step.completed
                        ? 'bg-emerald-600'
                        : step.current
                        ? 'bg-indigo-600 animate-pulse'
                        : 'bg-neutral-300'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          step.completed || step.current
                            ? 'text-neutral-900'
                            : 'text-neutral-400'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="text-[11px] text-neutral-400">{step.date}</span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrderForTracking(null)}
              className="w-full py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}

      {/* View Details / Invoice Modal */}
      {selectedOrderForDetails && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Tax Invoice & Receipt
                </span>
                <h3 className="text-lg font-bold text-neutral-900">
                  Order #{selectedOrderForDetails.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForDetails(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Recipient info */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-xl">
              <div>
                <span className="font-bold text-neutral-700 block mb-1">Delivered To:</span>
                <p className="font-semibold text-neutral-900">{selectedOrderForDetails.shippingAddress.fullName}</p>
                <p className="text-neutral-500">{selectedOrderForDetails.shippingAddress.address}</p>
                <p className="text-neutral-500">{selectedOrderForDetails.shippingAddress.city}, {selectedOrderForDetails.shippingAddress.pincode}</p>
                <p className="text-neutral-500">{selectedOrderForDetails.shippingAddress.phone}</p>
              </div>
              <div>
                <span className="font-bold text-neutral-700 block mb-1">Payment Method:</span>
                <p className="font-semibold text-neutral-900 uppercase">{selectedOrderForDetails.paymentMethod}</p>
                {selectedOrderForDetails.paymentDetails?.upiId && (
                  <p className="text-neutral-500">UPI: {selectedOrderForDetails.paymentDetails.upiId}</p>
                )}
                {selectedOrderForDetails.paymentDetails?.cardLast4 && (
                  <p className="text-neutral-500">Card ending in •••• {selectedOrderForDetails.paymentDetails.cardLast4}</p>
                )}
                <p className="text-emerald-600 font-semibold mt-1">Paid in Full</p>
              </div>
            </div>

            {/* Line items table */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Itemized Summary
              </span>
              <div className="divide-y divide-neutral-100 text-xs">
                {selectedOrderForDetails.items.map((i) => (
                  <div key={i.id} className="py-2.5 flex justify-between">
                    <div>
                      <p className="font-bold text-neutral-900">{i.product.name}</p>
                      <p className="text-neutral-400">Qty: {i.quantity} × {formatINR(i.product.price)}</p>
                    </div>
                    <span className="font-semibold text-neutral-900 tabular-nums">
                      {formatINR(i.product.price * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing table */}
            <div className="pt-3 border-t border-neutral-200 text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="tabular-nums">{formatINR(selectedOrderForDetails.subtotal)}</span>
              </div>
              {selectedOrderForDetails.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount ({selectedOrderForDetails.appliedCoupon}):</span>
                  <span className="tabular-nums">-{formatINR(selectedOrderForDetails.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping:</span>
                <span className="tabular-nums">{selectedOrderForDetails.shipping === 0 ? 'FREE' : formatINR(selectedOrderForDetails.shipping)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>GST (18%):</span>
                <span className="tabular-nums">{formatINR(selectedOrderForDetails.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-neutral-900 text-sm pt-2 border-t border-neutral-100">
                <span>Grand Total:</span>
                <span className="text-indigo-600 tabular-nums">{formatINR(selectedOrderForDetails.grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderForDetails(null)}
              className="w-full py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
