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
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-400">First Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
            placeholder="John" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-400">Last Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
            placeholder="Doe" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400">Email</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
          type="email" 
          placeholder="email@university.edu" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400">Category</Label>
        <Select onValueChange={(val) => setFormData({...formData, topic: val})}>
          <SelectTrigger className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crop-science" className="text-sm font-semibold">Crop Science & Genetics</SelectItem>
            <SelectItem value="food-safety" className="text-sm font-semibold">Food Safety & Quality</SelectItem>
            <SelectItem value="animal-health" className="text-sm font-semibold">Animal Health & Nutrition</SelectItem>
            <SelectItem value="agri-iot" className="text-sm font-semibold">Agri-IoT & Automation</SelectItem>
            <SelectItem value="sustainable-farming" className="text-sm font-semibold">Sustainable Farming</SelectItem>
            <SelectItem value="bio-engineering" className="text-sm font-semibold">Bio-resource Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full h-12 bg-blue text-white text-sm font-bold rounded-xl hover:bg-navy transition-all" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Your Talk'}
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
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-400">First Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
            placeholder="John" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-400">Last Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
            placeholder="Doe" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400">Email</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold focus:bg-white focus:border-blue transition-all"
          type="email" 
          placeholder="email@university.edu" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400">Registration Type</Label>
        <Select onValueChange={(val) => setFormData({...formData, ticketType: val})}>
          <SelectTrigger className="h-10 bg-slate-50 border-transparent rounded-lg text-sm font-semibold">
            <SelectValue placeholder="Select Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="early" className="text-sm font-semibold">Early Bird</SelectItem>
            <SelectItem value="standard" className="text-sm font-semibold">Standard</SelectItem>
            <SelectItem value="student" className="text-sm font-semibold">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full h-12 bg-navy text-white text-sm font-bold rounded-xl hover:bg-blue transition-all" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Register Now'}
      </Button>
    </form>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center bg-navy overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-banner.png"
          alt="Food, AgroTech & Animal Science"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/70 to-navy" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24 flex justify-center">
        <div className="max-w-4xl space-y-10 text-center flex flex-col items-center">
         

          <div className="space-y-4">
            <p className="text-sm font-bold text-blue/60 mb-4">Presented by Ascendix</p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ascendix World Food, <br />
              <span className="text-blue">AgroTech & Animal Science</span>
            </h1>
          </div>


            <p className="text-sm font-bold text-white/50 leading-loose max-w-2xl mx-auto">
              Join leading experts to advance sustainable farming, food technology, and animal health for a better future.
            </p>

          <div className="flex flex-wrap justify-center gap-12 py-10 border-y border-white/5 w-full">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-blue opacity-50" />
              <div className="space-y-1 text-left">
                <p className="text-xs text-white/30 font-bold leading-none">Dates</p>
                <p className="font-bold text-sm text-white">June 24-26, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-5 h-5 text-blue opacity-50" />
              <div className="space-y-1 text-left">
                <p className="text-xs text-white/30 font-bold leading-none">Location</p>
                <p className="font-bold text-sm text-white">New Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 px-8 bg-blue text-white text-sm font-bold rounded-xl hover:bg-white hover:text-navy transition-all">
                  Submit Your Talk
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle className="text-xl font-bold text-navy">Submit <span className="text-blue">Your Talk</span></DialogTitle></DialogHeader>
                <AbstractForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 px-8 border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white hover:text-navy transition-all">
                  Register Now
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader><DialogTitle className="text-xl font-bold text-navy">Complete <span className="text-blue">Registration</span></DialogTitle></DialogHeader>
                <RegistrationForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
