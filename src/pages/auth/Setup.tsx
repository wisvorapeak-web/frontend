/// <reference types="vite/client" />
import { useState, useEffect } from 'react'; // Re-saved to fix indexing
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export default function Setup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSetupNeeded, setIsSetupNeeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/setup/status`);
      const data = await response.json();
      setIsSetupNeeded(data.isSetupNeeded);
      if (!data.isSetupNeeded) {
        toast.info('System is already initialized.');
      }
    } catch (error) {
      console.error('Status Check Error:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSetup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Super Admin initialized successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.error || 'Setup failed.');
      }
    } catch (error) {
      toast.error('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue animate-spin" />
      </div>
    );
  }

  if (!isSetupNeeded) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-black text-white uppercase tracking-tight">Access Restricted</h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              The system has already been initialized with a Super Admin. Setup phase is no longer accessible.
            </p>
          </div>
          <Link to="/login" className="block w-full h-11 flex items-center justify-center rounded-xl bg-blue text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-navy transition-all">
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] flex font-inter">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">System <span className="text-blue">Genesis</span></h1>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              Initialize the core Wisvora infrastructure by creating the primary Super Admin authority.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleSetup} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Full Name</Label>
                <Input 
                  name="name"
                  placeholder="SUPER ADMIN NAME"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email Protocol</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="ADMIN@WISVORA.COM"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Root Password Key</Label>
                <Input 
                  name="password"
                  type="password" 
                  placeholder="••••••••••••"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>


              <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Complete Initialization <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
          </div>

          <Link to="/" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Safety
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
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Setup <span className="text-blue">Protocol</span></h2>
              <p className="text-xs font-black text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                Primary system authority establishment. This phase creates the root user with full administrative privileges across the Wisvora board.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                 <p className="text-[14px] font-black text-white tracking-widest">ROOT</p>
                 <p className="text-[8px] font-black text-blue uppercase tracking-widest">Authority</p>
              </div>
              <div className="space-y-1 border-l border-white/5">
                 <p className="text-[14px] font-black text-white tracking-widest">FULL</p>
                 <p className="text-[8px] font-black text-blue uppercase tracking-widest">Access</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
