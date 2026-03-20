import { useEffect, useRef, useState } from 'react';
import { Users, Mic2, Globe, Award, BookOpen, FlaskConical } from 'lucide-react';

const metrics = [
  { icon: Users, value: '1000+', label: 'Attendees', suffix: '' },
  { icon: Mic2, value: '50+', label: 'Speakers', suffix: '' },
  { icon: Globe, value: '30+', label: 'Countries', suffix: '' },
  { icon: Award, value: '100+', label: 'Research Papers', suffix: '' },
];

const collaborators = [
  { name: 'IARI India', icon: BookOpen },
  { name: 'CIMMYT', icon: FlaskConical },
  { name: 'Food & Agriculture Org', icon: Award },
  { name: 'ICAR India', icon: Globe },
  { name: 'World Food Program', icon: Users },
  { name: 'IRRI Global', icon: Mic2 },
];

// Animated Counter Component
const AnimatedCounter = ({ 
  value, 
  suffix = '', 
  isVisible 
}: { 
  value: string; 
  suffix?: string; 
  isVisible: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffixText = value.replace(/\d/g, '');

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
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
      {displayValue}{suffixText}{suffix}
    </span>
  );
};

export default function TrustStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 bg-white overflow-hidden border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <div key={i} className={`text-center space-y-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="text-3xl font-black text-navy uppercase tracking-tight">
                <AnimatedCounter value={m.value} isVisible={isVisible} />
              </p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-8">
            <div className="flex-shrink-0 text-[10px] font-black text-blue uppercase tracking-[0.2em] opacity-40">Collaborating Partners</div>
            <div className="flex-grow h-px bg-slate-100" />
        </div>

        <div className="mt-8 relative overflow-hidden">
          <div className="flex animate-marquee gap-12 items-center">
            {[...collaborators, ...collaborators].map((c, i) => (
              <div key={i} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity whitespace-nowrap">
                <c.icon className="w-5 h-5 text-navy" />
                <span className="text-navy text-[11px] font-black uppercase tracking-widest">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </section>
  );
}
