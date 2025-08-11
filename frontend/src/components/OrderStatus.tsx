import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

interface OrderStatusProps {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  orderId: string;
}

const OrderStatus = ({ status, orderId }: OrderStatusProps) => {
  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const currentIndex = statuses.findIndex(s => s.key === status);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Order #{orderId}</h3>
        <Badge variant={status === 'delivered' ? 'default' : 'secondary'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
      
      <div className="space-y-3">
        {statuses.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`${isCurrent ? 'font-semibold' : ''} ${
                isCompleted ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;