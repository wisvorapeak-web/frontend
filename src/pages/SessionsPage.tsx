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
    title: 'Crop Science & Genetics', 
    id: 'T1', 
    desc: 'New ways to improve crop yield and resist diseases through genetic research.',
    icon: FlaskConical 
  },
  { 
    title: 'Food Safety & Quality', 
    id: 'T2', 
    desc: 'Ensuring food is safe, healthy, and high-quality for everyone.',
    icon: ShieldCheck 
  },
  { 
    title: 'Sustainable Farming', 
    id: 'T3', 
    desc: 'Using eco-friendly methods and soil health to grow food for the future.',
    icon: Leaf 
  },
  { 
    title: 'Animal Health & Nutrition', 
    id: 'T4', 
    desc: 'Better care, medical treatment, and feeding for livestock and poultry.',
    icon: Microscope 
  },
  { 
    title: 'Agri-IoT & Automation', 
    id: 'T5', 
    desc: 'Using smart sensors, drones, and robots to manage farms more efficiently.',
    icon: Settings 
  },
  { 
    title: 'Bio-resource Engineering', 
    id: 'T6', 
    desc: 'Designing systems to use natural resources like water and biomass efficiently.',
    icon: Rocket 
  },
];

export default function SessionsPage() {
  return (
    <PageLayout 
      title="Meeting Sessions" 
      subtitle="Learn about the different areas we will cover, from farming technology to animal care."
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
                       <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{session.id}</span>
                       <h3 className="text-xl font-bold text-slate-900 font-outfit leading-tight group-hover:text-indigo-600 transition-colors">{session.title}</h3>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{session.desc}</p>
                 </div>

                 <div className="pt-8 border-t border-slate-50 mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Status: Call Open</span>
                    <button className="text-xs font-bold text-indigo-600 hover:translate-x-1 transition-transform inline-flex items-center gap-2">
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
              <h2 className="text-3xl font-bold font-outfit">Making a Real Impact</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                 Our sessions bring together farmers, scientists, and engineers to solve food challenges.
                 By focusing on new technology, we aim to build a more sustainable world for everyone.
              </p>
           </div>
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
               {['Smart Farming', 'Food Safety', 'AI in Agri', 'Animal Health'].map((tag, i) => (
                 <div key={i} className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-center font-bold text-xs hover:bg-white/10 transition-colors whitespace-nowrap">
                    {tag}
                 </div>
               ))}
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
