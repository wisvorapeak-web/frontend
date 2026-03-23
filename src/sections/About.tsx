import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Network, Lightbulb, Handshake, CheckSquare, Sparkles, Database, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: any = {
  Lightbulb,
  Network,
  Handshake,
  CheckSquare,
  Sparkles,
  Database
};

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>({
    about_title: 'The Future of Food',
    about_content: 'Join us in Singapore for a global meeting of leaders and researchers in agriculture.',
    about_image_url: '/about-agrotech.png'
  });
  const [venue, setVenue] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/venue`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/about-highlights`).then(res => res.json())
    ]).then(([sData, vData, hData]) => {
      if (sData) setSettings(sData);
      if (vData) setVenue(vData);
      if (hData) setHighlights(hData);
    }).catch(err => console.error('About data fetch failed:', err))
      .finally(() => setLoading(false));

    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-12 bg-white overflow-hidden font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Visual */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy/10 border border-slate-50 group">
              <img src={settings.about_image_url || "/about-agrotech.png"} alt="About Innovation" className="w-full h-[400px] object-cover transition-transform duration-[3000ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none" />
              
              <div className="absolute top-6 left-6 p-4 bg-white/95 backdrop-blur-2xl shadow-xl rounded-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-white">
                     <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-0">
                    <p className="text-navy font-black text-[8px] uppercase tracking-widest leading-none">Summit 2026</p>
                    <p className="text-slate-400 text-[7px] font-black uppercase tracking-[0.2em]">{venue?.host_city || 'Singapore'}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 p-4 bg-navy/95 backdrop-blur-2xl shadow-xl rounded-xl border border-white/5 text-white">
                <div className="flex items-center gap-2">
                   <Database className="w-3.5 h-3.5 text-blue" />
                   <p className="text-[7px] font-black uppercase tracking-[0.3em] leading-none">Research</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-3">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                  <span className="text-[8px] font-black text-blue uppercase tracking-[0.3em]">About</span>
               </div>

               <h2 className="text-xl lg:text-3xl font-black text-navy leading-tight tracking-tight uppercase">
                 {settings.about_title || 'The Future of Food'}
               </h2>

               <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed max-w-xl italic opacity-80">
                 {settings.about_content || 'A global conversation on the future of agriculture.'}
               </p>
            </div>

            {loading ? (
              <div className="py-10 flex items-center gap-3">
                <Loader2 className="w-4 h-4 text-blue animate-spin" />
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Loading Attributes...</span>
              </div>
            ) : (
              <div className="grid gap-4">
                {highlights.map((b, i) => {
                  const Icon = iconMap[b.icon_name] || Lightbulb;
                  return (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-blue group-hover:text-white shadow-sm border border-slate-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0">
                        <h4 className="font-black text-navy text-[10px] uppercase tracking-tight group-hover:text-blue transition-colors">{b.title}</h4>
                        <p className="text-slate-500 text-[10px] font-bold leading-relaxed max-w-xs opacity-70 italic">{b.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
               <Link to="/about">
                  <Button className="bg-navy hover:bg-slate-900 text-white px-8 h-10 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all">
                     Learn More
                  </Button>
               </Link>
               <div className="flex items-center gap-2 text-slate-300 font-black text-[8px] uppercase tracking-[0.2em] group">
                  <div className="w-7 h-7 border border-slate-100 rounded-lg flex items-center justify-center group-hover:border-blue group-hover:text-blue transition-all"><CheckSquare className="w-3.5 h-3.5" /></div>
                  Global Summit
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
