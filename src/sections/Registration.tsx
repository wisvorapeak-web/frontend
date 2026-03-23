import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  Mic2, 
  FileText,
  Check,
  Loader2,
  AlertCircle
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
  const [tiers] = useState<PricingTier[]>([
    { id: '1', name: 'Speaker', category: 'Registration', amount: 350, currency: '$', description: 'Present your research.', features: ['Full Conference Access', 'Presentation Slot', 'Certificate', 'Networking Gala'] },
    { id: '2', name: 'Delegate', category: 'Registration', amount: 450, currency: '$', description: 'Attend the summit.', features: ['Full Conference Access', 'Workshops', 'Certificate', 'Lunch & Refreshments'] },
    { id: '3', name: 'Student', category: 'Registration', amount: 200, currency: '$', description: 'Special rate for students.', features: ['Full Conference Access', 'Student Workshop', 'Certificate', 'Career Session'] },
    { id: '4', name: 'Poster', category: 'Registration', amount: 300, currency: '$', description: 'Digital poster entry.', features: ['Conference Access', 'Poster Display', 'Certificate', 'Digital Archive'] }
  ]);
  const [loading] = useState(false);
  const [error] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="registration" className="relative py-20 bg-white overflow-hidden font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[9px] font-black uppercase tracking-widest text-blue">Pricing</span>
          </div>

          <h2 className="text-2xl lg:text-4xl font-black text-navy tracking-tight uppercase">Registration</h2>
          <p className="text-slate-400 text-[10px] font-bold max-w-2xl mx-auto uppercase tracking-[0.2em] opacity-60">
            Book your place at the summit. Choose from the options below.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest animate-pulse">Loading Prices</p>
          </div>
        ) : error || tiers.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-16 text-center border-2 border-dashed border-slate-100 max-w-4xl mx-auto">
             <AlertCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
             <h4 className="text-lg font-black text-slate-400 uppercase tracking-tight mb-1">Closed</h4>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Registration is currently unavailable.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
            {tiers.map((tier, index) => {
              const Icon = getIcon(tier.name);
              const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
              const isPopular = tier.name.toLowerCase().includes('platinum') || index === 0;

              return (
                <div 
                  key={tier.id} 
                  className={`relative group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`h-full bg-white p-8 rounded-2xl border ${isPopular ? 'border-blue shadow-xl shadow-blue/10 ring-1 ring-blue/10 scale-105 z-10' : 'border-slate-50 hover:border-slate-200'} transition-all flex flex-col hover:shadow-lg duration-500`}>
                    {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue text-white text-[8px] font-black rounded-full uppercase tracking-widest">Selected</div>
                    )}
                    
                    <div className="text-center mb-6">
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 shadow-sm transition-transform group-hover:rotate-12 duration-500 ${isPopular ? 'bg-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-navy mb-1 tracking-tight uppercase group-hover:text-blue">{tier.name}</h3>
                        <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest opacity-60 leading-relaxed min-h-[36px]">{tier.description}</p>
                    </div>

                    <div className="text-center mb-8 py-5 border-y border-slate-50">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xs font-black text-blue">{tier.currency}</span>
                              <span className="text-3xl font-black text-navy tracking-tighter">{tier.amount.toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Total</span>
                        </div>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex gap-3 text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-80 leading-tight">
                          <Check className={`w-3 h-3 flex-shrink-0 mt-0.5 ${isPopular ? 'text-blue' : 'text-slate-300'}`} />
                          <span className="line-clamp-2">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={`/payment/registration/${slug}`} className="text-decoration-none">
                        <Button className={`w-full h-12 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg ${isPopular ? 'bg-blue hover:bg-navy shadow-blue/10' : 'bg-navy hover:bg-blue shadow-navy/20'} text-white`}>
                            Book Now
                        </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-5 px-8 py-6 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-white hover:border-blue/20 hover:shadow-xl transition-all duration-700">
             <div className="w-12 h-12 bg-blue/5 rounded-xl flex items-center justify-center text-blue group-hover:scale-110 transition-transform flex-shrink-0">
                <Users className="w-6 h-6" />
             </div>
             <div className="text-left">
                <p className="text-xs font-black text-navy uppercase tracking-tight mb-0.5">Groups</p>
                <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest opacity-80">Special rates for 5 or more people.</p>
             </div>
          </div>
          <div className="flex items-center gap-5 px-8 py-6 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:bg-white hover:border-blue/20 hover:shadow-xl transition-all duration-700">
             <div className="w-12 h-12 bg-blue/5 rounded-xl flex items-center justify-center text-blue group-hover:scale-110 transition-transform flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
             </div>
             <div className="text-left">
                <p className="text-xs font-black text-navy uppercase tracking-tight mb-0.5">Students</p>
                <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest opacity-80">Lower prices and career help for all students.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// End of file
