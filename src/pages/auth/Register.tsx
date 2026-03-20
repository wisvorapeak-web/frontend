/// <reference types="vite/client" />
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
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
        toast.success('Registration successful. Please verify your email.');
        navigate('/verify');
      } else {
        toast.error(data.error || 'Registration failed.');
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
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Join the premier global gathering for advancing research and driving sustainable innovation in materials science.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Full Name</Label>
                <Input 
                  name="name"
                  placeholder="Dr. Anand Verma"
                  className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Email Address</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="anand@university.edu"
                  className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 ml-1">Affiliation</Label>
                  <Input 
                    name="institution"
                    placeholder="IIT Delhi"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 ml-1">Position</Label>
                  <Input 
                    name="role"
                    placeholder="Fellow"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Password</Label>
                <div className="relative group">
                  <Input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="h-11 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
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
                  <label htmlFor="terms" className="text-[10px] text-slate-500 font-bold leading-relaxed cursor-pointer">
                    I agree to the <span className="text-blue hover:text-white transition-colors">Terms of Service</span> and <span className="text-blue hover:text-white transition-colors">Privacy Policy</span>.
                  </label>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-xs font-bold shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ChevronRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
          </div>

          <p className="text-center text-xs font-bold text-slate-500">
            Already registered? <Link to="/login" title="Log In" className="text-blue hover:text-white transition-colors">Login Now</Link>
          </p>

          <Link to="/" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-xs font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
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
                The leading platform for world food, agriculture, and animal science summits.
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
