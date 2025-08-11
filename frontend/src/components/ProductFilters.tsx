import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Filter, X, Loader2 } from 'lucide-react';

import { Product, FilterState } from '@/lib/types';

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  products: Product[];
}

const ProductFilters = ({ onFiltersChange, products }: ProductFiltersProps) => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    priceRange: [0, 50000],
    inStock: false
  });
  const [isApplying, setIsApplying] = useState(false);

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const maxPrice = Math.max(...products.map(p => p.price));

  const updateFilters = async (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    setIsApplying(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    onFiltersChange(updated);
    setIsApplying(false);
  };

  const clearFilters = () => {
    const cleared = { category: '', brand: '', priceRange: [0, maxPrice], inStock: false };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  return (
    <Card className="bg-quantum-card border-quantum-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {isApplying ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : (
            <Filter className="w-4 h-4" />
          )}
          <h3 className="font-orbitron font-bold">Filters</h3>
          {isApplying && (
            <Badge variant="secondary" className="text-xs animate-pulse">
              Applying...
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters} disabled={isApplying}>
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-semibold mb-3">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={filters.category === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => updateFilters({ 
                  category: filters.category === category ? '' : category 
                })}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="font-semibold mb-3">Brand</h4>
          <div className="flex flex-wrap gap-2">
            {brands.map(brand => (
              <Badge
                key={brand}
                variant={filters.brand === brand ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => updateFilters({ 
                  brand: filters.brand === brand ? '' : brand 
                })}
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-semibold mb-3">
            Price Range: KSh {filters.priceRange[0].toLocaleString()} - KSh {filters.priceRange[1].toLocaleString()}
          </h4>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value })}
            max={maxPrice}
            step={1000}
            className="w-full"
          />
        </div>

        {/* Stock Filter */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilters({ inStock: e.target.checked })}
              className="rounded"
            />
            <span className="font-exo">In Stock Only</span>
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ProductFilters;