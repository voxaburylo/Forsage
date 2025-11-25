export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[]; // Supports multiple images
  isNew?: boolean; // New feature for "Novinki"
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'all' | 'acsessiory' | 'akb' | 'oils' | 'filters' | 'tools';

export const CATEGORY_LABELS: Record<Category | string, string> = {
  all: 'Всі товари',
  acsessiory: 'Аксесуари',
  akb: 'Акумулятори',
  oils: 'Мастила та хімія',
  filters: 'Фільтри',
  tools: 'Інструменти'
};