import { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Train, Hotel, Car } from 'lucide-react';

const travelInfo = [
  {
    icon: Plane,
    title: 'By Air',
    description: 'Warsaw Chopin Airport (WAW) is 10km from the venue. Direct flights from major European cities.',
  },
  {
    icon: Train,
    title: 'By Train',
    description: 'Warszawa Centralna railway station is well-connected to European rail network.',
  },
  {
    icon: Car,
    title: 'By Car',
    description: 'Venue offers underground parking. Accessible via A2 and S8 highways.',
  },
  {
    icon: Hotel,
    title: 'Accommodation',
    description: 'Special rates at partner hotels within walking distance of the venue.',
  },
];

export default function Venue() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="venue" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[10px] font-black text-blue uppercase tracking-widest">The Location</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-navy uppercase tracking-tight">Warsaw, Poland</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Experience the cultural heart of Europe at the Polin Conference Center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="text-xl font-black text-navy uppercase tracking-tight">Main Venue</h3>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed opacity-80">
                    The Polin Conference Center is a premier destination for academic and professional summits, 
                    offering world-class facilities in a historic setting.
                </p>
                <div className="flex items-center gap-3 pt-4 text-blue">
                    <MapPin className="w-5 h-5" />
                    <p className="text-[11px] font-black uppercase tracking-widest">ul. Dobra 1, Warsaw</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {travelInfo.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-3 hover:border-blue/20 transition-all">
                  <t.icon className="w-6 h-6 text-blue opacity-40" />
                  <div>
                    <p className="text-[11px] font-black text-navy uppercase tracking-widest mb-1">{t.title}</p>
                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-tight line-clamp-2">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl aspect-video relative group">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.6367004366!2d21.0118!3d52.2297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97ae5311f2c51!2sWarsaw%2C%20Poland!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                    loading="lazy"
                />
            </div>
            
            <div className="mt-6 flex justify-between items-center px-4">
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Local Time</p>
                    <p className="text-sm font-black text-navy uppercase">Central European (UTC+1)</p>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg Temp</p>
                    <p className="text-sm font-black text-blue uppercase">18-24°C / 64-75°F</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
