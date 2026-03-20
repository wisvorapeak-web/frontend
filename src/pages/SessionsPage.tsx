import PageLayout from './PageLayout';
import { 
  Zap, 
  FlaskConical, 
  Settings, 
  Rocket, 
  ShieldCheck, 
  Microscope,
  Leaf 
} from 'lucide-react';

const sessions = [
  { 
    title: 'Advanced Polymer Chemistry', 
    id: 'T1', 
    desc: 'Synthesis methodologies and novel reaction kinetics in macromolecular engineering.',
    icon: FlaskConical 
  },
  { 
    title: 'Biopolymers & Healthcare', 
    id: 'T2', 
    desc: 'Medical-grade silicones, biocompatible scaffolds, and pharmaceutical polymer systems.',
    icon: ShieldCheck 
  },
  { 
    title: 'Sustainable & Green Polymers', 
    id: 'T3', 
    desc: 'Biodegradable materials, circular economy approaches, and bio-based resin development.',
    icon: Leaf 
  },
  { 
    title: 'Nanocomposites & Interfaces', 
    id: 'T4', 
    desc: 'Carbon nanotube integration, graphene-reinforced matrices, and interfacial bonding study.',
    icon: Microscope 
  },
  { 
    title: '3D Printing & Fabrication', 
    id: 'T5', 
    desc: 'Additive manufacturing of polymers with gradient properties for industrial applications.',
    icon: Settings 
  },
  { 
    title: 'Aerospace & Automotive Applications', 
    id: 'T6', 
    desc: 'High-performance composites for structural endurance in extreme thermal environments.',
    icon: Rocket 
  },
];

export default function SessionsPage() {
  return (
    <PageLayout 
      title="Scientific Sessions" 
      subtitle="Diverse technical tracks spanning the full spectrum of polymer science and materials engineering."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
           {sessions.map((session, i) => (
              <div key={i} className="p-10 bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 group hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-indigo-600 group-hover:scale-150 transition-all duration-700 opacity-20 group-hover:opacity-5" />
                 
                 <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm">
                    <session.icon className="w-6 h-6" />
                 </div>
                 
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">{session.id}</span>
                       <h3 className="text-xl font-black text-slate-900 font-outfit uppercase leading-tight group-hover:text-indigo-600 transition-colors">{session.title}</h3>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{session.desc}</p>
                 </div>
                 
                 <div className="pt-8 border-t border-slate-50 mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none">Status: Call Open</span>
                    <button className="text-[10px] font-black uppercase text-indigo-600 tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                       View Details <Zap className="w-3 h-3" />
                    </button>
                 </div>
              </div>
           ))}
        </div>

        {/* Focus Areas Footer */}
        <section className="bg-slate-950 p-12 lg:p-20 rounded-[4rem] text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_5%_5%,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
           <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-black font-outfit uppercase tracking-tight">Multi-Disciplinary Impact</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                 Our sessions bring together physicists, chemists, and mechanical engineers to address the global sustainability crisis. 
                 By focusing on hybrid materials, we aim to redefine what is possible in polymer science.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
              {['Smart Materials', 'Recycling', 'AI Research', 'Conductive Polymers'].map((tag, i) => (
                <div key={i} className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-center font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors whitespace-nowrap">
                   {tag}
                </div>
              ))}
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
