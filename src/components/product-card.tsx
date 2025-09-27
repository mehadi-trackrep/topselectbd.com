import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/shared/schema";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useWishlistStore } from "@/hooks/use-wishlist";
import { useQuickViewStore } from "@/hooks/use-quick-view";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore();
  const { toast } = useToast();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlistStore();
  const { openModal } = useQuickViewStore();
  const [isHovered, setIsHovered] = useState(false);
  const [cartFeedback, setCartFeedback] = useState<{ show: boolean; message: string }>({ show: false, message: "" });
  const [wishlistFeedback, setWishlistFeedback] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseInt(price) : price;
    return `৳${(numericPrice / 100).toFixed(2)}`;
  };

  const handleAddToCart = async () => {
    await addToCart(product);
    setCartFeedback({ show: true, message: "Added to Cart!" });
    setTimeout(() => setCartFeedback({ show: false, message: "" }), 2000); // Hide feedback after 2 seconds
    
    // Show global toast as well for important notification
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistClick = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
      setWishlistFeedback({ show: true, message: "Removed!" });
      setTimeout(() => setWishlistFeedback({ show: false, message: "" }), 2000); // Hide feedback after 2 seconds
      
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      setWishlistFeedback({ show: true, message: "Added!" });
      setTimeout(() => setWishlistFeedback({ show: false, message: "" }), 2000); // Hide feedback after 2 seconds
      
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleQuickViewClick = () => {
    openModal(product);
  };

  const isInStock = (typeof product.stock === 'string' ? parseInt(product.stock) : product.stock) > 0;

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 relative"
      data-testid={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="relative mb-4">
          <img 
            src={product.image && product.image.trim() !== "" ? product.image : "/placeholder-image.jpg"} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-xl"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-image.jpg";
            }}
            data-testid={`product-image-${product.id}`}
          />
          <Badge 
            variant={isInStock ? "default" : "destructive"} 
            className="absolute top-2 left-2"
            data-testid={`product-stock-${product.id}`}
          >
            {isInStock ? "In Stock" : "Out of Stock"}
          </Badge>
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <Button variant="outline" size="sm" onClick={handleWishlistClick} data-testid={`product-wishlist-${product.id}`}>
                <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? 'text-red-500 fill-current' : ''}`} />
              </Button>
              {wishlistFeedback.show && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                  {wishlistFeedback.message}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 
                    border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleQuickViewClick} data-testid={`product-quick-view-${product.id}`}>
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Badge variant="secondary" data-testid={`product-category-${product.id}`}>
            {product.categoryEn}
          </Badge>
          <h3 className="text-xl font-bold" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`product-description-${product.id}`}>
            {product.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 relative">
            <span className="text-2xl font-bold text-primary" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            <div className="relative">
              <Button 
                onClick={handleAddToCart}
                disabled={!isInStock}
                data-testid={`product-add-to-cart-${product.id}`}
                className="w-32"
              >
                {isHovered ? <ShoppingCart className="h-4 w-4" /> : <span>Add to Cart</span>}
              </Button>
              {cartFeedback.show && (
                <div className="absolute -top-8 right-0 transform translate-y-[-10px] bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                  {cartFeedback.message}
                  <div className="absolute bottom-0 right-3 transform translate-y-full w-0 h-0 
                    border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}