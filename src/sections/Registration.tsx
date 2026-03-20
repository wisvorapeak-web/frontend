import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  Mic2, 
  FileText,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Speaker Registration',
    earlyPrice: '$749',
    standardPrice: '$849',
    description: 'Present your research to the world',
    icon: Mic2,
    features: [
      'Speaker Certificate',
      'Conference Program Inclusion',
      'E-Abstract Book Publication',
      'Research Paper Publication',
      'Complimentary Meals',
      'Full Session Access',
    ],
    highlighted: true,
    slug: 'speaker'
  },
  {
    name: 'Delegate Registration',
    earlyPrice: '$899',
    standardPrice: '$999',
    description: 'Network with industry leaders',
    icon: Users,
    features: [
      'Conference Program Inclusion',
      'E-Abstract Book Publication',
      'Research Paper Publication',
      'Complimentary Meals',
      'Full Session Access',
    ],
    highlighted: false,
    slug: 'delegate'
  },
  {
    name: 'Poster Registration',
    earlyPrice: '$449',
    standardPrice: '$549',
    description: 'Visual research presentation',
    icon: FileText,
    features: [
      'Conference Program Inclusion',
      'E-Abstract Book Publication',
      'Complimentary Meals',
      'Full Session Access',
    ],
    highlighted: false,
    slug: 'poster'
  },
  {
    name: 'Student Registration',
    earlyPrice: '$399',
    standardPrice: '$599',
    description: 'Join as a young researcher',
    icon: GraduationCap,
    features: [
      'E-Abstract Book Publication',
      'Complimentary Meals',
      'Full Session Access',
      'Student Certificate',
    ],
    highlighted: false,
    slug: 'student'
  },
];



export default function Registration() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="registration" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-xs font-bold text-blue">Registration</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-navy">Registration</h2>
          <p className="text-slate-500 text-sm font-medium max-w-2xl mx-auto leading-loose opacity-60">
            Secure your spot at the most influential global summit for AgroTech & Animal Science. Early registration is encouraged to avail the restricted early-bird rates.
          </p>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Choose your ticket for the 2026 conference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div key={index} className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className={`h-full bg-white p-10 rounded-2xl border ${plan.highlighted ? 'border-blue shadow-2xl shadow-blue/5 ring-4 ring-blue/5' : 'border-slate-100 hover:border-slate-200'} transition-all flex flex-col`}>
                {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue text-white text-xs font-bold rounded-full">Most Popular</div>
                )}
                
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${plan.highlighted ? 'bg-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <plan.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-xs font-semibold">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                    <div className="flex flex-col items-center justify-center gap-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-navy">{plan.earlyPrice}</span>
                          <span className="text-xs font-semibold text-blue">Early Bird</span>
                        </div>
                        <div className="flex items-baseline gap-2 opacity-40">
                          <span className="text-lg font-bold text-navy">{plan.standardPrice}</span>
                          <span className="text-xs font-semibold text-navy">Standard</span>
                        </div>
                    </div>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-xs font-medium text-slate-500">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-blue' : 'text-slate-300'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link to={`/pay/registration/${plan.slug}`}>
                    <Button className={`w-full h-12 rounded-xl text-sm font-bold ${plan.highlighted ? 'bg-blue hover:bg-black' : 'bg-navy hover:bg-black'} text-white transition-all`}>
                        Register Now
                    </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

          <div className="inline-flex flex-col md:flex-row items-center gap-8 px-10 py-8 bg-slate-50 rounded-[3rem] border border-slate-100 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
               <Users className="w-8 h-8 text-blue" />
               <div className="text-left">
                  <p className="text-sm font-bold text-navy">Group Participation Benefits</p>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed">Register 5+ delegates to receive exclusive group incentives and dedicated session access.</p>
               </div>
            </div>
            <div className="h-px md:h-8 w-full md:w-px bg-slate-200" />
            <div className="flex items-center gap-4">
               <GraduationCap className="w-8 h-8 text-blue" />
               <div className="text-left">
                  <p className="text-sm font-bold text-navy">Student Support</p>
                  <p className="text-xs font-semibold text-slate-400 leading-relaxed">Students receive specialized mentorship and discounted access to all workshops.</p>
               </div>
            </div>
          </div>
      </div>
    </section>
  );
}

// End of file
