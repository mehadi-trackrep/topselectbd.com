import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  const handleAddToCart = async () => {
    await addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isInStock = product.stock > 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300" data-testid={`product-card-${product.id}`}>
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
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="outline" size="sm" data-testid={`product-wishlist-${product.id}`}>
              <Heart className="h-4 w-4" />
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
          
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-bold text-primary" data-testid={`product-price-${product.id}`}>
              {formatPrice(product.price)}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" data-testid={`product-quick-view-${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Button>
              <Button 
                onClick={handleAddToCart}
                disabled={!isInStock}
                data-testid={`product-add-to-cart-${product.id}`}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
