import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { config } from '@/lib/config';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      const response = await fetch(`${config.api.baseUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card className="bg-gradient-quantum p-8 text-center">
        <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
        <h3 className="text-xl font-orbitron font-bold text-white mb-2">
          Welcome to QuantumBit!
        </h3>
        <p className="text-white/90 font-exo">
          You'll receive our latest tech tips and product updates.
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-quantum-card border-quantum-border p-8">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-orbitron font-bold mb-2">Stay Updated</h3>
        <p className="text-muted-foreground font-exo">
          Get tech tips, product updates, and exclusive offers delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
        />
        
        <Button 
          type="submit" 
          variant="quantum" 
          className="w-full"
          disabled={status === 'loading' || !email}
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Mail className="w-4 h-4 mr-2" />
          )}
          {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </Button>

        {status === 'error' && (
          <p className="text-destructive text-sm text-center">
            Failed to subscribe. Please try again.
          </p>
        )}
      </form>

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <Badge variant="outline" className="text-xs">Tech Tips</Badge>
        <Badge variant="outline" className="text-xs">Product Updates</Badge>
        <Badge variant="outline" className="text-xs">Exclusive Offers</Badge>
      </div>
    </Card>
  );
};

export default Newsletter;