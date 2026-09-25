import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountView: React.FC = () => {
  const {
    shippingAddress,
    updateShippingAddress,
    orders,
    wishlist,
    notifications,
    navigateTo,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments' | 'notifications'>('profile');
  const [profileData, setProfileData] = useState({
    name: shippingAddress.fullName,
    email: shippingAddress.email,
    phone: shippingAddress.phone
  });

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (Default)',
      fullName: shippingAddress.fullName,
      address: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      phone: shippingAddress.phone
    },
    {
      id: 'addr-2',
      title: 'Work / Office',
      fullName: shippingAddress.fullName,
      address: '500 Howard Street, Fl 14',
      city: 'San Francisco',
      state: 'California',
      pincode: '94105',
      phone: shippingAddress.phone
    }
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: 'card-1', type: 'Visa', last4: '4242', expiry: '08/28', bank: 'Chase Premier' },
    { id: 'card-2', type: 'Mastercard', last4: '8839', expiry: '11/27', bank: 'Citibank Rewards' }
  ]);

  const [savedUpi, setSavedUpi] = useState([
    { id: 'upi-1', handle: 'prakruthi@okaxis', verified: true },
    { id: 'upi-2', handle: '9845012345@paytm', verified: true }
  ]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingAddress({
      fullName: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    });
    showToast('Personal information updated!', 'success');
  };

  const handleLogout = () => {
    showToast('Logged out of Shop_Easyyy session', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="pb-6 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Account Management
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mt-1">
          Welcome back, {profileData.name.split(' ')[0]}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-6 shadow-xs">
          {/* User Card Snapshot */}
          <div className="flex items-center gap-4 pb-6 border-b border-neutral-100">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-base text-neutral-900">{profileData.name}</h2>
              <p className="text-xs text-neutral-500">{profileData.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                <span>Shop_Easyyy VIP Gold</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4" />
                <span>Personal Information</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => navigateTo('orders')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => navigateTo('wishlist')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4" />
                <span>Wishlist</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-bold">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'payments'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Payment Methods</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[11px] font-bold">
                {notifications.length}
              </span>
            </button>
          </nav>

          <div className="pt-4 border-t border-neutral-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Right Tab Content View */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs">
          
          {/* Tab 1: Personal Information */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Personal Information</h3>
                <p className="text-xs text-neutral-500">Update your details used across checkout and receipts</p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Saved Addresses</h3>
                  <p className="text-xs text-neutral-500">Manage delivery locations for quick 1-click checkout</p>
                </div>
                <button
                  onClick={() => showToast('Address addition modal triggered', 'info')}
                  className="px-3.5 py-2 bg-neutral-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">{addr.title}</span>
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-semibold">Active</span>
                    </div>
                    <p className="text-xs font-medium text-neutral-800">{addr.fullName}</p>
                    <p className="text-xs text-neutral-600">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-xs text-neutral-500">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Payment Methods */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Payment Methods</h3>
                <p className="text-xs text-neutral-500">Saved cards and verified UPI IDs</p>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  Credit & Debit Cards
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedCards.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono tracking-widest">{c.type}</span>
                        <span className="text-[10px] text-neutral-400">{c.bank}</span>
                      </div>
                      <p className="font-mono text-base tracking-wider pt-2">•••• •••• •••• {c.last4}</p>
                      <div className="flex justify-between text-[11px] text-neutral-400 pt-1">
                        <span>Expires {c.expiry}</span>
                        <span className="text-emerald-400 font-semibold">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block pt-4">
                  Linked UPI Accounts
                </span>
                <div className="space-y-2">
                  {savedUpi.map((u) => (
                    <div key={u.id} className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-neutral-900">{u.handle}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-[10px] text-neutral-400 font-medium">Default UPI</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900">Notification History</h3>
                <p className="text-xs text-neutral-500">Order updates, price drop alerts, and exclusive offers</p>
              </div>

              <div className="divide-y divide-neutral-100">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-neutral-900">{n.title}</p>
                      <p className="text-xs text-neutral-600 mt-0.5">{n.message}</p>
                    </div>
                    <span className="text-[11px] text-neutral-400 shrink-0">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
