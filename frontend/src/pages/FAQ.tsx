import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We provide web & mobile development, WiFi installation, printer repairs, technical support, and printer consumables (toners & inks)."
    },
    {
      question: "How long does a typical web development project take?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during consultation."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes! We offer maintenance packages and 24/7 emergency support for all our clients. Support includes updates, bug fixes, and technical assistance."
    },
    {
      question: "What brands of printer supplies do you stock?",
      answer: "We stock original cartridges for HP, Kyocera, Epson, Canon, and Brother. We also offer compatible alternatives at competitive prices."
    },
    {
      question: "Do you offer WiFi installation for large offices?",
      answer: "Absolutely! We specialize in enterprise WiFi installations for offices of all sizes, including network design, security setup, and performance optimization."
    },
    {
      question: "What are your response times for technical support?",
      answer: "Emergency support: Within 2 hours. Regular support: Same day response. Scheduled maintenance: As per agreement. We prioritize urgent issues."
    },
    {
      question: "Do you provide quotes for projects?",
      answer: "Yes, we provide free consultations and detailed quotes for all projects. Contact us with your requirements for a personalized estimate."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, mobile money (M-Pesa), cash, and for larger projects, we offer flexible payment terms."
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Got Questions?
            </span>
            <br />
            <span className="text-foreground">We Have Answers</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, processes, and support.
          </p>
        </div>

        <Card className="bg-quantum-card border-quantum-border p-8 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-quantum-border">
                <AccordionTrigger className="text-left font-orbitron font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-exo leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;