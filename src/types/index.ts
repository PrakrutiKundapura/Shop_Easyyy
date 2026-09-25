export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: 'Fashion' | 'Shoes' | 'Electronics' | 'Beauty' | 'Home & Living' | 'Accessories' | 'Kids' | 'Gifts';
  rating: number;
  reviewsCount: number;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
  shortDescription: string;
  features: string[];
  specs: Record<string, string>;
  sizes?: string[];
  colors?: ProductColor[];
  inStock: boolean;
  stockCount: number;
  badge?: 'Trending' | 'New Arrival' | 'Bestseller' | 'Featured' | 'Special Deal';
  deliveryDays: string;
  returnPolicy: string;
  primaryImage: string;
  galleryImages: string[];
  reviews: Review[];
  visualTheme: {
    bgGradient: string;
    accentColor: string;
    iconName: string;
    tagline: string;
  };
}

export interface CartItem {
  id: string; // unique cart line id (product.id + size + color)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: ProductColor;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type PaymentMethodType = 'upi' | 'card' | 'cod';

export interface OrderTimelineStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
  appliedCoupon?: string;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethodType;
  paymentDetails?: {
    upiId?: string;
    cardLast4?: string;
  };
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export type AppView = 
  | 'home'
  | 'shop'
  | 'categories'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'orders'
  | 'product-details';

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minPurchase: number;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'discount' | 'stock';
  targetView?: AppView;
  targetId?: string;
}
