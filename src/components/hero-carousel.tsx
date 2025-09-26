import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  product: any;
}

const carouselItems: CarouselItem[] = [
  {
    id: "1",
    title: "গরুর মাংসের আচার",
    description: "আমাদের গরুর মাংসের আচারের প্রতিটি চামচে মেখে আছে মমতার ঘ্রাণ, দাদি-নানীর রান্নাঘরের স্মৃতি।",
    price: 99000,
    image: "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    product: null, // Will be populated when products are loaded
  },
  {
    id: "2", 
    title: "রসুনের আচার",
    description: "ছেলেবেলার সেই চেনা ঘ্রাণ আর মা-নানী-দাদির কোলাহলপূর্ণ সেই দুপুরগুলোর কথা মনে করিয়ে দেবে।",
    price: 59000,
    image: "https://pixabay.com/get/g2870d61b810f073967b924b6077543545fd9c6a762361bde9bf51b8e95a88c6b908a459d9307c5332902966199c80731bc27e17800bf29416a90b9c91f0dca1b_1280.jpg",
    product: null,
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return `৳${(price / 100).toFixed(2)}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = async (item: CarouselItem) => {
    // Create a temporary product object for carousel items
    const tempProduct = {
      id: item.id,
      name: item.title,
      nameEn: item.title,
      description: item.description,
      descriptionEn: item.description,
      price: item.price,
      image: item.image,
      category: "আচার",
      categoryEn: "Pickle",
      stock: 50,
      weight: "৪০০ গ্রাম",
      shelfLife: "৪-৬ মাস",
      ingredients: "প্রাকৃতিক উপাদান ও মশলা",
      isActive: true,
      createdAt: new Date(),
    };

    await addItem(tempProduct);
    toast({
      title: "Added to Cart",
      description: `${item.title} has been added to your cart.`,
    });
  };

  return (
    <div className="relative max-w-5xl mx-auto" data-testid="hero-carousel">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div key={item.id} className="w-full flex-shrink-0" data-testid={`carousel-slide-${index}`}>
              <div className="grid md:grid-cols-2 gap-8 items-center bg-card p-8 rounded-2xl">
                <div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                    data-testid={`carousel-image-${index}`}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-4" data-testid={`carousel-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" data-testid={`carousel-description-${index}`}>
                    {item.description}
                  </p>
                  <div className="text-2xl font-bold text-primary mb-4" data-testid={`carousel-price-${index}`}>
                    {formatPrice(item.price)}
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleAddToCart(item)}
                    data-testid={`carousel-add-to-cart-${index}`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        onClick={prevSlide}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        onClick={nextSlide}
        data-testid="carousel-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      {/* Carousel indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentSlide(index)}
            data-testid={`carousel-indicator-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
