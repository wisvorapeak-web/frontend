import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronLeft,
  Loader2,
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Verify() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-inter">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[480px] space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">Verify Protocol</h1>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
              Enter the 6-digit confirmation code dispatched to your academic email protocol to activate your scientific profile.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl min-h-[350px] flex flex-col justify-center">
            {!isSuccess ? (
              <form onSubmit={handleVerify} className="space-y-10 animate-in slide-in-from-right-5 fade-in duration-500">
                <div className="flex items-center justify-center gap-3 md:gap-4 font-black">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { if (el) inputRefs.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-10 h-14 bg-white/5 border-none focus:ring-4 focus:ring-blue/10 rounded-xl text-center text-xl font-black text-white focus:outline-none transition-all uppercase"
                      required
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue/5 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Complete Activation <CheckCircle2 className="w-4 h-4 ml-2" /></>}
                  </Button>

                  <div className="flex items-center justify-center pt-2 gap-4">
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">No code received?</p>
                      <button type="button" className="text-[9px] font-black text-blue hover:text-white uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                          <RefreshCcw className="w-3 h-3" /> Retry Transmission
                      </button>
                  </div>
                </div>
              </form>
            ) : (
               <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-500 py-6 h-full justify-center">
                 <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-navy shadow-2xl shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Access Granted</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                       Identity protocol confirmed. Securely redirecting to the scientific console...
                    </p>
                 </div>
                 <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                 </div>
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

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
