import { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  FlaskConical, 
  ArrowRight,
  Loader2
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
    <section ref={sectionRef} id="why-attend" className="relative py-12 bg-white overflow-hidden font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Why Come?</span>
          </div>
          <h2 className="text-2xl font-black text-navy tracking-tight uppercase">For Everyone</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
            Designed for researchers, students, and industry experts.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">Orchestrating Experience...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {audiences.map((a, i) => {
              const Icon = icons[a.icon_name] || Briefcase;
              return (
                <div key={i} className={`group bg-slate-50 p-6 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-navy/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue shadow-sm mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-blue text-[8px] font-black uppercase tracking-widest mb-0.5">{a.subtitle}</p>
                      <h3 className="text-lg font-black text-navy uppercase tracking-tight">{a.title}</h3>
                    </div>
                    
                    <p className="text-slate-500 text-[10px] font-bold leading-relaxed opacity-70 italic line-clamp-2">
                      {a.description}
                    </p>

                    <ul className="space-y-1.5 pt-2">
                      {(a.benefits || []).map((b: string, j: number) => (
                        <li key={j} className="flex items-center gap-2 text-[9px] font-black text-navy/60 uppercase tracking-tight">
                          <div className="w-1 h-1 rounded-full bg-blue/40" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3">
                        <Link to={a.link_path || '#'}>
                            <Button variant="ghost" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-navy hover:text-blue hover:bg-transparent">
                                Discover More <ArrowRight className="w-3 h-3 ml-2" />
                            </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={`mt-12 pt-6 border-t border-slate-50 grid grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { value: '95%', label: 'Satisfied' },
            { value: '88%', label: 'Returning' },
            { value: '4.9/5', label: 'Star Rating' },
          ].map((s, i) => (
             <div key={i} className="text-center">
              <p className="text-lg font-black text-navy uppercase tracking-tighter">{s.value}</p>
              <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
