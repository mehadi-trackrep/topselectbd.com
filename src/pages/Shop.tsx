import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all-categories");
  const [priceFilter, setPriceFilter] = useState("all-prices");
  const [stockFilter, setStockFilter] = useState("all-stock");

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !categoryFilter || categoryFilter === "all-categories" || product.category === categoryFilter || product.categoryEn === categoryFilter;
    
    const matchesPrice = !priceFilter || priceFilter === "all-prices" || (() => {
      const price = (typeof product.price === 'string' ? parseInt(product.price) : product.price) / 100;
      switch (priceFilter) {
        case "500-600":
          return price >= 500 && price <= 600;
        case "600-800":
          return price >= 600 && price <= 800;
        case "800-1000":
          return price >= 800 && price <= 1000;
        default:
          return true;
      }
    })();

    const matchesStock = !stockFilter || stockFilter === "all-stock" || 
                        (stockFilter === "in-stock" && (typeof product.stock === 'string' ? parseInt(product.stock) : product.stock) > 0) ||
                        (stockFilter === "out-of-stock" && (typeof product.stock === 'string' ? parseInt(product.stock) : product.stock) === 0);

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <p className="text-red-500">Error loading products: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8" data-testid="shop-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="shop-title">Our Shop</h1>
          <p className="text-muted-foreground text-lg" data-testid="shop-subtitle">
            Browse our complete collection of premium pickles
          </p>
        </div>
        
        {/* Search and Filters */}
        <Card className="mb-8" data-testid="search-filters">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="search-input"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-48" data-testid="price-filter">
                    <SelectValue placeholder="Filter by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-prices">All Prices</SelectItem>
                    <SelectItem value="500-600">৫০০৳ - ৬০০৳</SelectItem>
                    <SelectItem value="600-800">৬০০৳ - ৮০০৳</SelectItem>
                    <SelectItem value="800-1000">৮০০৳ - ১০০০৳</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={stockFilter} onValueChange={setStockFilter}>
                  <SelectTrigger className="w-40" data-testid="stock-filter">
                    <SelectValue placeholder="Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-stock">All Stock</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40" data-testid="category-filter">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="আচার">Pickle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Products Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-loading">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-card rounded-xl shadow-sm p-4 animate-pulse" data-testid={`product-skeleton-${i}`}>
                <div className="bg-muted h-40 rounded-lg mb-3"></div>
                <div className="bg-muted h-4 rounded mb-1"></div>
                <div className="bg-muted h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16" data-testid="no-products">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}