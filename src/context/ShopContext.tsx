import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  AppView,
  Coupon,
  NotificationItem,
  ShippingAddress,
  PaymentMethodType,
  ProductColor
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  AVAILABLE_COUPONS
} from '../data/products';
import { formatINR } from '../utils/format';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  currentView: AppView;
  selectedProductId: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  quickViewProduct: Product | null;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  shippingAddress: ShippingAddress;
  
  // Cart Computed
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTax: number;
  cartGrandTotal: number;

  // Actions
  navigateTo: (view: AppView, productId?: string, categoryId?: string) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: ProductColor) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;
  applyCouponCode: (code: string) => boolean;
  removeCoupon: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string | null) => void;
  placeOrder: (
    address: ShippingAddress,
    paymentMethod: PaymentMethodType,
    paymentDetails?: { upiId?: string; cardLast4?: string }
  ) => Order;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  updateShippingAddress: (addr: Partial<ShippingAddress>) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CART = 'shopeasy_cart_inr_v2';
const LOCAL_STORAGE_KEY_WISHLIST = 'shopeasy_wishlist_inr_v2';
const LOCAL_STORAGE_KEY_ORDERS = 'shopeasy_orders_inr_v2';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Default Indian Address
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: 'Prakruthi Poojary',
    email: 'prakruthipoojary7@gmail.com',
    phone: '+91 98450 12345',
    address: '42, Indiranagar 100ft Road, 2nd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  // Local Storage initialized Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Initial friendly sample cart item
    return [
      {
        id: 'cart-init-prod-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[0].colors?.[0]
      }
    ];
  });

  // Local Storage Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WISHLIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[2]];
  });

  // Local Storage Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const navigateTo = (view: AppView, productId?: string, categoryId?: string) => {
    if (productId) setSelectedProductId(productId);
    if (categoryId !== undefined) setSelectedCategory(categoryId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, size?: string, color?: ProductColor) => {
    const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
    const chosenColor = color || (product.colors ? product.colors[0] : undefined);
    const cartItemId = `${product.id}_${chosenSize || 'def'}_${chosenColor?.name || 'def'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          quantity,
          selectedSize: chosenSize,
          selectedColor: chosenColor
        }
      ];
    });

    showToast(`Added "${product.name}" to Cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved to Wishlist!`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveWishlistToCart = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // Cart Calculations in INR
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minPurchase) {
    if (appliedCoupon.discountPercent) {
      cartDiscount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      cartDiscount = appliedCoupon.discountAmount;
    }
  }

  // Free shipping on orders > ₹499, else ₹99 (or free if FREESHIP coupon)
  const isFreeShipEligible = cartSubtotal >= 499 || appliedCoupon?.code === 'FREESHIP';
  const cartShipping = cart.length === 0 ? 0 : isFreeShipEligible ? 0 : 99;

  // 18% GST on taxable balance
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = cart.length === 0 ? 0 : Math.round(taxableAmount * 0.18 * 100) / 100;

  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping + cartTax);

  const applyCouponCode = (code: string): boolean => {
    setCouponError(null);
    const cleaned = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleaned);

    if (!found) {
      setCouponError('Invalid coupon code. Try EASYYY10, WELCOME20, or FREESHIP.');
      showToast('Invalid coupon code', 'error');
      return false;
    }

    if (cartSubtotal < found.minPurchase) {
      const diff = formatINR(found.minPurchase - cartSubtotal);
      setCouponError(`Add ${diff} more to use ${found.code}`);
      showToast(`Requires minimum ${formatINR(found.minPurchase)} cart value`, 'error');
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    showToast('Coupon removed', 'info');
  };

  const placeOrder = (
    address: ShippingAddress,
    paymentMethod: PaymentMethodType,
    paymentDetails?: { upiId?: string; cardLast4?: string }
  ): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `SE-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      tax: cartTax,
      grandTotal: cartGrandTotal,
      appliedCoupon: appliedCoupon?.code,
      shippingAddress: address,
      paymentMethod,
      paymentDetails,
      status: 'Confirmed',
      estimatedDelivery: '3 - 4 Business Days',
      timeline: [
        {
          title: 'Order Confirmed',
          description: 'Payment verified and order accepted',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Order Processing',
          description: 'Items dispatched to fulfillment center',
          date: 'Estimated tomorrow',
          completed: false
        },
        {
          title: 'Shipped',
          description: 'Handed to premium courier carrier',
          date: 'In 2 days',
          completed: false
        },
        {
          title: 'Out for Delivery',
          description: 'Courier agent on route to address',
          date: 'In 3 days',
          completed: false
        },
        {
          title: 'Delivered',
          description: 'Package delivered with OTP confirmation',
          date: 'In 3 - 4 days',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);

    // Add new notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order Placed: #${newOrder.id}`,
      message: `Your order for ${formatINR(newOrder.grandTotal)} has been placed successfully.`,
      time: 'Just now',
      read: false,
      type: 'order',
      targetView: 'orders',
      targetId: newOrder.id
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    showToast(`Order #${newOrder.id} successfully placed!`, 'success');
    return newOrder;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const updateShippingAddress = (addr: Partial<ShippingAddress>) => {
    setShippingAddress((prev) => ({ ...prev, ...addr }));
  };

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        currentView,
        selectedProductId,
        selectedCategory,
        searchQuery,
        appliedCoupon,
        couponError,
        notifications,
        unreadNotifsCount,
        quickViewProduct,
        toast,
        shippingAddress,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTax,
        cartGrandTotal,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        applyCouponCode,
        removeCoupon,
        setQuickViewProduct,
        setSearchQuery,
        setSelectedCategory,
        placeOrder,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        showToast,
        updateShippingAddress
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
