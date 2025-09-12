import { Link } from "wouter";
import { Search, User, ShoppingCart, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { useMobileMenuStore } from "@/lib/mobile-menu-store";
import { useWishlistStore } from "@/hooks/use-wishlist";

export default function Navbar() {
  const { toggleCart, getItemCount } = useCartStore();
  const { toggleLogin } = useAuthStore();
  const { openMenu } = useMobileMenuStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const itemCount = getItemCount();
  const wishlistItemCount = wishlistItems.length;

  return (
    <>
      <nav className="bg-card shadow-sm sticky top-0 z-50" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={openMenu}
              data-testid="mobile-menu-btn"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            {/* Logo */}
            <Link href="/" data-testid="logo-link">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-lg font-bold">
                  আচারে পাকা
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors" data-testid="nav-home">
                Home
              </Link>
              <Link href="/shop" className="text-foreground hover:text-primary transition-colors" data-testid="nav-shop">
                Shop
              </Link>
              <a href="#about" className="text-foreground hover:text-primary transition-colors" data-testid="nav-about">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors" data-testid="nav-contact">Contact</a>
            </div>
            
            {/* Right side actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" data-testid="search-btn">
                <Search className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLogin}
                data-testid="login-btn"
              >
                <User className="h-5 w-5" />
              </Button>

              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  data-testid="wishlist-btn"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="wishlist-count">
                      {wishlistItemCount}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCart}
                className="relative"
                data-testid="cart-btn"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center" data-testid="cart-count">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
