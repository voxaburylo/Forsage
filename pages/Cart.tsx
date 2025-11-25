import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface Props {
  cart: CartItem[];
  updateQuantity: (id: string, change: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const Cart: React.FC<Props> = ({ cart, updateQuantity, removeFromCart, clearCart }) => {
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState('');
  
  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);

    const details = cart.map(item => 
      `${item.name} (ID: ${item.id}) - ${item.quantity}шт. x ${item.price}грн`
    ).join('\n');
    setOrderDetails(`Сума: ${sum} грн.\nСклад замовлення:\n${details}`);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-3xl font-black uppercase mb-4">Кошик порожній</h2>
        <p className="text-gray-500 mb-8">Ви ще нічого не вибрали.</p>
        <a href="#/" className="px-8 py-3 bg-black text-white uppercase font-bold hover:bg-gray-800 transition">
          Перейти в каталог
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black uppercase mb-8 border-b border-black pb-4">Оформлення замовлення</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Order Items */}
        <div className="flex-1">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border border-gray-200 items-center bg-white">
                <div className="w-20 h-20 flex-shrink-0 border border-black/10">
                  <ImageWithFallback src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold uppercase text-sm md:text-base">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.price} грн/шт</p>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center border border-gray-300">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100"><Minus size={14}/></button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100"><Plus size={14}/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center bg-gray-100 p-4 font-bold text-xl uppercase">
            <span>Разом:</span>
            <span>{total.toLocaleString()} грн</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="w-full lg:w-96 bg-white border border-black p-6 h-fit sticky top-24">
          <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
             Дані доставки
          </h3>
          
          <form 
            action="https://formspree.io/f/xpweykjy" 
            method="POST" 
            onSubmit={() => setTimeout(clearCart, 1000)} // Basic cleanup after submit
          >
            <input type="hidden" name="_subject" value="НОВЕ ЗАМОВЛЕННЯ з сайту FORSAGE SHOP" />
            <input type="hidden" name="Деталі_Замовлення" value={orderDetails} />

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold mb-1 text-gray-500">ПІБ</label>
                <input required type="text" name="ПІБ" className="w-full border border-gray-300 p-2 focus:border-black outline-none" placeholder="Іванов Іван" />
              </div>
              
              <div>
                <label className="block text-xs uppercase font-bold mb-1 text-gray-500">Телефон</label>
                <input required type="tel" name="Телефон" className="w-full border border-gray-300 p-2 focus:border-black outline-none" placeholder="+380..." />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold mb-1 text-gray-500">Адреса доставки</label>
                <textarea required name="Адреса" rows={3} className="w-full border border-gray-300 p-2 focus:border-black outline-none" placeholder="Місто, № Відділення Нової Пошти"></textarea>
              </div>

              <button type="submit" className="w-full bg-black text-white py-3 font-bold uppercase hover:bg-gray-800 transition flex justify-center items-center gap-2 mt-4">
                <CheckCircle size={18} />
                Підтвердити
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-2">
                Менеджер зв'яжеться з вами для уточнення деталей.
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};