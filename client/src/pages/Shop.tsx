import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import type { Product } from "@shared/schema";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter((product) => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Price filter
      let matchesPrice = true;
      const price = parseFloat(product.price);
      if (priceRange === "0-500") matchesPrice = price <= 500;
      else if (priceRange === "500-1000") matchesPrice = price > 500 && price <= 1000;
      else if (priceRange === "1000+") matchesPrice = price > 1000;

      // Stock filter
      let matchesStock = true;
      if (stockFilter === "in-stock") matchesStock = product.inStock === true;
      else if (stockFilter === "out-of-stock") matchesStock = product.inStock === false;

      return matchesSearch && matchesPrice && matchesStock;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, sortBy, priceRange, stockFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              আমাদের পণ্যসমূহ
            </h1>
            <p className="text-lg text-muted-foreground">
              বাছাই করুন আপনার পছন্দের ঐতিহ্যবাহী আচার
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                ফিল্টার
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">অনুসন্ধান</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="পণ্য খুঁজুন..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-product-search"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              {/* Price Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">দাম অনুযায়ী</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger data-testid="select-price-range">
                      <SelectValue placeholder="দাম নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব দাম</SelectItem>
                      <SelectItem value="0-500">০ - ৫০০৳</SelectItem>
                      <SelectItem value="500-1000">৫০০ - ১০০০৳</SelectItem>
                      <SelectItem value="1000+">১০০০৳+</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Stock Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">স্টক অবস্থা</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={stockFilter} onValueChange={setStockFilter}>
                    <SelectTrigger data-testid="select-stock-filter">
                      <SelectValue placeholder="স্টক নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব পণ্য</SelectItem>
                      <SelectItem value="in-stock">স্টকে আছে</SelectItem>
                      <SelectItem value="out-of-stock">স্টকে নেই</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-muted-foreground">
                {filteredProducts.length} টি পণ্য পাওয়া গেছে
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="select-sort-by">
                  <SelectValue placeholder="সাজান" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">নাম অনুযায়ী</SelectItem>
                  <SelectItem value="price-low">দাম: কম থেকে বেশি</SelectItem>
                  <SelectItem value="price-high">দাম: বেশি থেকে কম</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-card rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="w-full h-64 bg-muted rounded-lg mb-4" />
                    <div className="h-6 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded mb-4" />
                    <div className="flex justify-between">
                      <div className="h-8 w-20 bg-muted rounded" />
                      <div className="h-10 w-32 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <p className="text-destructive">পণ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    কোনো পণ্য পাওয়া যায়নি
                  </h3>
                  <p className="text-muted-foreground">
                    অন্য ফিল্টার বা অনুসন্ধান শব্দ ব্যবহার করে দেখুন
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Modals */}
      <CartSidebar />
      <LoginModal />
      <RegisterModal />
      
      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}