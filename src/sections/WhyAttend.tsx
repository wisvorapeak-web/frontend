import { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  FlaskConical, 
  ArrowRight,
  Loader2,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const icons: any = {
  FlaskConical,
  GraduationCap,
  Briefcase
};

export default function WhyAttend() {
  const [audiences, setAudiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchAudiences();
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchAudiences = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/audiences`);
      if (res.ok) {
        setAudiences(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch audiences:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="why-attend" className="relative py-16 bg-white overflow-hidden font-outfit">
      {/* Aesthetic Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-100/50 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 backdrop-blur-xl">
              <Zap className="w-3.5 h-3.5 text-blue animate-pulse" />
              <span className="text-[10px] font-black text-blue uppercase tracking-[0.3em] leading-none">Why Attend</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tight leading-tight uppercase">
              Building the <span className="text-blue">Future</span> of Food
            </h2>
          </div>
          <div className="lg:text-right">
             <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] italic max-w-sm ml-auto opacity-70">
                A big event for experts and leaders in food and farming.
             </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {audiences.map((a, i) => {
              const Icon = icons[a.icon_name] || Briefcase;
              return (
                <div key={i} className={`group relative bg-white p-10 rounded-[3rem] border border-slate-50 hover:border-blue/20 hover:shadow-3xl hover:shadow-navy/10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                  {/* Card Glow */}
                  <div className="absolute inset-0 bg-blue/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-1000 rounded-[3rem] -z-10" />
                  
                  <div className="flex items-start justify-between mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue/5 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 shadow-sm border border-blue/10">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Sparkles className="w-5 h-5 text-blue/10 group-hover:text-blue/40 transition-colors duration-1000" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="text-blue text-[10px] font-black uppercase tracking-[0.3em] mb-2 opacity-60 group-hover:opacity-100 transition-opacity">{a.subtitle}</p>
                      <h3 className="text-2xl font-black text-navy uppercase tracking-tighter leading-tight group-hover:text-blue transition-colors duration-500">{a.title}</h3>
                    </div>
                    
                    <p className="text-slate-500 text-xs font-bold leading-relaxed opacity-60 italic group-hover:opacity-100 transition-opacity duration-700">
                      {a.description}
                    </p>

                    <ul className="space-y-4 pt-4 border-t border-slate-50">
                      {(a.benefits || []).map((b: string, j: number) => (
                        <li key={j} className="flex items-center gap-4 text-[10px] font-black text-navy/70 uppercase tracking-tight group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue/20 group-hover/item:bg-blue group-hover/item:scale-150 transition-all" />
                          <span className="group-hover/item:translate-x-1 transition-transform">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-8">
                        <Link to={a.link_path || '#'}>
                            <Button variant="ghost" className="h-14 px-10 border-2 border-slate-50 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue hover:text-white hover:border-blue transition-all w-full flex items-center justify-between group/btn active:scale-95 shadow-lg shadow-slate-900/5">
                                Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={`mt-24 pt-12 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { value: '2500+', label: 'People Coming', icon: GraduationCap },
            { value: '50+', label: 'Main Talks', icon: ShieldCheck },
            { value: '500k', label: 'Money for Research', icon: Zap },
          ].map((s, i) => (
             <div key={i} className="flex items-center gap-6 p-6 rounded-3xl hover:bg-slate-50 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue/5 flex items-center justify-center text-blue/40 group-hover:text-blue group-hover:scale-110 transition-all duration-500">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-navy uppercase tracking-tighter leading-none">{s.value}</p>
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] leading-none mt-2 group-hover:text-blue/60 transition-colors">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
