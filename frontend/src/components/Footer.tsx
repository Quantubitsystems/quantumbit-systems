import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import founderPhoto from "@/assets/founder.jpg";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Clock,
  MessageCircle,
  Wrench,
  Code,
  Wifi,
  Printer,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-quantum-dark text-white">
      {/* Company Contact Card Section */}
      <section className="py-16 bg-gradient-glow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-quantum-dark/95 border-quantum-border p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                    QuantumBit Systems and Services
                  </h3>
                  <p className="text-white/80 font-exo mb-6 italic">
                    Empowering Innovation, One System at a Time
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <a href={`tel:${config.business.phone}`} className="font-exo text-white hover:text-primary transition-colors">
                        {config.business.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                      <a href={`mailto:${config.business.email}`} className="font-exo text-white hover:text-primary transition-colors">
                        {config.business.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-exo text-white">www.quantumsystems.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-exo text-white">{config.business.address}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full mx-auto lg:ml-auto lg:mr-0 mb-4 overflow-hidden border-2 border-gradient-glow">
                      <img 
                        src={founderPhoto} 
                        alt="Alex Kinyua Nthatu" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-xl font-orbitron font-bold text-white mb-1">Alex Kinyua Nthatu</h4>
                    <p className="text-white/80 font-exo">Founder & Lead Developer</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                      <a href={`https://wa.me/${config.business.whatsapp.replace(/[^\d+]/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                      <a href={`tel:${config.business.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-16 bg-quantum-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-quantum rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-orbitron font-bold text-lg">Q</span>
                </div>
                <span className="text-xl font-orbitron font-bold text-white">QuantumBit</span>
              </div>
              <p className="text-white/80 font-exo mb-6 leading-relaxed">
                From Code to Cartridge — QuantumBit Delivers. Your trusted partner for complete technology solutions in Nairobi and beyond.
              </p>
              <div className="flex items-center space-x-2 text-white/60">
                <Clock className="w-4 h-4" />
                <span className="font-exo text-sm">24/7 Emergency Support</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-orbitron font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  { icon: Code, text: "Web & App Development" },
                  { icon: Wifi, text: "WiFi Installation" },
                  { icon: Printer, text: "Printer Repairs" },
                  { icon: Wrench, text: "Technical Support" }
                ].map((service, index) => (
                  <li key={index} className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                    <service.icon className="w-4 h-4" />
                    <span className="font-exo text-sm">{service.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-orbitron font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', path: '/about' },
                  { name: 'Services', path: '/services' },
                  { name: 'Products', path: '/products' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'FAQ', path: '/faq' }
                ].map((link, index) => (
                  <li key={index}>
                    <a href={link.path} className="text-white/80 hover:text-white transition-colors font-exo text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div>
              <h4 className="text-lg font-orbitron font-bold text-white mb-6">Follow Us</h4>
              <div className="flex space-x-3 mb-6">
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <a href="https://facebook.com/quantumbitsystems" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <a href="https://twitter.com/quantumbitsys" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <a href="https://linkedin.com/company/quantumbit-systems" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                  <a href="https://instagram.com/quantumbitsystems" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <h4 className="text-lg font-orbitron font-bold text-white mb-6">Contact & Hours</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-exo font-semibold mb-2 text-sm">Working Hours</h5>
                  <div className="text-white/80 font-exo text-sm space-y-1">
                    <div>Mon - Fri: 8:00 AM - 6:00 PM</div>
                    <div>Saturday: 9:00 AM - 4:00 PM</div>
                    <div>Sunday: Emergency Only</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-white font-exo font-semibold mb-2 text-sm">Emergency Support</h5>
                  <Badge variant="secondary" className="text-xs">24/7 Available</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 bg-black/30 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 font-exo text-sm mb-4 md:mb-0">
              © {currentYear} QuantumBit Systems and Services. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors font-exo text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors font-exo text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;