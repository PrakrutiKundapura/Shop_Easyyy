import { Product, Coupon, NotificationItem, Order } from '../types';
import { FASHION_PRODUCTS } from './categories/fashion';
import { SHOES_PRODUCTS } from './categories/shoes';
import { ELECTRONICS_PRODUCTS } from './categories/electronics';
import { BEAUTY_PRODUCTS } from './categories/beauty';
import { HOME_PRODUCTS } from './categories/home';
import { ACCESSORIES_PRODUCTS } from './categories/accessories';
import { KIDS_PRODUCTS } from './categories/kids';
import { GIFTS_PRODUCTS } from './categories/gifts';

// Complete Master Catalog containing 12 realistic budget-friendly products per category (96 total)
export const INITIAL_PRODUCTS: Product[] = [
  ...ELECTRONICS_PRODUCTS,
  ...FASHION_PRODUCTS,
  ...SHOES_PRODUCTS,
  ...BEAUTY_PRODUCTS,
  ...HOME_PRODUCTS,
  ...ACCESSORIES_PRODUCTS,
  ...KIDS_PRODUCTS,
  ...GIFTS_PRODUCTS,
];

export interface CategoryMeta {
  id: string;
  name: string;
  icon: string;
  count: string;
  description: string;
}

export const CATEGORIES_CONFIG: CategoryMeta[] = [
  {
    id: 'cat-fashion',
    name: 'Fashion',
    icon: 'Shirt',
    count: '12 Products',
    description: 'Everyday budget essentials, combed cotton tees, kurtis, winter hoodies & stylish trousers.'
  },
  {
    id: 'cat-shoes',
    name: 'Shoes',
    icon: 'Footprints',
    count: '12 Products',
    description: 'Cloud foam running sneakers, smart loafers, casual white kicks & comfy cloud recovery slides.'
  },
  {
    id: 'cat-electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    count: '12 Products',
    description: 'Wireless Bluetooth headphones, calling smartwatches, portable speakers & fast chargers.'
  },
  {
    id: 'cat-beauty',
    name: 'Beauty',
    icon: 'Droplets',
    count: '12 Products',
    description: 'Ayurvedic saffron night creams, non-sticky SPF 50 gels, hyaluronic serums & velvet matte lipsticks.'
  },
  {
    id: 'cat-home',
    name: 'Home & Living',
    icon: 'Home',
    count: '12 Products',
    description: 'Bedside table lamps, soft AC comforters, pure cotton bedsheets & cast iron skillets.'
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    icon: 'Briefcase',
    count: '12 Products',
    description: 'Waterproof laptop backpacks, UV400 polarized aviators, slim RFID wallets & mesh watches.'
  },
  {
    id: 'cat-kids',
    name: 'Kids',
    icon: 'Shapes',
    count: '12 Products',
    description: 'Wooden Montessori toys, organic swaddles, STEM magnetic tiles & washable finger paint sets.'
  },
  {
    id: 'cat-gifts',
    name: 'Gifts',
    icon: 'Gift',
    count: '12 Products',
    description: 'Aromatherapy scented candle vaults, pure brass pooja sets, Darjeeling teas & gourmet baklava boxes.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'EASYYY10', discountPercent: 10, minPurchase: 499, description: '10% OFF on orders over ₹499' },
  { code: 'WELCOME20', discountPercent: 20, minPurchase: 799, description: '20% OFF for new shoppers on orders over ₹799' },
  { code: 'FREESHIP', discountAmount: 99, minPurchase: 299, description: 'Free Express Shipping on orders over ₹299' }
];

export const AVAILABLE_COUPONS = INITIAL_COUPONS;

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Welcome to Shop_Easyyy!',
    message: 'Use code EASYYY10 at checkout to unlock 10% off your purchase over ₹499.',
    time: 'Just now',
    read: false,
    type: 'discount'
  },
  {
    id: 'notif-2',
    title: 'Order Shipped: #SE-89421',
    message: 'Your BassPro Wireless Bluetooth Headphones have been dispatched via Express courier.',
    time: '2 hours ago',
    read: false,
    type: 'order',
    targetView: 'orders',
    targetId: 'SE-89421'
  },
  {
    id: 'notif-3',
    title: 'Price Drop Alert',
    message: 'Merino Blend Relaxed Winter Overcoat is now 40% off at just ₹1,499!',
    time: 'Yesterday',
    read: true,
    type: 'discount',
    targetView: 'product-details',
    targetId: 'prod-fash-1'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SE-89421',
    date: '2026-09-23',
    items: [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0], // BassPro Wireless Bluetooth Headphones (₹999)
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[0].colors?.[0]
      }
    ],
    subtotal: 999,
    discount: 99.90,
    shipping: 0,
    tax: 161.84, // 18% GST
    grandTotal: 1060.94,
    appliedCoupon: 'EASYYY10',
    shippingAddress: {
      fullName: 'Prakruthi Poojary',
      email: 'prakruthipoojary7@gmail.com',
      phone: '+91 98450 12345',
      address: '42, Indiranagar 100ft Road, 2nd Stage',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    paymentMethod: 'upi',
    paymentDetails: {
      upiId: 'prakruthi@okaxis'
    },
    status: 'Shipped',
    estimatedDelivery: 'Tomorrow, Sept 26',
    timeline: [
      { title: 'Order Confirmed', description: 'Payment verified and order accepted via UPI', date: 'Sep 23, 10:15 AM', completed: true },
      { title: 'Packed & Dispatched', description: 'Item picked from Bengaluru Central Hub', date: 'Sep 24, 02:40 PM', completed: true },
      { title: 'Shipped in Transit', description: 'Departed regional sorting hub BLR-04', date: 'Sep 25, 08:30 AM', completed: true, current: true },
      { title: 'Out for Delivery', description: 'Courier assigned for doorstep delivery', date: 'Estimated Sep 26', completed: false },
      { title: 'Delivered', description: 'Package handed over with OTP verification', date: 'Estimated Sep 26', completed: false }
    ]
  },
  {
    id: 'SE-78204',
    date: '2026-09-12',
    items: [
      {
        id: 'cart-init-2',
        product: INITIAL_PRODUCTS[36], // Beauty Botanical Glowing Treatment Oil (₹399)
        quantity: 1
      },
      {
        id: 'cart-init-3',
        product: INITIAL_PRODUCTS[84], // Gifts Candle Vault (₹499)
        quantity: 1
      }
    ],
    subtotal: 898,
    discount: 0,
    shipping: 0,
    tax: 161.64,
    grandTotal: 1059.64,
    shippingAddress: {
      fullName: 'Prakruthi Poojary',
      email: 'prakruthipoojary7@gmail.com',
      phone: '+91 98450 12345',
      address: '42, Indiranagar 100ft Road, 2nd Stage',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    paymentMethod: 'card',
    paymentDetails: {
      cardLast4: '4242'
    },
    status: 'Delivered',
    estimatedDelivery: 'Delivered on Sep 15',
    timeline: [
      { title: 'Order Confirmed', description: 'Order accepted', date: 'Sep 12, 04:20 PM', completed: true },
      { title: 'Packed', description: 'Eco-packaged with care', date: 'Sep 13, 09:10 AM', completed: true },
      { title: 'Shipped', description: 'Dispatched via Express Courier', date: 'Sep 13, 03:00 PM', completed: true },
      { title: 'Out for Delivery', description: 'Driver out for delivery', date: 'Sep 15, 09:45 AM', completed: true },
      { title: 'Delivered', description: 'Package handed over with OTP verification', date: 'Estimated Sep 15', completed: true }
    ]
  }
];
