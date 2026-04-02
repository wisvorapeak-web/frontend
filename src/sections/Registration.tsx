import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  Mic2, 
  FileText,
  Check,
  Loader2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingTier {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  features: string[];
}

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('speaker')) return Mic2;
  if (n.includes('delegate')) return Users;
  if (n.includes('poster')) return FileText;
  if (n.includes('student')) return GraduationCap;
  return Users;
};

export default function Registration() {
  const [isVisible, setIsVisible] = useState(false);
  const [tiers, setTiers] = useState<PricingTier[]>([
    { id: '1', name: 'Lead Speaker', category: 'Registration', amount: 749, currency: '$', description: 'Early Bird Research Path.', features: ['Scientific Certification', 'Abstract Publication', 'Panel Presentation', 'IEEE/Springer Indexed', 'Gala Access'] },
    { id: '2', name: 'Global Delegate', category: 'Registration', amount: 899, currency: '$', description: 'Early Bird Networking Path.', features: ['Full Session Access', 'Workshop Credits', 'Digital Credentials', 'Networking Banquet', 'Premium Buffet'] },
    { id: '3', name: 'Poster Presenter', category: 'Registration', amount: 449, currency: '$', description: 'Early Bird Visual Path.', features: ['Exhibition Space', 'Digital Archive', 'Certificate', 'Network Access', 'Lounge Access'] },
    { id: '4', name: 'Student Scholar', category: 'Registration', amount: 399, currency: '$', description: 'Early Bird Academic Path.', features: ['Mentorship Access', 'Scholarship Entry', 'Certificate', 'Project Showcase', 'Meals Included'] }
  ]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing-tiers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setTiers(data.filter((t: PricingTier) => t.category === 'Registration'));
        }
      })
      .finally(() => setLoading(false));

    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="registration" className="relative py-12 bg-white overflow-hidden font-outfit">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <Zap className="w-3 h-3 text-blue animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue">Pricing Plans</span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-black text-navy tracking-tighter leading-tight uppercase">Get your <span className="text-blue">Registration</span></h2>
          <p className="text-slate-400 text-[10px] font-bold max-w-xl mx-auto uppercase tracking-[0.2em] opacity-80 italic">
            Book your spot and join global experts in food and agriculture.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] animate-pulse italic">Loading Prices...</p>
          </div>
        ) : error || tiers.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl p-14 text-center border-2 border-dashed border-slate-100 max-w-3xl mx-auto">
             <AlertCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
             <h4 className="text-lg font-black text-slate-400 uppercase tracking-tighter mb-1">Registration Closed</h4>
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Registration is closed at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
            {tiers.map((tier, index) => {
              const Icon = getIcon(tier.name);
              const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
              const isPopular = tier.name.toLowerCase().includes('global') || index === 1;

              return (
                <div 
                  key={tier.id} 
                  className={`relative group flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`h-full bg-white p-6 rounded-2xl border-2 transition-all flex flex-col hover:shadow-xl duration-700 relative overflow-hidden ${isPopular ? 'border-blue shadow-lg shadow-blue/5' : 'border-slate-50 hover:border-blue/10'}`}>
                    
                    {isPopular && (
                        <div className="absolute top-4 right-4">
                            <Sparkles className="w-4 h-4 text-blue animate-pulse" />
                        </div>
                    )}
                    
                    <div className="text-left mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 ${isPopular ? 'bg-blue text-white shadow-blue/20' : 'bg-slate-50 text-slate-400 group-hover:bg-blue/5 group-hover:text-blue'}`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-navy mb-1 tracking-tighter uppercase group-hover:text-blue transition-colors">{tier.name}</h3>
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] opacity-80 italic">{tier.description}</p>
                    </div>

                    <div className="text-left mb-6 py-4 border-y border-slate-50 relative">
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-blue/10 rounded-full" />
                        <div className="flex flex-col items-start gap-0.5">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xs font-black text-blue">{tier.currency}</span>
                              <span className="text-3xl font-black text-navy tracking-tighter group-hover:scale-105 transition-transform">{tier.amount.toLocaleString()}</span>
                            </div>
                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em]">Full Price</span>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {tier.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex gap-3 text-[10px] font-black text-navy/60 uppercase tracking-tight leading-snug">
                          <Check className={`w-3.5 h-3.5 flex-shrink-0 ${isPopular ? 'text-blue' : 'text-slate-300'}`} />
                          <span className="group-hover:text-navy transition-colors">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={`/payment/registration/${slug}`} className="text-decoration-none mt-auto">
                        <Button className={`w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95 group/btn flex items-center justify-center gap-3 ${isPopular ? 'bg-blue hover:bg-navy shadow-blue/20' : 'bg-navy hover:bg-blue shadow-navy/20'} text-white`}>
                            Book Now <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom badges */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-6 px-6 py-5 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-white hover:border-blue/20 hover:shadow-lg transition-all">
             <div className="w-12 h-12 bg-blue/5 rounded-xl border border-white flex items-center justify-center text-blue group-hover:rotate-6 transition-all shadow-sm">
                <Users className="w-5 h-5" />
             </div>
             <div className="text-left space-y-1">
                <p className="text-sm font-black text-navy uppercase tracking-tighter leading-none group-hover:text-blue transition-colors">Group Discounts</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider opacity-80 italic">Register 5+ people for a group discount.</p>
             </div>
          </div>
          <div className="flex items-center gap-6 px-6 py-5 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-white hover:border-blue/20 hover:shadow-lg transition-all">
             <div className="w-12 h-12 bg-blue/5 rounded-xl border border-white flex items-center justify-center text-blue group-hover:-rotate-6 transition-all shadow-sm">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <div className="text-left space-y-1">
                <p className="text-sm font-black text-navy uppercase tracking-tighter leading-none group-hover:text-blue transition-colors">Secure Payment</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider opacity-80 italic">World-class security for all transactions.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
