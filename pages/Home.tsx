import React, { useState, useMemo } from 'react';
import { Product, CATEGORY_LABELS } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductModal } from '../components/ProductModal';
import { Search, Filter, ShoppingCart } from 'lucide-react';

interface Props {
  products: Product[];
  currentCategory: string;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const Home: React.FC<Props> = ({ products, currentCategory, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc' | 'newest'>('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (currentCategory !== 'all') {
      result = result.filter(p => p.category === currentCategory);
    }

    // 2. Filter by Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerTerm));
    }

    // 3. Sorting
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = result.filter(p => p.isNew);
    }

    return result;
  }, [products, currentCategory, searchTerm, sortBy]);

  return (
    <div className="p-4 md:p-8 w-full">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-black pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            {CATEGORY_LABELS[currentCategory] || 'Каталог'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} товарів</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Пошук товару..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-black focus:ring-1 focus:ring-black outline-none w-full sm:w-64"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Sort */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-black focus:ring-1 focus:ring-black outline-none appearance-none bg-white w-full sm:w-auto cursor-pointer"
            >
              <option value="default">За замовчуванням</option>
              <option value="priceAsc">Спочатку дешевші</option>
              <option value="priceDesc">Спочатку дорожчі</option>
              <option value="newest">Тільки новинки</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">Товари не знайдені.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group border border-transparent hover:border-black transition-all duration-300 bg-white flex flex-col"
            >
              {/* Image Container */}
              <div 
                className="relative aspect-[4/5] overflow-hidden cursor-pointer border border-black/10 group-hover:border-transparent"
                onClick={() => setSelectedProduct(product)}
              >
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 uppercase font-bold z-10">
                    New
                  </span>
                )}
                <ImageWithFallback 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Add To Cart */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product, 1);
                  }}
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <ShoppingCart size={16} />
                  В кошик
                </button>
              </div>

              {/* Info */}
              <div className="pt-4 pb-2 px-2 flex-grow flex flex-col">
                <h3 
                  className="font-bold text-lg uppercase leading-tight mb-1 cursor-pointer hover:underline"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-3">
                  <span className="text-xl font-black">{product.price.toLocaleString()} грн</span>
                  <button 
                    className="text-sm underline text-gray-500 hover:text-black"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Детальніше
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={onAddToCart}
      />
    </div>
  );
};