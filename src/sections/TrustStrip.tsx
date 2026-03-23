import { useEffect, useRef, useState } from 'react';
import { Users, Mic2, Globe, Award, BookOpen, FlaskConical, Sparkles, Loader2, Rocket, ShieldCheck } from 'lucide-react';

const iconMap: any = {
  Users, Mic2, Globe, Award, BookOpen, FlaskConical, Sparkles, Rocket, ShieldCheck
};

// Animated Counter Component
const AnimatedCounter = ({ 
  value, 
  isVisible 
}: { 
  value: string; 
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffixText = value.replace(/\d/g, '');

  useEffect(() => {
    if (!isVisible || !numericValue) return;

    let startTime: number;
    const duration = 2000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * numericValue);
      
      setDisplayValue(current.toString());
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, numericValue]);

  return (
    <span>
      {displayValue}{suffixText}
    </span>
  );
};

export default function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics] = useState<any[]>([
    { label: 'Keynote Speakers', value: '45+', icon_name: 'Mic2' },
    { label: 'Global Attendees', value: '4000+', icon_name: 'Users' },
    { label: 'Research Papers', value: '850+', icon_name: 'BookOpen' },
    { label: 'Representing Countries', value: '32+', icon_name: 'Globe' }
  ]);
  const [partners] = useState<any[]>([
    { name: 'FAO', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=FAO' },
    { name: 'CGIAR', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=CGIAR' },
    { name: 'WFP', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=WFP' },
    { name: 'WHO', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=WHO' },
    { name: 'NUS', logo_url: 'https://api.dicebear.com/7.x/initials/svg?seed=NUS' }
  ]);
  const [loading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden border-y border-slate-50 font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 space-y-10">
        
        {loading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 text-blue animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((m, i) => {
              const Icon = iconMap[m.icon_name] || Globe;
              return (
                <div key={i} className={`flex flex-col items-center text-center space-y-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-blue shadow-sm">
                     <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-0">
                     <p className="text-xl sm:text-2xl font-black text-navy tracking-tighter leading-none transition-colors">
                       <AnimatedCounter value={m.value} isVisible={isVisible} />
                     </p>
                     <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none pt-1">{m.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Partners Section */}
        <div className="space-y-8 pt-10 border-t border-slate-50">
           <div className="flex items-center gap-6">
               <div className="flex-shrink-0 flex items-center gap-3 text-blue">
                   <Sparkles className="w-3 h-3" />
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] leading-none">Our Partners</span>
               </div>
               <div className="flex-grow h-px bg-gradient-to-r from-slate-100 via-slate-50 to-transparent" />
           </div>

           <div className="relative overflow-hidden group">
             <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
             <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
             
              <div className="flex animate-marquee gap-12 items-center">
                {(partners.length > 0 ? [...partners, ...partners, ...partners] : []).map((p, i) => (
                  <div key={i} className="flex items-center gap-2 opacity-30 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 transition-all duration-500 whitespace-nowrap group/partner cursor-default">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center group-hover/partner:bg-blue/5 border border-transparent group-hover/partner:border-blue/10 transition-all">
                       <img src={p.logo_url || "https://api.dicebear.com/7.x/initials/svg?seed="+p.name} alt={p.name} className="w-4 h-4 object-contain" />
                    </div>
                    <span className="text-navy text-[9px] font-black uppercase tracking-widest">{p.name}</span>
                  </div>
                ))}
                {partners.length === 0 && (
                  <span className="text-slate-300 text-[8px] font-black uppercase tracking-widest italic opacity-50">Consortium forming...</span>
                )}
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-33.33%); } 
        }
        .animate-marquee { animation: marquee 60s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
}
