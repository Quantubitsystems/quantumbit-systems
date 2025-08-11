import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api, type Product } from "@/lib/api";
import OrderModal from "@/components/OrderModal";
import ProductFilters from "@/components/ProductFilters";
import AdvancedSearch from "@/components/AdvancedSearch";
import Loading from "@/components/Loading";
import ProductSkeleton from "@/components/ProductSkeleton";
import { SEOHead } from "@/components/SEOHead";
import { LazyImage } from "@/components/LazyImage";
import { FilterState } from "@/lib/types";

import { ShoppingCart, Star, Package, Truck, Search, MessageCircle } from "lucide-react";


const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = products;
    
    // Apply all filters in single pass for better performance
    filtered = products.filter(product => {
      // Search filter
      if (searchTerm && !(
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }
      
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Brand filter
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      
      // Price range filter
      if (filters.priceRange && (
        product.price < filters.priceRange[0] || 
        product.price > filters.priceRange[1]
      )) {
        return false;
      }
      
      // Stock filter
      if (filters.inStock && product.stock <= 0) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProducts(filtered);
  };

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleOrderSuccess = () => {
    loadProducts(); // Refresh products to update stock
  };

  if (loading) {
    return (
      <>
        <SEOHead 
          title="Printer Supplies & Consumables | QuantumBit Systems"
          description="Original toners, inks, and printer parts from HP, Kyocera, Epson. Quality guaranteed with competitive pricing and fast delivery in Nairobi."
          keywords="toner cartridges, ink supplies, printer parts, HP toner, Kyocera toner, Epson ink, printer consumables, Nairobi"
        />
        <div className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <div className="h-6 bg-muted rounded w-48 mx-auto mb-4 animate-pulse"></div>
              <div className="h-12 bg-muted rounded w-96 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-full max-w-3xl mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="Printer Supplies & Consumables | QuantumBit Systems"
        description="Original toners, inks, and printer parts from HP, Kyocera, Epson. Quality guaranteed with competitive pricing and fast delivery in Nairobi."
        keywords="toner cartridges, ink supplies, printer parts, HP toner, Kyocera toner, Epson ink, printer consumables, Nairobi"
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Products & Consumables
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Premium Quality
            </span>
            <br />
            <span className="text-foreground">Printer Supplies</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            Original and compatible toner cartridges, ink supplies, and printer consumables 
            from trusted brands. Quality guaranteed with competitive pricing.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Package, title: "Original Quality", desc: "Authentic brand cartridges" },
            { icon: Star, title: "Best Prices", desc: "Competitive market rates" },
            { icon: Truck, title: "Fast Delivery", desc: "Quick shipping options" },
            { icon: ShoppingCart, title: "Easy Ordering", desc: "Simple purchase process" }
          ].map((feature, index) => (
            <Card key={index} className="bg-quantum-card border-quantum-border p-6 text-center hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground font-exo text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>

        {/* Advanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <h3 className="text-lg font-orbitron font-bold text-center mb-4 text-foreground">
            Search Products
          </h3>
          <AdvancedSearch 
            onSearch={(query) => setSearchTerm(query)}
            products={products}
            placeholder="Search by brand, model, or category (e.g., HP, CF217A, toner)..."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters onFiltersChange={handleFiltersChange} products={products} />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="bg-quantum-card border border-quantum-border rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-quantum rounded-xl flex items-center justify-center">
                <span className="text-white font-orbitron font-bold text-sm">ALL</span>
              </div>
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-foreground">
                  Available Products
                </h2>
                <p className="text-muted-foreground font-exo">
                  All products currently in stock and available for order
                </p>
              </div>
            </div>
          </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-background border-quantum-border p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-full h-32 bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {product.image_url ? (
                      <LazyImage 
                        src={product.image_url} 
                        alt={product.model}
                        className="w-full h-full"
                      />
                    ) : null}
                    <Package className={`w-12 h-12 text-muted-foreground ${product.image_url ? 'hidden' : ''}`} />
                  </div>
                  
                  <div className="text-xs text-primary font-exo mb-1">{product.brand}</div>
                  <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground">
                    {product.model}
                  </h3>
                  
                  <Badge variant="secondary" className="mb-3 capitalize">
                    {product.category}
                  </Badge>
                  
                  <div className="flex items-center justify-center mb-3">
                    {product.stock > 0 ? (
                      <Badge variant="secondary" className="text-xs">In Stock ({product.stock})</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-primary mb-4">
                      KSh {product.price.toLocaleString()}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="quantum" 
                        size="sm" 
                        className="group-hover:scale-105 transition-transform"
                        disabled={product.stock === 0}
                        onClick={() => handleOrder(product)}
                      >
                        {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
                      </Button>
                      <Button 
                        size="sm" 
                        disabled={product.stock === 0}
                        className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                        asChild
                      >
                        <a href={`https://wa.me/254742107450?text=Hi! I want to order ${product.brand} ${product.model} - KSh ${product.price.toLocaleString()}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          WhatsApp Order
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">
              Error Loading Products
            </h3>
            <p className="text-muted-foreground font-exo mb-4">
              {error}
            </p>
            <Button onClick={() => { setError(null); loadProducts(); }}>
              Try Again
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {!error && searchTerm !== "" && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-orbitron font-bold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground font-exo">
              Try searching for a different product model or brand.
            </p>
          </div>
        )}



        {/* Contact for Orders */}
        <div className="mt-20 text-center bg-gradient-quantum rounded-2xl p-12">
          <h2 className="text-3xl font-orbitron font-bold mb-4 text-white">
            Need a Custom Order?
          </h2>
          <p className="text-white/90 font-exo mb-8 max-w-2xl mx-auto text-lg">
            Can't find what you're looking for? Contact us for special orders, 
            bulk pricing, or custom printer supply solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" className="bg-white text-quantum-dark hover:bg-white/90" asChild>
              <a href="/contact">
                Request Quote
              </a>
            </Button>
            <Button variant="outline" size="xl" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href="https://wa.me/254742107450?text=Hi! I need help with printer supplies and consumables." target="_blank" rel="noopener noreferrer">
                WhatsApp Order
              </a>
            </Button>
          </div>
        </div>

        <OrderModal 
          product={selectedProduct}
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          onSuccess={handleOrderSuccess}
        />
        </div>
      </div>
    </>
  );
};

export default Products;