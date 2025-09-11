import { Minus, Plus, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "wouter";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  const shippingCostDhaka = 7000; // 70.00 BDT in paisa
  const shippingCostOutside = 13000; // 130.00 BDT in paisa

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8" data-testid="empty-cart-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-4" data-testid="empty-cart-title">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8" data-testid="empty-cart-message">
                You haven't added any items to your cart yet.
              </p>
              <Link href="/shop">
                <Button data-testid="continue-shopping-empty">Continue Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8" data-testid="cart-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <Link href="/shop">
            <Button variant="ghost" className="mr-4" data-testid="back-to-shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
          <h1 className="text-3xl font-bold" data-testid="cart-page-title">Your Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card data-testid="cart-items-section">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold" data-testid="cart-items-title">Cart Items ({items.length})</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    data-testid="clear-cart"
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg" data-testid={`cart-item-${item.id}`}>
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-20 h-20 object-cover rounded-lg"
                        data-testid={`cart-item-image-${item.id}`}
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" data-testid={`cart-item-name-${item.id}`}>
                          {item.product.name}
                        </h3>
                        <p className="text-muted-foreground" data-testid={`cart-item-category-${item.id}`}>
                          {item.product.categoryEn}
                        </p>
                        <p className="text-primary font-bold" data-testid={`cart-item-price-${item.id}`}>
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          data-testid={`decrease-quantity-${item.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold px-4" data-testid={`item-quantity-${item.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          data-testid={`increase-quantity-${item.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold" data-testid={`item-total-${item.id}`}>
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive mt-2"
                          data-testid={`remove-item-${item.id}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card data-testid="order-summary">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6" data-testid="order-summary-title">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between" data-testid="subtotal-row">
                    <span>Subtotal:</span>
                    <span className="font-semibold" data-testid="subtotal-amount">
                      {formatPrice(getTotal())}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3">Shipping Options:</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm" data-testid="shipping-dhaka">
                        <span>ঢাকার ভিতরে:</span>
                        <span>{formatPrice(shippingCostDhaka)}</span>
                      </div>
                      <div className="flex justify-between text-sm" data-testid="shipping-outside">
                        <span>ঢাকার বাহিরে:</span>
                        <span>{formatPrice(shippingCostOutside)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold" data-testid="estimated-total">
                      <span>Estimated Total:</span>
                      <span>{formatPrice(getTotal() + shippingCostDhaka)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      (With Dhaka shipping)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" data-testid="proceed-to-checkout">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="outline" className="w-full" data-testid="continue-shopping">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
