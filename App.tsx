import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, ShoppingCart, X, Instagram, Phone } from 'lucide-react';

// Components
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';

// Data & Types
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem, CATEGORY_LABELS } from './types';

function App() {
  // State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  // Load products (Simulation of fetching products.json)
  useEffect(() => {
    // In a real app, you would fetch('/products.json') here.
    console.log("App loaded. Products ready.");
  }, []);

  // Cart Logic
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    alert(`${product.name} додано в кошик!`);
  };

  const updateCartQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + change;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        
        {/* Top Navbar (Sticky) */}
        <nav className="sticky top-0 z-40 bg-white border-b border-black h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100">
              <Menu />
            </button>
            <Link to="/" className="text-2xl font-black tracking-tighter italic">
              FORSAGE<span className="text-red-600">SHOP</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Admin link removed from visual UI */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 transition group">
              <ShoppingCart className="text-black" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>

        <div className="flex flex-1 relative">
          
          {/* Sidebar / Overlay */}
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar Content */}
          <aside className={`
            fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-black transform transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:z-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-4 flex justify-between items-center lg:hidden border-b border-gray-100">
              <span className="font-bold text-lg">Меню</span>
              <button onClick={() => setIsSidebarOpen(false)}><X /></button>
            </div>

            <div className="p-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Категорії</h3>
              <ul className="space-y-4">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <li key={key}>
                    <Link 
                      to="/"
                      onClick={() => {
                        setCurrentCategory(key);
                        setIsSidebarOpen(false);
                      }}
                      className={`block text-lg font-bold transition hover:text-red-600 ${currentCategory === key ? 'text-black underline decoration-2 underline-offset-4' : 'text-gray-500'}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

             <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
               <h4 className="font-bold mb-2">Контакти</h4>
               <div className="flex flex-col gap-2 text-sm text-gray-600">
                 <a href="tel:+380991674424" className="flex items-center gap-2 hover:text-black"><Phone size={14}/> 099 167 44 24</a>
                 <a href="tel:+380635823858" className="flex items-center gap-2 hover:text-black"><Phone size={14}/> 063 582 38 58</a>
                 <a href="#" className="flex items-center gap-2 hover:text-black"><Instagram size={14}/> @forsage_shop</a>
               </div>
             </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white min-h-[calc(100vh-64px)] overflow-x-hidden">
            <Routes>
              <Route path="/" element={
                <Home 
                  products={products} 
                  currentCategory={currentCategory} 
                  onAddToCart={addToCart} 
                />
              } />
              <Route path="/cart" element={
                <Cart 
                  cart={cart} 
                  updateQuantity={updateCartQuantity} 
                  removeFromCart={removeFromCart} 
                  clearCart={clearCart} 
                />
              } />
              <Route path="/admin" element={
                <Admin initialProducts={products} />
              } />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white py-8 px-4 text-center">
          <p className="font-bold italic text-xl mb-2">FORSAGE SHOP</p>
          <p className="text-gray-500 text-sm">&copy; 2017 - {new Date().getFullYear()} Всі права захищені.</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;