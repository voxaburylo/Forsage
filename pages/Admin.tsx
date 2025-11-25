import React, { useState } from 'react';
import { Product } from '../types';
import { Trash2, Plus, Copy } from 'lucide-react';

interface Props {
  initialProducts: Product[];
}

export const Admin: React.FC<Props> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [jsonOutput, setJsonOutput] = useState('');

  const updateProduct = (index: number, field: keyof Product, value: any) => {
    const newProducts = [...products];
    if (field === 'images') {
       // Simple split by comma for editing images
       newProducts[index].images = (value as string).split(',').map(s => s.trim()).filter(Boolean);
    } else {
       newProducts[index] = { ...newProducts[index], [field]: value };
    }
    setProducts(newProducts);
  };

  const addProduct = () => {
    const newId = `A${Math.max(...products.map(p => parseInt(p.id.replace(/\D/g, '')) || 0)) + 1}`;
    setProducts([
      {
        id: newId,
        name: 'Новий Товар',
        description: 'Опис...',
        price: 100,
        category: 'acsessiory',
        images: ['https://picsum.photos/500/500'],
        isNew: true
      },
      ...products
    ]);
  };

  const removeProduct = (index: number) => {
    if (confirm('Видалити товар?')) {
      const newProducts = [...products];
      newProducts.splice(index, 1);
      setProducts(newProducts);
    }
  };

  const generateJSON = () => {
    setJsonOutput(JSON.stringify(products, null, 2));
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <h1 className="text-2xl font-bold text-yellow-800 uppercase mb-2">
          Адмін-панель (Генератор JSON)
        </h1>
        <p className="text-yellow-700">
          Оскільки у вас статичний хостинг, відредагуйте товари тут, натисніть "Згенерувати JSON", 
          а потім скопіюйте результат у ваш файл <strong>products.json</strong> на сервері/GitHub.
        </p>
      </div>

      <button onClick={addProduct} className="mb-6 px-6 py-3 bg-green-600 text-white font-bold uppercase flex items-center gap-2 hover:bg-green-700">
        <Plus /> Додати товар
      </button>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {products.map((product, index) => (
          <div key={index} className="border border-black p-4 bg-white shadow-sm relative">
             <button 
                onClick={() => removeProduct(index)} 
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
             >
               <Trash2 />
             </button>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">ID (Артикул)</label>
                   <input 
                      type="text" 
                      value={product.id} 
                      onChange={(e) => updateProduct(index, 'id', e.target.value)}
                      className="w-full border border-gray-300 p-2"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Назва</label>
                   <input 
                      type="text" 
                      value={product.name} 
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      className="w-full border border-gray-300 p-2"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Ціна (грн)</label>
                   <input 
                      type="number" 
                      value={product.price} 
                      onChange={(e) => updateProduct(index, 'price', Number(e.target.value))}
                      className="w-full border border-gray-300 p-2"
                   />
                </div>
                 <div className="col-span-1 md:col-span-3">
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Опис</label>
                   <textarea 
                      value={product.description} 
                      onChange={(e) => updateProduct(index, 'description', e.target.value)}
                      className="w-full border border-gray-300 p-2"
                      rows={2}
                   />
                </div>
                <div className="col-span-1 md:col-span-2">
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Посилання на фото (через кому)</label>
                   <input 
                      type="text" 
                      value={product.images.join(', ')} 
                      onChange={(e) => updateProduct(index, 'images', e.target.value)}
                      className="w-full border border-gray-300 p-2 font-mono text-sm"
                      placeholder="images/item1.jpg, images/item1-2.jpg"
                   />
                </div>
                 <div>
                   <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Категорія</label>
                   <select 
                      value={product.category} 
                      onChange={(e) => updateProduct(index, 'category', e.target.value)}
                      className="w-full border border-gray-300 p-2 bg-white"
                   >
                     <option value="acsessiory">Аксесуари</option>
                     <option value="akb">Акумулятори</option>
                     <option value="oils">Мастила</option>
                     <option value="filters">Фільтри</option>
                     <option value="tools">Інструменти</option>
                   </select>
                </div>
                 <div className="flex items-center gap-2 mt-4">
                   <label className="text-sm font-bold uppercase">Новинка?</label>
                   <input 
                      type="checkbox" 
                      checked={product.isNew || false} 
                      onChange={(e) => updateProduct(index, 'isNew', e.target.checked)}
                      className="w-5 h-5 accent-black"
                   />
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Готовий код JSON</h2>
          <button onClick={generateJSON} className="bg-white text-black px-4 py-2 font-bold uppercase hover:bg-gray-200">
             1. Згенерувати
          </button>
        </div>
        
        <textarea 
          readOnly 
          value={jsonOutput} 
          className="w-full h-64 bg-black border border-gray-700 p-4 font-mono text-xs text-green-400"
          placeholder="Натисніть 'Згенерувати'..."
        />
        
        {jsonOutput && (
          <button 
             onClick={() => navigator.clipboard.writeText(jsonOutput)}
             className="mt-4 bg-blue-600 text-white px-6 py-2 flex items-center gap-2 hover:bg-blue-700"
          >
             <Copy size={16}/> 2. Скопіювати в буфер
          </button>
        )}
      </div>
    </div>
  );
};