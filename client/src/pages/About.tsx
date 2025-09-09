import Navigation from "@/components/Navigation";
import CartSidebar from "@/components/CartSidebar";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              আমাদের সম্পর্কে
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ঐতিহ্যবাহী বাংলা আচারের স্বাদে আপনাদের স্বাগতম। আচারে পাকা - যেখানে প্রতিটি চামচে লুকিয়ে আছে মায়ের হাতের মমতা।
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                আমাদের গল্প
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                ১৯৮৫ সাল থেকে আমরা ঐতিহ্যবাহী বাংলা আচার তৈরি করে আসছি। শুরুটা হয়েছিল একটি ছোট পারিবারিক রান্নাঘর থেকে, যেখানে দাদিমা তার গোপন রেসিপি দিয়ে আচার বানাতেন।
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                আজ আমরা বাংলাদেশের অন্যতম নির্ভরযোগ্য আচার ব্র্যান্ড। আমাদের প্রতিটি পণ্যে আছে ঐতিহ্যের ছোঁয়া এবং আধুনিক মানের নিশ্চয়তা।
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="আমাদের রান্নাঘর" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">আমাদের মূল্যবোধ</h2>
            <p className="text-muted-foreground">যে নীতিমালা আমাদের পথ দেখায়</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ১
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">গুণমান</h3>
              <p className="text-muted-foreground">প্রতিটি উপাদান যত্ন সহকারে নির্বাচিত এবং প্রিমিয়াম মানের।</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ২
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">ঐতিহ্য</h3>
              <p className="text-muted-foreground">পুরাতন রেসিপি এবং ঐতিহ্যবাহী পদ্ধতি অনুসরণ।</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                ৩
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">বিশ্বস্ততা</h3>
              <p className="text-muted-foreground">গ্রাহক সন্তুষ্টি এবং নির্ভরযোগ্য সেবা আমাদের অগ্রাধিকার।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">আমাদের টিম</h2>
            <p className="text-muted-foreground">যারা আপনার জন্য প্রতিদিন কাজ করে যাচ্ছেন</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "রশিদ আহমেদ",
                role: "প্রতিষ্ঠাতা ও সিইও",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "ফাতেমা খাতুন",
                role: "প্রোডাকশন ম্যানেজার",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              },
              {
                name: "করিম উল্লাহ",
                role: "কোয়ালিটি কন্ট্রোল",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
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