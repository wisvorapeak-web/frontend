/// <reference types="vite/client" />
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
          institution: payload.institution,
          role: payload.role,
          location: 'Global' // Default
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful. Verify your protocol.');
        navigate('/verify');
      } else {
        toast.error(data.error || 'Initialization failed.');
      }
    } catch (error) {
      toast.error('Could not connect to the registration board.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-inter">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-[480px] space-y-8 py-12 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Initialize Identity</h1>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              Join the premier global gathering for advancing research and driving sustainable innovation in materials science.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                <Input 
                  name="name"
                  placeholder="DR. ANAND VERMA"
                  className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Protocol</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="ANAND@UNIVERSITY.EDU"
                  className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Affiliation</Label>
                  <Input 
                    name="institution"
                    placeholder="IIT DELHI"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Position</Label>
                  <Input 
                    name="role"
                    placeholder="FELLOW"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Key</Label>
                <div className="relative group">
                  <Input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
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

              <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                 <input type="checkbox" className="mt-1 accent-blue rounded-sm" id="terms" required />
                 <label htmlFor="terms" className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-relaxed cursor-pointer lowercase">
                    I agree to the <span className="text-blue hover:text-white transition-colors">Terms of Service</span> and <span className="text-blue hover:text-white transition-colors">Privacy Policy</span>.
                 </label>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ChevronRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
          </div>

          <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500">
            Already registered? <Link to="/login" title="Log In" className="text-blue hover:text-white transition-colors">Access Portal</Link>
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
