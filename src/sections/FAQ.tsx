import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Loader2, HelpCircle, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchFaqs();
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/faqs`);
      if (res.ok) {
        setFaqs(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="faq" className="relative py-12 bg-slate-50 overflow-hidden font-outfit">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <Sparkles className="w-3 h-3 text-blue animate-pulse" />
            <span className="text-[9px] font-black text-blue uppercase tracking-[0.3em] leading-none">Help Center</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black text-navy tracking-tight leading-tight uppercase">Common <span className="text-blue">Questions</span></h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] italic max-w-md mx-auto opacity-70">
            Find answers to common questions about the event.
          </p>
        </div>

        {loading ? (
          <div className="py-10 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px] animate-pulse">Loading Questions...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className={`group relative bg-white/40 backdrop-blur-xl rounded-xl border ${openIndex === i ? 'border-blue/20 ring-1 ring-blue/5 shadow-lg shadow-blue/5' : 'border-slate-100 hover:border-blue/10'} overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500 ${openIndex === i ? 'bg-blue text-white rotate-90 border-blue' : 'bg-white text-slate-300 border-slate-50 group-hover:text-blue group-hover:rotate-6'}`}>
                       {openIndex === i ? <MessageSquare className="w-3.5 h-3.5 scale-75" /> : <HelpCircle className="w-3.5 h-3.5" />}
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-tight leading-snug max-w-md ${openIndex === i ? 'text-blue' : 'text-navy'} transition-colors`}>
                      {f.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === i ? 'bg-blue/10 rotate-180' : 'bg-slate-50'}`}>
                    <ChevronDown className={`w-3.5 h-3.5 transition-colors ${openIndex === i ? 'text-blue' : 'text-slate-300'}`} />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 pl-16 text-[10px] font-bold text-slate-500 leading-relaxed opacity-80 italic">
                    <div className="p-5 bg-blue/5 rounded-xl border border-blue/5 relative">
                        <div className="absolute top-0 left-0 w-0.5 h-full bg-blue/10 rounded-full" />
                        {f.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {faqs.length === 0 && (
              <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-slate-100">
                <HelpCircle className="w-10 h-10 text-slate-100 mx-auto mb-3 opacity-50" />
                <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px] opacity-60">No questions found.</p>
              </div>
            )}
          </div>
        )}

        <div className={`mt-10 text-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
           <div className="p-8 bg-navy rounded-2xl relative overflow-hidden group shadow-xl shadow-navy/20">
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue/10 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:bg-blue/20 transition-colors" />
              
              <div className="relative z-10 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-white/40 tracking-[0.4em] uppercase italic">Still have questions?</p>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Contact <span className="text-blue">Us</span></h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/contact" className="w-full sm:w-auto text-decoration-none">
                      <button className="h-11 px-10 bg-blue text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white hover:text-navy transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3">
                        Send Message <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                    <a href="mailto:contact@foodagriexpo.com" className="w-full sm:w-auto text-decoration-none">
                       <button className="h-11 px-10 border-2 border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-3 active:scale-95">
                         Email Us
                       </button>
                    </a>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
