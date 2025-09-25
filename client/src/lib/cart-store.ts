import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/shared/schema';
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
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotal: () => number;
  getItemCount: () => number;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  loadCartFromServer: () => Promise<void>;
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
          await apiRequest("POST", "/cart", {
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

      updateQuantity: async (id: string, quantity: number) => {
        if (quantity <= 0) {
          await get().removeItem(id);
          return;
        }
        
        // Sync with backend first
        try {
          await apiRequest("PUT", `/cart/${id}`, {
            quantity
          });
        } catch (error) {
          console.error("Failed to update cart item on backend:", error);
        }
        
        set((state) => ({
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      removeItem: async (id: string) => {
        // Sync with backend first
        try {
          await apiRequest("DELETE", `/cart/${id}`);
        } catch (error) {
          console.error("Failed to remove cart item from backend:", error);
        }
        
        set((state) => ({
          ...state,
          items: state.items.filter(item => item.id !== id)
        }));
      },

      clearCart: async () => {
        // Sync with backend first
        try {
          const { sessionId } = get();
          await apiRequest("DELETE", `/cart/session/${sessionId}`);
        } catch (error) {
          console.error("Failed to clear cart on backend:", error);
        }
        
        set((state) => ({
          ...state,
          items: []
        }));
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = typeof item.product.price === 'string' ? parseInt(item.product.price) : item.product.price;
          const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
          return total + (price * quantity);
        }, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => {
          const quantity = typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity;
          return count + quantity;
        }, 0);
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }));
      },

      setCartOpen: (open: boolean) => {
        set((state) => ({ ...state, isOpen: open }));
      },

      loadCartFromServer: async () => {
        try {
          const { sessionId } = get();
          const response = await apiRequest("GET", `/cart/${sessionId}`);
          const cartItems = await response.json();
          
          // Convert server cart items to local format
          const localCartItems = cartItems.map((item: any) => ({
            id: item.id,
            product: item.product,
            quantity: item.quantity
          }));
          
          set((state) => ({
            ...state,
            items: localCartItems
          }));
        } catch (error) {
          console.error("Failed to load cart from server:", error);
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
