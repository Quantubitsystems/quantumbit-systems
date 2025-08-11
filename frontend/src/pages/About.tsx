import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Award, Lightbulb } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";


const About = () => {

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering businesses and individuals through innovative technology solutions that drive growth and efficiency."
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Building lasting partnerships by understanding unique needs and delivering personalized tech solutions."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Maintaining the highest standards in every project, from code quality to customer service."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Staying ahead of technology trends to provide cutting-edge solutions for tomorrow's challenges."
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Quantum Systems - Tech Experts in Nairobi"
        description="Learn about Quantum Systems and Services - your trusted technology partner in Nairobi, Kenya. Expert team providing web development, networking, and technical support since 2020."
        keywords="about quantum systems, tech company Nairobi, web development team, IT services Kenya"
        structuredData={{
          "@type": "Organization",
          "name": "Quantum Systems and Services",
          "description": "Professional technology services company in Nairobi, Kenya",
          "foundingDate": "2020",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nairobi",
            "addressCountry": "Kenya"
          }
        }}
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About QuantumBit
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Beyond Tech
            </span>
            <br />
            <span className="text-foreground">Into the QuantumBit Era</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            QuantumBit Systems and Services was founded with a vision to bridge the gap between 
            complex technology and practical business solutions. We believe in making advanced 
            technology accessible to everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground font-exo leading-relaxed">
              <p>
                Founded by passionate technologists, QuantumBit Systems and Services emerged from 
                the need for a comprehensive tech partner that could handle everything from 
                development to hardware support.
              </p>
              <p>
                We recognized that businesses often struggle with fragmented tech services - 
                working with multiple vendors for web development, networking, repairs, and 
                consumables. Our solution? A unified approach that delivers excellence across 
                all tech domains.
              </p>
              <p>
                Today, we serve individuals, small businesses, and large organizations with 
                the same commitment to quality and innovation that defined our founding principles.
              </p>
            </div>
          </div>
          
          <div className="bg-quantum-card border border-quantum-border rounded-xl p-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-foreground">
              What Sets Us Apart
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-exo font-semibold text-foreground mb-1">
                    End-to-End Solutions
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    From initial consultation to ongoing maintenance
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-exo font-semibold text-foreground mb-1">
                    Rapid Response
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Quick turnaround times for critical business needs
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-exo font-semibold text-foreground mb-1">
                    Transparent Pricing
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    No hidden costs, clear project scopes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-foreground">
              Our Core Values
            </h2>
            <p className="text-muted-foreground font-exo max-w-2xl mx-auto">
              These principles guide every decision we make and every solution we deliver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-quantum-card border-quantum-border p-6 hover:shadow-glow transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-3 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-exo text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-muted-foreground font-exo mb-8 max-w-2xl mx-auto">
            Let's discuss how QuantumBit Systems and Services can transform your technology challenges 
            into competitive advantages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-quantum text-white font-exo font-semibold hover:shadow-glow-strong transition-all duration-300">
              Start a Project
            </button>
            <button className="inline-flex items-center justify-center h-12 px-8 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-exo font-semibold transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;