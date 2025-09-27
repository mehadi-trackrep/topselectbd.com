import { Link } from "wouter";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-lg font-bold mb-4 inline-block">
              আচারে পাকা
            </div>
            <p className="text-background/80 mb-4">
              Premium Bengali pickles made with love and traditional recipes.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-background/60 hover:text-background transition-colors" 
                data-testid="social-facebook"
              >
                <Facebook className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-background/60 hover:text-background transition-colors" 
                data-testid="social-instagram"
              >
                <Instagram className="text-xl" />
              </a>
              <a 
                href="#" 
                className="text-background/60 hover:text-background transition-colors" 
                data-testid="social-whatsapp"
              >
                <Phone className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-home">
                  Home
                </a>
              </Link>
              <Link href="/shop">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-shop">
                  Shop
                </a>
              </Link>
              <Link href="/about">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-about">
                  About Us
                </a>
              </Link>
              <Link href="/contact">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-contact">
                  Contact
                </a>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <div className="space-y-2">
              <Link href="/shop?category=আচার">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-beef-pickle">
                  গরুর মাংসের আচার
                </a>
              </Link>
              <Link href="/shop?category=আচার">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-garlic-pickle">
                  রসুনের আচার
                </a>
              </Link>
              <Link href="/shop?category=আচার">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-mixed-pickle">
                  মিশ্র আচার
                </a>
              </Link>
              <Link href="/shop?category=আচার">
                <a className="block text-background/80 hover:text-background transition-colors" data-testid="footer-chili-pickle">
                  মরিচের আচার
                </a>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-3 text-primary" />
                <span className="text-background/80" data-testid="footer-address">
                  Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-primary" />
                <span className="text-background/80" data-testid="footer-phone">
                  +880 1234-567890
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-primary" />
                <span className="text-background/80" data-testid="footer-email">
                  info@acharepaka.com
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-background/20 my-8" />
        
        <div className="text-center text-background/60" data-testid="footer-copyright">
          <p>© 2024 Achare Paka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}