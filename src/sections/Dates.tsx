import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';

interface ImportantDate {
    id: string;
    event: string;
    date: string;
    description: string;
    is_active: boolean;
}

export default function Dates() {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchDates = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/dates`);
            const data = await res.json();
            setDates(data);
        } catch (error) {
            console.error('Failed to fetch important dates:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchDates();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || dates.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dates.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, dates]);

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('deadline') || t.includes('ends')) return Clock;
    if (t.includes('acceptance') || t.includes('notified')) return CheckCircle2;
    if (t.includes('summit') || t.includes('dates')) return Calendar;
    return Circle;
  };

  return (
    <section ref={sectionRef} id="dates" className="relative py-24 bg-navy overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 mb-6 font-outfit"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Mark Your Calendar</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 font-outfit"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}
          >
            Important Dates
          </h2>
        </div>

        <div className="relative min-h-[400px]">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
          
          <div className="space-y-8 lg:space-y-0">
            {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                ))
            ) : dates.length > 0 ? (
                dates.map((item, index) => {
                    const isLeft = index % 2 === 0;
                    const isActive = index <= activeIndex;
                    const Icon = getIcon(item.event);
                    const isHigh = item.event.toLowerCase().includes('summit') || item.event.toLowerCase().includes('deadline');
      
                    return (
                      <div key={item.id} className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:mt-8"
                        style={{
                          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                          opacity: isVisible ? 1 : 0,
                          transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.1}s`,
                        }}
                      >
                        <div className={`${isLeft ? 'lg:pr-16 lg:text-right text-left' : 'lg:col-start-2 lg:pl-16 text-left'}`}>
                          <div className={`relative p-8 rounded-[2rem] transition-all duration-700
                              ${isHigh ? 'bg-indigo-600/20 border border-indigo-500/30' : 'bg-white/5 border border-white/10'}
                              ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}
                            `}
                          >
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4
                              ${isHigh ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white/80'}
                            `}>
                              <Icon className="w-4 h-4" />
                              <span className="text-xs font-black uppercase tracking-widest">{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <h3 className="text-xl font-black mb-2 text-white font-outfit uppercase tracking-tight">{item.event}</h3>
                            <p className="text-white/50 text-sm font-medium leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-indigo-500 border-indigo-500 scale-150' : 'bg-navy border-white/30'}`} />
                        </div>
                      </div>
                    );
                })
            ) : (
                <div className="py-20 text-center text-white/40">No dates recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
