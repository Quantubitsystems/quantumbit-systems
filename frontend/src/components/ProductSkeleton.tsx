import { Card } from '@/components/ui/card';

const ProductSkeleton = () => {
  return (
    <Card className="bg-quantum-card border-quantum-border p-6 animate-pulse">
      <div className="w-full h-32 bg-muted rounded-lg mb-4"></div>
      <div className="h-3 bg-muted rounded mb-2 w-16"></div>
      <div className="h-4 bg-muted rounded mb-2 w-24"></div>
      <div className="h-3 bg-muted rounded mb-3 w-20"></div>
      <div className="h-3 bg-muted rounded mb-3 w-16"></div>
      <div className="h-6 bg-muted rounded mb-4 w-20"></div>
      <div className="h-8 bg-muted rounded w-full"></div>
    </Card>
  );
};

export default ProductSkeleton;