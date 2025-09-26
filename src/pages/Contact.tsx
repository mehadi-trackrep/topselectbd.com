import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/navbar";
import CartModal from "@/components/cart-modal";
import LoginModal from "@/components/login-modal";
import WhatsAppButton from "@/components/whatsapp-button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    toast({
      title: "বার্তা পাঠানো হয়েছে",
      description: "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    });
    
    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              যোগাযোগ করুন
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              আমাদের সাথে যোগাযোগ করুন। আপনার প্রশ্ন, মতামত বা অর্ডারের জন্য আমরা সর্বদা প্রস্তুত।
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">আমাদের বার্তা পাঠান</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  আপনার নাম *
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-contact-name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  ইমেইল ঠিকানা *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                  data-testid="input-contact-email"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  ফোন নম্বর
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                  data-testid="input-contact-phone"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-foreground">
                  কোম্পানি
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-2"
                  data-testid="input-contact-company"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  আপনার বার্তা *
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="mt-2"
                  placeholder="আপনার বার্তা লিখুন..."
                  data-testid="textarea-contact-message"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                data-testid="button-send-message"
              >
                <Send className="mr-2 h-4 w-4" />
                বার্তা পাঠান
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">যোগাযোগের তথ্য</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">আমাদের ঠিকানা</h3>
                  <p className="text-muted-foreground">
                    ৫০ পূর্ব ৫২তম স্ট্রিট<br />
                    ব্রুকলিন, NY ১০০২২<br />
                    যুক্তরাষ্ট্র
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ফোন নম্বর</h3>
                  <p className="text-muted-foreground">
                    +১৩২২২২৪৩৩২<br />
                    +৪৬৪৩৭৫৮৫৩৩
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">ইমেইল</h3>
                  <p className="text-muted-foreground">
                    info@acharepaka.com<br />
                    support@acharepaka.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">কার্যসময়</h3>
                  <p className="text-muted-foreground">
                    রবিবার - বৃহস্পতিবার: ৯:০০ - ১৮:০০<br />
                    শুক্রবার: ৯:০০ - ১৭:০০<br />
                    শনিবার: বন্ধ
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 bg-muted rounded-lg h-64 flex items-center justify-center">
              <p className="text-muted-foreground">মানচিত্র আসছে শীঘ্রই</p>
            </div>
          </div>
        </div>
      </div>

      
      {/* Modals */}
      <CartModal />
      <LoginModal />
      {/* Remove RegisterModal as it's not imported */}
      
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
}