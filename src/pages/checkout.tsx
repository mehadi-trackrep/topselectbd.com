import { useState } from "react";
import { X, Lock, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/lib/cart-store";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutData } from "@/shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, getTotal, clearCart, sessionId } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerAddress: "",
      shippingType: "dhaka",
    },
  });

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  const shippingCost = form.watch("shippingType") === "dhaka" ? 7000 : 13000;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutData & { sessionId: string }) => {
      try {
        const response = await apiRequest("POST", "/orders", data);
        const text = await response.text();
        
        // Check if response is JSON
        try {
          return JSON.parse(text);
        } catch (e) {
          // If it's not JSON, it might be an HTML error page
          if (text.startsWith('<')) {
            throw new Error('Server returned an unexpected error page. Please try again.');
          } else {
            throw new Error(`Server returned invalid response: ${text.substring(0, 100)}...`);
          }
        }
      } catch (error) {
        // Re-throw the error so it can be handled by onError
        throw error;
      }
    },
    onSuccess: (order) => {
      setOrderId(order.id);
      setOrderConfirmed(true);
      clearCart();
      toast({
        title: "Order Confirmed!",
        description: "Your order has been placed successfully.",
      });
      // Invalidate any order-related queries
      queryClient.invalidateQueries({ queryKey: ["/orders"] });
    },
    onError: (error: any) => {
      console.error("Order creation error:", error);
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutData) => {
    createOrderMutation.mutate({ ...data, sessionId });
  };

  // Redirect to cart if no items
  if (items.length === 0 && !orderConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8" data-testid="empty-checkout-page">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4" data-testid="empty-checkout-title">
            No Items to Checkout
          </h1>
          <p className="text-muted-foreground mb-8" data-testid="empty-checkout-message">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
          <Link href="/shop">
            <Button data-testid="shop-now-empty">Shop Now</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Order confirmation page
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-background py-4 pb-8" data-testid="order-confirmation-page">
        <div className="max-w-md mx-auto bg-card shadow-xl h-full flex flex-col">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-4" 
                  data-testid="back-to-home"
                >
                  <X className="h-5 w-5 mr-2" />
                  Home
                </Button>
              </Link>
              <h2 className="text-xl font-bold" data-testid="confirmation-title">Order Confirmed!</h2>
              <div className="w-10"></div> {/* Spacer for alignment */}
            </div>
            
            <div className="flex justify-center items-center mb-6">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center">
                <Check className="text-3xl text-secondary" />
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 text-center" data-testid="confirmation-message">
              Thank you for your order. We'll contact you soon to confirm delivery details.
            </p>
            
            <div className="bg-muted p-6 rounded-xl mb-6">
              <h3 className="font-bold mb-4 text-center" data-testid="order-details-title">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-semibold" data-testid="order-id">#{orderId.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold" data-testid="order-total">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold" data-testid="payment-method">Cash on Delivery</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold" data-testid="delivery-time">2-3 Business Days</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/shop">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" data-testid="back-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4 pb-8" data-testid="checkout-page">
      <div className="max-w-md mx-auto bg-card shadow-xl h-full flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-4" 
                data-testid="back-to-cart"
              >
                <X className="h-5 w-5 mr-2" />
                Back
              </Button>
            </Link>
            <h2 className="text-xl font-bold" data-testid="checkout-title">Checkout</h2>
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
          
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-muted rounded-lg" data-testid="order-summary-section">
            <h3 className="font-medium mb-4" data-testid="order-summary-title">Your order</h3>
            
            <div className="mb-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between" data-testid={`order-item-${item.id}`}>
                  <div className="flex items-center">
                    <img 
                      src={item.product.image && item.product.image.trim() !== "" ? item.product.image : "/placeholder-image.jpg"} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover rounded mr-3"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg";
                      }}
                      data-testid={`order-item-image-${item.id}`}
                    />
                    <div>
                      <span className="text-sm font-medium" data-testid={`order-item-name-${item.id}`}>
                        {item.product.name}
                      </span>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium mr-2">× {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium" data-testid={`order-item-total-${item.id}`}>
                    {formatPrice((typeof item.product.price === 'string' ? parseInt(item.product.price) : item.product.price) * (typeof item.quantity === 'string' ? parseInt(item.quantity) : item.quantity))}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Subtotal:</span>
                <span className="text-sm font-medium" data-testid="summary-subtotal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Shipping:</span>
                <span className="text-sm font-medium" data-testid="summary-shipping">
                  {formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t text-base font-bold">
                <span>Total:</span>
                <span data-testid="summary-total">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Customer Information Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="customer-info-section">
            <div>
              <Label htmlFor="customerName" className="text-sm text-gray-600">Your Name *</Label>
              <Input
                id="customerName"
                placeholder="Enter your name"
                {...form.register("customerName")}
                className="mt-1"
                data-testid="input-customer-name"
              />
              {form.formState.errors.customerName && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.customerName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="customerPhone" className="text-sm text-gray-600">Phone Number *</Label>
              <Input
                id="customerPhone"
                placeholder="Enter your phone number"
                {...form.register("customerPhone")}
                className="mt-1"
                data-testid="input-customer-phone"
              />
              {form.formState.errors.customerPhone && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.customerPhone.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="customerAddress" className="text-sm text-gray-600">Delivery Address *</Label>
              <Textarea
                id="customerAddress"
                placeholder="Enter your full delivery address"
                rows={3}
                {...form.register("customerAddress")}
                className="mt-1"
                data-testid="input-customer-address"
              />
              {form.formState.errors.customerAddress && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.customerAddress.message}</p>
              )}
            </div>
            
            <div className="pt-2">
              <h3 className="font-medium mb-3" data-testid="shipping-title">Shipping</h3>
              <RadioGroup
                value={form.watch("shippingType")}
                onValueChange={(value) => form.setValue("shippingType", value as "dhaka" | "outside")}
                className="space-y-2"
                data-testid="shipping-options"
              >
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dhaka" id="dhaka" data-testid="shipping-dhaka" />
                    <Label htmlFor="dhaka" className="text-sm">Dhaka City</Label>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(70)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outside" id="outside" data-testid="shipping-outside" />
                    <Label htmlFor="outside" className="text-sm">Outside Dhaka</Label>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(130)}</span>
                </div>
              </RadioGroup>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                disabled={createOrderMutation.isPending}
                data-testid="place-order-btn"
              >
                <Lock className="h-4 w-4 mr-2" />
                {createOrderMutation.isPending ? "Processing..." : `Place Order ${formatPrice(total)}`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
