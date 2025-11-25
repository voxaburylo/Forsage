import { Product } from './types';

// This simulates your products.json content. 
// In a real deployed version, you might fetch this, but for now we define it here 
// so the app works immediately.
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "A1",
    name: "Ароматизатор Bear RGB LED",
    description: "Стильний ароматизатор з підсвічуванням та датчиком звуку.",
    price: 450,
    category: "acsessiory",
    images: [
      "https://picsum.photos/id/21/500/500", // Placeholder for demo
      "https://picsum.photos/id/22/500/500"
    ],
    isNew: true
  },
  {
    id: "A2",
    name: "Автомобільний акумулятор 60Ah",
    description: "Надійний акумулятор для легкових авто. Гарантія 2 роки.",
    price: 3200,
    category: "akb",
    images: [
      "https://picsum.photos/id/111/500/500"
    ],
    isNew: false
  },
  {
    id: "A3",
    name: "Набір інструментів (108 предметів)",
    description: "Професійний набір головок та ключів.",
    price: 2100,
    category: "tools",
    images: [
      "https://picsum.photos/id/250/500/500"
    ],
    isNew: true
  },
   {
    id: "A4",
    name: "Мастило моторне 5W-40 (4л)",
    description: "Синтетичне моторне мастило вищої якості.",
    price: 1200,
    category: "oils",
    images: [
      "https://picsum.photos/id/300/500/500"
    ],
    isNew: false
  }
];