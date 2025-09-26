import { useEffect } from "react";
import { X, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "wouter";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal, clearCart, loadCartFromServer } = useCartStore();

  useEffect(() => {
    // Load cart data from server when component mounts
    loadCartFromServer();
  }, [loadCartFromServer]);

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseInt(price) : price;
    return `৳${(numericPrice / 100).toFixed(2)}`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8" data-testid="empty-cart-page">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4" data-testid="empty-cart-title">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8" data-testid="empty-cart-message">
            You haven't added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button data-testid="continue-shopping-empty">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-8" data-testid="cart-page">
      <div className="max-w-md mx-auto bg-card shadow-xl h-full flex flex-col">
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/shop">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-4" 
                data-testid="back-to-shop"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </Link>
            <h2 className="text-xl font-bold" data-testid="cart-page-title">Shopping Cart</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              data-testid="clear-cart"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Cart items */}
          <div className="space-y-4 mb-8" data-testid="cart-items">
            {items.map((item) => (
              item.product &&
              <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg" data-testid={`cart-item-${item.id}`}>
                <div className="flex items-center">
                  <img 
                    src={item.product.image && item.product.image.trim() !== "" ? item.product.image : "/placeholder-image.jpg"} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                    data-testid={`cart-item-image-${item.id}`}
                  />
                  <div>
                    <h4 className="font-semibold" data-testid={`cart-item-name-${item.id}`}>{item.product.name}</h4>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        data-testid={`cart-item-decrease-${item.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-3 font-semibold" data-testid={`cart-item-quantity-${item.id}`}>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        data-testid={`cart-item-increase-${item.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold" data-testid={`cart-item-total-${item.id}`}>
                    {formatPrice((typeof item.product.price === 'string' ? parseInt(item.product.price) : item.product.price) * (typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity))}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive mt-2"
                    data-testid={`cart-item-remove-${item.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-lg font-bold" data-testid="cart-subtotal">
                {formatPrice(getTotal())}
              </span>
            </div>
            
            <div className="space-y-3">
              <Link href="/checkout">
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  data-testid="button-checkout"
                >
                  CHECKOUT
                </Button>
              </Link>
              <Link href="/shop">
                <Button 
                  variant="outline" 
                  className="w-full"
                  data-testid="button-continue-shopping"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
