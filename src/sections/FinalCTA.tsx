import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Globe2, 
  Rocket, 
  Award, 
  ShieldCheck,
  Mic2,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: any = {
  Globe2,
  Rocket,
  Award,
  ShieldCheck,
  Mic2
};

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchMetrics();
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/metrics`);
      if (res.ok) {
        setMetrics(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-navy relative overflow-hidden font-outfit">
        {/* Institutional Backdrop Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-600/20 to-transparent" />
        
        {/* Dynamic Light Architectures */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-5xl mx-auto px-6 relative z-20 text-center space-y-12">
            
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                    <Sparkles className="w-3.5 h-3.5 text-blue animate-pulse" />
                    <span className="text-[9px] font-black text-white/70 uppercase tracking-widest leading-none">Registration Open</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight uppercase">
                    Join the Future of <span className="text-blue">Agriculture</span>
                </h2>
                
                <p className="text-base sm:text-lg font-medium text-white/50 max-w-2xl mx-auto leading-relaxed italic px-6">
                    Join experts in Singapore for our major summit. <br className="hidden sm:block" />
                    Book your place at the most important meeting of the year.
                </p>
            </div>

            <div className={`flex flex-col sm:flex-row justify-center gap-5 transition-all duration-1000 delay-500 items-center ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <Link to="/registration" className="w-full sm:w-auto text-decoration-none">
                    <Button className="h-12 px-10 bg-blue hover:bg-white hover:text-navy text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 active:scale-95 group relative overflow-hidden text-decoration-none border-0">
                        Register Now
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform border-0" />
                    </Button>
                </Link>

                <Link to="/abstract-submission" className="w-full sm:w-auto text-decoration-none">
                    <Button variant="ghost" className="h-12 px-10 border-2 border-white/10 text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 active:scale-95 bg-white/5 backdrop-blur-md text-decoration-none">
                        <FileText className="w-4 h-4 opacity-50" />
                        Submit Research
                    </Button>
                </Link>
            </div>

            {/* Event Metrics */}
            <div className={`pt-20 border-t border-white/10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {loading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="w-6 h-6 text-blue animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 pb-8">
                    {metrics.map((metric, i) => {
                      const Icon = iconMap[metric.icon_name] || Globe2;
                      return (
                        <div key={i} className="flex flex-col items-center gap-4 group">
                           <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/20 group-hover:text-white group-hover:bg-blue/20 transition-all border border-white/5">
                              <Icon className={`w-4 h-4`} />
                           </div>
                           <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider text-center leading-relaxed max-w-[140px] group-hover:text-white transition-colors">
                            {metric.value} {metric.label}
                           </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <p className="text-[8px] font-bold text-white/10 uppercase tracking-[0.5em] mt-12 mb-4">Ascendix Summit Series &bull; 2026</p>
                <div className="flex justify-center items-center gap-8 opacity-20 flex-wrap">
                    {['IARI', 'CIMMYT', 'FAO', 'ICAR', 'WHO'].map((inst, i) => (
                        <span key={i} className="text-[10px] font-bold text-white tracking-widest">{inst}</span>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
}
