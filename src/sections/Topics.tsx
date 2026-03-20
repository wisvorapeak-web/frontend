import { useEffect, useRef, useState } from 'react';
import { 
  Atom, 
  Microscope, 
  Leaf, 
  Printer, 
  Recycle, 
  Brain,
  ArrowUpRight
} from 'lucide-react';

const topics = [
  {
    icon: Atom,
    title: 'Crop Science & Genetics',
    description: 'Advanced breeding, genomic selection, and crop improvement techniques.',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Microscope,
    title: 'Food Safety & Quality',
    description: 'Traceability, nutritional analysis, and food contamination detection.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Leaf,
    title: 'Animal Health & Nutrition',
    description: 'Livestock management, veterinary breakthroughs, and sustainable feed.',
    color: 'from-orange-500 to-amber-400',
  },
  {
    icon: Printer,
    title: 'Bio-resource Engineering',
    description: 'Converting biological waste into valuable agro-materials and energy.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Recycle,
    title: 'Sustainable Farming',
    description: 'Circular agriculture, soil health, and eco-friendly practice integration.',
    color: 'from-teal-500 to-cyan-400',
  },
  {
    icon: Brain,
    title: 'Agri-IoT & Automation',
    description: 'Smart farming, robotics, and drone-based agricultural monitoring.',
    color: 'from-indigo-500 to-blue-400',
  },
];

export default function Topics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="topics" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[10px] font-black text-blue uppercase tracking-widest">Event Topics</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-navy uppercase tracking-tight">What we will talk about</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Join us as we explore the most important parts of modern farming and food science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <div key={index} 
              className={`group bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue/20 hover:shadow-2xl hover:shadow-navy/5 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-blue/10`}>
                <topic.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-lg font-black text-navy uppercase tracking-tight mb-3 group-hover:text-blue transition-colors">
                {topic.title}
              </h3>
              
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">
                {topic.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-blue text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Learn More <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 pb-8">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Interested in presenting? <a href="#contact" className="text-blue hover:underline">Submit your proposal</a>
          </p>
        </div>
      </div>
    </section>
  );
}
