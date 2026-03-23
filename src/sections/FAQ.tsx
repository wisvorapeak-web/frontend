import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Loader2, HelpCircle } from 'lucide-react';

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
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-10 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Questions</span>
          </div>
          <h2 className="text-2xl font-black text-navy tracking-tight uppercase">Common Questions</h2>
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
            Quick answers to help you plan.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-blue animate-spin" />
            <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">Accessing Knowledge Base...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className={`bg-white rounded-2xl border ${openIndex === i ? 'border-blue/20 ring-4 ring-blue/5' : 'border-slate-50'} overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left group">
                  <span className={`text-[11px] font-black uppercase tracking-tight ${openIndex === i ? 'text-blue' : 'text-navy'} transition-colors`}>{f.question}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-blue' : 'text-slate-300 group-hover:text-navy'}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-5 pb-5 text-[10px] font-bold text-slate-500 leading-relaxed opacity-70 italic whitespace-normal">
                    {f.answer}
                  </div>
                </div>
              </div>
            ))}
            {faqs.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-100">
                <HelpCircle className="w-10 h-10 text-slate-100 mx-auto mb-3" />
                <p className="text-slate-300 font-bold uppercase tracking-widest text-[8px]">No FAQs available yet.</p>
              </div>
            )}
          </div>
        )}

        <div className={`mt-10 text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           <p className="text-[8px] font-black text-slate-300 mb-4 tracking-widest uppercase">More questions?</p>
           <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-all shadow-xl shadow-navy/20 active:scale-95 text-decoration-none">
             Contact
           </a>
        </div>
      </div>
    </section>
  );
}
