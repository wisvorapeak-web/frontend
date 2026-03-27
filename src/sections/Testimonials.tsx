import { useEffect, useRef, useState } from 'react';
import { Quote, Loader2, Star, Sparkles, Globe2, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchTestimonials();
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/testimonials`);
      if (res.ok) {
        setTestimonials(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isVisible || testimonials.length === 0) return;
    const interval = setInterval(() => setActiveIndex((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(interval);
  }, [isVisible, testimonials]);

  const next = () => setActiveIndex((p) => (p + 1) % testimonials.length);
  const prev = () => setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-12 bg-white overflow-hidden font-outfit">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <Globe2 className="w-3 h-3 text-blue animate-pulse" />
            <span className="text-[9px] font-black text-blue uppercase tracking-[0.3em] leading-none">Reviews</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-navy tracking-tight leading-tight uppercase">What <span className="text-blue">People Say</span></h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] italic max-w-md mx-auto opacity-70">
            Reviews from scientists and industry leaders worldwide.
          </p>
        </div>

        {loading ? (
          <div className="py-10 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">Loading Reviews...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Quote */}
              <div className={`lg:col-span-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                  <div className="relative p-8 lg:p-10 bg-slate-50/50 backdrop-blur-xl rounded-2xl border border-slate-100/50 shadow-lg group/quote overflow-hidden">
                      <Quote className="absolute top-6 left-6 w-12 h-12 text-blue/10 rotate-12" />
                      
                      <blockquote className="relative z-10 text-lg lg:text-2xl font-black text-navy leading-[1.2] uppercase tracking-tighter italic opacity-90">
                         "{testimonials[activeIndex].quote || testimonials[activeIndex].content}"
                      </blockquote>

                      <div className="pt-6 flex items-center gap-5 relative z-10">
                          <div className="w-14 h-14 rounded-xl overflow-hidden border-3 border-white shadow-lg rotate-2 group-hover/quote:rotate-0 transition-all">
                              <img 
                                src={testimonials[activeIndex].image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonials[activeIndex].name}`} 
                                alt={testimonials[activeIndex].name} 
                                className="w-full h-full object-cover grayscale group-hover/quote:grayscale-0 transition-all" 
                              />
                          </div>
                           <div className="space-y-0.5">
                              <p className="text-sm font-black text-navy uppercase tracking-tighter leading-none group-hover/quote:text-blue transition-colors">{testimonials[activeIndex].name}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none italic opacity-70">{testimonials[activeIndex].role} &bull; {testimonials[activeIndex].country}</p>
                          </div>
                      </div>

                      {/* Nav */}
                      <div className="absolute bottom-6 right-6 flex gap-2">
                        <button onClick={prev} className="w-9 h-9 rounded-lg bg-white border border-slate-50 text-navy hover:bg-blue hover:text-white transition-all shadow-sm active:scale-90 flex items-center justify-center">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button onClick={next} className="w-9 h-9 rounded-lg bg-white border border-slate-50 text-navy hover:bg-blue hover:text-white transition-all shadow-sm active:scale-90 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                  </div>
              </div>

              {/* Sidebar */}
              <div className={`lg:col-span-4 space-y-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 italic">All Reviews</p>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
                    {testimonials.map((t, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveIndex(i)} 
                            className={`w-full group p-3 rounded-xl border transition-all text-left flex items-center gap-4 ${i === activeIndex ? 'bg-navy border-navy text-white shadow-lg shadow-navy/20 scale-[1.02]' : 'bg-white border-slate-50 text-navy hover:border-blue/20 hover:bg-slate-50'}`}
                        >
                            <div className={`relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 transition-all ${i === activeIndex ? 'ring-2 ring-blue ring-offset-2 ring-offset-navy' : 'bg-slate-100'}`}>
                                <img src={t.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className={`w-full h-full object-cover ${i === activeIndex ? 'grayscale-0' : 'grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0'}`} />
                            </div>
                             <div className="min-w-0 space-y-0.5">
                                <p className={`text-[10px] font-black uppercase truncate tracking-wider ${i === activeIndex ? 'text-white' : 'text-navy group-hover:text-blue'}`}>{t.name}</p>
                                <p className={`text-[8px] font-black tracking-[0.2em] opacity-40 truncate ${i === activeIndex ? 'text-white' : 'text-slate-400'}`}>{t.country}</p>
                            </div>
                        </button>
                    ))}
                  </div>
              </div>
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-50 flex flex-col items-center gap-4">
             <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-100">
               <Star className="w-8 h-8" />
             </div>
             <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] opacity-60">More reviews coming soon.</p>
          </div>
        )}

        {/* Metrics */}
        <div className={`mt-10 pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue/5 flex items-center justify-center text-blue shadow-sm border border-blue/10">
                  <Sparkles className="w-4 h-4" />
              </div>
              <div>
                  <p className="text-[9px] font-black text-navy uppercase tracking-widest leading-none">Overall Rating</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5 italic">98% Positive Feedback</p>
              </div>
          </div>
          <div className="flex gap-8">
            {[
              { value: '4.95/5', label: 'Event Rating' },
              { value: '200+', label: 'Total Mentions' },
              { value: '45+', label: 'Event Partners' },
            ].map((s, i) => (
               <div key={i} className="text-center border-l border-slate-100 pl-6 first:border-0 first:pl-0">
                <p className="text-lg font-black text-navy uppercase tracking-tighter group-hover:text-blue transition-colors">{s.value}</p>
                <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
