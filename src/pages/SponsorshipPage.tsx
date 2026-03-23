import PageLayout from './PageLayout';
import { 
  Building2, 
  Award, 
  Target, 
  Zap, 
  FileCheck,
  CheckCircle2,
  Mail,
  ZapIcon,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface PricingTier {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  features: string[];
}

const getTierStyle = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('platinum')) return { icon: Award, color: 'text-indigo-500 bg-indigo-50 border-indigo-100 shadow-indigo-100/50' };
  if (n.includes('gold')) return { icon: Target, color: 'text-amber-500 bg-amber-50 border-amber-100 shadow-amber-100/50' };
  if (n.includes('silver')) return { icon: Zap, color: 'text-slate-500 bg-slate-50 border-slate-100 shadow-slate-100/50' };
  if (n.includes('exhibitor')) return { icon: Building2, color: 'text-emerald-500 bg-emerald-50 border-emerald-100 shadow-emerald-100/50' };
  return { icon: ZapIcon, color: 'text-slate-400 bg-slate-50 border-slate-100' };
};

const sharedBenefits = [
  'Prominent Logo Placement',
  'Access to Attendee List',
  'Networking Gala Dinner',
  'Mention in Newsletters',
  'Social Media Spotlights'
];

export default function SponsorshipPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing`).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/sponsors`).then(r => r.json())
    ]).then(([pricingData, sponsorData]) => {
      setTiers(pricingData);
      setSponsors(sponsorData);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, []);

  const sponsorshipTiers = tiers.filter(t => t.category === 'Sponsorship');
  const exhibitorTiers = tiers.filter(t => t.category === 'Exhibition');

  return (
    <PageLayout 
      title="Partners" 
      subtitle="Partner with the summit and show your innovations to a global audience."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-12 space-y-16 font-outfit">
        
        {/* Intro */}
        <section className="relative rounded-3xl bg-navy p-10 lg:p-12 overflow-hidden shadow-2xl shadow-navy/20">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">Partnership</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase">
                        Join as a <span className="text-blue">Partner</span>
                    </h2>
                    <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-lg italic">
                       Get your brand noticed by global experts.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link to="/brochure">
                            <button className="h-12 px-10 bg-blue text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-navy transition-all shadow-xl shadow-blue/20 active:scale-95">
                                Download Guide
                            </button>
                        </Link>
                        <Link to="/sponsorship#packages">
                            <button className="h-12 px-10 border border-white/10 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all active:scale-95">
                                View Packages
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sharedBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm group hover:border-blue/30 transition-all">
                            <div className="w-6 h-6 rounded-full bg-blue/20 flex items-center justify-center text-blue">
                               <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-tight text-white/70 leading-tight">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="w-10 h-10 text-blue animate-spin" />
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Loading Partners</p>
          </div>
        ) : error ? (
           <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-100">
              <AlertCircle className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <h4 className="text-xl font-black text-slate-400 uppercase tracking-tight">Load Failed</h4>
           </div>
        ) : (
          <>
            {/* Sponsorship Tiers */}
            {sponsorshipTiers.length > 0 && (
              <section className="space-y-10">
                  <div className="text-center space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 rounded-full border border-blue/10 mb-2">
                         <Award className="w-3 h-3 text-blue" />
                         <span className="text-[8px] font-black uppercase tracking-widest text-blue">Tiers</span>
                      </div>
                      <h3 id="packages" className="text-2xl font-black text-navy tracking-tight uppercase">Partner <span className="text-blue">Packages</span></h3>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] italic">Get noticed globally</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {sponsorshipTiers.map((tier) => {
                           const { icon: TierIcon, color } = getTierStyle(tier.name);
                           const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
                           return (
                               <div key={tier.id} className="group relative flex flex-col p-6 rounded-2xl bg-white border border-slate-50 hover:border-blue/20 hover:shadow-xl hover:shadow-navy/10 transition-all duration-500 hover:-translate-y-1">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all shadow-sm ${color}`}>
                                       <TierIcon className="w-5 h-5" />
                                   </div>
                                   <h4 className="text-[11px] font-black text-navy mb-0.5 tracking-tight uppercase group-hover:text-blue">{tier.name}</h4>
                                   <div className="flex items-baseline gap-1 mb-4 py-3 border-b border-slate-50">
                                       <span className="text-[9px] font-black text-blue">{tier.currency}</span>
                                       <span className="text-2xl font-black text-navy tracking-tighter">{tier.amount.toLocaleString()}</span>
                                   </div>

                                   <ul className="space-y-2 mb-6 pr-4">
                                       {tier.features.slice(0, 6).map((benefit, j) => (
                                           <li key={j} className="flex items-start gap-2 text-[8.5px] font-black text-slate-500 uppercase tracking-tight leading-relaxed opacity-70">
                                               <div className="w-3 h-3 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                                  <FileCheck className="w-1.5 h-1.5 text-blue" />
                                               </div>
                                               {benefit}
                                           </li>
                                       ))}
                                   </ul>

                                   <Link to={`/payment/sponsorship/${slug}`} className="w-full mt-auto h-10 rounded-lg bg-navy text-white hover:bg-blue font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center shadow-lg shadow-navy/10 group-hover:shadow-blue/20 text-decoration-none">
                                      Choose Package
                                   </Link>
                               </div>
                           );
                       })}
                  </div>
              </section>
            )}

            {/* Exhibitor */}
            {exhibitorTiers.length > 0 && (
              <section className="space-y-10">
                  <div className="text-center space-y-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100 mb-2">
                         <Building2 className="w-3 h-3 text-emerald-500" />
                         <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Stalls</span>
                      </div>
                      <h3 className="text-2xl font-black text-navy tracking-tight uppercase">Exhibitor <span className="text-blue">Booths</span></h3>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] italic">Meet our audience</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {exhibitorTiers.map((tier) => {
                           const { icon: TierIcon, color } = getTierStyle(tier.name);
                           const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
                           return (
                               <div key={tier.id} className="flex flex-col p-6 rounded-2xl bg-white border border-slate-50 hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1 group">
                                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all shadow-sm ${color}`}>
                                       <TierIcon className="w-5 h-5" />
                                   </div>
                                   <h4 className="text-[11px] font-black text-navy mb-0.5 tracking-tight uppercase group-hover:text-emerald-500">{tier.name}</h4>
                                   <div className="flex items-baseline gap-1 mb-4 py-3 border-b border-slate-50">
                                       <span className="text-[9px] font-black text-blue">{tier.currency}</span>
                                       <span className="text-2xl font-black text-navy tracking-tighter">{tier.amount.toLocaleString()}</span>
                                   </div>

                                   <ul className="space-y-2 mb-6">
                                       {tier.features.slice(0, 6).map((benefit, j) => (
                                           <li key={j} className="flex items-start gap-2 text-[8.5px] font-black text-slate-500 uppercase tracking-tight leading-relaxed opacity-70">
                                               <CheckCircle2 className="w-3 h-3 text-emerald-500/40 shrink-0" />
                                               {benefit}
                                           </li>
                                       ))}
                                   </ul>

                                   <Link to={`/payment/exhibitor/${slug}`} className="w-full mt-auto h-10 rounded-lg bg-navy text-white hover:bg-emerald-600 font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center shadow-lg shadow-navy/10 group-hover:shadow-emerald-900/20 text-decoration-none">
                                      Book Booth
                                   </Link>
                               </div>
                           );
                       })}
                  </div>
              </section>
            )}
          </>
        )}
        
        {/* Our Current Partners */}
        {sponsors.length > 0 && (
          <section className="space-y-10 py-10 border-t border-slate-50 animate-in fade-in slide-in-from-bottom-10 duration-1000">
             <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-navy tracking-tight uppercase">Our Sponsors</h3>
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] opacity-80 italic">Corporate and Academic supporters</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                {sponsors.map((partner, i) => (
                  <a 
                    key={i} 
                    href={partner.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-100 hover:scale-110 transition-all duration-500 max-w-[120px]"
                  >
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                      className="w-full h-auto object-contain filter"
                    />
                  </a>
                ))}
             </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-slate-50 rounded-3xl p-10 lg:p-12 border border-slate-50 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="space-y-4 relative z-10 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-black text-navy tracking-tight leading-tight uppercase">Need Help?<br/><span className="text-blue">Contact Us</span></h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] opacity-80 italic">
                    Contact our team for any help.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
                <Link to="/contact">
                    <button className="h-12 px-10 bg-navy text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-blue transition-all w-full shadow-2xl shadow-navy/20 active:scale-95">
                        Contact
                    </button>
                </Link>
                <a href="mailto:contact@foodagriexpo.com">
                    <button className="h-12 px-10 border border-slate-100 bg-white text-navy font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all w-full flex items-center justify-center gap-3 active:scale-95">
                        <Mail className="w-3.5 h-3.5" /> Email
                    </button>
                </a>
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
