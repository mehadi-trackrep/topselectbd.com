import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "wouter";

export default function CartModal() {
  const { isOpen, items, updateQuantity, removeItem, getTotal, setCartOpen } = useCartStore();

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" data-testid="cart-modal">
      <div className="flex justify-end h-full">
        <div className="bg-card w-full max-w-md shadow-xl h-full overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold" data-testid="cart-modal-title">Shopping Cart</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(false)}
                data-testid="close-cart-modal"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4" data-testid="empty-cart-message">Your cart is empty</p>
                <Link href="/shop">
                  <Button 
                    onClick={() => setCartOpen(false)}
                    data-testid="button-continue-shopping"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="space-y-4 mb-8" data-testid="cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg" data-testid={`cart-item-${item.id}`}>
                      <div className="flex items-center">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded-lg mr-4"
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
                          {formatPrice(item.product.price * item.quantity)}
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
                    <Link href="/cart">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCartOpen(false)}
                        data-testid="button-view-cart"
                      >
                        VIEW CART
                      </Button>
                    </Link>
                    <Link href="/checkout">
                      <Button 
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                        onClick={() => setCartOpen(false)}
                        data-testid="button-checkout"
                      >
                        CHECKOUT
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div 
          className="flex-1 bg-black/50"
          onClick={() => setCartOpen(false)}
          data-testid="cart-modal-overlay"
        />
      </div>
    </div>
  );
}
