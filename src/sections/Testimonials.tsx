import { useEffect, useRef, useState } from 'react';
import { Quote, Loader2, Star } from 'lucide-react';

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
    const interval = setInterval(() => setActiveIndex((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [isVisible, testimonials]);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-12 bg-white overflow-hidden font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-8 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Reviews</span>
          </div>
          <h2 className="text-2xl font-black text-navy tracking-tight uppercase">What People Say</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
            Trusted by scientists and business leaders worldwide.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">Fetching Experiences...</p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Active Content */}
              <div className={`lg:col-span-8 space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="relative">
                      <Quote className="absolute -top-6 -left-6 w-12 h-12 text-blue opacity-5" />
                      <blockquote className="text-lg lg:text-xl font-black text-navy leading-snug uppercase tracking-tight italic opacity-90">
                         "{testimonials[activeIndex].quote}"
                      </blockquote>
                  </div>
                  
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-50 bg-slate-50 flex items-center justify-center">
                          <img 
                            src={testimonials[activeIndex].image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonials[activeIndex].name}`} 
                            alt={testimonials[activeIndex].name} 
                            className="w-full h-full object-cover grayscale" 
                          />
                      </div>
                       <div>
                          <p className="text-xs font-black text-navy uppercase tracking-tight leading-none mb-0.5">{testimonials[activeIndex].name}</p>
                          <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none italic">{testimonials[activeIndex].role} &bull; {testimonials[activeIndex].country}</p>
                      </div>
                  </div>
              </div>

              {/* List */}
              <div className={`lg:col-span-4 space-y-2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {testimonials.map((t, i) => (
                      <button key={i} onClick={() => setActiveIndex(i)} className={`w-full p-2.5 rounded-xl border transition-all text-left flex items-center gap-3 ${i === activeIndex ? 'bg-navy border-navy text-white shadow-lg' : 'bg-white border-slate-50 text-navy hover:border-blue/20'}`}>
                          <div className={`w-5 h-5 rounded-lg overflow-hidden flex-shrink-0 ${i === activeIndex ? 'ring-2 ring-white/20' : ''} bg-slate-50`}>
                              <img src={t.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-full h-full object-cover grayscale" />
                          </div>
                           <div className="min-w-0">
                              <p className="text-[8px] font-black uppercase truncate tracking-widest">{t.name}</p>
                              <p className={`text-[7px] font-bold opacity-40 truncate ${i === activeIndex ? 'text-white' : 'text-slate-400'}`}>{t.country}</p>
                          </div>
                      </button>
                  ))}
              </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-100">
             <Star className="w-10 h-10 text-slate-100 mx-auto mb-3" />
             <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">Experiences coming soon.</p>
          </div>
        )}

        <div className={`mt-12 pt-6 border-t border-slate-50 grid grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { value: '95%', label: 'Satisfied' },
            { value: '88%', label: 'Returning' },
            { value: '4.9/5', label: 'Star Rating' },
          ].map((s, i) => (
             <div key={i} className="text-center">
              <p className="text-lg font-black text-navy uppercase tracking-tighter">{s.value}</p>
              <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
