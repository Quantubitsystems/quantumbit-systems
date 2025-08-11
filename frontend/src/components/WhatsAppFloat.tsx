import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = config.business.whatsapp.replace(/[^\d+]/g, '');
    const message = "Hi! I'm interested in QuantumBit Systems services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, '_blank');
    
    if (!newWindow) {
      // Fallback if popup is blocked
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;