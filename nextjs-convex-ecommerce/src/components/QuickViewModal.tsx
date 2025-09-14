import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuickViewStore } from "@/hooks/use-quick-view";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function QuickViewModal() {
  const { isOpen, product, closeModal } = useQuickViewStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    await addItem(product, quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
    closeModal();
  };

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="quick-view-modal">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={closeModal}
          className="absolute top-4 right-4"
          data-testid="close-quick-view"
        >
          <X className="h-5 w-5" />
        </Button>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img 
              src={product.image && product.image.trim() !== "" ? product.image : "/placeholder-image.jpg"} 
              alt={product.name} 
              className="w-full h-80 object-cover rounded-xl"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-image.jpg";
              }}
              data-testid={`quick-view-image-${product._id}`}
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold" data-testid={`quick-view-name-${product._id}`}>{product.name}</h2>
            <p className="text-muted-foreground" data-testid={`quick-view-description-${product._id}`}>{product.description}</p>
            <span className="text-3xl font-bold text-primary" data-testid={`quick-view-price-${product._id}`}>
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid={`quick-view-decrease-${product._id}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 font-semibold" data-testid={`quick-view-quantity-${product._id}`}>{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid={`quick-view-increase-${product._id}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                data-testid={`quick-view-add-to-cart-${product._id}`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
