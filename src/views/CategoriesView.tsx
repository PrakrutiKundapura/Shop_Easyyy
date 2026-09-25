import React, { useState } from 'react';
import {
  Shirt,
  Footprints,
  Smartphone,
  Sparkles,
  Home,
  Briefcase,
  Shapes,
  Gift,
  ArrowRight,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CategoriesView: React.FC = () => {
  const { products, navigateTo } = useShop();
  const [selectedCat, setSelectedCat] = useState<string>('Fashion');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-6 h-6" />;
      case 'Footprints':
        return <Footprints className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'Shapes':
        return <Shapes className="w-6 h-6" />;
      case 'Gift':
        return <Gift className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const currentCategoryProducts = products.filter((p) => p.category === selectedCat);
  const activeCategoryMeta = CATEGORIES_CONFIG.find((c) => c.name === selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Curated Departments
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900">
          Browse by Category
        </h1>
        <p className="text-sm text-neutral-500">
          Select any department to view high-performance gear, curated wardrobe pieces, and home essentials.
        </p>
      </div>

      {/* Category Selection Grid Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {CATEGORIES_CONFIG.map((cat) => {
          const isSelected = selectedCat === cat.name;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.name)}
              className={`group flex flex-col items-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-105'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border-neutral-200/80 hover:border-neutral-300 shadow-2xs'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected
                    ? 'bg-white/10 text-white'
                    : 'bg-neutral-100 text-neutral-700 group-hover:text-indigo-600'
                }`}
              >
                {getCategoryIcon(cat.icon)}
              </div>
              <span className="text-xs font-bold truncate max-w-full">
                {cat.name}
              </span>
              <span
                className={`text-[10px] mt-0.5 ${
                  isSelected ? 'text-neutral-400' : 'text-neutral-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Spotlight Banner & Products */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <span>Selected Department</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {activeCategoryMeta?.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              {activeCategoryMeta?.description}
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop', undefined, selectedCat)}
            className="self-start sm:self-auto px-5 py-2.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <span>Open in Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCategoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
