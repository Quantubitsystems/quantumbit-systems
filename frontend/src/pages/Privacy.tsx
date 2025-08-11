import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { config } from "@/lib/config";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Legal
          </Badge>
          <h1 className="text-4xl md:text-6xl font-orbitron font-black mb-6">
            <span className="bg-gradient-quantum bg-clip-text text-transparent">
              Privacy
            </span>
            <br />
            <span className="text-foreground">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground font-exo max-w-3xl mx-auto leading-relaxed">
            How we collect, use, and protect your information.
          </p>
        </div>

        <Card className="bg-quantum-card border-quantum-border p-8 max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-muted-foreground font-exo">
              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Information We Collect</h2>
                <p className="leading-relaxed">
                  We collect information you provide directly to us, such as when you contact us through our website, 
                  request services, or communicate with us via email or phone.
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Project requirements and specifications</li>
                  <li>Communication preferences</li>
                  <li>Service usage information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">How We Use Your Information</h2>
                <p className="leading-relaxed">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Deliver the services you request</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Information Sharing</h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                  except as described in this policy or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Data Security</h2>
                <p className="leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">Contact Us</h2>
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-background rounded-lg border border-quantum-border">
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

export default Privacy;