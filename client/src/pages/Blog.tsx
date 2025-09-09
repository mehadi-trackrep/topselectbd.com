import Navigation from "@/components/Navigation";
import CartSidebar from "@/components/CartSidebar";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "ঐতিহ্যবাহী আচার তৈরির গোপন কৌশল",
      excerpt: "আমাদের দাদিমাদের কাছ থেকে পাওয়া আচার তৈরির গোপন কৌশল জানুন। কীভাবে ঘরে বসে তৈরি করবেন মুখরোচক আচার।",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "২৫ ডিসেম্বর, ২০২৪",
      author: "রশিদ আহমেদ",
      category: "রেসিপি"
    },
    {
      id: 2,
      title: "আচারের স্বাস্থ্য উপকারিতা",
      excerpt: "আচার শুধু স্বাদেই নয়, স্বাস্থ্যের জন্যও অনেক উপকারী। জানুন আচারের বিভিন্ন পুষ্টিগুণ ও স্বাস্থ্য উপকারিতা।",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "২০ ডিসেম্বর, ২০২৪",
      author: "ফাতেমা খাতুন",
      category: "স্বাস্থ্য"
    },
    {
      id: 3,
      title: "বিভিন্ন ধরনের আচারের ইতিহাস",
      excerpt: "বাংলাদেশের বিভিন্ন অঞ্চলের আচারের ইতিহাস ও ঐতিহ্য। প্রতিটি অঞ্চলের আচারের নিজস্ব বৈশিষ্ট্য রয়েছে।",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১৫ ডিসেম্বর, ২০২৪",
      author: "করিম উল্লাহ",
      category: "ইতিহাস"
    },
    {
      id: 4,
      title: "গরুর মাংসের আচার: একটি রাজকীয় স্বাদ",
      excerpt: "গরুর মাংসের আচার কেন এত জনপ্রিয়? এর প্রস্তুতি প্রক্রিয়া থেকে শুরু করে পরিবেশনের সঠিক নিয়ম জানুন।",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১০ ডিসেম্বর, ২০২৪",
      author: "রশিদ আহমেদ",
      category: "রেসিপি"
    },
    {
      id: 5,
      title: "আচার সংরক্ষণের সঠিক উপায়",
      excerpt: "আচারের গুণগত মান ও স্বাদ অটুট রাখতে জানুন সঠিক সংরক্ষণের পদ্ধতি। কীভাবে দীর্ঘদিন ভালো রাখবেন আচার।",
      image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "৫ ডিসেম্বর, ২০২৪",
      author: "ফাতেমা খাতুন",
      category: "টিপস"
    },
    {
      id: 6,
      title: "মশলার গুণগত মান চেনার উপায়",
      excerpt: "ভালো আচার তৈরির জন্য প্রয়োজন ভালো মশলা। জানুন কীভাবে চিনবেন উন্নত মানের মশলা ও তার ব্যবহারের নিয়ম।",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      date: "১ ডিসেম্বর, ২০২৪",
      author: "করিম উল্লাহ",
      category: "টিপস"
    }
  ];

  const categories = ["সব", "রেসিপি", "স্বাস্থ্য", "ইতিহাস", "টিপস"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              আমাদের ব্লগ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আচার সম্পর্কে সব তথ্য, রেসিপি, টিপস এবং ইতিহাস জানুন আমাদের ব্লগে
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "সব" ? "default" : "outline"}
              className="rounded-full"
              data-testid={`button-category-${category}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    বৈশিষ্ট্যযুক্ত
                  </span>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {blogPosts[0].date}
                  <User className="h-4 w-4 ml-4 mr-2" />
                  {blogPosts[0].author}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {blogPosts[0].excerpt}
                </p>
                <Button className="w-fit" data-testid="button-read-featured">
                  আরও পড়ুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  {post.date}
                  <User className="h-3 w-3 ml-3 mr-1" />
                  {post.author}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="outline" size="sm" data-testid={`button-read-${post.id}`}>
                  আরও পড়ুন
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-8" data-testid="button-load-more">
            আরও পোস্ট লোড করুন
          </Button>
        </div>
      </div>

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