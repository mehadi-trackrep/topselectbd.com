import { useState } from "react";
import { X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/hooks/useCart";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("dhaka");
  
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const shippingCost = shipping === "dhaka" ? 70 : 130;
  const total = getTotalPrice() + shippingCost;

  const orderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      clearCart();
      onClose();
      toast({
        title: "অর্ডার সফল",
        description: "আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
      });
    },
    onError: () => {
      toast({
        title: "অর্ডার ব্যর্থ",
        description: "অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      orderData: {
        customerName,
        customerPhone: phoneNumber,
        customerAddress: address,
        shippingCost: shippingCost.toString(),
        total: total.toString(),
      },
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price.toString(),
      }))
    };

    orderMutation.mutate(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        data-testid="checkout-overlay"
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-background rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">অর্ডারের বিবরণ</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                data-testid="button-close-checkout"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">আপনার কাস্টমার বিবরণ দিন</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      আপনার নাম *
                    </Label>
                    <Input
                      type="text"
                      placeholder="আপনার নাম"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="mt-2"
                      data-testid="input-customer-name"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      আপনার ফোন নাম্বার *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="mt-2"
                      data-testid="input-phone-number"
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      আপনার সম্পূর্ণ ঠিকানা *
                    </Label>
                    <Textarea
                      placeholder="আপনার সম্পূর্ণ ঠিকানা"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={3}
                      className="mt-2"
                      data-testid="textarea-address"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium text-foreground mb-3">শিপিং</h4>
                    <RadioGroup value={shipping} onValueChange={setShipping} data-testid="radio-group-shipping">
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dhaka" id="dhaka" />
                          <Label htmlFor="dhaka">ঢাকার ভিতরে:</Label>
                        </div>
                        <span className="font-medium">৭০.০০৳</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outside" id="outside" />
                          <Label htmlFor="outside">ঢাকার বাহিরে:</Label>
                        </div>
                        <span className="font-medium">১৩০.০০৳</span>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                    disabled={orderMutation.isPending}
                    data-testid="button-place-order"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {orderMutation.isPending ? "অর্ডার হচ্ছে..." : `অর্ডার করুন ${total.toFixed(2)}৳`}
                  </Button>
                </form>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-card rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Your order</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Product</span>
                      <span className="text-muted-foreground">Subtotal</span>
                    </div>
                    
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between"
                          data-testid={`checkout-item-${item.id}`}
                        >
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-10 h-10 object-cover rounded mr-3"
                            />
                            <span className="text-sm">{item.name} × {item.quantity}</span>
                          </div>
                          <span className="font-medium">{(item.price * item.quantity).toFixed(2)}৳</span>
                        </div>
                      ))}
                    </div>
                    
                    <hr className="border-border" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Subtotal</span>
                      <span className="text-foreground" data-testid="text-checkout-subtotal">
                        {getTotalPrice().toFixed(2)}৳
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Shipping</span>
                      <span className="text-foreground" data-testid="text-shipping-cost">
                        {shippingCost.toFixed(2)}৳
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary" data-testid="text-checkout-total">
                        {total.toFixed(2)}৳
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                      <input 
                        type="radio" 
                        id="cashOnDelivery" 
                        name="payment" 
                        value="cod" 
                        defaultChecked 
                        className="mr-3"
                        data-testid="radio-payment-cod"
                      />
                      <Label htmlFor="cashOnDelivery" className="font-medium text-foreground">
                        Cash on delivery
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">
                      Pay with cash upon delivery.
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-6">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
