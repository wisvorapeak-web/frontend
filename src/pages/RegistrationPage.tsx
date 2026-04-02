import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Zap,
  Tag,
  ArrowRight,
  Loader2
} from 'lucide-react';

export default function RegistrationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEarlyBird, setIsEarlyBird] = useState(true);
  const [pricingTiers, setPricingTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Dynamic Pricing
    fetchPricing();
    
    // Check deadline
    checkDeadline();
  }, [location]);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing`);
      if (res.ok) {
        const data = await res.json();
        // Base registration filter
        const regTiers = data.filter((t: any) => t.category === 'Registration' && t.is_active);
        
        // Final state: only show active phase
        // Note: we fetch dates first in a production app, here we rely on local isEarlyBird state
        const currentPhase = isEarlyBird ? 'Early Bird' : 'Standard';
        const filtered = regTiers.filter((t: any) => t.name.includes(currentPhase));
        
        setPricingTiers(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch pricing:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkDeadline = async () => {
     try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/dates`);
       if (res.ok) {
         const dates = await res.json();
         const ebDate = dates.find((d: any) => d.event.toLowerCase().includes('early bird'));
         if (ebDate) {
           const deadline = new Date(ebDate.date);
           if (!isNaN(deadline.getTime()) && new Date() > deadline) {
             setIsEarlyBird(false);
           }
         }
       }
     } catch (err) {
       const deadline = new Date('2026-03-31');
       if (new Date() > deadline) setIsEarlyBird(false);
     }
  };

  if (loading) return (
    <PageLayout title="Registration" subtitle="Please wait...">
       <div className="py-40 flex flex-col items-center justify-center gap-6">
          <Zap className="w-12 h-12 text-blue animate-pulse" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest animate-pulse">Loading Registration...</p>
       </div>
    </PageLayout>
  );

  return (
    <PageLayout 
      title="Registration" 
      subtitle="Choose your registration for the event."
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-16 pb-32 font-outfit animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        <div className="text-center mb-16 space-y-4">
            <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full border ${isEarlyBird ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-blue/5 border-blue/10 text-blue'}`}>
                <div className={`w-2 h-2 rounded-full ${isEarlyBird ? 'bg-emerald-500' : 'bg-blue'} animate-pulse`} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                    {isEarlyBird ? 'Early Bird Prices Now!' : 'Standard Price Now!'}
                </span>
            </div>
            <h2 className="text-4xl font-black text-navy tracking-tight uppercase"><span className="text-blue">Registration</span> Plans</h2>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest max-w-xl mx-auto leading-relaxed">Choose a plan to register.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingTiers.length > 0 ? pricingTiers.map((tier) => (
                <div 
                    key={tier.id}
                    onClick={() => navigate(`/payment/registration/${tier.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="bg-white border border-slate-50 rounded-[3rem] p-10 flex items-center gap-8 hover:shadow-3xl hover:border-blue/20 transition-all cursor-pointer group group/card relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-12 bg-blue/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue group-hover:text-white group-hover:rotate-12 transition-all shadow-xl shadow-transparent group-hover:shadow-blue/20 shrink-0">
                        <Tag className="w-8 h-8" />
                    </div>

                    <div className="flex-1 space-y-3 relative z-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-navy tracking-tight uppercase group-hover:text-blue transition-colors">
                                {tier.name.split(':').pop()?.trim()}
                            </h3>
                        </div>
                        

                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-black text-blue mb-1">{tier.currency}</span>
                            <span className="text-4xl font-black text-navy tracking-tighter group-hover:scale-110 transition-transform origin-left">{tier.amount}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-3">/ Full Pass</span>
                        </div>

                        <div className="pt-4 flex items-center gap-4 text-slate-300 group-hover:text-blue transition-colors">
                            <span className="text-[9px] font-black uppercase tracking-widest">Register</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-2 py-32 bg-slate-50 rounded-[3rem] flex flex-col items-center justify-center gap-4 border border-dashed border-slate-200">
                    <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No plans found at the moment.</p>
                </div>
            )}
        </div>

        <div className="mt-20 pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-4">
                <CheckCircle2 className="w-5 h-5 text-blue" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Payments</span>
            </div>
            <div className="flex items-center gap-8">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">We Accept</div>
                <div className="flex gap-4 items-center">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                    <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                    <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                </div>
            </div>
        </div>
      </div>
    </PageLayout>
  );
}
