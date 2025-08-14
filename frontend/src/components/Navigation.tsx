import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import quantumLogo from "@/assets/quantum-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndicator, setHoverIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect) {
      setHoverIndicator({
        left: rect.left - navRect.left,
        width: rect.width,
        opacity: 1
      });
    }
  };

  const updateHoverPosition = () => {
    if (hoverIndicator.opacity > 0) {
      const hoveredElement = document.querySelector('.nav-item:hover');
      if (hoveredElement && navRef.current) {
        const rect = hoveredElement.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        setHoverIndicator(prev => ({
          ...prev,
          left: rect.left - navRect.left
        }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateHoverPosition);
    return () => window.removeEventListener('scroll', updateHoverPosition);
  }, [hoverIndicator.opacity]);

  const handleMouseLeave = () => {
    setHoverIndicator(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-quantum-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-12 bg-gradient-quantum rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow">
                <span className="font-orbitron font-black text-2xl text-white">QB</span>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="font-orbitron font-bold text-xl bg-gradient-quantum bg-clip-text text-transparent">
                QUANTUMBIT
              </span>
              <div className="text-xs text-muted-foreground font-exo">
                Systems & Services
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div 
            ref={navRef}
            className="hidden md:flex items-center space-x-8 relative"
            onMouseLeave={handleMouseLeave}
          >
            {/* Hover Indicator */}
            <div 
              className="absolute -bottom-1 h-0.5 bg-gradient-quantum rounded-full transition-all duration-300 ease-out"
              style={{
                left: hoverIndicator.left,
                width: hoverIndicator.width,
                opacity: hoverIndicator.opacity
              }}
            />
            
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={handleMouseEnter}
                className={`nav-item relative font-exo font-medium transition-colors duration-300 ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-quantum rounded-full" />
                )}
              </Link>
            ))
            <Button variant="quantum" size="sm" asChild>
              <Link to="/services">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;