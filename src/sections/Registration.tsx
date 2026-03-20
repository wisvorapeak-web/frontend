import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Early Bird',
    price: '₹15,000',
    originalPrice: '₹18,000',
    period: 'Until May 31',
    description: 'Best value for early registrants',
    icon: Sparkles,
    features: [
      'Full conference access',
      'All keynote sessions',
      'Conference materials',
      'Lunch & refreshments',
      'Networking events',
      'Certificate of attendance',
    ],
    highlighted: false,
    color: 'border-gray-200',
    badgeColor: 'bg-gray-100 text-gray-600',
  },
  {
    name: 'Standard',
    price: '₹20,000',
    originalPrice: null,
    period: 'June 1-10',
    description: 'Regular conference registration',
    icon: Zap,
    features: [
      'Full conference access',
      'All keynote sessions',
      'Conference materials',
      'Lunch & refreshments',
      'Networking events',
      'Certificate of attendance',
      'Priority seating',
    ],
    highlighted: true,
    color: 'border-blue',
    badgeColor: 'bg-blue text-white',
  },
  {
    name: 'On-site',
    price: '₹25,000',
    originalPrice: null,
    period: 'June 24-26',
    description: 'Last-minute registration',
    icon: Crown,
    features: [
      'Full conference access',
      'All keynote sessions',
      'Conference materials',
      'Lunch & refreshments',
      'Networking events',
      'Certificate of attendance',
      'Express check-in',
    ],
    highlighted: false,
    color: 'border-gray-200',
    badgeColor: 'bg-gray-100 text-gray-600',
  },
];

// Registration Form Component
const RegistrationForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration initiated! Please check your email for payment instructions.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="regFirstName">First Name</Label>
          <Input id="regFirstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="regLastName">Last Name</Label>
          <Input id="regLastName" placeholder="Doe" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="regEmail">Email</Label>
        <Input id="regEmail" type="email" placeholder="john.doe@email.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="regInstitution">Institution/Company</Label>
        <Input id="regInstitution" placeholder="Your organization" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Input id="country" placeholder="Your country" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ticketType">Registration Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select registration type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early">Early Bird (₹15,000)</SelectItem>
            <SelectItem value="standard">Standard (₹20,000)</SelectItem>
            <SelectItem value="student">Student (₹8,000)</SelectItem>
            <SelectItem value="onsite">On-site (₹25,000)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-navy hover:bg-navy-700">
        Complete Registration
      </Button>
    </form>
  );
};

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
            <span className="text-[10px] font-black text-blue uppercase tracking-widest">Registration</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black text-navy uppercase tracking-tight">Access Passes</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Choose your conference pass based on your professional requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div key={index} className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className={`h-full bg-white p-10 rounded-2xl border ${plan.highlighted ? 'border-blue shadow-2xl shadow-blue/5 ring-4 ring-blue/5' : 'border-slate-100 hover:border-slate-200'} transition-all flex flex-col`}>
                {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue text-white text-[9px] font-black uppercase tracking-widest rounded-full">Standard Choice</div>
                )}
                
                <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${plan.highlighted ? 'bg-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                        <plan.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-navy uppercase tracking-tight mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl font-black text-navy">{plan.price}</span>
                        {plan.originalPrice && <span className="text-sm text-slate-300 line-through font-bold">{plan.originalPrice}</span>}
                    </div>
                    <p className="text-blue text-[9px] font-black uppercase tracking-widest mt-1 opacity-60">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-blue' : 'text-slate-300'}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className={`w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest ${plan.highlighted ? 'bg-blue hover:bg-black' : 'bg-navy hover:bg-black'} text-white transition-all`}>
                            Reserve Spot
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader><DialogTitle className="text-xl font-black uppercase tracking-tight text-navy">Registration Form</DialogTitle></DialogHeader>
                        <RegistrationForm />
                    </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
            <GraduationCap className="w-6 h-6 text-blue" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Student Discount: <span className="text-navy">50% Reduction</span> available on all tiers with valid ID.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { GraduationCap } from 'lucide-react';
