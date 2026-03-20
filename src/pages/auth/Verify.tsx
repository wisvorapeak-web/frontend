import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
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
            <h1 className="text-3xl font-bold text-white">Verify Account</h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Enter the 6-digit code we sent to your email to activate your account.
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
                      className="w-10 h-14 bg-white/5 border-none focus:ring-4 focus:ring-blue/10 rounded-xl text-center text-xl font-bold text-white focus:outline-none transition-all"
                      required
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-11 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-xs font-bold shadow-xl shadow-blue/5 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify Code <CheckCircle2 className="w-4 h-4 ml-2" /></>}
                  </Button>

                  <div className="flex items-center justify-center pt-2 gap-4">
                      <p className="text-xs font-bold text-slate-500">No code received?</p>
                      <button type="button" className="text-xs font-bold text-blue hover:text-white flex items-center gap-1.5 transition-colors">
                          <RefreshCcw className="w-3 h-3" /> Resend Code
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
                     <h3 className="text-xl font-bold text-white">Access Granted</h3>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">
                       Account verified. Redirecting to your dashboard...
                    </p>
                  </div>
                 <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                 </div>
              </div>
            )}
          </div>

          <Link to="/login" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-xs font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Access
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

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
