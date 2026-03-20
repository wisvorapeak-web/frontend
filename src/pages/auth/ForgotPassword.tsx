import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-inter">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[440px] space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Recover Key</h1>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              Initialize recovery protocol to reset your portal access credentials within the Wisvora scientific infrastructure.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl min-h-[350px] flex flex-col justify-center">
            {!isSubmitted ? (
               <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Protocol</Label>
                  <Input 
                    type="email" 
                    placeholder="ANAND@UNIVERSITY.EDU"
                    className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-[10px] font-black uppercase tracking-widest placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Reset Instructions <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-6 animate-in zoom-in duration-500">
                 <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Transmission Sent</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                       Secure reset instructions have been dispatched to your primary email protocol.
                    </p>
                 </div>
                 <Button variant="ghost" onClick={() => setIsSubmitted(false)} className="text-[9px] font-black text-blue uppercase tracking-widest hover:text-white transition-colors">
                    Retry Protocol?
                 </Button>
              </div>
            )}
          </div>

          <Link to="/login" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Access
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
