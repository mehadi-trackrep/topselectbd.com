import { useState } from "react";
import { Heart, Scale, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
    });
    
    toast({
      title: "কার্টে যোগ হয়েছে",
      description: `${product.name} আপনার কার্টে যোগ করা হয়েছে।`,
    });
    
    openCart();
  };

  return (
    <div 
      className="group bg-background rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${product.id}`}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Quick Actions */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            data-testid={`button-compare-${product.id}`}
          >
            <Scale className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            data-testid={`button-quick-view-${product.id}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2" data-testid={`text-product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm line-clamp-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
            {product.price}৳
          </div>
          <Button 
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            কার্টে যোগ করুন
          </Button>
        </div>
      </div>
    </div>
  );
}
