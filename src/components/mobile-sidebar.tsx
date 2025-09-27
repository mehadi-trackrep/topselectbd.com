import { Link } from "wouter";
import { X, Search, Heart, GitCompare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMobileMenuStore } from "@/lib/mobile-menu-store";
import { useState } from "react";

export default function MobileSidebar() {
  const { isOpen, closeMenu } = useMobileMenuStore();
  const [activeTab, setActiveTab] = useState("menu");

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 md:hidden">
        <div className="flex">
          <div className="bg-white w-80 h-full shadow-xl" data-testid="mobile-sidebar">
            {/* Header with close button */}
            <div className="flex justify-end p-4 pb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={closeMenu}
                data-testid="close-mobile-menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Bar */}
            <div className="px-4 mb-4">
              <div className="relative">
                <Input
                  placeholder="Search for products"
                  className="pl-4 pr-10 py-3 border border-gray-300"
                  data-testid="mobile-search-input"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("menu")}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "menu"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-600"
                }`}
                data-testid="menu-tab"
              >
                MENU
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "categories"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-600"
                }`}
                data-testid="categories-tab"
              >
                CATEGORIES
              </button>
            </div>

            {/* Content */}
            <div className="p-4 h-full overflow-y-auto">
              {activeTab === "menu" ? (
                <div className="space-y-0" data-testid="menu-content">
                  <Link href="/" onClick={closeMenu} className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors" data-testid="mobile-nav-home">
                    HOME
                  </Link>
                  <Link href="/shop" onClick={closeMenu} className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors" data-testid="mobile-nav-shop">
                    SHOP
                  </Link>
                  <a 
                    href="#blog" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-blog"
                  >
                    BLOG
                  </a>
                  <a 
                    href="#portfolio" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-portfolio"
                  >
                    PORTFOLIO
                  </a>
                  <Link href="/about" onClick={closeMenu} className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors" data-testid="mobile-nav-about">
                    ABOUT US
                  </Link>
                  <Link href="/contact" onClick={closeMenu} className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors" data-testid="mobile-nav-contact">
                    CONTACT US
                  </Link>
                  <a 
                    href="#wishlist" 
                    className="flex items-center py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-wishlist"
                  >
                    <Heart className="h-4 w-4 mr-3" />
                    WISHLIST
                  </a>
                  <a 
                    href="#compare" 
                    className="flex items-center py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-compare"
                  >
                    <GitCompare className="h-4 w-4 mr-3" />
                    COMPARE
                  </a>
                  <a 
                    href="#login" 
                    className="flex items-center py-4 text-gray-700 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-login"
                  >
                    <User className="h-4 w-4 mr-3" />
                    LOGIN / REGISTER
                  </a>
                </div>
              ) : (
                <div className="space-y-0" data-testid="categories-content">
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-pickle"
                  >
                    গরুর মাংসের আচার
                  </a>
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-garlic"
                  >
                    রসুনের আচার
                  </a>
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-chili"
                  >
                    মরিচের আচার
                  </a>
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-mixed"
                  >
                    মিশ্র আচার
                  </a>
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 border-b border-gray-100 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-fish"
                  >
                    মাছের আচার
                  </a>
                  <a 
                    href="/shop?category=আচার" 
                    className="block py-4 text-gray-700 hover:text-black transition-colors"
                    onClick={closeMenu}
                    data-testid="mobile-nav-category-vegetable"
                  >
                    সবজির আচার
                  </a>
                </div>
              )}
            </div>
          </div>
          <div 
            className="flex-1 bg-black/50"
            onClick={closeMenu}
            data-testid="mobile-sidebar-overlay"
          />
        </div>
      </div>
    </>
  );
}
