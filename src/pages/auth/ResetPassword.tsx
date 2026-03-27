import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Lock, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!token || !email) {
      toast.error('Invalid or expired reset link.');
      navigate('/admin/login');
    }
  }, [token, email, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          resetToken: token,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        })
      });

      if (res.ok) {
        toast.success('Password updated successfully. Please log in.');
        navigate('/admin/login');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to reset password.');
      }
    } catch (err) {
      toast.error('Network failure during reset.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) return null;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-[440px] space-y-8">
        
        <div className="text-center space-y-2">
           <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue/5">
              <ShieldCheck className="w-8 h-8 text-blue" />
           </div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Set New Access Key</h1>
           <p className="text-slate-500 text-xs font-bold leading-relaxed">
              Create a secure password for <span className="text-blue">{email}</span>
           </p>
        </div>

        <div className="bg-[#0f172a]/50 backdrop-blur-3xl border border-white/5 rounded-2xl p-10 shadow-2xl">
           <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">New Password</Label>
                 <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-blue transition-colors" />
                    <Input 
                      id="newPassword"
                      type="password" 
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="w-full bg-white/5 border-white/5 rounded-xl pl-10 pr-3 py-6 text-xs text-white font-bold focus:outline-none focus:border-blue transition-all shadow-sm border-none placeholder:text-slate-800"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm New Password</Label>
                 <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-blue transition-colors" />
                    <Input 
                      id="confirmPassword"
                      type="password" 
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      className="w-full bg-white/5 border-white/5 rounded-xl pl-10 pr-3 py-6 text-xs text-white font-bold focus:outline-none focus:border-blue transition-all shadow-sm border-none placeholder:text-slate-800"
                    />
                 </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 bg-blue hover:bg-white hover:text-navy text-white rounded-xl font-bold tracking-widest uppercase text-xs gap-3 shadow-xl shadow-blue/10 transition-all active:scale-[0.98]"
              >
                 {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                 ) : (
                    <>Commit New Key <ArrowRight className="w-4 h-4" /></>
                 )}
              </Button>
           </form>
        </div>

        <Link to="/admin/login" className="flex items-center justify-center gap-2 text-slate-700 hover:text-white text-xs font-bold transition-colors group">
           <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Cancel and Return
        </Link>

      </div>
    </div>
  );
}
