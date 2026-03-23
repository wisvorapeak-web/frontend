import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setFormData(prev => ({ ...prev, regType: type }));
    }
  }, [location]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.captcha !== '1234') {
      toast.error('Invalid Captcha. Please verify you are human.');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Registration successful! Redirecting to payment...');
      navigate(`/payment/registration/${formData.regType}?regId=STATIC-REG-ID&amount=${calculateTotal()}&method=${paymentMethod}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <PageLayout 
      title="Register Now" 
      subtitle="Complete your registration for Ascendix Summit on Food, Agri-Tech and Animal Science."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-12 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-50 rounded-3xl p-6 lg:p-10 shadow-xl shadow-blue/5">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Personal Details */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue/10 rounded-lg flex items-center justify-center text-blue">
                      <User className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-navy uppercase tracking-tight">Your Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2 space-y-1">
                       <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Title</Label>
                       <Select onValueChange={(val) => setFormData({...formData, title: val})}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-100 text-[11px] font-black uppercase">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {['Mr', 'Ms', 'Mrs', 'Dr', 'Prof', 'Assoc. Prof. Dr', 'Assist. Prof. Dr', 'Other'].map(t => (
                            <SelectItem key={t} value={t} className="text-[10px] font-black uppercase">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-4 space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</Label>
                      <Input 
                        placeholder="As on passport" 
                        className="h-10 rounded-xl border-slate-100 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email</Label>
                      <Input 
                        type="email"
                        placeholder="your@email.com" 
                        className="h-10 rounded-xl border-slate-100 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Phone Number</Label>
                      <Input 
                        placeholder="+XX XXXXX XXXXX" 
                        className="h-10 rounded-xl border-slate-100 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Country</Label>
                      <Input 
                        placeholder="Country" 
                        className="h-10 rounded-xl border-slate-100 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Institution</Label>
                      <Input 
                        placeholder="Organization or University" 
                        className="h-10 rounded-xl border-slate-100 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                        required
                        value={formData.university}
                        onChange={(e) => setFormData({...formData, university: e.target.value})}
                      />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* 2. Registration Type */}
                <section className="space-y-4">
                   <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-navy uppercase tracking-tight">Choose Ticket</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {registrationTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setFormData({...formData, regType: type.id})}
                        className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${formData.regType === type.id ? 'border-blue bg-blue/5 shadow-lg shadow-blue/5' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[11px] font-black text-navy uppercase tracking-tight">{type.name}</h4>
                          {formData.regType === type.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue" />}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-black text-navy tracking-tighter">${type.early}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <hr className="border-slate-50" />

                {/* 3. Accommodation */}
                <section className="space-y-4">
                   <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                      <Hotel className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-navy uppercase tracking-tight">Hotel</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Room Type</Label>
                      <Select onValueChange={(val) => setFormData({...formData, accommodation: val})} defaultValue="none">
                        <SelectTrigger className="h-10 rounded-xl border-slate-100 text-[11px] font-black uppercase">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="none">No Hotel</SelectItem>
                          <SelectItem value="single">Single Room</SelectItem>
                          <SelectItem value="double">Double Room</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nights</Label>
                      <Select disabled={formData.accommodation === 'none'} onValueChange={(val) => setFormData({...formData, nights: val})} value={formData.nights}>
                        <SelectTrigger className="h-10 rounded-xl border-slate-100 text-[11px] font-black uppercase">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="0">Select</SelectItem>
                          <SelectItem value="1">1 Night</SelectItem>
                          <SelectItem value="2">2 Nights</SelectItem>
                          <SelectItem value="3">3 Nights</SelectItem>
                          <SelectItem value="4">4 Nights</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Checkbox 
                      id="guest" 
                      checked={formData.accompanyingGuest}
                      onCheckedChange={(checked) => setFormData({...formData, accompanyingGuest: !!checked})}
                    />
                     <label 
                      htmlFor="guest" 
                      className="text-[10px] font-black text-navy uppercase tracking-tight cursor-pointer"
                    >
                      Accompanying Guest - <span className="text-blue">$299</span> <span className="opacity-40">(Optional)</span>
                    </label>
                  </div>
                </section>

                  {/* 4. Payment Method */}
                  <section className="space-y-4 pt-8 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-navy uppercase tracking-tight">Payment</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'stripe', name: 'Stripe', icon: CreditCard },
                        { id: 'razorpay', name: 'Razorpay', icon: ShieldCheck },
                        { id: 'paypal', name: 'PayPal', icon: Mail }
                      ].map((m) => (
                        <label key={m.id} className="cursor-pointer group">
                          <input 
                              type="radio" 
                              name="paymentMethod" 
                              className="hidden peer" 
                              checked={paymentMethod === m.id}
                              onChange={() => setPaymentMethod(m.id)} 
                          />
                          <div className="p-4 border border-slate-100 rounded-xl bg-slate-50 peer-checked:border-blue peer-checked:bg-blue/5 hover:bg-white transition-all flex flex-col items-center gap-2">
                              <m.icon className={`w-5 h-5 transition-colors ${paymentMethod === m.id ? 'text-blue' : 'text-slate-400 group-hover:text-blue'}`} />
                              <span className={`text-[9px] font-black uppercase tracking-widest ${paymentMethod === m.id ? 'text-blue' : 'text-slate-500'}`}>{m.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </section>

                  {/* 5. Submission & Captcha */}
                  <section className="pt-8 border-t border-slate-50 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 space-y-1">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Verification Code</Label>
                        <div className="flex items-center gap-2">
                          <div className="h-10 px-4 bg-slate-900 text-white font-mono text-xs flex items-center justify-center rounded-xl tracking-[0.3em] select-none">
                            1234
                          </div>
                          <Input 
                            placeholder="Code" 
                            className="h-10 rounded-xl border-slate-100 font-black tracking-widest text-[11px]"
                            required
                            value={formData.captcha}
                            onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                          />
                        </div>
                      </div>
                       <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="h-11 px-8 bg-blue hover:bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 text-decoration-none"
                      >
                        {isSubmitting ? 'Please Wait...' : 'Pay Now'}
                      </Button>
                    </div>
                </section>

              </form>
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
             <div className="bg-navy p-8 rounded-3xl text-white space-y-6 shadow-2xl shadow-navy/20">
               <h3 className="text-lg font-bold uppercase tracking-tight">Summary</h3>
              
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                   <span>Price</span>
                   <span>${calculateTotal()}</span>
                 </div>
                <div className="h-px bg-white/5" />
                 <div className="flex justify-between items-center text-xl font-black text-white uppercase tracking-tighter">
                   <span>Total</span>
                   <span className="text-blue">${calculateTotal()}</span>
                 </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue" />
                  </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black uppercase tracking-tight">Safe & Secure</p>
                     <p className="text-[9px] font-bold text-white/30 tracking-tight leading-tight">Your data is protected.</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-blue" />
                  </div>
                   <div className="space-y-0.5">
                     <p className="text-[10px] font-black uppercase tracking-tight">Instant Receipt</p>
                     <p className="text-[9px] font-bold text-white/30 tracking-tight leading-tight">Sent immediately.</p>
                   </div>
                </div>
              </div>
            </div>

             <div className="bg-slate-50 p-8 rounded-3xl space-y-6 border border-slate-100">
                <h3 className="text-[10px] font-black text-navy uppercase tracking-widest">What's Included</h3>
               <ul className="space-y-3">
                   {['Speaker Certificate', 'Official Program', 'Research Book', 'Journal Link', 'Full Access'].map((item, i) => (
                    <li key={i} className="flex gap-2 text-[10px] font-bold text-slate-500 items-start uppercase tracking-tight">
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
