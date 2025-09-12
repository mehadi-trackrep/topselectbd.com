import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@shared/schema';

interface WishlistState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  isWishlisted: (itemId: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        if (!get().isWishlisted(item.id)) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },
      isWishlisted: (itemId) => get().items.some((item) => item.id === itemId),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
