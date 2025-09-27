import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/shared/schema";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [stockFilter, setStockFilter] = useState("");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      
      // Extract unique categories for the step-by-step selection
      const categories = Array.from(new Set(result.map((p: Product) => p.category || p.categoryEn))) as string[];
      setAllCategories(categories);
      
      return result;
    },
  });

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !categoryFilter || categoryFilter === "" || product.category === categoryFilter || product.categoryEn === categoryFilter;
    
    const price = (typeof product.price === 'string' ? parseInt(product.price) : product.price) / 100;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    const productStock = typeof product.stock === 'string' ? parseInt(product.stock) : product.stock;
    const matchesStock = !stockFilter || stockFilter === "" || 
                        (stockFilter === "in-stock" && productStock > 0) ||
                        (stockFilter === "out-of-stock" && productStock === 0);

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
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                    data-testid="search-input"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-muted-foreground">{priceRange[0]}৳ - {priceRange[1]}৳</span>
                </div>
                <Slider
                  min={0}
                  max={2000}
                  step={10}
                  value={priceRange}
                  onValueChange={(value: [number, number]) => setPriceRange(value)}
                  className="w-full"
                  data-testid="price-slider"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>৳0</span>
                  <span>৳2000</span>
                </div>
              </div>
              
              {/* Stock Filter */}
              <div className="space-y-3">
                <h3 className="font-medium">Stock Status</h3>
                <RadioGroup 
                  value={stockFilter} 
                  onValueChange={setStockFilter}
                  className="flex flex-wrap gap-4"
                  data-testid="stock-radio-group"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all-stock" data-testid="all-stock-radio" />
                    <Label htmlFor="all-stock">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-stock" id="in-stock" data-testid="in-stock-radio" />
                    <Label htmlFor="in-stock">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="out-of-stock" id="out-of-stock" data-testid="out-of-stock-radio" />
                    <Label htmlFor="out-of-stock">Out of Stock</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Category Filter - Step by step selection */}
              <div className="space-y-3">
                <h3 className="font-medium">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      categoryFilter === "" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    onClick={() => setCategoryFilter("")}
                    data-testid="all-categories-btn"
                  >
                    All Categories
                  </button>
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        categoryFilter === category 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                      onClick={() => setCategoryFilter(category)}
                      data-testid={`category-btn-${category}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
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