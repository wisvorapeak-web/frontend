import { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Hotel, Globe, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const travelInfo = [
  {
    icon: Plane,
    title: 'By Air',
    description: 'Indira Gandhi International Airport (DEL) is a major global hub with direct flights from all continents.',
  },
  {
    icon: Globe,
    title: 'Visa Support',
    description: 'Official invitation letters will be provided to registered international delegates for visa processing.',
  },
  {
    icon: Hotel,
    title: 'Accommodation',
    description: 'Special rates at partner 5-star hotels within the vicinity of the convention center.',
  },
  {
    icon: Info,
    title: 'Tourism',
    description: 'Explore New Delhi\'s historic landmarks including the India Gate, Lotus Temple, and Qutub Minar.',
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
            <span className="text-xs font-bold text-blue">The Location</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy">New Delhi, India</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Experience the cultural heart of India at our world-class convention center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-4">
                <h3 className="text-xl font-bold text-navy">Summit Venue</h3>
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed opacity-80">
                    The convention center is a premier destination for academic and professional summits, 
                    offering world-class facilities in the heart of India's capital.
                </p>
                <div className="flex items-center gap-3 pt-4 text-blue">
                    <MapPin className="w-5 h-5" />
                    <p className="text-xs font-bold">New Delhi, India</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {travelInfo.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-3 hover:border-blue/20 transition-all">
                  <t.icon className="w-6 h-6 text-blue opacity-40" />
                  <div>
                    <p className="text-xs font-bold text-navy mb-1">{t.title}</p>
                    <p className="text-slate-400 text-xs font-bold line-clamp-2">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
               <Link to="/venue">
                  <Button className="w-full h-14 bg-navy text-white text-xs font-bold rounded-xl hover:bg-blue transition-all">
                      More Venue Details
                  </Button>
               </Link>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl aspect-video relative group h-[450px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923154!2d77.06889753443834!3d28.527280300445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766285%3A0x513e7fe9a0038c66!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                    loading="lazy"
                />
            </div>
            
            <div className="mt-6 flex justify-between items-center px-4">
                <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400">Local Time</p>
                    <p className="text-sm font-bold text-navy">India Standard Time (IST)</p>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-xs font-bold text-slate-400">Avg Temp</p>
                    <p className="text-sm font-bold text-blue">25-30°C / 77-86°F</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
