import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Database, ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  const [settings, setSettings] = useState<any>({
    about_title: 'Global Event: Food, AgriTech & Animal Systems',
    about_content: 'ASFAA-2026 brings together experts from around the world to find new ways to improve food and animal farming systems.',
    about_image_url: '/venue-image-1.jpg'
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) setSettings((prev: any) => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Footer sync error:', err));

    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <section ref={sectionRef} id="about" className="relative py-16 bg-white overflow-hidden font-outfit">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative group">
              {/* Main Image */}
              <div className="relative rounded-[3rem] overflow-hidden shadow-3xl shadow-navy/20 border-8 border-white group/img transition-transform duration-1000">
                <img 
                    src={settings.about_image_url || "/venue-image-1.jpg"} 
                    alt="Innovation Hub" 
                    className="w-full h-[380px] object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Floating Status */}
              <div className="absolute -top-10 -right-10 p-8 bg-white/90 backdrop-blur-3xl shadow-3xl rounded-[2rem] border border-blue/10 animate-in fade-in zoom-in duration-1000 delay-500">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue/10 flex items-center justify-center text-blue shadow-inner group/icon">
                     <Sparkles className="w-6 h-6 animate-pulse group-hover/icon:rotate-12 transition-transform" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-navy font-black text-[10px] uppercase tracking-[0.3em] leading-none">Event 2026</p>
                    <p className="text-slate-400 text-[8px] font-black uppercase tracking-[0.4em]">Singapore</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-10 p-6 bg-navy/95 backdrop-blur-3xl shadow-3xl rounded-[2.5rem] border border-white/5 text-white max-w-[200px] animate-in fade-in slide-in-from-left-10 duration-1000 delay-700">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-10 h-10 rounded-xl bg-blue/20 flex items-center justify-center text-blue">
                     <Database className="w-5 h-5 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                   </div>
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] leading-none">Data</p>
                </div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic line-relaxed">
                    More details coming soon...
                </p>
              </div>

              {/* Glass Overlay Overlay */}
              <div className="absolute inset-0 rounded-[3rem] border border-white/20 pointer-events-none group-hover:border-blue/20 transition-colors duration-700 shadow-inner" />
            </div>
          </div>

          {/* About Text */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="space-y-6">
               <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue/5 border border-blue/10 backdrop-blur-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue animate-ping" />
                  <span className="text-[10px] font-black text-blue uppercase tracking-[0.4em]">Who We Are</span>
               </div>

               <h2 className="text-3xl lg:text-3xl font-black text-navy leading-[1.1] tracking-tighter uppercase group">
                 {settings.about_title || 'Better farming for the future'}
               </h2>

               <p className="text-slate-500 text-xs font-bold leading-relaxed max-w-xl italic opacity-80 uppercase tracking-widest decoration-blue/20 underline decoration-2 underline-offset-8">
                 {settings.about_content || 'A place for leaders in food and farming.'}
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 pt-10 items-center">
               <Link to="/about" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-navy hover:bg-blue text-white px-12 h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-2xl active:scale-95 group">
                     Read More <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
                  </Button>
               </Link>
               <div className="flex items-center gap-4 text-slate-300 font-black text-[10px] uppercase tracking-[0.3em] group">
                  <div className="w-10 h-10 border-2 border-slate-50 rounded-xl flex items-center justify-center group-hover:border-blue/20 group-hover:text-blue transition-all duration-700 bg-white shadow-sm shadow-slate-900/5 rotate-3 group-hover:rotate-0">
                    <Target className="w-5 h-5" />
                  </div>
                  World-Class Standards
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
