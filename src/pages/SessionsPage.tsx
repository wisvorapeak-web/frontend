import PageLayout from './PageLayout';
import { useState, useEffect } from 'react';
import { 
  Globe, Zap, Database, CloudSun, Droplets, Dna, Sprout, HeartPulse, 
  Beef, Apple, Factory, Tablet, Cpu, Building2, Truck, 
  QrCode, Briefcase, Rocket, Gavel, Loader2
} from 'lucide-react';

const icons: any = {
  Globe, Zap, Database, CloudSun, Droplets, Dna, Sprout, HeartPulse, 
  Binary: Database, // Fallback
  Beef, Apple, Factory, Tablet, Cpu, Building2, Truck, 
  QrCode, Briefcase, Rocket, Gavel
};

export default function SessionsPage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/topics`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTopics(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout 
      title="Tracks" 
      subtitle="Learn about our focus areas, from farming to animal care."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-16">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading Topics...</p>
          </div>
        ) : topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {topics.map((topic, i) => {
              const Icon = icons[topic.icon_name] || Globe;
              return (
                <div key={i} className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue/20 hover:shadow-3xl hover:shadow-navy/10 transition-all duration-700">
                   <div className="aspect-[4/3] w-full relative overflow-hidden bg-slate-100 p-3 pb-0">
                      <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner">
                        <img 
                          src={topic.image_url || `https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80&auto=format&fit=crop&seed=${topic.title}`} 
                          alt={topic.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                        
                        <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-3xl border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-12`}>
                          <Icon className="w-5 h-5 drop-shadow-lg" />
                        </div>
                      </div>
                   </div>

                   <div className="p-8 flex-grow flex flex-col space-y-4">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-bold text-blue bg-blue/5 px-3 py-1 rounded-full uppercase tracking-widest border border-blue/10">T{i + 1}</span>
                            <h3 className="text-lg font-black text-navy group-hover:text-blue transition-colors duration-500 uppercase tracking-tighter leading-snug">{topic.title}</h3>
                         </div>
                      </div>
                      
                      <p className="text-slate-500 text-[11px] font-bold leading-relaxed opacity-60 italic group-hover:opacity-100 transition-opacity duration-700 line-clamp-3">
                        {topic.description}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Status: Open</span>
                         <button className="text-[10px] font-black text-blue uppercase tracking-widest group-hover:text-navy transition-colors flex items-center gap-2">
                            Details <Zap className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No tracks found.</p>
          </div>
        )}

        {/* Focus Areas Footer */}
        <section className="bg-slate-950 p-10 lg:p-16 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_5%_5%,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
            <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
               <h2 className="text-2xl lg:text-3xl font-bold font-outfit uppercase tracking-tight">Making a Real Impact</h2>
               <p className="text-slate-400 text-base font-medium leading-relaxed italic opacity-80">
                  Our sessions bring together farmers, scientists, and engineers to solve food challenges.
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
