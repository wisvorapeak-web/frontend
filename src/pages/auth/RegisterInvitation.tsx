import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function RegisterInvitation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!token) {
      toast.error('Missing invitation token.');
      navigate('/');
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Passwords do not match.');
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register-invitation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...formData
        })
      });

      if (res.ok) {
        toast.success('Administrative portal activated. Welcome aboard!');
        const data = await res.json();
        // Option: Store credentials or directly redirect to login
        localStorage.setItem('ascendix_user', JSON.stringify(data.user));
        navigate('/admin/overview');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Activation failed.');
      }
    } catch (err) {
      toast.error('Network failure during registration.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="w-full max-w-lg">
        
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 text-center">
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 rotate-3">
              <ShieldCheck className="w-8 h-8 text-white -rotate-3" />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Activate Admin Account</h1>
           <p className="text-slate-500 mt-2 text-sm max-w-[280px]">Complete your profile to join the ASFAA administrative infrastructure.</p>
        </div>

        {/* Security Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex gap-4 items-start">
           <div className="p-1 bg-amber-500/10 rounded">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
           </div>
           <div className="space-y-1">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider leading-none">Security Protocol Active</p>
              <p className="text-xs text-amber-700 leading-normal">Your email is pre-authorized. Only individuals with this cryptographic invitation can access this portal.</p>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-10">
           <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">First Name</label>
                    <div className="relative group">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                       <input 
                         id="firstName"
                         type="text" 
                         required
                         value={formData.firstName}
                         onChange={handleChange}
                         placeholder="Alice"
                         className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                       />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Last Name</label>
                    <div className="relative group">
                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                       <input 
                         id="lastName"
                         type="text" 
                         required
                         value={formData.lastName}
                         onChange={handleChange}
                         placeholder="Smith"
                         className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Personal Access Key (Password)</label>
                 <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      id="password"
                      type="password" 
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Confirm Access Key</label>
                 <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      id="confirmPassword"
                      type="password" 
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
                    />
                 </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-8 rounded-xl font-bold tracking-widest uppercase text-xs gap-3 shadow-lg shadow-slate-900/20"
              >
                 {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                 ) : (
                    <>Establish Authorization <ArrowRight className="w-4 h-4" /></>
                 )}
              </Button>
           </form>

           <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1.5">
                 <div className="w-1 h-1 bg-blue-600 rounded-full" />
                 <div className="w-1 h-1 bg-blue-600/40 rounded-full" />
                 <div className="w-1 h-1 bg-blue-600/20 rounded-full" />
              </div>
              <p className="text-[10px] text-slate-400 italic text-center leading-relaxed">
                 By joining, you represent that you are an authorized representative of the ASFAA scientific committee.
              </p>
           </div>
        </div>

        <div className="mt-12 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
           <CheckCircle2 className="w-3 h-3" /> Encrypted Transmission Protocol v2.4
        </div>

      </div>
    </div>
  );
}
