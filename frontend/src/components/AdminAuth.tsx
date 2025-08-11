import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { config } from '@/lib/config';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === config.api.adminToken) {
      localStorage.setItem('adminAuth', 'true');
      onAuthenticated();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-quantum-card border-quantum-border">
        <h1 className="text-2xl font-orbitron font-bold text-center mb-6">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" variant="quantum" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminAuth;