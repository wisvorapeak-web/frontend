/// <reference types="vite/client" />
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Chrome,
  Github,
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
        
        // Redirect back to original path if it exists
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
    <div className="min-h-screen bg-[#020617] flex font-inter">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Log in to manage your account, abstracts, and event registrations.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Email Address</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="anand@university.edu"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label className="text-xs font-bold text-slate-400">Password</Label>
                  <Link to="/admin/forgot-password" title="Recover account" className="text-xs font-bold text-blue hover:text-white transition-colors">Forgot Password?</Link>
                </div>
                <div className="relative group">
                  <Input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-xs font-bold shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <>Log In <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
               <div className="flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border-none"><Chrome className="w-4 h-4 text-slate-400" /></button>
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border-none"><Github className="w-4 h-4 text-slate-400" /></button>
               </div>
            </div>
          </div>



          <Link to="/" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-xs font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Go back Home
          </Link>
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="hidden lg:flex flex-1 bg-navy items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="max-w-md text-center space-y-10 relative z-10 px-8">
           <Link to="/" className="inline-block hover:scale-105 active:scale-95 transition-all mb-10">
              <img src="/logo.png" alt="Ascendix Summits" className="h-16 w-auto object-contain brightness-0 invert" />
           </Link>
           
           <div className="space-y-4">
              <p className="text-xs font-bold text-white/30 leading-relaxed">
                The leading platform for food, agri-tech, and animal science summits.
              </p>
           </div>

           <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                 <p className="text-sm font-bold text-white">99.9%</p>
                 <p className="text-[10px] font-bold text-blue">Uptime</p>
              </div>
              <div className="space-y-1 border-x border-white/5">
                 <p className="text-sm font-bold text-white">&lt;1s</p>
                 <p className="text-[10px] font-bold text-blue">Latency</p>
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-bold text-white">1K+</p>
                 <p className="text-[10px] font-bold text-blue">Members</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
