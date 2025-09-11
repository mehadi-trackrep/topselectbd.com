import { Leaf, Home as HomeIcon, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import HeroCarousel from "@/components/hero-carousel";
import ProductCard from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-gradient py-20 overflow-hidden relative" data-testid="hero-section">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 floating-element">
          <div className="w-8 h-8 bg-secondary/20 rounded-full"></div>
        </div>
        <div className="absolute top-20 right-20 floating-element" style={{animationDelay: '1s'}}>
          <div className="w-6 h-6 bg-accent/30 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6" data-testid="hero-title">
              গরুর মাংসের আচার
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto" data-testid="hero-subtitle">
              আচারের প্রতিটি চামচে মেখে আছে মমতার ঘ্রাণ
            </p>
            <Link href="/shop">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105" data-testid="hero-shop-now">
                Shop Now
              </Button>
            </Link>
          </div>
          
          {/* Featured Products Carousel */}
          <HeroCarousel />
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-card" data-testid="product-showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="showcase-title">
              বিলাসবহুল আচারের সম্ভার
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="showcase-subtitle">
              এক ক্লিকে বেছে নিন আপনার পছন্দের আচার
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-2xl shadow-sm p-6 animate-pulse" data-testid={`product-skeleton-${i}`}>
                  <div className="bg-muted h-48 rounded-xl mb-4"></div>
                  <div className="bg-muted h-4 rounded mb-2"></div>
                  <div className="bg-muted h-6 rounded mb-4"></div>
                  <div className="bg-muted h-8 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted" data-testid="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="why-choose-title">
              কেন আচারে পাকা?
            </h2>
            <p className="text-muted-foreground text-lg" data-testid="why-choose-subtitle">
              প্রতিটি বৈয়মে আছে স্বাদ, কোয়ালিটি ও মমতার নিখুঁত ভারসাম্য
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="feature-1">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">সেরা উপাদানে তৈরি</h3>
              <p className="text-muted-foreground">প্রতিটি উপাদান সতর্কভাবে বাছাই করা হয়, যাতে স্বাদ ও গুণমান অটুট থাকে।</p>
            </div>
            
            <div className="text-center" data-testid="feature-2">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="text-2xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ঘরে তৈরি শুদ্ধতম স্বাদ</h3>
              <p className="text-muted-foreground">পারিবারিক রান্নাঘরে তৈরি। প্রতিটি বোতলে লেগে থাকে মায়ের হাতের সেই ঘ্রাণ।</p>
            </div>
            
            <div className="text-center" data-testid="feature-3">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">নিরাপদ প্রিমিয়াম প্যাকেজিং</h3>
              <p className="text-muted-foreground">আধুনিক প্রযুক্তিতে হাইজেনিক পরিবেশে প্রতিটি বৈয়ম প্রিমিয়াম ভাবে প্যাক করা।</p>
            </div>
            
            <div className="text-center" data-testid="feature-4">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">আচারের চেয়েও বেশি কিছু</h3>
              <p className="text-muted-foreground">শুধুই আচার নয়, বরং একটু স্মৃতি, একটু মমতা, একটুকরো শৈশব।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-lg font-bold mb-4 inline-block">
                আচারে পাকা
              </div>
              <p className="text-background/80 mb-4">Premium Bengali pickles made with love and traditional recipes.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="social-facebook">
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="social-instagram">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="social-whatsapp">
                  <i className="fab fa-whatsapp text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/"><a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-home">Home</a></Link>
                <Link href="/shop"><a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-shop">Shop</a></Link>
                <a href="#about" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-about">About Us</a>
                <a href="#contact" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-contact">Contact</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Products</h3>
              <div className="space-y-2">
                <a href="/shop?category=আচার" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-beef-pickle">গরুর মাংসের আচার</a>
                <a href="/shop?category=আচার" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-garlic-pickle">রসুনের আচার</a>
                <a href="/shop?category=আচার" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-mixed-pickle">মিশ্র আচার</a>
                <a href="/shop?category=আচার" className="block text-background/80 hover:text-background transition-colors" data-testid="footer-chili-pickle">মরিচের আচার</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                  <span className="text-background/80" data-testid="footer-address">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone mr-3 text-primary"></i>
                  <span className="text-background/80" data-testid="footer-phone">+880 1234-567890</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-primary"></i>
                  <span className="text-background/80" data-testid="footer-email">info@acharepaka.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="border-background/20 my-8" />
          <div className="text-center text-background/60" data-testid="footer-copyright">
            <p>&copy; 2024 Achare Paka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
