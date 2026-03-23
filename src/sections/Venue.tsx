import { useEffect, useRef, useState } from 'react';
import { MapPin, Plane, Hotel, Globe, Info, Sparkles, Map as MapIcon, ArrowUpRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const iconMap: any = {
  Plane, Globe, Hotel, Info
};

export default function Venue() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [travelInfo, setTravelInfo] = useState<any[]>([]);
  const [venue, setVenue] = useState<any>({
    venue_name: 'Singapore',
    address: 'Singapore',
    city: 'Singapore',
    country: 'Singapore',
    map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.436735759942!2d103.851959!3d1.286667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da190fd5ad8619%3A0x6b81566373887413!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg'
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/venue`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/travel-info`).then(res => res.json())
    ]).then(([vData, tData]) => {
      if (vData) setVenue(vData);
      if (tData) setTravelInfo(tData);
    }).catch(err => console.error('Venue data fetch failed:', err))
      .finally(() => setLoading(false));

    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="venue" className="relative py-12 bg-slate-50 overflow-hidden font-outfit">
      {/* Background Visuals */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue animate-pulse" />
            <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Location</span>
          </div>
          <h2 className="text-2xl font-black text-navy tracking-tight uppercase">{venue.city}, {venue.country}</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
             A global center for research and business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Logistics */}
          <div className={`space-y-6 flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/20 border border-slate-50 flex flex-col gap-4 group">
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-blue">
                      <MapIcon className="w-5 h-5" />
                      <h3 className="text-lg font-black text-navy uppercase tracking-tight">Venue</h3>
                   </div>
                   <p className="text-slate-500 text-[10px] font-bold leading-relaxed opacity-70 italic">
                       {venue.description || 'A great place for international events.'}
                   </p>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-50 transition-all group-hover:bg-indigo-50/50 group-hover:border-indigo-100">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue shadow-sm">
                       <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Address</p>
                       <p className="text-[9px] font-black text-navy leading-tight uppercase tracking-tight">{venue.address}</p>
                    </div>
                </div>
            </div>

            {loading ? (
              <div className="py-10 flex items-center justify-center gap-3 bg-white/50 rounded-3xl border border-dashed border-slate-200">
                <Loader2 className="w-4 h-4 text-blue animate-spin" />
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Optimizing Logistics...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {travelInfo.map((t, i) => {
                  const Icon = iconMap[t.icon_name] || Info;
                  return (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-50 flex flex-col items-start gap-2 hover:border-blue/20 transition-all hover:-translate-y-1 group shadow-lg shadow-slate-200/10">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-blue opacity-40 group-hover:opacity-100 group-hover:bg-blue group-hover:text-white transition-all duration-500">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[9px] font-black text-navy uppercase tracking-widest">{t.title}</p>
                        <p className="text-slate-400 text-[9px] font-bold leading-relaxed line-clamp-2 italic opacity-70">{t.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-2">
               <Link to="/venue" className="text-decoration-none">
                  <Button className="w-full h-10 bg-navy text-white text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-900 transition-all shadow-xl shadow-navy/20 active:scale-95 group">
                      View Details <ArrowUpRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
               </Link>
            </div>
          </div>

          {/* Map */}
          <div className={`transition-all duration-1000 delay-500 flex flex-col h-full bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/20 border border-slate-50 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="rounded-xl overflow-hidden border border-slate-50 shadow-inner flex-1 min-h-[320px] relative group">
                <iframe
                    src={venue.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.436735759942!2d103.851959!3d1.286667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da190fd5ad8619%3A0x6b81566373887413!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg"}
                    className="w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-[2000ms]"
                    loading="lazy"
                    title="Event Venue Map"
                />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex justify-between items-end text-white">
                      <div className="space-y-0.5">
                         <p className="text-[7px] font-bold uppercase tracking-wider opacity-60">Venue</p>
                         <p className="text-xs font-black uppercase tracking-tight">{venue.venue_name}</p>
                      </div>
                      <div className="text-right space-y-0.5">
                         <p className="text-[7px] font-bold uppercase tracking-wider opacity-60">Climate</p>
                         <p className="text-xs font-black">28°C / 82°F</p>
                      </div>
                   </div>
                </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center px-2 pb-1">
                <div className="space-y-0">
                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Time Zone</p>
                    <p className="text-[9px] font-black text-navy uppercase tracking-tight">SGT (+8:00 GMT)</p>
                </div>
                <div className="text-right space-y-0">
                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Status</p>
                    <div className="flex items-center gap-1 justify-end">
                       <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                       <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tight">Open</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
