import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem as CartItemType } from '@/shared/schema';
import { convex } from './convex';
import { api } from '@/.convex/_generated/api';

export interface CartItem extends CartItemType {
  product: Product;
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
        const { sessionId } = get();
        await convex.mutation(api.cart.addItem, {
          sessionId,
          productId: product._id,
          quantity
        });

        set((state) => {
          const existingItem = state.items.find(item => item.product._id === product._id);
          
          if (existingItem) {
            return {
              ...state,
              items: state.items.map(item =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            // This is not quite right, as we don't have the new cart item id here.
            // For now, we will just add the product to the cart optimistically.
            const tempId = crypto.randomUUID();
            const newItem: CartItem = { 
              _id: tempId,
              _creationTime: Date.now(),
              productId: product._id,
              product, 
              quantity, 
              sessionId 
            };
            return {
              ...state,
              items: [...state.items, newItem]
            };
          }
        });
      },

      updateQuantity: (id: string, quantity: number) => {
        const { sessionId } = get();
        convex.mutation(api.cart.updateQuantity, { cartItemId: id, quantity });

        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          ...state,
          items: state.items.map(item =>
            item._id === id ? { ...item, quantity } : item
          )
        }));
      },

      removeItem: (id: string) => {
        const { sessionId } = get();
        convex.mutation(api.cart.removeItem, { cartItemId: id });

        set((state) => ({
          ...state,
          items: state.items.filter(item => item._id !== id)
        }));
      },

      clearCart: () => {
        const { sessionId } = get();
        convex.mutation(api.cart.clearCart, { sessionId });

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
