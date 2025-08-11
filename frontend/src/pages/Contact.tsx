import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { config } from "@/lib/config";
import { trackFormSubmission } from "@/lib/analytics";

import { SEOHead } from "@/components/SEOHead";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle,
  Loader2
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await api.sendContact(data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      trackFormSubmission('contact');
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us for immediate assistance",
      value: config.business.phone,
      action: "Call Now",
      gradient: "from-primary to-accent",
      href: `tel:${config.business.phone}`
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us your project details",
      value: config.business.email,
      action: "Send Email",
      gradient: "from-accent to-secondary",
      href: `mailto:${config.business.email}`
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick chat for urgent queries",
      value: config.business.whatsapp,
      action: "WhatsApp Us",
      gradient: "from-secondary to-primary",
      href: `https://wa.me/${config.business.whatsapp.replace(/[^\d+]/g, '')}`
    },
    {
      icon: MapPin,
      title: "Office",
      description: "Visit our tech center",
      value: config.business.address,
      action: "Get Directions",
      gradient: "from-primary to-secondary",
      href: `https://maps.google.com/?q=${encodeURIComponent(config.business.address)}`
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Emergency Only" }
  ];

  return (
    <>
      <SEOHead 
        title="Contact Quantum Systems - Get Tech Support Today"
        description="Contact Quantum Systems for web development, WiFi installation, printer services, and technical support in Nairobi, Kenya. Free consultation available."
        keywords="contact quantum systems, tech support Nairobi, web development consultation, WiFi installation quote"
        structuredData={{
          "@type": "ContactPage",
          "name": "Contact Quantum Systems",
          "description": "Get in touch with Quantum Systems for professional technology services",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+254-XXX-XXXX",
            "contactType": "customer service",
            "areaServed": "Kenya"
          }
        }}
      />
      <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Contact
            </span>
            <br />
            <span className="text-foreground">QuantumBit</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            Ready to start your project or need technical support? We're here to help. 
            Reach out through any of the channels below.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-quantum-card border-quantum-border p-6 text-center hover:shadow-glow transition-all duration-300 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-orbitron font-bold text-lg mb-2 text-foreground">
                {method.title}
              </h3>
              <p className="text-muted-foreground font-exo text-sm mb-3">
                {method.description}
              </p>
              <p className="font-exo font-semibold text-foreground mb-4 text-sm">
                {method.value}
              </p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={method.href} target={method.title === 'WhatsApp' ? '_blank' : '_self'} rel={method.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}>
                  {method.action}
                </a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-quantum-card border-quantum-border p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                Send us a Message
              </h2>
              <p className="text-muted-foreground font-exo">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-exo">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="mt-1 bg-background border-quantum-border"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-exo">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="mt-1 bg-background border-quantum-border"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="font-exo">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="mt-1 bg-background border-quantum-border"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="font-exo">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="+254 712 345 678" 
                  className="mt-1 bg-background border-quantum-border"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="service" className="font-exo">Service Interested In</Label>
                <select 
                  id="service" 
                  className="w-full mt-1 px-3 py-2 bg-background border border-quantum-border rounded-md font-exo text-foreground"
                  {...register("service")}
                >
                  <option value="">Select a service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="WiFi Installation">WiFi Installation</option>
                  <option value="Technical Repair">Technical Repair</option>
                  <option value="Printer Supplies">Printer Supplies</option>
                  <option value="Consultation">Consultation</option>
                </select>
                {errors.service && (
                  <p className="text-destructive text-sm mt-1">{errors.service.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="font-exo">Project Details</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                  className="mt-1 bg-background border-quantum-border min-h-[120px]"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button variant="quantum" size="lg" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* Office Info & Map */}
          <div className="space-y-8">
            {/* Office Hours */}
            <Card className="bg-quantum-card border-quantum-border p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-xl text-foreground">
                    Office Hours
                  </h3>
                  <p className="text-muted-foreground font-exo text-sm">
                    When we're available to help
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-quantum-border last:border-b-0">
                    <span className="font-exo text-foreground">{schedule.day}</span>
                    <span className="font-exo text-muted-foreground">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-background rounded-lg border border-quantum-border">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span className="font-exo text-sm text-foreground">
                    Emergency support available 24/7 for existing clients
                  </span>
                </div>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="bg-quantum-card border-quantum-border p-8">
              <h3 className="font-orbitron font-bold text-xl mb-4 text-foreground">
                Our Location
              </h3>
              
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-exo">
                    Interactive map coming soon
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm font-exo">
                <p className="text-foreground font-semibold">{config.business.name}</p>
                <p className="text-muted-foreground">{config.business.address}</p>
                <p className="text-muted-foreground">Kenya</p>
              </div>

              <Button variant="outline" className="w-full mt-4">
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </Card>
          </div>
        </div>

        {/* Testimonial Form */}
        <div className="mt-20">
          <Card className="bg-quantum-card border-quantum-border p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-orbitron font-bold mb-2 text-foreground">
                Share Your Experience
              </h2>
              <p className="text-muted-foreground font-exo">
                Help others by sharing your experience with our services.
              </p>
            </div>

            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = {
                customer_name: formData.get('name'),
                customer_email: formData.get('email'),
                company: formData.get('company'),
                rating: parseInt(formData.get('rating')),
                message: formData.get('message')
              };
              
              try {
                await api.submitTestimonial(data);
                toast({
                  title: "Thank you!",
                  description: "Your testimonial has been submitted for review.",
                });
                e.target.reset();
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to submit testimonial. Please try again.",
                  variant: "destructive",
                });
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="font-exo">Your Name</Label>
                  <Input name="name" required className="mt-1 bg-background border-quantum-border" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-exo">Email</Label>
                  <Input name="email" type="email" required className="mt-1 bg-background border-quantum-border" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="company" className="font-exo">Company (Optional)</Label>
                <Input name="company" className="mt-1 bg-background border-quantum-border" />
              </div>
              
              <div>
                <Label htmlFor="rating" className="font-exo">Rating</Label>
                <select name="rating" required className="w-full mt-1 px-3 py-2 bg-background border border-quantum-border rounded-md font-exo text-foreground">
                  <option value="">Select rating</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="1">⭐ Poor</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="message" className="font-exo">Your Review</Label>
                <Textarea name="message" required placeholder="Tell us about your experience..." className="mt-1 bg-background border-quantum-border min-h-[100px]" />
              </div>
              
              <Button type="submit" variant="quantum" className="w-full">
                Submit Review
              </Button>
            </form>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground font-exo mb-12 max-w-2xl mx-auto">
            Have questions? Check out our FAQ section or contact us directly for 
            personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="xl" asChild>
              <a href="/faq">
                View FAQ
              </a>
            </Button>
            <Button variant="quantum" size="xl" asChild>
              <a href={`tel:${config.business.phone}`}>
                Emergency Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;