import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_CONFIG } from '../data/products';
import { formatINR } from '../utils/format';

export const ShopView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory || 'All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Synchronize when selectedCategory changes from navigation
  React.useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return 0; // featured/default
      });
  }, [products, activeCategory, searchQuery, maxPrice, minRating, sortBy]);

  const clearAllFilters = () => {
    setActiveCategory('All');
    setSelectedCategory(null);
    setSearchQuery('');
    setMaxPrice(25000);
    setMinRating(0);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catalog Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Catalog & Collections
          </span>
          <h1 className="text-3xl font-extrabold text-neutral-900 mt-1">
            Shop All Products
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Showing <strong className="text-neutral-900 font-semibold">{filteredProducts.length}</strong> items across {activeCategory === 'All' ? 'all departments' : activeCategory}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Active Search Pill if exists */}
          {searchQuery && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-lg text-xs text-neutral-800">
              <span>Searching: "<strong>{searchQuery}</strong>"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-neutral-500 hover:text-neutral-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs font-medium text-neutral-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-900 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-neutral-200/80 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-neutral-900">Filters</h3>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
            >
              Reset All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
              Categories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedCategory(null);
                }}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                  activeCategory === 'All'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span>All Departments</span>
                <span className="text-[11px] text-neutral-400">{products.length}</span>
              </button>

              {CATEGORIES_CONFIG.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setSelectedCategory(cat.name);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-between ${
                      activeCategory === cat.name
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-neutral-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Max Price
              </h4>
              <span className="text-xs font-bold text-neutral-900 tabular-nums">
                Up to {formatINR(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
              <span>₹200</span>
              <span>₹2,000</span>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Minimum Rating
            </h4>
            <div className="space-y-1">
              {[0, 4.5, 4.8].map((ratingVal) => (
                <button
                  key={ratingVal}
                  onClick={() => setMinRating(ratingVal)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    minRating === ratingVal
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {ratingVal === 0 ? 'Any Rating' : `★ ${ratingVal} Stars & Up`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Slide-down Filters */}
        {mobileFilterOpen && (
          <div className="lg:hidden col-span-12 bg-white p-5 rounded-2xl border border-neutral-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-900">Filter Products</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div>
              <span className="text-xs font-semibold text-neutral-500 mb-2 block">Category:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSelectedCategory(null);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg ${
                    activeCategory === 'All'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  All
                </button>
                {CATEGORIES_CONFIG.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setSelectedCategory(cat.name);
                    }}
                    className={`px-3 py-1.5 text-xs rounded-lg ${
                      activeCategory === cat.name
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Max Price */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-neutral-600">Max Price:</span>
                <span className="font-bold text-neutral-900">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="200"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 mx-auto flex items-center justify-center text-neutral-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">
                No matching products found
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto">
                We couldn't find items matching your current filters. Try relaxing the price range or clearing your search term.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
