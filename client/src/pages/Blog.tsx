import Navbar from "@/components/navbar";
import CartModal from "@/components/cart-modal";
import LoginModal from "@/components/login-modal";
import WhatsAppButton from "@/components/whatsapp-button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "ঐতিহ্যবাহী আচার তৈরির গোপন কৌশল",
      excerpt: "আমাদের দাদিমাদের কাছ থেকে পাওয়া আচার তৈরির গোপন কৌশল জানুন। কীভাবে ঘরে বসে তৈরি করবেন মুখরোচক আচার।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১৫ সেপ্টেম্বর, ২০২৪",
      author: "রশিদ আহমেদ"
    },
    {
      id: 2,
      title: "১০ ধরনের সবচেয়ে জনপ্রিয় আচার",
      excerpt: "বাংলাদেশের ১০টি সবচেয়ে জনপ্রিয় আচারের তালিকা এবং তাদের স্বাদের বৈচিত্র্য। আপনার প্রিয় আচার কোনটি?",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১২ সেপ্টেম্বর, ২০২৪",
      author: "ফাতেমা খাতুন"
    },
    {
      id: 3,
      title: "আচারের সঠিক সংরক্ষণ পদ্ধতি",
      excerpt: "আচারের মান বজায় রাখতে সঠিক সংরক্ষণ পদ্ধতি খুবই গুরুত্বপূর্ণ। জানুন কীভাবে সঠিকভাবে আচার সংরক্ষণ করবেন।",
      image: "https://images.unsplash.com/photo-1556909114-3a55236d8396?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১০ সেপ্টেম্বর, ২০২৪",
      author: "করিম উল্লাহ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              ব্লগ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আচার সম্পর্কে জ্ঞান, নতুন রেসিপি, এবং আমাদের কারখানার আন্তরিক গল্প
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{post.date}</span>
                    <User className="h-4 w-4 mr-2 ml-4" />
                    <span>{post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="group">
                    পড়ুন <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">আমাদের ব্লগে সাবস্ক্রাইব করুন</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
            নতুন পোস্ট পেতে আমাদের ব্লগে সাবস্ক্রাইব করুন এবং আমাদের সাথে থাকুন
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="flex-1 px-4 py-2 text-foreground rounded-l-lg focus:outline-none"
            />
            <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-r-lg hover:bg-secondary/90 transition-colors">
              সাবস্ক্রাইব
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CartModal />
      <LoginModal />
      
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
}