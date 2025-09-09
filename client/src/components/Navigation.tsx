import { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useAuthActions, useAuthUser } from "@/hooks/useAuth";

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();
  const { getTotalItems, openCart } = useCart();
  const { user } = useAuthUser();
  const { openLogin } = useAuthActions();

  const menuItems = [
    { name: "হোম", href: "/" },
    { name: "শপ", href: "/shop" },
    { name: "আমাদের সম্পর্কে", href: "/about" },
    { name: "যোগাযোগ", href: "/contact" },
    { name: "ব্লগ", href: "/blog" },
  ];

  return (
    <nav className="bg-card shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold text-foreground">মেনু</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    {/* Search Bar */}
                    <div className="relative mb-6">
                      <Input
                        type="text"
                        placeholder="পণ্য অনুসন্ধান করুন"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                        data-testid="input-mobile-search"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Menu Items */}
                    <nav className="space-y-2">
                      {menuItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg transition-colors ${
                            location === item.href 
                              ? "bg-primary text-primary-foreground" 
                              : "text-foreground hover:bg-muted"
                          }`}
                          data-testid={`link-mobile-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </Link>
                      ))}
                      
                      <hr className="border-border my-4" />
                      
                      <button
                        onClick={() => !user ? openLogin() : undefined}
                        className="flex items-center w-full px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                        data-testid="button-mobile-login"
                      >
                        <User className="h-4 w-4 mr-3" />
                        {user ? user.name || user.username : "লগইন / রেজিস্টার"}
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="bg-primary text-primary-foreground px-3 py-1 rounded-lg font-bold text-lg">
              আচারের<br />পাকা
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  location === item.href 
                    ? "text-primary font-medium" 
                    : "text-foreground hover:text-primary"
                }`}
                data-testid={`link-desktop-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex"
              onClick={() => !user ? openLogin() : undefined}
              data-testid="button-desktop-login"
            >
              {user ? user.name || user.username : "লগইন / রেজিস্টার"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  data-testid="text-cart-count"
                >
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
