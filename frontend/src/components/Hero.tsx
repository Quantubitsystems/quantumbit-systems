import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, Shield, Cpu } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated Wavy Background */}
      <div className="absolute inset-0">
        <style>{`
          @keyframes wave1 {
            0%, 100% { d: path("M0,400 C300,300 600,500 900,400 C1050,350 1150,450 1200,400 L1200,800 L0,800 Z"); }
            50% { d: path("M0,450 C300,350 600,550 900,450 C1050,400 1150,500 1200,450 L1200,800 L0,800 Z"); }
          }
          @keyframes wave2 {
            0%, 100% { d: path("M0,500 C250,400 550,600 800,500 C950,450 1100,550 1200,500 L1200,800 L0,800 Z"); }
            50% { d: path("M0,550 C250,450 550,650 800,550 C950,500 1100,600 1200,550 L1200,800 L0,800 Z"); }
          }
          @keyframes wave3 {
            0%, 100% { d: path("M0,600 C200,550 400,650 600,600 C800,550 1000,650 1200,600 L1200,800 L0,800 Z"); }
            50% { d: path("M0,650 C200,600 400,700 600,650 C800,600 1000,700 1200,650 L1200,800 L0,800 Z"); }
          }
          .wave1 { animation: wave1 8s ease-in-out infinite; }
          .wave2 { animation: wave2 6s ease-in-out infinite reverse; }
          .wave3 { animation: wave3 10s ease-in-out infinite; }
        `}</style>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.08" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path className="wave1" d="M0,400 C300,300 600,500 900,400 C1050,350 1150,450 1200,400 L1200,800 L0,800 Z" fill="url(#waveGradient1)" />
          <path className="wave2" d="M0,500 C250,400 550,600 800,500 C950,450 1100,550 1200,500 L1200,800 L0,800 Z" fill="url(#waveGradient2)" />
          <path className="wave3" d="M0,600 C200,550 400,650 600,600 C800,550 1000,650 1200,600 L1200,800 L0,800 Z" fill="url(#waveGradient1)" opacity="0.5" />
        </svg>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 rounded-full bg-gradient-quantum opacity-20 animate-glow" />
      </div>
      <div className="absolute top-40 right-20 animate-float delay-1000">
        <div className="w-12 h-12 rounded-full bg-accent opacity-30 animate-glow" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-float delay-2000">
        <div className="w-8 h-8 rounded-full bg-secondary opacity-25 animate-glow" />
      </div>

      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-quantum-card border border-quantum-border mb-8">
            <Zap className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-exo text-foreground">
              Empowering Innovation, One System at a Time
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-orbitron font-black mb-6 leading-tight">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              QUANTUMBIT
            </span>
            <br />
            <span className="text-foreground whitespace-nowrap">
              SYSTEMS & SERVICES
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground font-exo mb-12 max-w-2xl mx-auto leading-relaxed">
            Empowering Innovation. Delivering Smart Tech Solutions.
            From web development to printer repairs - your complete technology partner.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="/services">
                Explore Our Services
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="glow" size="xl" asChild>
              <a href="/contact">
                Request Free Quote
              </a>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="group">
              <div className="bg-quantum-card border border-quantum-border rounded-xl p-6 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Development</h3>
                <p className="text-muted-foreground font-exo">
                  Modern web and mobile applications built with cutting-edge technology
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-quantum-card border border-quantum-border rounded-xl p-6 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-12 h-12 bg-gradient-glow rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-quantum-dark" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Infrastructure</h3>
                <p className="text-muted-foreground font-exo">
                  Professional WiFi installation and networking solutions
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-quantum-card border border-quantum-border rounded-xl p-6 backdrop-blur-sm hover:shadow-glow transition-all duration-300 group-hover:transform group-hover:scale-105">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-quantum-dark" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2">Support</h3>
                <p className="text-muted-foreground font-exo">
                  Expert repair services and premium consumables supply
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;