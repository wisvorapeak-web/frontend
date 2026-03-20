import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Network, Lightbulb, Handshake } from 'lucide-react';

const benefits = [
  {
    icon: Network,
    title: 'Global Networking',
    description: 'Connect with 1000+ researchers, industry leaders, and policymakers from around the world.',
  },
  {
    icon: Lightbulb,
    title: 'Research Exposure',
    description: 'Present your work to an international audience and gain valuable feedback from experts.',
  },
  {
    icon: Handshake,
    title: 'Industry Collaboration',
    description: 'Explore partnership opportunities with leading companies in the agro-tech industry.',
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img src="/about-bg.jpg" alt="Innovation" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              
              <div className="absolute bottom-8 left-8 p-6 bg-white/95 backdrop-blur shadow-xl rounded-2xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue flex items-center justify-center text-white font-black text-xl">3</div>
                  <div>
                    <p className="text-navy font-black text-sm uppercase tracking-tight">Days of Scientific</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Innovation & Expo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span className="text-[10px] font-black text-blue uppercase tracking-widest">About Conference</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-black text-navy leading-tight">
              Cultivating the Future <br />
              <span className="text-blue">Agro-Science</span>
            </h2>

            <p className="text-slate-500 text-base font-medium leading-relaxed">
              The World Summit on Food and AgroTech is the premier international platform 
              for researchers and industry leaders to share breakthroughs that define the future of sustainable food systems.
            </p>

            <div className="grid gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-6 h-6 text-blue" />
                  </div>
                  <div>
                    <h3 className="font-black text-navy text-sm uppercase tracking-tight mb-1">{b.title}</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="bg-navy hover:bg-black text-white px-8 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-navy/10">
              Explore Conference Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
