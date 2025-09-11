import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+8801234567890"; // Replace with actual WhatsApp number
    const message = "Hi, I'm interested in your pickle products!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsPopupOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" data-testid="whatsapp-container">
      <div className="relative">
        {/* WhatsApp Chat Popup */}
        {isPopupOpen && (
          <div className="absolute bottom-16 right-0 bg-card rounded-2xl shadow-xl w-80 p-6" data-testid="whatsapp-popup">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-green-600">Achare Paka</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPopupOpen(false)}
                data-testid="close-whatsapp-popup"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-sm">Hi 👋, welcome to <strong>Achare Paka</strong></p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <p className="text-sm">How can we help you?</p>
              </div>
            </div>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handleWhatsAppClick}
              data-testid="whatsapp-open-chat"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Open Chat
            </Button>
          </div>
        )}

        {/* WhatsApp Button */}
        <Button
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110"
          onClick={() => setIsPopupOpen(!isPopupOpen)}
          data-testid="whatsapp-button"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
