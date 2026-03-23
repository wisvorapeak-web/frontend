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
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const icons: any = {
  Globe, Zap, Database, CloudSun, Droplets, Dna, Sprout, HeartPulse, 
  Binary, Beef, Apple, Factory, Tablet, Cpu, Building2, Truck, 
  QrCode, Briefcase, Rocket, Gavel
};

export default function Topics() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchTopics();
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/topics`);
      if (res.ok) {
        const data = await res.json();
        setTopics(data);
      }
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="topics" className="relative py-12 bg-slate-50 overflow-hidden font-outfit">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Topics</span>
          </div>

          <h2 className="text-2xl font-black text-navy tracking-tight uppercase">Main Topics</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
            Core areas of food and farming.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">Loading Themes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => {
              const Icon = icons[topic.icon_name] || Globe;
              return (
                <Link key={index} to="/sessions" 
                  className={`group bg-white p-4 rounded-2xl border border-slate-50 hover:border-blue/20 hover:shadow-xl hover:shadow-navy/10 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${topic.color_gradient || 'from-blue-600 to-indigo-400'} flex items-center justify-center text-white mb-3 shadow-lg shadow-blue/10`}>
                    <Icon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                  </div>
                  
                  <h3 className="text-[10px] font-black text-navy mb-1 group-hover:text-blue transition-colors uppercase tracking-tight">
                    {topic.title}
                  </h3>
                  
                  <p className="text-slate-500 text-[9px] font-bold leading-relaxed opacity-70 italic whitespace-normal line-clamp-2">
                    {topic.description}
                  </p>
                  
                  <div className="mt-2 flex items-center gap-1.5 text-blue text-[7px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    Learn More <ArrowUpRight className="w-2.5 h-2.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10 border-t border-slate-200 pt-8">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-70">
            Want to present? <Link to="/abstract-submission" className="text-blue hover:underline font-black decoration-blue/30 underline-offset-4">Submit Your Research</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
