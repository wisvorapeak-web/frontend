import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Network, Lightbulb, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: Network,
    title: 'Meet People Globally',
    description: 'Connect with over 1000 researchers, leaders, and planners from all over the world.',
  },
  {
    icon: Lightbulb,
    title: 'Share Your Work',
    description: 'Present your research to an international group and get helpful feedback from experts.',
  },
  {
    icon: Handshake,
    title: 'Work with Companies',
    description: 'Find ways to partner with top companies in the agriculture industry.',
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
              <img src="/about-agrotech.png" alt="Innovation" className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 p-4 sm:p-6 bg-white/95 backdrop-blur shadow-xl rounded-2xl border border-white/20">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue flex items-center justify-center text-white font-black text-lg sm:text-xl">3</div>
                  <div>
                    <p className="text-navy font-bold text-[10px] sm:text-sm">Days of Learning</p>
                    <p className="text-slate-500 text-[8px] sm:text-xs font-semibold">Innovation & Expo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span className="text-xs font-bold text-blue">Who We Are</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Growing the Future <br />
              <span className="text-blue">Agro-Science</span>
            </h2>

            <p className="text-slate-500 text-base font-medium leading-relaxed">
              Ascendix 2026 is a top meeting for researchers and business leaders to share new ideas that will change how we produce food.
            </p>

            <div className="grid gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-6 h-6 text-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">{b.title}</h3>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed opacity-60">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/about">
              <Button className="bg-navy hover:bg-black text-white px-8 h-12 rounded-xl text-sm font-bold shadow-xl shadow-navy/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
