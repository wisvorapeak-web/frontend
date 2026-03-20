/// <reference types="vite/client" />
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success('Access granted to Wisvora Core.');
        navigate('/dashboard');
      } else {
        toast.error(data.error || 'Identity verification failed.');
      }
    } catch (error) {
      toast.error('Could not connect to the security cluster.');
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
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Access Console</h1>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              Log in to the Wisvora scientific ecosystem to manage your research transmissions and professional board data.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Protocol</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="ANAND@UNIVERSITY.EDU"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Password Key</Label>
                  <Link to="/forgot-password" title="Recover account" className="text-[9px] font-black text-blue hover:text-white uppercase tracking-widest transition-colors">Emergency?</Link>
                </div>
                <div className="relative group">
                  <Input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
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

              <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <>Execute Access <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 space-y-6">
               <div className="flex items-center justify-center gap-4">
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border-none"><Chrome className="w-4 h-4 text-slate-400" /></button>
                  <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border-none"><Github className="w-4 h-4 text-slate-400" /></button>
               </div>
            </div>
          </div>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
            System new? <Link to="/register" title="Create Account" className="text-blue hover:text-white transition-colors">Initialize Identity</Link>
          </p>

          <Link to="/" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Exit to Surface
          </Link>
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="hidden lg:flex flex-1 bg-navy items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="max-w-md text-center space-y-10 relative z-10 px-8">
           <div className="w-16 h-16 rounded-2xl bg-blue mx-auto flex items-center justify-center shadow-2xl shadow-blue/20">
              <ShieldCheck className="text-white w-9 h-9" />
           </div>
           
           <div className="space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Wisvora <span className="text-blue">Core</span></h2>
              <p className="text-xs font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                The high-performance scientific engine for materials research and global board management.
              </p>
           </div>

           <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                 <p className="text-[14px] font-black text-white tracking-widest">99.9%</p>
                 <p className="text-[8px] font-black text-blue uppercase tracking-widest">Uptime</p>
              </div>
              <div className="space-y-1 border-x border-white/5">
                 <p className="text-[14px] font-black text-white tracking-widest">&lt;1s</p>
                 <p className="text-[8px] font-black text-blue uppercase tracking-widest">Latency</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[14px] font-black text-white tracking-widest">1K+</p>
                 <p className="text-[8px] font-black text-blue uppercase tracking-widest">Nodes</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
