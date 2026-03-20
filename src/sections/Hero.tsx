import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Abstract Form Component
const AbstractForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    topic: '',
    title: '',
    abstract: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/submissions/abstract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Your abstract has been submitted for review.');
      setFormData({
        firstName: '', lastName: '', email: '', institution: '', topic: '', title: '', abstract: ''
      });
    } catch (error) {
      toast.error('Failed to submit. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">First Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="JOHN" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="DOE" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
          type="email" 
          placeholder="EMAIL@UNIVERSITY.EDU" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</Label>
        <Select onValueChange={(val) => setFormData({...formData, topic: val})}>
          <SelectTrigger className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest">
            <SelectValue placeholder="SELECT CATEGORY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crop-science" className="text-[10px] font-black uppercase">Crop Science & Genetics</SelectItem>
            <SelectItem value="food-safety" className="text-[10px] font-black uppercase">Food Safety & Quality</SelectItem>
            <SelectItem value="animal-health" className="text-[10px] font-black uppercase">Animal Health & Nutrition</SelectItem>
            <SelectItem value="agri-iot" className="text-[10px] font-black uppercase">Agri-IoT & Automation</SelectItem>
            <SelectItem value="sustainable-farming" className="text-[10px] font-black uppercase">Sustainable Farming</SelectItem>
            <SelectItem value="bio-engineering" className="text-[10px] font-black uppercase">Bio-resource Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full h-12 bg-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-navy transition-all" disabled={isSubmitting}>
        {isSubmitting ? 'SENDING...' : 'SUBMIT ABSTRACT'}
      </Button>
    </form>
  );
};

// Registration Form Component
const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    country: '',
    ticketType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/submissions/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Registration failed');

      toast.success('You have successfully registered.');
      setFormData({ firstName: '', lastName: '', email: '', institution: '', country: '', ticketType: '' });
    } catch (error) {
      toast.error('Registration failed. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">First Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="JOHN" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="DOE" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
          type="email" 
          placeholder="EMAIL@UNIVERSITY.EDU" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Registration Type</Label>
        <Select onValueChange={(val) => setFormData({...formData, ticketType: val})}>
          <SelectTrigger className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest">
            <SelectValue placeholder="SELECT TIER" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early" className="text-[10px] font-black uppercase">Early Bird</SelectItem>
            <SelectItem value="standard" className="text-[10px] font-black uppercase">Standard</SelectItem>
            <SelectItem value="student" className="text-[10px] font-black uppercase">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full h-12 bg-navy text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue transition-all" disabled={isSubmitting}>
        {isSubmitting ? 'PROCESSING...' : 'REGISTER NOW'}
      </Button>
    </form>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="absolute right-0 top-0 w-[50%] h-full hidden lg:block overflow-hidden pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt="Scientific Innovation"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-transparent" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[9px] text-white/50 font-black uppercase tracking-[0.2em]">AgroTech Event</span>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-blue/60 uppercase tracking-[0.4em] mb-4">Presented by WISVORA PEAK</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none uppercase tracking-tighter">
              Ascendix World Food, <br />
              <span className="text-blue">AgroTech & Animal Science</span>
            </h1>
          </div>


            <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest leading-loose max-w-lg">
              Join leading experts to advance sustainable farming, food technology, and animal health for a better future.
            </p>

          <div className="flex flex-wrap gap-10 py-6 border-y border-white/5">
            <div className="flex items-center gap-4">
              <Calendar className="w-4 h-4 text-blue opacity-40" />
              <div className="space-y-1">
                <p className="text-[8px] text-white/20 uppercase font-black tracking-widest leading-none">Dates</p>
                <p className="font-black text-[10px] text-white uppercase tracking-widest">June 24-26, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-4 h-4 text-blue opacity-40" />
              <div className="space-y-1">
                <p className="text-[8px] text-white/20 uppercase font-black tracking-widest leading-none">Location</p>
                <p className="font-black text-[10px] text-white uppercase tracking-widest">Warsaw, Poland</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
             <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 px-8 bg-blue text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-navy transition-all">
                  Submit Abstract
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle className="text-xl font-black text-navy uppercase tracking-tight">Submit <span className="text-blue">Abstract</span></DialogTitle></DialogHeader>
                <AbstractForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 px-8 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-navy transition-all">
                  Get Tickets
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle className="text-xl font-black text-navy uppercase tracking-tight">Complete <span className="text-blue">Registration</span></DialogTitle></DialogHeader>
                <RegistrationForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
