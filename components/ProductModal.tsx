import React, { useState } from 'react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const images = product.images.length > 0 ? product.images : [''];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl h-[90vh] md:h-auto overflow-y-auto rounded-none border-2 border-white shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 relative group">
          <div className="aspect-square w-full relative">
            <ImageWithFallback 
              src={images[activeImageIndex]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-white text-black">
                <ChevronLeft />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 hover:bg-white text-black">
                <ChevronRight />
              </button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full ${idx === activeImageIndex ? 'bg-black' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="mb-auto">
             {product.isNew && (
                <span className="bg-black text-white text-xs px-2 py-1 uppercase tracking-widest mb-2 inline-block">
                  New / Новинка
                </span>
              )}
            <h2 className="text-3xl font-bold mb-2 uppercase">{product.name}</h2>
            <p className="text-gray-500 mb-4 text-sm">Артикул: {product.id}</p>
            <p className="text-4xl font-bold mb-6">{product.price.toLocaleString()} грн</p>
            <hr className="border-gray-200 mb-6" />
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-bold">Кількість:</span>
              <div className="flex border border-black">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >-</button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  className="w-12 text-center border-x border-black outline-none"
                />
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >+</button>
              </div>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 font-bold text-lg uppercase tracking-wider hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};