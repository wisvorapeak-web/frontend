import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

import { apiRequest } from '../../lib/api';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    try {
      await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });
      setIsSubmitted(true);
    } catch (error) {
      // Error is already toasted by apiRequest
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
            <h1 className="text-3xl font-bold text-white">Reset Password</h1>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Enter your email to receive instructions on how to reset your password.
            </p>
          </div>

          <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 lg:p-10 shadow-2xl min-h-[350px] flex flex-col justify-center">
            {!isSubmitted ? (
               <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 ml-1">Email Address</Label>
                  <Input 
                    type="email" 
                    name="email"
                    placeholder="anand@university.edu"
                    className="h-12 bg-white/5 border-white/5 focus:border-blue focus:ring-4 focus:ring-blue/5 rounded-xl px-4 text-white text-xs font-bold placeholder:text-slate-700 transition-all border-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12 rounded-xl bg-blue hover:bg-white hover:text-navy text-white text-xs font-bold shadow-xl shadow-blue/5 active:scale-[0.98] transition-all" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Reset Instructions <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-6 animate-in zoom-in duration-500">
                 <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                     <h3 className="text-xl font-bold text-white">Email Sent</h3>
                    <p className="text-xs font-bold text-slate-500 leading-relaxed">
                       We have sent password reset instructions to your email address.
                    </p>
                 </div>
                  <Button variant="ghost" onClick={() => setIsSubmitted(false)} className="text-xs font-bold text-blue hover:text-white transition-colors">
                    Try again?
                 </Button>
              </div>
            )}
          </div>

          <Link to="/admin/login" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-xs font-bold transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Access
          </Link>
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="hidden lg:flex flex-1 bg-navy items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="max-w-md text-center space-y-10 relative z-10 px-8">
           <Link to="/" className="inline-block hover:scale-105 active:scale-95 transition-all mb-10">
              <img src="/logo.png" alt="Ascendix Summit on Food, Agri-Tech and Animal Science" className="h-16 w-auto object-contain brightness-0 invert" />
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
