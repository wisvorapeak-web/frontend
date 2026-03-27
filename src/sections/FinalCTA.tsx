import { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Globe2, 
  Rocket, 
  Award, 
  ShieldCheck,
  Mic2,
  Users,
  Zap,
  CheckCircle2,
  Globe,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: any = {
  Globe2, Rocket, Award, ShieldCheck, Mic2, Users, Zap, CheckCircle2, Globe
};

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    fetch(`${import.meta.env.VITE_API_URL}/api/site/metrics`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setMetrics(data);
        } else {
           setMetrics([
             { label: 'Attendees', value: '4000+', icon_name: 'Globe2' },
             { label: 'Speakers', value: '150+', icon_name: 'Mic2' },
             { label: 'Countries', value: '45+', icon_name: 'Award' },
             { label: 'Exhibitors', value: '80+', icon_name: 'Rocket' }
           ]);
        }
      })
      .finally(() => setLoading(false));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-navy relative overflow-hidden font-outfit">
        {/* Backdrop */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy z-10" />
           <div className="absolute inset-0 bg-[url('/hero.png')] bg-cover bg-center opacity-30" />
        </div>

        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-5xl mx-auto px-6 relative z-20 text-center space-y-8">
            
            <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl shadow-lg">
                    <Sparkles className="w-4 h-4 text-blue animate-pulse" />
                    <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.4em] leading-none italic">Registration is Open</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tighter uppercase drop-shadow-xl">
                    The Final <span className="text-blue">Event</span>
                </h2>
                
                <p className="text-sm sm:text-base font-bold text-white/40 max-w-2xl mx-auto leading-relaxed italic uppercase tracking-widest">
                   Join the future of food and agriculture in Singapore.
                </p>
            </div>

            <div className={`flex flex-col sm:flex-row justify-center gap-4 items-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <Link to="/registration" className="w-full sm:w-auto text-decoration-none">
                    <button className="h-12 px-12 bg-blue text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-white hover:text-navy transition-all shadow-[0_15px_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-4 active:scale-95 group/btn">
                       Register Now
                       <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover/btn:bg-navy group-hover/btn:text-white transition-all">
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                       </div>
                    </button>
                </Link>

                <Link to="/abstract-submission" className="w-full sm:w-auto text-decoration-none">
                    <button className="h-12 px-10 border-2 border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-4 active:scale-95 bg-white/5 backdrop-blur-xl">
                        <FileText className="w-4 h-4 opacity-30" />
                        Submit Abstract
                    </button>
                </Link>
            </div>

            {/* Metrics */}
            <div className={`pt-10 border-t border-white/5 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {loading ? (
                  <div className="flex justify-center py-8 flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-blue animate-spin" />
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em]">Loading Stats...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-6">
                    {metrics.map((metric, i) => {
                      const Icon = iconMap[metric.icon_name] || Globe2;
                      return (
                        <div key={i} className="flex flex-col items-center gap-3 group">
                           <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20 group-hover:text-blue group-hover:bg-white/10 transition-all border border-white/5 shadow-lg group-hover:rotate-6">
                              <Icon className="w-5 h-5" />
                           </div>
                           <div className="space-y-1">
                               <p className="text-2xl font-black text-white tracking-tighter group-hover:text-blue transition-colors">
                                 {metric.value}
                               </p>
                               <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] italic">{metric.label}</p>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <p className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em] mt-6">Ascendix Global Summit &bull; Singapore 2026</p>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue via-transparent to-blue opacity-20" />
    </section>
  );
}
