import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

import { 
  Code, 
  Wifi, 
  Wrench, 
  Smartphone, 
  Shield, 
  Zap,
  ChevronRight,
  Check
} from "lucide-react";

const Services = () => {

  const services = [
    {
      icon: Code,
      title: "Web & Mobile Development",
      description: "Custom web applications and mobile apps built with modern technologies",
      features: [
        "Responsive web applications",
        "Mobile app development",
        "E-commerce solutions",
        "API development & integration",
        "Progressive Web Apps (PWA)"
      ],
      gradient: "from-primary to-accent"
    },
    {
      icon: Wifi,
      title: "WiFi Installation & Networking",
      description: "Professional network setup and WiFi infrastructure solutions",
      features: [
        "WiFi network design & installation",
        "Network security configuration",
        "Performance optimization",
        "Enterprise networking",
        "Troubleshooting & maintenance"
      ],
      gradient: "from-accent to-secondary"
    },
    {
      icon: Wrench,
      title: "Technical Repair Services",
      description: "Expert repair and maintenance for printers and office equipment",
      features: [
        "Printer repair & maintenance",
        "Photocopier servicing",
        "Hardware diagnostics",
        "Preventive maintenance",
        "Emergency support"
      ],
      gradient: "from-secondary to-primary"
    },
    {
      icon: Smartphone,
      title: "Digital Solutions",
      description: "Comprehensive digital transformation and consulting services",
      features: [
        "Digital strategy consulting",
        "System integration",
        "Cloud migration",
        "Data backup solutions",
        "IT consulting"
      ],
      gradient: "from-primary to-secondary"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Professional Tech Services - Quantum Systems"
        description="Expert web development, WiFi installation, printer services, and technical support in Nairobi, Kenya. Professional solutions for businesses and individuals."
        keywords="tech services, web development, WiFi installation, printer repair, technical support, Nairobi"
        structuredData={{
          "@type": "Service",
          "name": "Quantum Systems Tech Services",
          "description": "Professional technology services including web development, WiFi installation, and printer services",
          "provider": {
            "@type": "Organization",
            "name": "Quantum Systems and Services"
          }
        }}
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Complete Tech
            </span>
            <br />
            <span className="text-foreground">Solutions</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            From development to deployment, networking to maintenance - we provide 
            comprehensive technology services that keep your business running smoothly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-quantum-card border-quantum-border p-8 hover:shadow-glow transition-all duration-300 group"
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-orbitron font-bold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground font-exo mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-exo text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="group/btn" asChild>
                    <a href="/contact">
                      Learn More
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-quantum-card border border-quantum-border rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
              Our Process
            </h2>
            <p className="text-muted-foreground font-exo max-w-2xl mx-auto">
              We follow a proven methodology to ensure project success and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { 
                number: "01", 
                title: "Discovery", 
                description: "Understanding your needs and requirements",
                icon: Shield
              },
              { 
                number: "02", 
                title: "Planning", 
                description: "Creating detailed project roadmap",
                icon: Code
              },
              { 
                number: "03", 
                title: "Execution", 
                description: "Implementing solutions with precision",
                icon: Zap
              },
              { 
                number: "04", 
                title: "Delivery", 
                description: "Testing, deployment, and ongoing support",
                icon: Check
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-quantum rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="font-orbitron font-bold text-sm text-quantum-dark">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-exo text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Products CTA */}
        <div className="text-center mb-20">
          <div className="bg-gradient-quantum rounded-2xl p-12">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-white">
              Need Printer Supplies?
            </h2>
            <p className="text-white/90 font-exo mb-8 max-w-2xl mx-auto text-lg">
              Browse our collection of original toners, inks, and printer parts from trusted brands.
            </p>
            <Button variant="outline" size="xl" className="bg-white text-quantum-dark hover:bg-white/90" asChild>
              <a href="/products">
                Explore Our Products
              </a>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground font-exo mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution 
            that fits your needs perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="quantum" size="xl" asChild>
              <a href="/contact">
                Request Quote
              </a>
            </Button>
            <Button variant="glow" size="xl" asChild>
              <a href="/contact">
                Schedule Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Services;