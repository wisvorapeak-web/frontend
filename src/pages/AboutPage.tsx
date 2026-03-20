import PageLayout from './PageLayout';
import { 
  Users, 
  Globe, 
  Mic2, 
  FileText, 
  Rocket 
} from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Attendees', count: '4,200+' },
    { icon: Mic2, label: 'Speakers', count: '120+' },
    { icon: Globe, label: 'Countries', count: '45+' },
    { icon: FileText, label: 'Abstracts', count: '850+' },
  ];

  return (
    <PageLayout 
      title="Scientific Context" 
      subtitle="Fostering elite dialogue in macromolecular and material innovation."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                <Rocket className="w-3 h-3 text-blue" />
                <span className="text-[9px] font-black text-blue uppercase tracking-widest">Global Outreach</span>
             </div>
             
             <h2 className="text-3xl lg:text-4xl font-black text-navy uppercase tracking-tight leading-none">
                Expanding Human <span className="text-blue">Potential</span>
             </h2>

             <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wide leading-relaxed">
                The polymers 2026 summit serves as the premier intersection for theoretical 
                excellence and industrial application. our focus remains on the sustainable 
                architecture of next-generation materials.
             </p>

             <div className="p-8 border-l-2 border-slate-100 bg-slate-50/50">
                <p className="text-navy text-[11px] font-black uppercase tracking-widest leading-loose italic opacity-60">
                   "Accelerating the global transition toward a circular economy through 
                   unprecedented multinational collaboration and engineering precision."
                </p>
             </div>
          </div>

          <div className="relative">
             <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl rotate-1 group transition-transform duration-1000 hover:rotate-0">
                <img 
                   src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80" 
                   alt="Research Lab" 
                   className="w-full h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy py-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-3xl font-black text-white uppercase tracking-tighter">{s.count}</p>
              <p className="text-[9px] font-black text-blue uppercase tracking-widest opacity-60">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Focus areas */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {[
             { title: 'Global Exchange', desc: 'Synthesizing diverse perspectives into a unified scientific trajectory.', icon: Globe },
             { title: 'Industry Link', desc: 'Direct mapping of research capabilities to practical manufacturing requirements.', icon: Rocket },
             { title: 'Early Careers', desc: 'Dedicated professional development for the next generation of materials experts.', icon: Users }
           ].map((obj, i) => (
             <div key={i} className="p-10 border border-slate-100 rounded-2xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all space-y-6">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue opacity-40">
                   <obj.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-navy uppercase tracking-tight">{obj.title}</h3>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose">{obj.desc}</p>
             </div>
           ))}
        </section>
      </div>
    </PageLayout>
  );
}
