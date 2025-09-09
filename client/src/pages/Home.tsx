import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CartSidebar from "@/components/CartSidebar";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      {/* Featured Products */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              বিলাসবহুল আচারের সম্ভার
            </h2>
            <p className="text-muted-foreground">এক ক্লিকে বেছে নিন আপনার পছন্দের আচার</p>
          </div>

          {isLoading && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[1, 2].map((i) => (
                <div key={i} className="bg-background rounded-2xl shadow-lg p-6 animate-pulse">
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

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">পণ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
            </div>
          )}

          {products && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground">There are many variations of passages of lorem ipsum available</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "১",
                title: "সেরা উপাদানে তৈরি",
                description: "আচারে পাকার প্রতিটি উপাদান সতর্কভাবে বাছাই করা হয়, যাতে স্বাদ ও গুণমান অটুট থাকে।"
              },
              {
                step: "২",
                title: "ঘরে তৈরি শুদ্ধতম স্বাদ",
                description: "আচারে পাকার সব আচার পারিবারিক রান্নাঘরে তৈরি হয়। প্রতিটি বোতলে লেগে থাকে মায়ের হাতের সেই ঘ্রাণ।"
              },
              {
                step: "৩",
                title: "নিরাপদ প্রিমিয়াম প্যাকেজিং",
                description: "আধুনিক প্রযুক্তিতে হাইজেনিক পরিবেশে প্রতিটি বৈয়ম এমন প্রিমিয়াম ভাবে প্যাক করা হয়।"
              },
              {
                step: "৪",
                title: "আচারের চেয়েও বেশি কিছু",
                description: "এটি শুধুই আচার নয়, বরং একটু স্মৃতি, একটু মমতা, একটুকরো শৈশব এবং এক রাজকীয় অনুভূতি।"
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=500" 
                alt="ভালোবাসা আর আস্থার প্রতিটি চামচ" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                ভালোবাসা আর আস্থার প্রতিটি চামচ
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                আচারে পাকার প্রতিটি বৈয়মে আছে স্বাদ, কোয়ালিটি ও মমতার নিখুঁত ভারসাম্য। আচারে পাকা শুধুই একটি আচার নয়; এটি আপনার পরিবারের জন্য ভালোবাসার উপহার।
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">আচারের ধরণ</h4>
                  <p className="text-muted-foreground">গরুর মাংসের আচার</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">বানানোর স্থান</h4>
                  <p className="text-muted-foreground">পারিবারিক রসুইঘর</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">শেলফ্‌ লাইফ</h4>
                  <p className="text-muted-foreground">৪-৬ মাস</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">নেট ওজন</h4>
                  <p className="text-muted-foreground">৪০০ গ্রাম</p>
                </div>
              </div>
              
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                অর্ডার করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Testimonials</h2>
            <p className="text-muted-foreground">There are many variations of passages of lorem ipsum available</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "রহিম উদ্দিন",
                location: "ঢাকা",
                review: "অসাধারণ স্বাদ! মায়ের হাতের আচারের কথা মনে করিয়ে দেয়। একবার খেলে আর ভুলতে পারবেন না।",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              },
              {
                name: "সালমা খাতুন",
                location: "চট্টগ্রাম",
                review: "গুণগত মান অসাধারণ। পরিবারের সবার পছন্দের আচার। নিয়মিত অর্ডার করি।",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              },
              {
                name: "করিম মিয়া",
                location: "সিলেট",
                review: "প্রিমিয়াম কোয়ালিটি আর দাম অনেক যুক্তিযুক্ত। ডেলিভারিও দ্রুত পেয়েছি।",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name} testimonial`} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic mb-3">"{testimonial.review}"</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
