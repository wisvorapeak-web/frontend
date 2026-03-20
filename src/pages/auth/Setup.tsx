/// <reference types="vite/client" />
import { useState, useEffect } from 'react'; // Re-saved to fix indexing
import { Link, useNavigate } from 'react-router-dom';
import { 
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
        toast.info('The system is already set up.');
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
        toast.success('Super Admin created successfully!');
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
            <h1 className="text-xl font-bold text-white">Access Denied</h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              The system is already set up. You can no longer access the setup page.
            </p>
          </div>
          <Link to="/login" className="block w-full h-11 flex items-center justify-center rounded-xl bg-blue text-white text-xs font-bold hover:bg-white hover:text-navy transition-all">
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
            <h1 className="text-3xl font-bold text-white">System <span className="text-blue">Setup</span></h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Complete the initial setup by creating the main administrator account.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl">
            <form onSubmit={handleSetup} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Admin Full Name</Label>
                <Input 
                  name="name"
                  placeholder="Super Admin Name"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Admin Email Address</Label>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="admin@ascendix.com"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-400 ml-1">Admin Password</Label>
                <Input 
                  name="password"
                  type="password" 
                  placeholder="••••••••••••"
                  className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                  required
                />
              </div>


              <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-xs font-bold shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Finish Setup <ArrowRight className="w-4 h-4 ml-2" /></>}
              </Button>
            </form>
          </div>

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

           <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Admin</p>
                  <p className="text-[10px] font-bold text-blue">Role</p>
              </div>
              <div className="space-y-1 border-l border-white/5">
                 <p className="text-sm font-bold text-white">Full</p>
                 <p className="text-[10px] font-bold text-blue">Access</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
