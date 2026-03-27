/// <reference types="vite/client" />
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        toast.success('Successfully logged in.');
        const from = (location.state as any)?.from?.pathname || '/admin/overview';
        navigate(from, { replace: true });
      } else {
        toast.error(data.error || 'Login failed.');
      }
    } catch (error) {
      toast.error('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo.png" alt="ASFAA" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to Admin</h1>
          <p className="text-sm text-slate-500 mt-2">Enter your credentials to access the summit dashboard.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-600 uppercase tracking-tight">Email Address</Label>
              <Input 
                name="email"
                type="email" 
                placeholder="admin@example.com"
                className="h-11 border-slate-200 rounded focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-none"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-slate-600 uppercase tracking-tight">Password</Label>
                <Link to="/admin/forgot-password" title="Recover account" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</Link>
              </div>
              <div className="relative">
                <Input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••"
                  className="h-11 border-slate-200 rounded focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-none"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded font-bold text-sm shadow-sm transition-none" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Login to Console <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-medium transition-none">
            <ChevronLeft className="w-4 h-4" /> Return to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
