import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Dr. Maria Rodriguez',
    role: 'Research Scientist',
    institution: 'University of Barcelona',
    country: 'Spain',
    image: '/speaker-2.jpg',
    quote: 'The 2024 summit was an incredible experience. The quality of presentations and the networking opportunities exceeded my expectations. I made connections that led to two collaborative research projects.',
    rating: 5,
    year: '2024',
  },
  {
    name: 'Prof. Michael Chen',
    role: 'Department Head',
    institution: 'National University of Singapore',
    country: 'Singapore',
    image: '/speaker-3.jpg',
    quote: 'This conference has become a must-attend event in our field. The organizers bring together the best minds in agrotech, food science, and animal welfare, creating an environment where innovation thrives.',
    rating: 5,
    year: '2024',
  },
  {
    name: 'Dr. Elena Kowalski',
    role: 'Industry Researcher',
    institution: 'BASF',
    country: 'Germany',
    image: '/speaker-4.jpg',
    quote: 'As an industry researcher, I found the balance between academic and industrial perspectives perfect. The expo showcased cutting-edge technologies that we are now evaluating for implementation.',
    rating: 5,
    year: '2023',
  },
  {
    name: 'Prof. Ahmed Hassan',
    role: 'PhD Student',
    institution: 'Cairo University',
    country: 'Egypt',
    image: '/speaker-5.jpg',
    quote: 'The student program was exceptional. I received invaluable feedback on my research and met potential collaborators from around the world. The student discount made it accessible.',
    rating: 5,
    year: '2023',
  },
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => setActiveIndex((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[10px] font-black text-blue uppercase tracking-widest">Feedback</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-navy uppercase tracking-tight">Global Reputation</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Trusted by world-renowned scientists and industry leaders from across the globe.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Active Content */}
            <div className={`lg:col-span-8 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <div className="relative">
                    <Quote className="absolute -top-10 -left-10 w-24 h-24 text-slate-50 opacity-10" />
                    <blockquote className="text-2xl lg:text-3xl font-black text-navy uppercase tracking-tight leading-snug">
                       "{testimonials[activeIndex].quote}"
                    </blockquote>
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50">
                        <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                        <p className="text-lg font-black text-navy uppercase tracking-tight">{testimonials[activeIndex].name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{testimonials[activeIndex].role} @ {testimonials[activeIndex].institution}</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className={`lg:col-span-4 space-y-3 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {testimonials.map((t, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)} className={`w-full p-4 rounded-xl border transition-all text-left flex items-center gap-4 ${i === activeIndex ? 'bg-navy border-navy text-white shadow-xl shadow-navy/10' : 'bg-white border-slate-100 text-navy hover:border-blue/20'}`}>
                        <div className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 ${i === activeIndex ? 'ring-2 ring-white/20' : ''}`}>
                            <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-tight truncate">{t.name}</p>
                            <p className={`text-[8px] font-black uppercase tracking-widest opacity-40 truncate ${i === activeIndex ? 'text-white' : 'text-slate-400'}`}>{t.country}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <div className={`mt-20 pt-12 border-t border-slate-50 grid grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { value: '95%', label: 'Metric Satisfaction' },
            { value: '88%', label: 'Return Engagement' },
            { value: '4.9/5', label: 'Average Endorsement' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-navy uppercase tracking-tight">{s.value}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
