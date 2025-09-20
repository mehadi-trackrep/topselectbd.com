import { useState } from "react";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart-store";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, type CheckoutData } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { items, getTotal, clearCart, sessionId } = useCartStore();
  const [, setLocation] = useLocation();
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
      <div className="min-h-screen bg-background py-8" data-testid="empty-checkout-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-4" data-testid="empty-checkout-title">
                No Items to Checkout
              </h1>
              <p className="text-muted-foreground mb-8" data-testid="empty-checkout-message">
                Your cart is empty. Add some items before proceeding to checkout.
              </p>
              <Link href="/shop">
                <Button data-testid="shop-now-empty">Shop Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Order confirmation page
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-background py-8" data-testid="order-confirmation-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-3xl text-secondary" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4" data-testid="confirmation-title">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground mb-8" data-testid="confirmation-message">
                Thank you for your order. We'll contact you soon to confirm delivery details.
              </p>
              
              <div className="bg-muted p-6 rounded-xl mb-8 text-left">
                <h3 className="font-bold mb-4" data-testid="order-details-title">Order Details</h3>
                <div className="space-y-2">
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
              
              <div className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#C4976C' }} data-testid="checkout-page">
      {/* Logo */}
      <div className="pt-8 pb-4 text-center">
        <div className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full">
          <span className="text-lg font-bold text-yellow-400">আচারে পাকা</span>
        </div>
      </div>

      {/* Info badges */}
      <div className="flex justify-center space-x-8 mb-8 text-white text-sm">
        <div className="flex items-center">
          <Lock className="h-4 w-4 mr-1" />
          SSL secured checkout
        </div>
        <div className="flex items-center">
          <span className="mr-1">🔧</span>
          24/7 support available
        </div>
        <div className="flex items-center">
          <span className="mr-1">💳</span>
          Payment option
        </div>
      </div>

      {/* Main container */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Customer Information Form */}
            <div className="p-8 border-r border-gray-200" data-testid="customer-info-section">
              <h2 className="text-lg font-medium mb-6" data-testid="customer-info-title">
                আপনার কার্তে নিচের তথ্য দিন
              </h2>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName" className="text-sm text-gray-600">আপনার নাম *</Label>
                    <Input
                      id="customerName"
                      placeholder="আপনার নাম"
                      {...form.register("customerName")}
                      className="mt-1 border-gray-300"
                      data-testid="input-customer-name"
                    />
                    {form.formState.errors.customerName && (
                      <p className="text-sm text-red-500 mt-1">আপনার নাম is required</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="customerPhone" className="text-sm text-gray-600">মোবাইল নং (বিকাশ) *</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="মোবাইল নং বিকাশ"
                      {...form.register("customerPhone")}
                      className="mt-1 border-gray-300"
                      data-testid="input-customer-phone"
                    />
                    {form.formState.errors.customerPhone && (
                      <p className="text-sm text-red-500 mt-1">মোবাইল নং is required</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="customerAddress" className="text-sm text-gray-600">আপনার ঠিকানা (ফুল নেসস) *</Label>
                  <Textarea
                    id="customerAddress"
                    placeholder=""
                    rows={3}
                    {...form.register("customerAddress")}
                    className="mt-1 border-gray-300"
                    data-testid="input-customer-address"
                  />
                  {form.formState.errors.customerAddress && (
                    <p className="text-sm text-red-500 mt-1">আপনার ঠিকানা is required</p>
                  )}
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-4" data-testid="shipping-title">Shipping</h3>
                  <RadioGroup
                    value={form.watch("shippingType")}
                    onValueChange={(value) => form.setValue("shippingType", value as "dhaka" | "outside")}
                    className="space-y-3"
                    data-testid="shipping-options"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dhaka" id="dhaka" data-testid="shipping-dhaka" />
                        <Label htmlFor="dhaka" className="text-sm">ঢাকার ভিতরে:</Label>
                      </div>
                      <span className="text-sm">70.00৳</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outside" id="outside" data-testid="shipping-outside" />
                        <Label htmlFor="outside" className="text-sm">ঢাকার বাহিরে:</Label>
                      </div>
                      <span className="text-sm">130.00৳</span>
                    </div>
                  </RadioGroup>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="p-8" data-testid="order-summary-section">
              <h3 className="font-medium mb-6" data-testid="order-summary-title">Your order</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between mb-3" data-testid={`order-item-${item.id}`}>
                    <div className="flex items-center">
                      <img 
                        src={item.product.image && item.product.image.trim() !== "" ? item.product.image : "/placeholder-image.jpg"} 
                        alt={item.product.name} 
                        className="w-10 h-10 object-cover rounded mr-3"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-image.jpg";
                        }}
                        data-testid={`order-item-image-${item.id}`}
                      />
                      <span className="text-sm" data-testid={`order-item-name-${item.id}`}>
                        {item.product.name}
                      </span>
                      <span className="ml-2 text-sm">× {item.quantity}</span>
                    </div>
                    <span className="text-sm font-medium" data-testid={`order-item-total-${item.id}`}>
                      {(item.product.price * item.quantity / 100).toFixed(2)}৳
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2" data-testid="summary-subtotal">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">{(subtotal / 100).toFixed(2)}৳</span>
                </div>
                
                <div className="flex justify-between mb-4 font-medium" data-testid="summary-total">
                  <span>Total</span>
                  <span>{(total / 100).toFixed(2)}৳</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2" data-testid="payment-method-title">Cash on delivery</h4>
                <p className="text-sm text-gray-600" data-testid="payment-method-description">
                  Pay with cash upon delivery.
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mb-6" data-testid="privacy-notice">
                Your personal data will be used to process your order, support your experience 
                throughout this website, and for other purposes described in our privacy policy.
              </p>

              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="w-full text-white text-sm font-medium py-3"
                style={{ backgroundColor: '#8B4513' }}
                disabled={createOrderMutation.isPending}
                data-testid="place-order-btn"
              >
                <Lock className="h-4 w-4 mr-2" />
                {createOrderMutation.isPending ? "Processing..." : `Order Now ${(total / 100).toFixed(2)}৳`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
