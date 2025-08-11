import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api, type Product } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OrderModal = ({ product, isOpen, onClose, onSuccess }: OrderModalProps) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setIsSubmitting(true);
    try {
      await api.createOrder({
        ...formData,
        product_id: product.id
      });
      
      toast({
        title: "Order Placed!",
        description: "We'll contact you shortly to arrange delivery.",
      });
      
      onSuccess();
      onClose();
      setFormData({ customer_name: "", customer_email: "", customer_phone: "", quantity: 1 });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  const total = product.price * formData.quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-quantum-card border-quantum-border">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-foreground">
            Order {product.brand} {product.model}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={formData.customer_name}
                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                required
                className="bg-background border-quantum-border"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                required
                className="bg-background border-quantum-border"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.customer_phone}
                onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                required
                className="bg-background border-quantum-border"
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                min="1"
                max={product.stock}
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
                className="bg-background border-quantum-border"
              />
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border border-quantum-border">
            <div className="flex justify-between items-center">
              <span className="font-exo">Total:</span>
              <span className="font-orbitron font-bold text-xl text-primary">
                KSh {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="quantum" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Place Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;