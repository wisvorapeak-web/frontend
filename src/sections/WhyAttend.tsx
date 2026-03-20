import { useEffect, useRef, useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  FlaskConical, 
  ArrowRight,
  Users,
  BookOpen,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const audiences = [
  {
    icon: FlaskConical,
    title: 'For Researchers',
    subtitle: 'Make an Impact',
    description: 'Show your latest work to experts from around the world. Get helpful feedback and find people to work with.',
    benefits: [
      'Present papers and posters',
      'Network with global experts',
      'Access to latest research',
      'Publication opportunities',
    ],
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue/5',
    link: '/abstract-submission'
  },
  {
    icon: GraduationCap,
    title: 'For Students',
    subtitle: 'Start Your Career',
    description: 'Learn from top experts, find new job paths, and meet professionals in the field of agriculture.',
    benefits: [
      'Student discounts available',
      'Career development workshops',
      'Mentorship programs',
      'Poster competitions',
    ],
    color: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple/5',
    link: '/registration'
  },
  {
    icon: Briefcase,
    title: 'For Industry',
    subtitle: 'Fuel Innovation',
    description: 'Meet top researchers, see new technology, and find new partners for your business.',
    benefits: [
      'Technology showcase',
      'B2B networking',
      'Recruitment opportunities',
      'Sponsorship packages',
    ],
    color: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange/5',
    link: '/sponsorship'
  },
];

export default function WhyAttend() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="why-attend" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-xs font-bold text-blue">Why Join Us?</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy">Made for You</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            An event designed for the needs of researchers, students, and industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {audiences.map((a, i) => (
            <div key={i} className={`group bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-2xl hover:shadow-navy/5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-blue shadow-sm mb-8 group-hover:scale-110 transition-transform`}>
                <a.icon className="w-7 h-7" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-blue text-xs font-bold mb-1">{a.subtitle}</p>
                  <h3 className="text-2xl font-bold text-navy">{a.title}</h3>
                </div>
                
                <p className="text-slate-500 text-[13px] font-medium leading-relaxed opacity-80">
                  {a.description}
                </p>

                <ul className="space-y-3 pt-4">
                  {a.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-3 text-xs font-semibold text-navy/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue/40" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                    <Link to={a.link}>
                        <Button variant="ghost" className="p-0 h-auto text-xs font-bold text-navy hover:text-blue hover:bg-transparent">
                            Discover More <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-100 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { icon: Users, value: '50+', label: 'Top Speakers' },
            { icon: BookOpen, value: '100+', label: 'Study Areas' },
            { icon: Award, value: 'Awards', label: 'Research Posters' },
            { icon: Briefcase, value: 'Industry', label: 'Business Meetings' },
          ].map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <s.icon className="w-5 h-5 text-blue mx-auto mb-2 opacity-50" />
              <p className="text-2xl font-bold text-navy">{s.value}</p>
              <p className="text-xs font-semibold text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
