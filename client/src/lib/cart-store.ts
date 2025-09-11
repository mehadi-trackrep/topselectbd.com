import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@shared/schema';
import { apiRequest } from './queryClient';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  sessionId: string;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      sessionId: crypto.randomUUID(),
      isOpen: false,

      addItem: async (product: Product, quantity = 1) => {
        // Sync with backend first
        try {
          const { sessionId } = get();
          await apiRequest("POST", "/api/cart", {
            sessionId,
            productId: product.id,
            quantity
          });
        } catch (error) {
          console.error("Failed to sync cart with backend:", error);
        }

        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              ...state,
              items: [...state.items, { id: crypto.randomUUID(), product, quantity }]
            };
          }
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      removeItem: (id: string) => {
        set((state) => ({
          ...state,
          items: state.items.filter(item => item.id !== id)
        }));
      },

      clearCart: () => {
        set((state) => ({
          ...state,
          items: []
        }));
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }));
      },

      setCartOpen: (open: boolean) => {
        set((state) => ({ ...state, isOpen: open }));
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
