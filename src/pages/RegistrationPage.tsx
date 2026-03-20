import PageLayout from './PageLayout';
import { 
  Users, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const pricing = [
  { 
    title: 'Professional', 
    price: '₹18,000', 
    type: 'Business/Worker', 
    features: ['Technical Sessions', 'Exhibition Access', 'Event Guide', 'Gala Dinner'],
    icon: Building2,
    color: 'bg-indigo-600 text-white shadow-indigo-600/20'
  },
  { 
    title: 'Academic', 
    price: '₹12,000', 
    type: 'Teacher/Researcher', 
    features: ['Technical Sessions', 'Poster Presentation', 'Talk Summaries', 'Lunch & Coffee'],
    icon: GraduationCap,
    color: 'bg-white text-slate-900 border-slate-100 shadow-slate-100/50'
  },
  { 
    title: 'Student', 
    price: '₹6,000', 
    type: 'PhD & Masters', 
    features: ['Learning Sessions', 'Student Forum', 'Certificate', 'Lunch Voucher'],
    icon: Users,
    color: 'bg-white text-slate-900 border-slate-100 shadow-slate-100/50'
  },
];

export default function RegistrationPage() {
  return (
    <PageLayout 
      title="Tickets" 
      subtitle="Get your tickets for the 2026 conference."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24">
        {/* Registration Tiers */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {pricing.map((tier, i) => (
              <div key={i} className={`p-10 border ${tier.title === 'Professional' ? 'border-blue bg-blue/5' : 'border-slate-100'} rounded-3xl flex flex-col items-center text-center space-y-8 hover:shadow-2xl hover:shadow-blue/5 transition-all`}>
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <tier.icon className={`w-5 h-5 ${tier.title === 'Professional' ? 'text-blue' : 'text-slate-400'}`} />
                 </div>
                 
                 <div className="space-y-1">
                    <h3 className="text-xl font-black text-navy uppercase tracking-tight">{tier.title}</h3>
                    <p className="text-[10px] font-black text-blue uppercase tracking-widest opacity-60">{tier.type}</p>
                 </div>

                 <div className="text-5xl font-black text-navy uppercase tracking-tighter">{tier.price}</div>
                 
                 <ul className="w-full space-y-4">
                    {tier.features.map((feat, fi) => (
                       <li key={fi} className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <CheckCircle2 className="w-3 h-3 text-blue" />
                          {feat}
                       </li>
                    ))}
                 </ul>
                 
                 <Link 
                    to="/register" 
                    className={`w-full h-14 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] transition-all ${tier.title === 'Professional' ? 'bg-blue text-white hover:bg-navy' : 'bg-slate-50 text-navy hover:bg-slate-100'}`}
                 >
                    Select Pass
                 </Link>
              </div>
           ))}
        </section>

        {/* Policies */}
        <section className="bg-navy p-12 lg:p-16 rounded-[2.5rem] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                 <ShieldCheck className="w-3 h-3 text-blue" />
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">Compliance</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">Registration <span className="text-blue">Manifesto</span></h2>
              <p className="text-white/40 text-[13px] font-bold uppercase tracking-wide leading-relaxed">
                 We maintain a rigorous standard of transparency and security for all 
                 international delegates. our commitment to accessibility remains paramount.
              </p>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {[
                { t: 'Cancellation', d: 'Full credit issuance up to 45 calendars prior to summit onset.' },
                { t: 'Group Incentives', d: 'Cumulative 15% reduction for cohorts exceeding 5 researchers.' },
                { t: 'Security', d: 'Standardized SSL/TLS encryption for all international transactions.' },
              ].map((item, i) => (
                <div key={i} className="p-8 border border-white/5 bg-white/5 rounded-2xl space-y-2">
                   <h4 className="text-blue text-[11px] font-black uppercase tracking-widest">{item.t}</h4>
                   <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-loose">{item.d}</p>
                </div>
              ))}
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
