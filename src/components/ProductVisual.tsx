import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, Shirt, Footprints, Smartphone, Droplets, Home, Briefcase, Shapes, Gift } from 'lucide-react';

interface ProductVisualProps {
  product: Product;
  variant?: string;
  className?: string;
  aspect?: 'square' | 'wide' | 'portrait';
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  variant,
  className = '',
  aspect = 'square'
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspect === 'wide'
      ? 'aspect-[16/9]'
      : aspect === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-square';

  // Determine image source: variant image, primaryImage, or galleryImages[0]
  const imageUrl = variant && variant.startsWith('http')
    ? variant
    : product.primaryImage && product.primaryImage.startsWith('http')
    ? product.primaryImage
    : product.galleryImages && product.galleryImages[0] && product.galleryImages[0].startsWith('http')
    ? product.galleryImages[0]
    : null;

  // Fallback category icon if image fails to load
  const renderFallbackIcon = () => {
    const iconClass = "w-12 h-12 text-neutral-600";
    switch (product.category) {
      case 'Fashion':
        return <Shirt className={iconClass} />;
      case 'Shoes':
        return <Footprints className={iconClass} />;
      case 'Electronics':
        return <Smartphone className={iconClass} />;
      case 'Beauty':
        return <Droplets className={iconClass} />;
      case 'Home & Living':
        return <Home className={iconClass} />;
      case 'Accessories':
        return <Briefcase className={iconClass} />;
      case 'Kids':
        return <Shapes className={iconClass} />;
      case 'Gifts':
        return <Gift className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center transition-all duration-300 group ${className}`}
    >
      {/* Category watermark badge */}
      <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-xs text-[9px] font-bold tracking-wider uppercase text-neutral-600 shadow-2xs pointer-events-none">
        {product.category}
      </div>

      {/* Real Product Image */}
      {imageUrl && !imageError ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Skeleton placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
              <span className="text-xs text-neutral-400 font-medium">Loading photo...</span>
            </div>
          )}

          <img
            src={imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      ) : (
        /* Graceful Fallback if image fails or is unavailable */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-200">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xs border border-white"
            style={{
              backgroundColor: `${product.visualTheme?.accentColor || '#6366f1'}15`
            }}
          >
            {renderFallbackIcon()}
          </div>
          <span className="text-[11px] font-medium text-neutral-600 mt-2 text-center line-clamp-1">
            {product.name}
          </span>
        </div>
      )}

      {/* Subtle bottom shadow vignette */}
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
