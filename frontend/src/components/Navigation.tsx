import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import quantumLogo from "@/assets/quantum-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndicator, setHoverIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    
    const handleScroll = () => {
      const sections = [
        { id: 'hero', element: document.querySelector('section') },
        { id: 'about', element: document.getElementById('about') },
        { id: 'services', element: document.getElementById('services') },
        { id: 'products', element: document.getElementById('products') },
        { id: 'contact', element: document.getElementById('contact') }
      ];
      
      const scrollY = window.scrollY + 100; // Offset for navbar
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollY) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => {
    // On homepage, use scroll-based section detection
    if (location.pathname === '/') {
      const sectionMap: { [key: string]: string } = {
        '/': 'hero',
        '/about': 'about',
        '/services': 'services',
        '/products': 'products',
        '/portfolio': 'portfolio',
        '/contact': 'contact'
      };
      return activeSection === sectionMap[path];
    }
    // On other pages, use normal path matching
    return location.pathname === path;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const navContainer = navRef.current;
    if (navContainer) {
      // Use offsetLeft for consistent positioning regardless of scroll
      const targetOffsetLeft = target.offsetLeft;
      const containerOffsetLeft = navContainer.offsetLeft;
      
      setHoverIndicator({
        left: targetOffsetLeft - containerOffsetLeft,
        width: target.offsetWidth,
        opacity: 1
      });
    }
  };

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
            ))}
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