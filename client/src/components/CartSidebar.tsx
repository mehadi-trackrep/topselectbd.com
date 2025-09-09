import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={closeCart}
          data-testid="cart-overlay"
        />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">শপিং কার্ট</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeCart}
                data-testid="button-close-cart"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-8" data-testid="text-cart-empty">
                  আপনার কার্ট খালি
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center space-x-4 p-4 bg-background rounded-lg"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm" data-testid={`text-cart-item-name-${item.id}`}>
                          {item.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary" data-testid={`text-item-total-${item.id}`}>
                          {(item.price * item.quantity).toFixed(2)}৳
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive/80"
                          onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="flex items-center justify-between mb-4 text-lg font-semibold">
                  <span className="text-foreground">সাবটোটাল:</span>
                  <span className="text-primary" data-testid="text-cart-subtotal">
                    {getTotalPrice().toFixed(2)}৳
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    data-testid="button-view-cart"
                  >
                    কার্ট দেখুন
                  </Button>
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={handleCheckout}
                    data-testid="button-checkout"
                  >
                    চেকআউট
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
}
