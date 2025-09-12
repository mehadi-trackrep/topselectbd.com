import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Wishlist from "@/pages/Wishlist";
import Navbar from "@/components/navbar";
import MobileSidebar from "@/components/mobile-sidebar";
import LoginModal from "@/components/login-modal";
import CartModal from "@/components/cart-modal";
import QuickViewModal from "@/components/QuickViewModal";
import WhatsAppButton from "@/components/whatsapp-button";

function Router() {
  return (
    <>
      <Navbar />
      <MobileSidebar />
      <LoginModal />
      <CartModal />
      <QuickViewModal />
      <WhatsAppButton />
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/wishlist" component={Wishlist} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
