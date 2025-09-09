import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => {
    const whatsappUrl = 'https://wa.me/8801322224332?text=হ্যালো, আমি আচারে পাকা থেকে আচার কিনতে চাই।';
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <SiWhatsapp className="h-6 w-6 mr-2" />
              <span className="font-semibold">Achare Paka</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-green-600"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-whatsapp-widget"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="p-4 bg-green-50 min-h-[200px] flex flex-col justify-end space-y-3">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">👋</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[220px]">
                <p className="text-sm text-gray-800">Hi 👋, welcome to <strong>Achare Paka</strong></p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <SiWhatsapp className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[220px]">
                <p className="text-sm text-gray-800">How can we help you?</p>
              </div>
            </div>
          </div>

          {/* Open Chat Button */}
          <div className="p-4 bg-white border-t border-border">
            <Button
              onClick={handleOpenChat}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3 font-medium"
              data-testid="button-open-whatsapp-chat"
            >
              <SiWhatsapp className="mr-2 h-4 w-4" />
              Open Chat
            </Button>
          </div>
        </div>
      )}

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          size="icon"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg w-14 h-14"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-whatsapp"
        >
          <SiWhatsapp className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}