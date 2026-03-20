import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, CreditCard, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface PackageInfo {
  name: string;
  price: string;
  type: string;
  description: string;
  benefits: string[];
}

const PACKAGE_DATA: Record<string, Record<string, PackageInfo>> = {
  registration: {
    'speaker': { name: 'Speaker Registration', price: '$749', type: 'Registration', description: 'Early Bird Rate', benefits: ['Speaker Certificate', 'Program Inclusion', 'E-Abstract Book', 'Meals Included'] },
    'delegate': { name: 'Delegate Registration', price: '$899', type: 'Registration', description: 'Early Bird Rate', benefits: ['Program Inclusion', 'E-Abstract Book', 'Meals Included', 'Full Session Access'] },
    'poster': { name: 'Poster Registration', price: '$449', type: 'Registration', description: 'Early Bird Rate', benefits: ['Program Inclusion', 'E-Abstract Book', 'Meals Included', 'Poster Display'] },
    'student': { name: 'Student Registration', price: '$399', type: 'Registration', description: 'Early Bird Rate', benefits: ['Student Certificate', 'E-Abstract Book', 'Meals Included', 'Mentorship Access'] },
  },
  sponsorship: {
    'platinum': { name: 'Platinum Sponsorship', price: '$5000', type: 'Sponsorship', description: 'Maximum Visibility', benefits: ['4 Registrations', 'Stall Space', 'Logo on Web & Socials', '15-min Presentation'] },
    'gold': { name: 'Gold Sponsorship', price: '$4000', type: 'Sponsorship', description: 'High Visibility', benefits: ['3 Registrations', 'Logo on Web', 'Conference Proceedings', 'Main Poster Logo'] },
    'silver': { name: 'Silver Sponsorship', price: '$3000', type: 'Sponsorship', description: 'Partner Visibility', benefits: ['2 Registrations', 'Logo on Web', 'Conference Proceedings', 'Main Poster Logo'] },
  },
  exhibitor: {
    'standard': { name: 'Standard Exhibitor', price: '$2000', type: 'Exhibitor', description: 'Innovation Stall', benefits: ['Standard Stall', '2 Registrations', 'Website Logo', 'Venue Banners'] },
    'additional-person': { name: 'Additional Person', price: '$500', type: 'Exhibitor', description: 'Team Expansion', benefits: ['Full Access', 'Conference Kit', 'Lunch & Coffee', 'Networking Access'] },
  }
};

export default function PaymentPage() {
  const { type, slug } = useParams();
  const [pkg, setPkg] = useState<PackageInfo | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', country: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (type && slug && PACKAGE_DATA[type]?.[slug]) {
      setPkg(PACKAGE_DATA[type][slug]);
    }
  }, [type, slug]);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      toast.success('Redirecting to secure payment gateway...');
      setIsProcessing(false);
    }, 2000);
  };

  if (!pkg) {
    return (
      <PageLayout title="Payment" subtitle="Package not found.">
        <div className="text-center py-20">
          <Link to="/" className="text-blue hover:underline font-bold text-xs flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Secure Payment" subtitle={`Complete your ${pkg.type} for Ascendix 2026.`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24 font-outfit">
        
        {/* Package Recap */}
        <div className="lg:col-span-5 space-y-8">
           <div className="bg-slate-50 border border-slate-100 p-10 rounded-[3rem] space-y-8 sticky top-32">
              <div className="space-y-2">
                 <p className="text-xs font-bold text-blue">{pkg.type} Package</p>
                 <h2 className="text-3xl font-bold text-navy">{pkg.name}</h2>
                 <p className="text-slate-400 text-xs font-bold">{pkg.description}</p>
              </div>

              <div className="py-8 border-y border-slate-200">
                 <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-navy">Total Amount</span>
                    <span className="text-5xl font-bold text-blue tracking-tighter">{pkg.price}</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-xs font-bold text-navy mb-4">What's Included</h4>
                 {pkg.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                       {b}
                    </div>
                 ))}
              </div>

              <div className="pt-6 flex items-center gap-4 text-slate-400">
                 <ShieldCheck className="w-5 h-5" />
                 <p className="text-xs font-bold">SSL Secured & Encrypted Processing</p>
              </div>
           </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-navy">Billing <span className="text-blue">Details</span></h3>
                <form onSubmit={handlePay} className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-slate-400">Full Name</Label>
                      <Input 
                        className="h-14 bg-white border-slate-200 rounded-2xl text-sm font-bold focus:ring-blue focus:border-blue transition-all"
                        placeholder="As written on card" required 
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-slate-400">Email Address</Label>
                      <Input 
                        className="h-14 bg-white border-slate-200 rounded-2xl text-sm font-bold focus:ring-blue focus:border-blue transition-all"
                        type="email" placeholder="your@email.com" required 
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-slate-400">Institution / Company</Label>
                    <Input 
                      className="h-14 bg-white border-slate-200 rounded-2xl text-sm font-bold focus:ring-blue focus:border-blue transition-all"
                      placeholder="University or organization name" required 
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold text-slate-400">Country/Region</Label>
                    <Input 
                      className="h-14 bg-white border-slate-200 rounded-2xl text-sm font-bold focus:ring-blue focus:border-blue transition-all"
                      placeholder="United States, India, etc." required 
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>

                  <div className="pt-8 space-y-6">
                      <h3 className="text-2xl font-bold text-navy">Payment <span className="text-blue">Method</span></h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         {[
                           { name: 'Credit/Debit', icon: CreditCard },
                           { name: 'Wire Transfer', icon: ArrowRight },
                           { name: 'PayPal', icon: TargetIcon }
                         ].map((m, i) => (
                           <label key={i} className="cursor-pointer group">
                             <input type="radio" name="paymentMethod" className="hidden peer" defaultChecked={i === 0} />
                             <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50 peer-checked:border-blue peer-checked:bg-blue/5 hover:bg-white transition-all flex flex-col items-center gap-3">
                                <m.icon className="w-6 h-6 text-slate-400 group-hover:text-blue transition-colors" />
                                <span className="text-xs font-bold text-slate-500 peer-checked:text-blue">{m.name}</span>
                             </div>
                           </label>
                         ))}
                      </div>
                  </div>

                  <Button type="submit" disabled={isProcessing} className="w-full h-16 bg-blue text-white text-sm font-bold rounded-2xl hover:bg-navy transition-all shadow-2xl shadow-blue/20">
                    {isProcessing ? 'Processing Securely...' : `Pay ${pkg.price} Now`}
                  </Button>
                </form>
            </div>
        </div>

      </div>
    </PageLayout>
  );
}

import { Target as TargetIcon } from 'lucide-react';
