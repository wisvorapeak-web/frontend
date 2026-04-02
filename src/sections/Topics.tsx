import { useEffect, useRef, useState } from 'react';
import { 
  Globe, 
  Zap, 
  Database, 
  CloudSun, 
  Droplets, 
  Dna, 
  Sprout, 
  HeartPulse, 
  Binary, 
  Beef, 
  Apple, 
  Factory, 
  Tablet, 
  Cpu, 
  Building2, 
  Truck, 
  QrCode, 
  Briefcase, 
  Rocket, 
  Gavel,
  ArrowUpRight,
  Loader2,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const icons: any = {
  Globe, Zap, Database, CloudSun, Droplets, Dna, Sprout, HeartPulse, 
  Binary, Beef, Apple, Factory, Tablet, Cpu, Building2, Truck, 
  QrCode, Briefcase, Rocket, Gavel
};

export default function Topics({ mobileLimit }: { mobileLimit?: number }) {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/topics`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setTopics(data);
        }
      })
      .finally(() => setLoading(false));

    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setIsVisible(true);
    }, { threshold: 0.05, rootMargin: "50px" });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="topics" className="relative py-16 bg-slate-50 overflow-hidden font-outfit">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200/50 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 backdrop-blur-xl">
            <BookOpen className="w-3.5 h-3.5 text-blue animate-pulse" />
            <span className="text-[10px] font-black text-blue uppercase tracking-[0.4em] leading-none">Event Topics</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-navy tracking-tight uppercase leading-tight">
            Main <span className="text-blue">Topics</span>
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] italic opacity-70 max-w-2xl mx-auto line-relaxed">
            Read about our key topics in food and farming.
          </p>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Loading...</p>
          </div>
        ) : topics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {topics.map((topic, index) => {
              const Icon = icons[topic.icon_name] || Globe;
              return (
                <div key={index} className={`group relative flex flex-col ${mobileLimit && index >= mobileLimit ? 'hidden md:flex' : 'flex'}`}>
                  {/* Glass Card */}
                  <div className={`flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue/20 hover:shadow-3xl hover:shadow-navy/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
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

                        <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      </div>
                    </div>
                    
                    <div className="p-8 flex-grow flex flex-col space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                           <div className={`w-1.5 h-1.5 rounded-full bg-blue opacity-40 group-hover:opacity-100 transition-opacity`} />
                           <span className="text-[9px] font-black text-blue uppercase tracking-widest opacity-80 decoration-blue/20 underline decoration-1 underline-offset-4">Topic {index + 1}</span>
                        </div>
                        <h3 className="text-lg font-black text-navy group-hover:text-blue transition-colors duration-500 uppercase tracking-tighter leading-snug">
                          {topic.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-500 text-[11px] font-bold leading-relaxed opacity-60 italic group-hover:opacity-100 transition-opacity duration-700 line-clamp-3">
                        {topic.description}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                        <Link to="/registration" className="text-[10px] font-black text-navy uppercase tracking-widest group-hover:text-blue transition-colors flex items-center gap-2">
                          Register <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-[8px] font-black text-slate-300">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-300 font-bold uppercase tracking-widest text-[10px]">No topics yet.</p>
          </div>
        )}

        {mobileLimit && topics.length > mobileLimit && (
          <div className="mt-12 flex justify-center md:hidden">
             <Link 
               to="/topics" 
               className="h-14 px-10 rounded-2xl bg-white border border-slate-200 text-blue font-black text-[10px] uppercase tracking-widest hover:bg-blue hover:text-white transition-all shadow-xl shadow-blue/5 flex items-center gap-3 decoration-none"
             >
                View All Topics <ArrowUpRight className="w-4 h-4" />
             </Link>
          </div>
        )}

        <div className={`mt-24 text-center border-t border-slate-100 pt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-12 bg-white px-8 sm:px-10 py-8 sm:py-6 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-50 shadow-xl shadow-slate-900/5 w-full sm:w-auto">
             <div className="text-center sm:text-left space-y-1">
               <p className="text-2xl font-black text-navy tracking-tighter leading-none">200+</p>
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none">Small Topics</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-100" />
            <div className="text-center sm:text-left space-y-1">
               <p className="text-2xl font-black text-navy tracking-tighter leading-none">15+</p>
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none">Groups</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-100" />
            <Link to="/abstract-submission" className="group/cta flex items-center gap-4 text-decoration-none">
               <p className="text-[11px] font-black text-blue uppercase tracking-widest group-hover/cta:text-navy transition-colors">Send Your Research</p>
               <div className="w-10 h-10 rounded-xl bg-blue/5 flex items-center justify-center text-blue group-hover/cta:bg-blue group-hover/cta:text-white transition-all shadow-sm">
                 <ArrowUpRight className="w-4 h-4" />
               </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
