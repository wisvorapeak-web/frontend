import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Abstract Form Component
const AbstractForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Abstract submitted successfully! We will review and get back to you soon.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john.doe@university.edu" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="institution">Institution</Label>
        <Input id="institution" placeholder="University/Organization" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic">Topic Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crop-science">Crop Science</SelectItem>
            <SelectItem value="food-safety">Food Safety</SelectItem>
            <SelectItem value="animal-health">Animal Health</SelectItem>
            <SelectItem value="printing">3D Printing</SelectItem>
            <SelectItem value="sustainability">Sustainability</SelectItem>
            <SelectItem value="ai">AI in Materials Science</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Abstract Title</Label>
        <Input id="title" placeholder="Enter your research title" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="abstract">Abstract Content</Label>
        <Textarea id="abstract" placeholder="Enter your abstract (max 300 words)" rows={4} required />
      </div>
      <Button type="submit" className="w-full bg-blue hover:bg-navy text-white text-sm font-bold h-12 rounded-xl transition-all">
        Submit Your Talk
      </Button>
    </form>
  );
};

// Registration Form Component
const RegistrationForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Registration started! Please check your email for payment steps.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

export default function FinalCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 bg-navy overflow-hidden">
      <div className="absolute inset-0">
        <img src="/cta-agrotech.png" className="w-full h-full object-cover opacity-20" alt="CTA BG" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <Sparkles className="w-3 h-3 text-blue" />
            <span className="text-xs font-bold text-white">Don't Miss Out</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-none">
            Join Us in <span className="text-blue">2026</span>
          </h2>
          
          <p className="text-lg font-medium text-white/50 max-w-2xl mx-auto">
             Meet top researchers and industry leaders at Ascendix 2026.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-16 px-10 bg-blue text-white text-sm font-bold rounded-2xl hover:bg-white hover:text-navy transition-all flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  Submit Your Talk
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-navy">Submit Your Talk</DialogTitle>
                </DialogHeader>
                <AbstractForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-16 px-10 border-white/10 text-white text-sm font-bold rounded-2xl hover:bg-white/5 transition-all">
                  Register Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-navy">Register</DialogTitle>
                </DialogHeader>
                <RegistrationForm />
              </DialogContent>
            </Dialog>
        </div>

        <div className={`pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           {['IARI', 'CIMMYT', 'FAO', 'ICAR'].map((inst, i) => (
             <span key={i} className="text-xs font-bold text-white/40">{inst}</span>
           ))}
        </div>
      </div>
    </section>
  );
}
