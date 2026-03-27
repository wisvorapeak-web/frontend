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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pricingRes, sponsorsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing`),
        fetch(`${import.meta.env.VITE_API_URL}/api/site/sponsors`)
      ]);

      if (pricingRes.ok) {
         const data = await pricingRes.json();
         setTiers(data.filter((t: any) => t.is_active));
      }
      if (sponsorsRes.ok) {
         setSponsors(await sponsorsRes.json());
      }
    } catch (err) {
      console.error('Failed to sync partnership registry:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const sponsorshipTiers = tiers.filter(t => t.category === 'Sponsorship');
  const exhibitorTiers = tiers.filter(t => t.category === 'Exhibition');

  return (
    <PageLayout 
      title="Sponsorship" 
      subtitle="Join us as a sponsor and showcase your innovations."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-32 space-y-32 font-outfit animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        {/* Intro */}
        <section className="relative rounded-[3.5rem] bg-navy p-12 lg:p-20 overflow-hidden shadow-3xl shadow-navy/30">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-blue animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Sponsorship</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                        Become a <span className="text-blue">Partner</span>
                    </h2>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-relaxed max-w-lg italic opacity-80">
                        Sponsoring our event is a great way to showcase your products and connect with experts.
                       <br /><br />
                       For more info, <Link to="/contact" className="text-blue underline hover:text-white transition-colors">contact us</Link>.
                    </p>
                    <div className="flex flex-wrap gap-6 pt-4">
                        <Link to="/brochures">
                            <button className="h-16 px-12 bg-blue text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white hover:text-navy transition-all shadow-2xl shadow-blue/20 active:scale-95">
                                Download Brochure
                            </button>
                        </Link>
                        <a href="#packages">
                            <button className="h-16 px-12 border-2 border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white/5 transition-all active:scale-95">
                                View Packages
                            </button>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
                    {sharedBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xl group hover:border-blue/30 transition-all duration-500 shadow-lg">
                            <div className="w-8 h-8 rounded-xl bg-blue/10 flex items-center justify-center text-blue group-hover:scale-110 transition-transform">
                               <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading Packages...</p>
          </div>
        ) : error ? (
           <div className="bg-slate-50 rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-100 flex flex-col items-center gap-6">
              <AlertCircle className="w-16 h-16 text-slate-200" />
              <h4 className="text-2xl font-black text-slate-400 uppercase tracking-tighter opacity-50">Global Sync Failed</h4>
           </div>
        ) : (
          <>
            {/* Sponsorship Tiers */}
            {sponsorshipTiers.length > 0 && (
              <section className="space-y-16" id="packages">
                  <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue/5 rounded-full border border-blue/10 mb-2">
                         <Award className="w-3.5 h-3.5 text-blue" />
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Packages</span>
                      </div>
                      <h3 className="text-3xl lg:text-5xl font-black text-navy tracking-tight uppercase">Sponsorship <span className="text-blue">Packages</span></h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Build your brand</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {sponsorshipTiers.map((tier) => {
                           const { icon: TierIcon, color } = getTierStyle(tier.name);
                           const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
                           return (
                               <div key={tier.id} className="group relative flex flex-col p-10 rounded-[2.5rem] bg-white border border-slate-50 hover:border-blue/20 hover:shadow-3xl hover:shadow-navy/10 transition-all duration-700 hover:-translate-y-2">
                                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all shadow-md group-hover:scale-110 group-hover:rotate-12 duration-700 ${color}`}>
                                       <TierIcon className="w-6 h-6" />
                                   </div>
                                   <h4 className="text-sm font-black text-navy mb-1 tracking-tight uppercase group-hover:text-blue transition-colors">{tier.name}</h4>
                                   <div className="flex items-baseline gap-2 mb-8 py-6 border-b border-slate-50">
                                       <span className="text-xs font-black text-blue mb-1">{tier.currency}</span>
                                       <span className="text-4xl font-black text-navy tracking-tighter">{tier.amount.toLocaleString()}</span>
                                   </div>

                                   <ul className="space-y-4 mb-10">
                                       {(Array.isArray(tier.features) ? tier.features : []).slice(0, 8).map((benefit, j) => (
                                           <li key={j} className="flex items-start gap-3 group/item">
                                               <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-blue/10 group-hover/item:border-blue/20 transition-all">
                                                  <FileCheck className="w-2.5 h-2.5 text-blue/40 group-hover/item:text-blue transition-colors" />
                                               </div>
                                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-relaxed group-hover/item:text-navy transition-colors">{benefit}</span>
                                           </li>
                                       ))}
                                   </ul>

                                   <Link to={`/payment/sponsorship/${slug}`} className="w-full mt-auto h-14 rounded-2xl bg-navy text-white hover:bg-blue font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center shadow-xl shadow-navy/20 group-hover:shadow-blue/30 text-decoration-none active:scale-95">
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
              <section className="space-y-16">
                  <div className="text-center space-y-4">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-2">
                         <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Exhibition</span>
                      </div>
                      <h3 className="text-3xl lg:text-5xl font-black text-navy tracking-tight uppercase">Exhibitor <span className="text-blue">Packages</span></h3>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">Get a booth</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                      {exhibitorTiers.map((tier) => {
                           const { icon: TierIcon, color } = getTierStyle(tier.name);
                           const slug = tier.name.toLowerCase().replace(/\s+/g, '-');
                           return (
                               <div key={tier.id} className="flex flex-col p-10 rounded-[3rem] bg-white border border-slate-50 hover:border-emerald-500/20 hover:shadow-3xl hover:shadow-emerald-900/10 transition-all duration-700 hover:-translate-y-2 group relative overflow-hidden">
                                   <div className="absolute top-0 right-0 p-12 bg-emerald-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                   
                                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all shadow-md group-hover:scale-110 group-hover:rotate-12 duration-700 relative z-10 ${color}`}>
                                       <TierIcon className="w-6 h-6" />
                                   </div>
                                   <h4 className="text-sm font-black text-navy mb-1 tracking-tight uppercase group-hover:text-emerald-500 transition-colors relative z-10">{tier.name}</h4>
                                   <div className="flex items-baseline gap-2 mb-8 py-6 border-b border-slate-50 relative z-10">
                                       <span className="text-xs font-black text-blue mb-1">{tier.currency}</span>
                                       <span className="text-4xl font-black text-navy tracking-tighter">{tier.amount.toLocaleString()}</span>
                                   </div>

                                   <ul className="space-y-4 mb-10 relative z-10">
                                       {(Array.isArray(tier.features) ? tier.features : []).slice(0, 8).map((benefit, j) => (
                                           <li key={j} className="flex items-start gap-3 group/item">
                                               <CheckCircle2 className="w-4 h-4 text-emerald-500/30 group-hover/item:text-emerald-500 shrink-0 mt-0.5 transition-colors" />
                                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight leading-relaxed group-hover/item:text-navy transition-colors">{benefit}</span>
                                           </li>
                                       ))}
                                   </ul>

                                   <Link to={`/payment/exhibition/${slug}`} className="w-full mt-auto h-14 rounded-2xl bg-navy text-white hover:bg-emerald-600 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center shadow-xl shadow-navy/20 group-hover:shadow-emerald-900/30 text-decoration-none active:scale-95 relative z-10">
                                      Book Now
                                   </Link>
                               </div>
                           );
                       })}
                  </div>
              </section>
            )}
          </>
        )}
        
        {/* Global Partner Ledger */}
        {sponsors.length > 0 && (
          <section className="space-y-16 py-16 border-t border-slate-50 animate-in fade-in duration-1000">
             <div className="text-center space-y-4">
                <h3 className="text-3xl font-black text-navy tracking-tight uppercase">Our Partners</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-60 italic">Our Sponsors</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-16 items-center justify-items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
                {sponsors.map((partner, i) => (
                  <a 
                    key={i} 
                    href={partner.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-100 hover:scale-125 transition-all duration-700 max-w-[140px]"
                  >
                    <img 
                      src={partner.logo_url} 
                      alt={partner.name} 
                      className="w-full h-auto object-contain"
                    />
                  </a>
                ))}
             </div>
          </section>
        )}

        {/* Global Command CTA */}
        <section className="bg-navy rounded-[4rem] p-16 lg:p-24 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-3xl shadow-navy/40 group">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-blue/15 transition-colors duration-1000" />
            <div className="space-y-8 relative z-10 text-center lg:text-left">
                <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">Get in <span className="text-blue">Touch</span></h3>
                <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[11px] italic opacity-80">
                    We are here to help you.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto relative z-10">
                <Link to="/contact" className="flex-1 min-w-[240px]">
                    <button className="h-20 px-12 bg-white text-navy font-black text-[11px] uppercase tracking-[0.4em] rounded-3xl hover:bg-blue hover:text-white transition-all w-full shadow-2xl active:scale-95">
                        Contact Us
                    </button>
                </Link>
                <a href="mailto:contact@asfaa2026.com" className="flex-1 min-w-[240px]">
                    <button className="h-20 px-12 border-2 border-white/10 bg-white/5 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-3xl hover:bg-white hover:text-navy transition-all w-full flex items-center justify-center gap-4 active:scale-95">
                        <Mail className="w-5 h-5" /> Email Us
                    </button>
                </a>
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
