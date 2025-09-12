import { useWishlistStore } from "@/hooks/use-wishlist";
import ProductCard from "@/components/product-card";

export default function Wishlist() {
  const { items } = useWishlistStore();

  return (
    <div className="min-h-screen py-20 bg-card" data-testid="wishlist-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Your Wishlist</h1>
          <p className="text-muted-foreground text-lg">The products you love, all in one place.</p>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-muted-foreground text-xl">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
