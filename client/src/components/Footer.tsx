import { Facebook, Linkedin, Instagram, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-card py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold text-lg mb-4 inline-block">
              আচারের পাকা
            </div>
            <p className="text-card/80 text-sm mb-4">
              বাংলাদেশের সেরা ঐতিহ্যবাহী আচার প্রস্তুতকারক। ঘরোয়া স্বাদে তৈরি প্রিমিয়াম কোয়ালিটির আচার।
            </p>
            <div className="flex space-x-3">
              <Button
                size="icon"
                variant="ghost"
                className="text-card/60 hover:text-card"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-card/60 hover:text-card"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-card/60 hover:text-card"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-card font-semibold mb-4">যোগাযোগের তথ্য</h4>
            <div className="space-y-3 text-sm text-card/80">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-3 text-primary" />
                <div>
                  ৫০ পূর্ব ৫২তম স্ট্রিট<br />
                  ব্রুকলিন, NY ১০০২২<br />
                  যুক্তরাষ্ট্র
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary" />
                <div>+১৩২২২২৪৩৩২</div>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary" />
                <div>info@acharepaka.com</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-card font-semibold mb-4">দ্রুত লিংক</h4>
            <div className="space-y-2 text-sm text-card/80">
              <a href="#" className="block hover:text-card transition-colors" data-testid="link-footer-home">হোম</a>
              <a href="#" className="block hover:text-card transition-colors" data-testid="link-footer-shop">শপ</a>
              <a href="#" className="block hover:text-card transition-colors" data-testid="link-footer-about">আমাদের সম্পর্কে</a>
              <a href="#" className="block hover:text-card transition-colors" data-testid="link-footer-contact">যোগাযোগ</a>
              <a href="#" className="block hover:text-card transition-colors" data-testid="link-footer-blog">ব্লগ</a>
            </div>
          </div>

          <div>
            <h4 className="text-card font-semibold mb-4">আমাদের সাথে যুক্ত থাকুন</h4>
            <p className="text-sm text-card/80 mb-4">
              নতুন পণ্য ও অফারের আপডেট পেতে সাবস্ক্রাইব করুন
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="আপনার ইমেইল"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-card/10 border-card/20 text-card placeholder-card/50 rounded-r-none"
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 rounded-l-none"
                data-testid="button-newsletter-subscribe"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-card/20 pt-8 text-center">
          <p className="text-sm text-card/60">© ২০২৪ আচারে পাকা। সকল অধিকার সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
