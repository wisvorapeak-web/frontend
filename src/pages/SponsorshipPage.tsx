import PageLayout from './PageLayout';
import { 
  Building2, 
  Award, 
  Target, 
  Zap, 
  Globe, 
  FileCheck 
} from 'lucide-react';

const tiers = [
  { 
    name: 'Platinum Tier', 
    price: '₹5,00,000', 
    benefits: ['Main stage presence', 'Large exhibit space', '10 free tickets', 'Full-page program ad'],
    icon: Award,
    color: 'text-indigo-500 bg-indigo-50 border-indigo-100 shadow-indigo-100/50'
  },
  { 
    name: 'Gold Tier', 
    price: '₹3,00,000', 
    benefits: ['Session sponsor', 'Standard booth', '6 free tickets', 'Half-page program ad'],
    icon: Target,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100 shadow-emerald-100/50'
  },
  { 
    name: 'Silver Tier', 
    price: '₹1,50,000', 
    benefits: ['Logo on website', 'Small booth', '3 free tickets', 'Quarter-page ad'],
    icon: Zap,
    color: 'text-blue-500 bg-blue-50 border-blue-100 shadow-blue-100/50'
  },
];

export default function SponsorshipPage() {
  return (
    <PageLayout 
      title="Partner with Us" 
      subtitle="Showcase your brand to leaders in farming technology and animal science."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-24">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-outfit uppercase">Why Sponsor?</h2>
              <div className="space-y-4">
                 {[
                   { t: 'Global Reach', d: 'Show your technology to thousands of decision makers and researchers.', i: Globe },
                   { t: 'Meet New Clients', d: 'Interactive exhibit space designed to help you connect with visitors.', i: Building2 },
                   { t: 'Share Your Ideas', d: 'Opportunities to sponsor key talks and special tracks.', i: FileCheck }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white transition-all group">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform"><item.i className="w-6 h-6" /></div>
                       <div>
                          <h4 className="text-lg font-bold text-slate-900 mb-1">{item.t}</h4>
                          <p className="text-slate-500 text-sm font-medium">{item.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-[3rem] rotate-3 blur-3xl opacity-10" />
              <div className="relative p-10 bg-slate-950 rounded-[3.5rem] shadow-2xl border border-white/5 space-y-8 text-white overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -translate-y-10 translate-x-10" />
                 <h3 className="text-2xl font-black font-outfit uppercase tracking-tight">2026 Prospectus</h3>
                 <p className="text-slate-400 font-medium">Download the full sponsorship and exhibitor package with booth specifications and floor plans.</p>
                 <button className="w-full h-16 rounded-[2.5rem] bg-indigo-600 hover:bg-indigo-700 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-xl shadow-indigo-600/30">
                    Download Guide (PDF)
                 </button>
              </div>
           </div>
        </section>

        {/* Pricing Tiers */}
        <section className="space-y-12">
           <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-black text-slate-900 font-outfit uppercase">Exhibition Packages</h2>
              <p className="text-slate-500 font-medium font-outfit text-sm">Select the visibility tier that aligns with your market goals.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier, i) => (
                <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-700 hover:-translate-y-2 bg-white flex flex-col items-center text-center group ${tier.color} shadow-2xl`}>
                    <div className="w-16 h-16 rounded-[2rem] bg-white border border-slate-50 flex items-center justify-center mb-8 group-hover:scale-110 shadow-lg transition-transform">
                       <tier.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black font-outfit mb-2">{tier.name}</h3>
                    <p className="text-4xl font-black font-outfit text-slate-900 mb-8">{tier.price}</p>
                    
                    <ul className="space-y-4 mb-10 text-left w-full pl-6">
                       {tier.benefits.map((ben, bi) => (
                         <li key={bi} className="text-sm font-bold text-slate-500 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors" />
                            {ben}
                         </li>
                       ))}
                    </ul>
                    
                    <button className="w-full mt-auto h-14 rounded-2xl bg-slate-900 text-white hover:bg-indigo-600 font-black uppercase text-[10px] tracking-widest transition-all">
                       Inquire Now
                    </button>
                </div>
              ))}
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
