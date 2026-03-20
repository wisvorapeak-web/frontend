import { useState } from 'react';
import PageLayout from './PageLayout';
import { 
  CheckCircle2, 
  ShieldCheck,
  CreditCard,
  Mail,
  User,
  Hotel,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function RegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    university: '',
    regType: '',
    accommodation: 'none',
    nights: '0',
    accompanyingGuest: false,
    captcha: ''
  });

  const registrationTypes = [
    { id: 'speaker', name: 'Speaker Registration', early: 749, standard: 849 },
    { id: 'delegate', name: 'Delegate Registration', early: 899, standard: 999 },
    { id: 'poster', name: 'Poster Registration', early: 449, standard: 549 },
    { id: 'student', name: 'Student Registration', early: 399, standard: 599 },
  ];

  const accommodationRates = {
    single: [200, 400, 600, 800],
    double: [240, 480, 720, 960]
  };

  const calculateTotal = () => {
    let total = 0;
    const selectedReg = registrationTypes.find(r => r.id === formData.regType);
    if (selectedReg) {
      // Assuming Early Bird for now, can be dynamic based on date
      total += selectedReg.early;
    }

    if (formData.accommodation !== 'none' && parseInt(formData.nights) > 0) {
      const nightsIdx = parseInt(formData.nights) - 1;
      if (formData.accommodation === 'single') {
        total += accommodationRates.single[nightsIdx] || 0;
      } else if (formData.accommodation === 'double') {
        total += accommodationRates.double[nightsIdx] || 0;
      }
    }

    if (formData.accompanyingGuest) {
      total += 299;
    }

    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captcha !== '1234') {
      toast.error('Invalid Captcha. Please verify you are human.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Form submitted! Redirecting to payment gateway...');
    }, 2000);
  };

  return (
    <PageLayout 
      title="Register Now" 
      subtitle="Complete your registration for Ascendix World Food, AgroTech & Animal Science."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 lg:p-12 shadow-2xl shadow-blue/5">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 1. Personal Details */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center text-blue">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-navy">Personal Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Title</Label>
                      <Select onValueChange={(val) => setFormData({...formData, title: val})}>
                        <SelectTrigger className="h-12 rounded-xl border-slate-100">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Mr', 'Ms', 'Mrs', 'Dr', 'Prof', 'Assoc. Prof. Dr', 'Assist. Prof. Dr', 'Other'].map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-4 space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Full Name</Label>
                      <Input 
                        placeholder="As appears on passport" 
                        className="h-12 rounded-xl border-slate-100"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Email Address</Label>
                      <Input 
                        type="email"
                        placeholder="email@university.edu" 
                        className="h-12 rounded-xl border-slate-100"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Contact Number</Label>
                      <Input 
                        placeholder="+XX XXXXX XXXXX" 
                        className="h-12 rounded-xl border-slate-100"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Country/Region</Label>
                      <Input 
                        placeholder="Residing country" 
                        className="h-12 rounded-xl border-slate-100"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">University/Organization</Label>
                      <Input 
                        placeholder="Full affiliation" 
                        className="h-12 rounded-xl border-slate-100"
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({...formData, university: e.target.value})}
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* 2. Registration Type */}
                <section className="space-y-6">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-navy">Registration Type</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {registrationTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setFormData({...formData, regType: type.id})}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${formData.regType === type.id ? 'border-blue bg-blue/5 shadow-xl shadow-blue/5' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-navy">{type.name}</h4>
                          {formData.regType === type.id && <CheckCircle2 className="w-4 h-4 text-blue" />}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-navy">${type.early}</span>
                          <span className="text-[10px] font-bold text-blue">Early Bird</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* 3. Accommodation */}
                <section className="space-y-6">
                   <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-navy">Accommodation</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Occupancy Type</Label>
                      <Select onValueChange={(val) => setFormData({...formData, accommodation: val})} defaultValue="none">
                        <SelectTrigger className="h-12 rounded-xl border-slate-100">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (Registration Only)</SelectItem>
                          <SelectItem value="single">Single Occupancy</SelectItem>
                          <SelectItem value="double">Double Occupancy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400">Duration</Label>
                      <Select disabled={formData.accommodation === 'none'} onValueChange={(val) => setFormData({...formData, nights: val})} value={formData.nights}>
                        <SelectTrigger className="h-12 rounded-xl border-slate-100">
                          <SelectValue placeholder="Select Nights" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Select Nights</SelectItem>
                          <SelectItem value="1">1 Night</SelectItem>
                          <SelectItem value="2">2 Nights</SelectItem>
                          <SelectItem value="3">3 Nights</SelectItem>
                          <SelectItem value="4">4 Nights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <Checkbox 
                      id="guest" 
                      checked={formData.accompanyingGuest}
                      onCheckedChange={(checked) => setFormData({...formData, accompanyingGuest: !!checked})}
                    />
                     <label 
                      htmlFor="guest" 
                      className="text-xs font-bold text-navy cursor-pointer"
                    >
                      Accompanying Guest - <span className="text-blue">$299</span> <span className="opacity-40">(Optional)</span>
                    </label>
                  </div>
                </section>

                {/* 4. Submission & Captcha */}
                <section className="pt-10 border-t border-slate-50 space-y-6">
                   <div className="flex flex-col md:flex-row gap-6 items-end">
                       <div className="flex-1 space-y-2">
                        <Label className="text-xs font-bold text-slate-400">Captcha Verification</Label>
                        <div className="flex items-center gap-3">
                          <div className="h-12 px-6 bg-slate-900 text-white font-mono flex items-center justify-center rounded-xl tracking-widest select-none">
                            1 2 3 4
                          </div>
                          <Input 
                            placeholder="Enter code" 
                            className="h-12 rounded-xl border-slate-100 font-bold tracking-widest"
                            required
                            value={formData.captcha}
                            onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                          />
                        </div>
                      </div>
                       <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="h-14 px-12 bg-blue hover:bg-navy text-white text-sm font-bold rounded-2xl transition-all shadow-xl shadow-blue/20"
                      >
                        {isSubmitting ? 'Processing...' : 'Complete & Pay'}
                      </Button>
                   </div>
                </section>

              </form>
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-8">
             <div className="bg-navy p-10 rounded-[2rem] text-white space-y-8 shadow-2xl shadow-navy/20">
               <h3 className="text-xl font-bold">Summary</h3>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold text-white/40">
                   <span>Gross Total</span>
                   <span>${calculateTotal()}</span>
                 </div>
                <div className="h-px bg-white/5" />
                 <div className="flex justify-between items-center text-xl font-bold text-white">
                   <span>Total Due</span>
                   <span className="text-blue font-bold">${calculateTotal()}</span>
                 </div>
              </div>

              <div className="space-y-6 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-blue" />
                  </div>
                   <div className="space-y-1">
                     <p className="text-xs font-bold">Secure Payment</p>
                     <p className="text-[10px] font-semibold text-white/30 leading-relaxed">Securely processed for your safety.</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue" />
                  </div>
                   <div className="space-y-1">
                     <p className="text-xs font-bold">Instant Receipt</p>
                     <p className="text-[10px] font-semibold text-white/30 leading-relaxed">Confirmation and invoice sent automatically.</p>
                   </div>
                </div>
              </div>
            </div>

             <div className="bg-slate-50 p-10 rounded-[2rem] space-y-8 border border-slate-100">
                <h3 className="text-sm font-bold text-navy">Registration Includes</h3>
               <ul className="space-y-4">
                   {['Speaker Certificate', 'Official Program Inclusion', 'E-Abstract Book Publication', 'Research Paper Publication', 'Complimentary Meals', 'Full Session Access'].map((item, i) => (
                    <li key={i} className="flex gap-3 text-xs font-semibold text-slate-500 items-start">
                       <CheckCircle2 className="w-3.5 h-3.5 text-blue shrink-0" />
                       {item}
                    </li>
                  ))}
               </ul>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
