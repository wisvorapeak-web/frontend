import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  Globe, 
  Loader2, 
  ChevronRight, 
  Tag,
  Rocket,
  Check,
  ArrowRight
} from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from 'sonner';

interface Tier {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  features: string[];
}

export default function PaymentPage() {
  const { type, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setTiers(data);
        }
      })
      .catch(err => console.error('Pricing fetch error:', err))
      .finally(() => setLoading(false));
  }, []);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Registration');
  
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', country: '' });
  const [selectedAccomm, setSelectedAccomm] = useState<string>('');
  const [guestAddon, setGuestAddon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<'stripe' | 'razorpay' | 'paypal'>('stripe');

  useEffect(() => {
    if (type && slug) {
      const matched = tiers.find((t: Tier) => 
        t.id === slug || 
        t.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );
      if (matched) setSelectedTier(matched);
    }
  }, [type, slug, tiers]);

  const calculateFinalTotal = () => {
    if (!selectedTier) return 0;
    let total = selectedTier.amount;
    const accomm = tiers.find(t => t.id === selectedAccomm);
    if (accomm) total += accomm.amount;
    if (guestAddon) total += 299; // Hardcoded or find from tiers
    return total;
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      toast.error("Please select a package first.");
      return;
    }
    
    setIsProcessing(true);
    try {
      // 1. Mock payment gateway delay
      await new Promise(r => setTimeout(r, 2000));
      
      const params = new URLSearchParams(location.search);
      const regId = params.get('regId');

      // 2. Record transaction in backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registration_id: regId,
          payment_id: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          amount: calculateFinalTotal(),
          currency: selectedTier.currency,
          status: 'Completed',
          method: method,
          billing_details: {
              ...formData,
              accommodation_tier: selectedAccomm,
              guest_addon: guestAddon
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to record transaction');
      }

      toast.success("Payment successful! Confirmation email has been sent.");
      navigate('/');
    } catch (error: any) {
      console.error('Payment Finalization Error:', error);
      toast.error(error.message || "Process interrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Payment Gateway" subtitle="Loading secure environment...">
        <div className="flex flex-col items-center justify-center py-32 gap-6">
           <Loader2 className="w-12 h-12 text-blue animate-spin" />
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Establishing Secure Connection</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={selectedTier ? "Complete Purchase" : "Summit Pass Selection"} 
      subtitle={selectedTier ? `Finalizing ${selectedTier.name} for global delegates.` : "Select your entry tier for the Ascendix World Food, AgroTech & Animal Science 2026."}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-12 font-outfit">
        
        {!selectedTier ? (
          /* Selection View */
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 py-6">
             <div className="flex justify-center">
                <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 h-12">
                   {['Registration', 'Accommodation', 'Sponsorship', 'Exhibition'].map((cat) => (
                    <Button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-xl h-full px-8 font-black text-[10px] transition-all uppercase tracking-widest ${activeCategory === cat ? 'bg-white text-blue shadow-xl shadow-slate-200/50 border-none' : 'variant-ghost text-slate-400 hover:text-slate-600'}`}
                    >
                      {cat}
                    </Button>
                  ))}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tiers.filter(t => t.category === activeCategory).map((t) => (
                  <div key={t.id} className="bg-white border border-slate-50 rounded-3xl p-8 flex flex-col justify-between hover:shadow-2xl hover:border-blue/20 transition-all group relative overflow-hidden">
                     <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                           <div className="w-10 h-10 rounded-xl bg-blue/5 text-blue flex items-center justify-center group-hover:rotate-12 transition-transform">
                              <Tag className="w-5 h-5" />
                           </div>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{t.category}</span>
                        </div>
                        <div className="space-y-1">
                           <h3 className="text-xl font-black text-slate-950 tracking-tight leading-none group-hover:text-blue transition-colors uppercase">{t.name}</h3>
                           <p className="text-[10px] font-bold text-slate-400 leading-relaxed line-clamp-2 italic">{t.description}</p>
                        </div>
                        <div className="py-4 border-y border-slate-50">
                           <div className="flex items-baseline gap-1">
                              <span className="text-[10px] font-black text-blue">{t.currency}</span>
                              <span className="text-3xl font-black text-slate-900 tracking-tighter">{t.amount.toLocaleString()}</span>
                           </div>
                        </div>
                        <div className="space-y-2">
                           {t.features.slice(0, 4).map((f, i) => (
                             <div key={i} className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-80">
                                <Check className="w-3 h-3 text-emerald-500" /> {f}
                             </div>
                           ))}
                        </div>
                     </div>
                     <Button 
                        onClick={() => setSelectedTier(t)}
                        className="w-full h-12 bg-slate-50 hover:bg-blue hover:text-white text-blue font-black text-[10px] uppercase tracking-widest rounded-xl transition-all mt-8 relative z-10"
                      >
                       Select Package <ChevronRight className="w-4 h-4 ml-2" />
                     </Button>
                     <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000" />
                  </div>
                ))}
             </div>
          </div>
        ) : (
          /* Checkout View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-right-5 duration-700">
            {/* Package Recap */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-white border border-slate-50 p-8 rounded-3xl space-y-6 sticky top-24 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                     <Rocket className="w-24 h-24 rotate-12" />
                  </div>
                  
                  <div className="space-y-3 relative z-10">
                     <button onClick={() => setSelectedTier(null)} className="flex items-center gap-2 text-[9px] font-black text-blue uppercase tracking-widest hover:gap-3 transition-all mb-2">
                        <ArrowLeft className="w-3 h-3" /> Change Package
                     </button>
                     <div className="space-y-1">
                        <p className="text-[9px] font-black text-blue uppercase tracking-widest">{selectedTier.category} Tier</p>
                        <h2 className="text-2xl font-black text-navy tracking-tight uppercase">{selectedTier.name}</h2>
                        <p className="text-slate-400 text-[10px] font-bold leading-relaxed italic">{selectedTier.description}</p>
                     </div>
                  </div>

                  <div className="py-6 border-y border-slate-50 relative z-10">
                     <div className="flex items-baseline justify-between mb-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calculated Total</span>
                        <div className="flex items-baseline gap-1">
                           <span className="text-[10px] font-black text-blue">{selectedTier.currency}</span>
                           <span className="text-3xl font-black text-navy tracking-tighter">{calculateFinalTotal().toLocaleString()}</span>
                        </div>
                     </div>
                     <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Secure checkout authorized
                     </p>
                  </div>

                  <div className="space-y-3 relative z-10">
                     <h4 className="text-[9px] font-black text-navy uppercase tracking-widest mb-2">Tier Entitlements</h4>
                     {selectedTier.features.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">
                           <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                           {b}
                        </div>
                     ))}
                  </div>

                  <div className="pt-6 flex items-center gap-3 text-slate-300 relative z-10">
                     <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                     </div>
                     <p className="text-[8px] font-bold uppercase tracking-[0.2em]">SSL Secured & PCI Compliant</p>
                  </div>
               </div>
            </div>

            {/* Billing Form */}
            <div className="lg:col-span-8 space-y-10">
                <div className="bg-white p-10 rounded-3xl border border-slate-50 shadow-xl shadow-slate-200/40 space-y-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-navy tracking-tight uppercase">Billing <span className="text-blue">Manifest</span></h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Provide data for your certificate.</p>
                    </div>

                    <form onSubmit={handlePay} className="space-y-8">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-blue">Full Identity</Label>
                          <Input 
                            className="h-12 bg-slate-50 border-none rounded-xl px-6 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                            placeholder="Delegate Name" required 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-blue">Email Registry</Label>
                          <Input 
                            className="h-12 bg-slate-50 border-none rounded-xl px-6 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                            type="email" placeholder="active@email.com" required 
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-blue">Institution</Label>
                          <Input 
                            className="h-12 bg-slate-50 border-none rounded-xl px-6 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                            placeholder="University / Org" required 
                            onChange={(e) => setFormData({...formData, institution: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2 group">
                          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-blue">Country</Label>
                          <Input 
                            className="h-12 bg-slate-50 border-none rounded-xl px-6 text-[11px] font-black focus:ring-2 focus:ring-blue/10 transition-all placeholder:text-slate-200"
                            placeholder="Geographical Region" required 
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                          />
                        </div>
                      </div>

                      {selectedTier.category === 'Registration' && (
                        <div className="pt-8 space-y-6 border-t border-slate-50">
                           <div className="space-y-1">
                              <h3 className="text-xl font-black text-navy tracking-tight uppercase">Hospitality <span className="text-blue">Upgrades</span></h3>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Optional lodging and guest services.</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Room selection</Label>
                                 <select 
                                    value={selectedAccomm}
                                    onChange={(e) => setSelectedAccomm(e.target.value)}
                                    className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue/10"
                                 >
                                    <option value="">No Accommodation Needed</option>
                                    {tiers.filter(t => t.category === 'Accommodation').map(t => (
                                       <option key={t.id} value={t.id}>{t.name} — ${t.amount}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-100 cursor-pointer" onClick={() => setGuestAddon(!guestAddon)}>
                                 <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${guestAddon ? 'bg-blue border-blue' : 'border-slate-200 bg-white'}`}>
                                       {guestAddon && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className="text-[9px] font-black text-navy uppercase tracking-widest">Accompanying Guest</span>
                                 </div>
                                 <span className="text-[9px] font-black text-blue">$299</span>
                              </div>
                           </div>
                        </div>
                      )}

                      <div className="pt-8 space-y-6 border-t border-slate-50">
                          <div className="flex items-center justify-between">
                             <h3 className="text-xl font-black text-navy tracking-tight uppercase">Payment <span className="text-blue">Protocol</span></h3>
                             <div className="flex gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                             {[
                               { id: 'stripe', name: 'Global Card', icon: CreditCard },
                               { id: 'razorpay', name: 'UPI / NetBanking', icon: ShieldCheck },
                               { id: 'paypal', name: 'PayPal Hub', icon: Globe }
                             ].map((m) => (
                               <label key={m.id} className="cursor-pointer group relative">
                                 <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    className="hidden peer" 
                                    checked={method === m.id}
                                    onChange={() => setMethod(m.id as any)} 
                                 />
                                 <div className="p-6 border-2 border-slate-50 rounded-2xl bg-slate-50/50 peer-checked:border-blue peer-checked:bg-blue/5 hover:border-slate-100 transition-all flex flex-col items-center gap-3 relative overflow-hidden">
                                    <m.icon className={`w-6 h-6 transition-all ${method === m.id ? 'text-blue scale-110' : 'text-slate-300 group-hover:text-blue group-hover:scale-105'}`} />
                                    <span className={`text-[9px] font-black uppercase tracking-widest text-center ${method === m.id ? 'text-blue' : 'text-slate-400 group-hover:text-slate-600'}`}>{m.name}</span>
                                    {method === m.id && <div className="absolute top-2 right-2 w-3 h-3 bg-blue rounded-full flex items-center justify-center"><Check className="w-1.5 h-1.5 text-white" /></div>}
                                 </div>
                               </label>
                             ))}
                          </div>
                      </div>

                      <div className="pt-8">
                        {method === 'paypal' ? (
                          <PayPalScriptProvider options={{ clientId: "test" }}>
                            <div className="pt-2 px-8">
                              <PayPalButtons 
                                style={{ layout: "vertical", shape: "pill", color: "blue" }}
                                createOrder={(_, actions) => {
                                  return actions.order.create({
                                    intent: 'CAPTURE',
                                    purchase_units: [{ amount: { currency_code: selectedTier.currency, value: selectedTier.amount.toString() } }]
                                  });
                                }}
                                onApprove={async () => {
                                  toast.success("PayPal Payment Approved!");
                                  navigate('/');
                                }}
                              />
                            </div>
                          </PayPalScriptProvider>
                        ) : (
                          <Button disabled={isProcessing} className="w-full h-12 bg-blue hover:bg-navy text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-blue/20 active:scale-95 group overflow-hidden">
                            {isProcessing ? (
                               <div className="flex items-center gap-2">
                                  <Loader2 className="w-4 h-4 animate-spin" /> Orchestrating...
                               </div>
                            ) : (
                               <div className="flex items-center gap-2">
                                  Initialize Payment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                          </Button>
                        )}
                        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-4 italic">By clicking, you agree to our summit financial protocols.</p>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        )}

      </div>
    </PageLayout>
  );
}
