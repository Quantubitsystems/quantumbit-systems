import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { config } from "@/lib/config";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Terms of
            </span>
            <br />
            <span className="text-foreground">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            Terms and conditions for using our services.
          </p>
        </div>

        <Card className="bg-quantum-card border-quantum-border p-8 max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-muted-foreground font-exo">
              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Service Agreement</h2>
                <p className="leading-relaxed">
                  By engaging our services, you agree to these terms and conditions. These terms apply to all 
                  services provided by {config.business.name}, including web development, technical support, 
                  and product sales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Service Delivery</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Project timelines are estimates and may vary based on complexity and client feedback</li>
                  <li>We require client approval at key project milestones</li>
                  <li>Changes to project scope may affect timeline and cost</li>
                  <li>Final deliverables will be provided upon full payment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Payment Terms</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>50% deposit required to commence work on development projects</li>
                  <li>Final payment due upon project completion</li>
                  <li>Product purchases require full payment before delivery</li>
                  <li>Late payments may incur additional charges</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Warranties and Support</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>We provide 30-day warranty on all development work</li>
                  <li>Hardware repairs come with 90-day warranty</li>
                  <li>Original products carry manufacturer warranty</li>
                  <li>Support is available during business hours</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="leading-relaxed">
                  Our liability is limited to the amount paid for services. We are not responsible for 
                  indirect damages, data loss, or business interruption.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="leading-relaxed">
                  Upon full payment, clients receive full rights to custom-developed work. We retain 
                  rights to general methodologies and techniques used.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Contact Information</h2>
                <div className="p-4 bg-background rounded-lg border border-quantum-border">
                  <p><strong>Email:</strong> {config.business.email}</p>
                  <p><strong>Phone:</strong> {config.business.phone}</p>
                  <p><strong>Address:</strong> {config.business.address}</p>
                </div>
              </section>

              <section>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;