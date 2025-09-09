import { Button } from "@/components/ui/button";
import { ShoppingCart, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-background hero-pattern py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* Floating spice illustration */}
            <div className="absolute top-10 left-10 animate-float hidden lg:block">
              <div className="w-8 h-8 bg-accent rounded-full opacity-30"></div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="gradient-text">গরুর মাংসের</span><br />
              আচার
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
              আচারের প্রতিটি চামচে মেখে আছে মমতার ঘ্রাণ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                data-testid="button-hero-buy-now"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                এখনই কিনুন
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-3"
                data-testid="button-hero-learn-more"
              >
                <Play className="mr-2 h-4 w-4" />
                আরও জানুন
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* Main product image */}
            <div className="relative mx-auto max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                alt="গরুর মাংসের আচার জার" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  ৯৯০৳
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  ৪০০ গ্রাম
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
