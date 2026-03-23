import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Loader2, 
  Lock, 
  User, 
  Mail, 
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSetupNeeded, setIsSetupNeeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/setup/status`);
        const data = await res.json();
        setIsSetupNeeded(data.isSetupNeeded);
      } catch (err) {
        toast.error('Could not connect to the system backend.');
      } finally {
        setIsChecking(false);
      }
    };
    checkStatus();
  }, []);

  const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('System initiated successfully!');
        // Redirect to login after a brief delay
        setTimeout(() => navigate('/admin/login'), 2000);
      } else {
        toast.error(data.error || 'Setup failed.');
      }
    } catch (error) {
      toast.error('Network error. Please check if the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-outfit">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-emerald-500/50 text-sm font-bold animate-pulse tracking-widest uppercase">System Check...</p>
        </div>
      </div>
    );
  }

  if (!isSetupNeeded) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-outfit">
        <div className="max-w-md w-full bg-navy/30 backdrop-blur-2xl border border-white/5 p-12 rounded-[3rem] text-center space-y-8 animate-in zoom-in-95 duration-700 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-3">
             <h1 className="text-3xl font-bold text-white tracking-tight">System Ready</h1>
             <p className="text-slate-500 text-sm font-medium leading-relaxed">
               The Wisvora Scientific platform is already initialized. Please use the administrative login.
             </p>
          </div>
          <Button onClick={() => navigate('/admin/login')} className="w-full h-16 bg-blue hover:bg-white hover:text-navy text-white text-sm font-bold rounded-2xl transition-all shadow-xl shadow-blue/20">
            Go to Management Console
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex font-outfit relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative z-10">
        <div className="w-full max-w-[500px] space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center text-blue mx-auto mb-4 border border-blue/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-none uppercase">Initiate <span className="text-blue">System</span></h1>
            <p className="text-slate-500 text-sm font-medium">Create the initial Super Admin account to begin managing the summit.</p>
          </div>

          <div className="bg-navy/20 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 lg:p-14 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
               <Lock className="w-24 h-24 text-white" />
            </div>
            
            <form onSubmit={handleSetup} className="space-y-6">

              <div className="space-y-3">
                <Label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest">Super Admin Name</Label>
                <div className="relative">
                  <Input 
                    name="name"
                    type="text" 
                    placeholder="Anand Jaiswal"
                    required
                    className="h-16 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-2xl pl-12 text-white text-sm font-bold transition-all border-none"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest">Email Address</Label>
                <div className="relative">
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="admin@wisvorapeak.com"
                    required
                    className="h-16 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-2xl pl-12 text-white text-sm font-bold transition-all border-none"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-widest">Administrative Password</Label>
                <div className="relative">
                  <Input 
                    name="password"
                    type="password" 
                    placeholder="••••••••••••"
                    required
                    className="h-16 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-2xl pl-12 text-white text-sm font-bold transition-all border-none"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                </div>
              </div>

              <Button type="submit" className="w-full h-18 bg-blue hover:bg-emerald-500 hover:scale-[1.02] text-white text-sm font-black rounded-2xl shadow-xl shadow-blue/20 transition-all flex items-center justify-center gap-3 uppercase disabled:opacity-50" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Initiate System <ArrowRight className="w-5 h-5" /></>}
              </Button>
            </form>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
             <Link to="/admin/login" className="text-xs font-bold text-slate-600 hover:text-white transition-colors uppercase tracking-widest">Return to Login</Link>
             <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Wisvora Scientific Infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
