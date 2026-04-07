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
import { PayPalButtons } from "@paypal/react-paypal-js";
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
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Registration');
  
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', country: '' });
  const [selectedAccomm, setSelectedAccomm] = useState<string>('');
  const [guestAddon, setGuestAddon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<'stripe' | 'razorpay' | 'paypal'>('stripe');

  // 1. Initial Data Fetch
  useEffect(() => {
    const init = async () => {
      try {
        const pricingRes = await fetch(`${import.meta.env.VITE_API_URL}/api/site/pricing`);
        const pricingData = await pricingRes.json();
        if (Array.isArray(pricingData)) setTiers(pricingData);

        // Pre-fill if regId exists
        const params = new URLSearchParams(location.search);
        const regId = params.get('regId');
        if (regId) {
            const regRes = await fetch(`${import.meta.env.VITE_API_URL}/api/site/registration/${regId}`);
            if (regRes.ok) {
                const regData = await regRes.json();
                setFormData({
                    name: `${regData.firstName} ${regData.lastName}`,
                    email: regData.email,
                    institution: regData.institution || '',
                    country: regData.country || ''
                });
                // Auto-select tier if possible
                if (pricingData.length > 0) {
                    const matched = pricingData.find((t: Tier) => 
                        t.name.toLowerCase().includes(regData.tier.toLowerCase()) || 
                        regData.tier.toLowerCase().includes(t.name.toLowerCase())
                    );
                    if (matched) setSelectedTier(matched);
                }
                toast.success(`Registration detected: ${regData.registrationId}`);
            }
        }
      } catch (err) {
        console.error('Initialization Error:', err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [location.search]);

  // 2. Handle Slug-based selection
  useEffect(() => {
    if (type && slug && tiers.length > 0) {
      const matched = tiers.find((t: Tier) => 
        t.id === slug || 
        t.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );
      if (matched) setSelectedTier(matched);
    }
  }, [type, slug, tiers]);

  const guestAddonPrice = tiers.find(t => t.name.toLowerCase().includes('guest'))?.amount || 299;

  const calculateFinalTotal = () => {
    if (!selectedTier) return 0;
    let total = selectedTier.amount;
    const accomm = tiers.find(t => t.id === selectedAccomm);
    if (accomm) total += accomm.amount;
    if (guestAddon) total += guestAddonPrice;
    return total;
  };

  // Helper to report a payment failure to the backend
  const reportFailure = async (failureData: {
    method: string;
    error_code?: string;
    error_description?: string;
    error_source?: string;
    error_step?: string;
    gateway_order_id?: string;
    gateway_payment_id?: string;
  }) => {
    try {
      const params = new URLSearchParams(location.search);
      const regId = params.get('regId');
      await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record-failure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          institution: formData.institution,
          country: formData.country,
          tier_name: selectedTier?.name,
          amount: calculateFinalTotal(),
          currency: selectedTier?.currency,
          registration_id: regId,
          ...failureData
        })
      });
    } catch (e) {
      console.error('Failed to report payment failure:', e);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) {
      toast.error("Please select a package first.");
      return;
    }
    
    setIsProcessing(true);
    try {
      const params = new URLSearchParams(location.search);
      const regId = params.get('regId');
      const totalAmount = calculateFinalTotal();

      const billingMetadata = {
        ...formData,
        accommodation_tier: selectedAccomm,
        guest_addon: guestAddon,
        tier_name: selectedTier.name,
        registration_id: regId
      };

      if (method === 'stripe') {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/stripe/checkout-session`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             amount: totalAmount,
             currency: selectedTier.currency,
             metadata: billingMetadata,
             success_url: `${window.location.origin}/payment/success?method=stripe&regId=${regId || ''}`,
             cancel_url: window.location.href
           })
         });
         const data = await res.json();
         if (data.url) {
             window.location.href = data.url;
             return;
         }
         const stripeError = data.error || 'Stripe initialization failed';
         await reportFailure({
           method: 'stripe',
           error_description: stripeError,
           error_source: 'gateway',
           error_step: 'checkout_session_creation'
         });
         throw new Error(stripeError);
      }

      if (method === 'razorpay') {
        let orderId = '';
        try {
          const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/razorpay/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: totalAmount,
              currency: selectedTier.currency,
            })
          });

          const orderData = await orderRes.json();
          if (!orderRes.ok) {
            await reportFailure({
              method: 'razorpay',
              error_description: orderData.error || orderData.details || 'Failed to create Razorpay order',
              error_source: 'gateway',
              error_step: 'order_creation'
            });
            throw new Error(orderData.error || 'Failed to create Razorpay order');
          }

          orderId = orderData.id;

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "ASFAA Summit 2026",
            description: `Payment for ${selectedTier.name}`,
            order_id: orderData.id,
            handler: async function (response: any) {
              try {
                const recordRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    registration_id: regId,
                    payment_id: response.razorpay_payment_id,
                    amount: totalAmount,
                    currency: selectedTier.currency,
                    status: 'Completed',
                    method: 'razorpay',
                    billing_details: billingMetadata
                  })
                });

                if (!recordRes.ok) throw new Error('Failed to record transaction');
                
                toast.success("Payment successful! Confirmation and receipt sent to email.");
                navigate(`/payment/success?method=razorpay&regId=${regId || ''}`);
              } catch (err: any) {
                toast.error(err.message || "Recording transaction failed.");
              }
            },
            modal: {
              ondismiss: async function () {
                // User closed the Razorpay modal without completing payment
                await reportFailure({
                  method: 'razorpay',
                  error_description: 'User dismissed payment modal without completing payment',
                  error_source: 'user',
                  error_step: 'checkout',
                  gateway_order_id: orderId
                });
                toast.error("Payment was cancelled. Our team will reach out to assist you.");
              }
            },
            prefill: {
              name: formData.name,
              email: formData.email,
            },
            theme: { color: "#3B82F6" }
          };

          const rzp1 = new (window as any).Razorpay(options);
          
          // Handle Razorpay payment failures
          rzp1.on('payment.failed', async function (response: any) {
            const errData = response.error || {};
            await reportFailure({
              method: 'razorpay',
              error_code: errData.code,
              error_description: errData.description || errData.reason || 'Payment failed',
              error_source: errData.source || 'bank',
              error_step: errData.step || 'payment_processing',
              gateway_order_id: errData.metadata?.order_id || orderId,
              gateway_payment_id: errData.metadata?.payment_id
            });
            toast.error(errData.description || "Payment failed. Our team has been notified and will contact you.");
          });

          rzp1.open();
          setIsProcessing(false);
          return;
        } catch (rzpError: any) {
          if (rzpError.message !== 'Failed to create Razorpay order') {
            await reportFailure({
              method: 'razorpay',
              error_description: rzpError.message || 'Razorpay checkout failed',
              error_source: 'client',
              error_step: 'checkout_initialization',
              gateway_order_id: orderId
            });
          }
          throw rzpError;
        }
      }

    } catch (error: any) {
      console.error('Payment Protocol Error:', error);
      toast.error(error.message || "Payment sequence interrupted. Our team has been notified.");
    } finally {
      setIsProcessing(false);
    }
  };


  if (loading) {
    return (
      <PageLayout title="Secure Payment" subtitle="Loading...">
        <div className="flex flex-col items-center justify-center py-40 gap-6">
           <Loader2 className="w-12 h-12 text-blue animate-spin" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Connecting...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={selectedTier ? "Checkout" : "Registration"} 
      subtitle={selectedTier ? `Completing your ${selectedTier.name} registration.` : "Choose your registration plan."}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-24 font-outfit">
        
        {!selectedTier ? (
          /* Selection View */
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 py-10">
             <div className="flex justify-center">
                <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap justify-center gap-1">
                   {['Registration', 'Accommodation', 'Sponsorship', 'Exhibition'].map((cat) => (
                    <Button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-xl px-8 font-black text-[10px] transition-all uppercase tracking-widest ${activeCategory === cat ? 'bg-white text-blue shadow-xl shadow-slate-200/50 border-none' : 'variant-ghost text-slate-400 hover:text-slate-600'}`}
                    >
                      {cat}
                    </Button>
                  ))}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tiers.filter(t => t.category === activeCategory).map((t) => (
                  <div key={t.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex flex-col justify-between hover:shadow-2xl hover:border-blue/20 transition-all group relative overflow-hidden">
                     <div className="space-y-6 relative z-10">
                        <div className="flex items-center justify-between">
                           <div className="w-12 h-12 rounded-2xl bg-blue/5 text-blue flex items-center justify-center group-hover:rotate-12 transition-transform">
                              <Tag className="w-6 h-6" />
                           </div>
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{t.category}</span>
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-none group-hover:text-blue transition-colors uppercase">{t.name.split(':').pop()?.trim()}</h3>
                           <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic opacity-70">{t.description}</p>
                        </div>
                        <div className="py-6 border-y border-slate-50">
                           <div className="flex items-baseline gap-2">
                              <span className="text-xs font-black text-blue">{t.currency}</span>
                              <span className="text-4xl font-black text-slate-900 tracking-tighter">{t.amount.toLocaleString()}</span>
                           </div>
                        </div>
                        <div className="space-y-3">
                           {t.features && t.features.slice(0, 5).map((f, i) => (
                             <div key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest opacity-80">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {f}
                             </div>
                           ))}
                        </div>
                     </div>
                     <Button 
                        onClick={() => setSelectedTier(t)}
                        className="w-full h-14 bg-slate-50 hover:bg-blue hover:text-white text-blue font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all mt-10 relative z-10 shadow-sm"
                      >
                        Pick This <ChevronRight className="w-4 h-4 ml-2" />
                     </Button>
                     <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue/5 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-1000" />
                  </div>
                ))}
             </div>
          </div>
        ) : (
          /* Checkout View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-right-5 duration-700 py-10">
            {/* Package Recap */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] space-y-8 sticky top-24 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                     <Rocket className="w-32 h-32 rotate-12" />
                  </div>
                  
                  <div className="space-y-4 relative z-10">
                     <button onClick={() => setSelectedTier(null)} className="flex items-center gap-2 text-[10px] font-black text-blue uppercase tracking-widest hover:gap-3 transition-all mb-4 group">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                     </button>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-blue uppercase tracking-[0.4em] leading-none">{selectedTier.category} Tier</p>
                        <h2 className="text-3xl font-black text-navy tracking-tight uppercase leading-none">{selectedTier.name}</h2>
                        <p className="text-slate-400 text-[11px] font-bold leading-relaxed italic opacity-80">{selectedTier.description}</p>
                     </div>
                  </div>

                  <div className="py-8 border-y border-slate-100 relative z-10">
                     <div className="flex items-baseline justify-between mb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Price</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-xs font-black text-blue">{selectedTier.currency}</span>
                           <span className="text-4xl font-black text-navy tracking-tighter">{calculateFinalTotal().toLocaleString()}</span>
                        </div>
                     </div>
                     <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Your payment is secure
                     </p>
                  </div>

                  <div className="space-y-4 relative z-10">
                     <h4 className="text-[10px] font-black text-navy uppercase tracking-[0.4em] mb-4">What's Included</h4>
                     {selectedTier.features && selectedTier.features.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">
                           <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                           {b}
                        </div>
                     ))}
                  </div>

                  <div className="pt-8 flex items-center gap-4 text-slate-300 relative z-10">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                     </div>
                     <p className="text-[9px] font-black uppercase tracking-[0.3em] leading-relaxed">Secure payment system</p>
                  </div>
               </div>
            </div>

            {/* Billing Form */}
            <div className="lg:col-span-8 space-y-12">
                <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 space-y-12">
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-navy tracking-tight uppercase">Your <span className="text-blue">Details</span></h3>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] italic opacity-70">Please enter your details for your certificate.</p>
                    </div>

                    <form onSubmit={handlePay} className="space-y-10">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6 group-focus-within:text-blue transition-colors">Full Name</Label>
                          <Input 
                            className="h-14 bg-slate-50 border-none rounded-2xl px-8 text-xs font-black focus:ring-4 focus:ring-blue/5 transition-all placeholder:text-slate-200"
                            placeholder="John Carter" required 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3 group">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6 group-focus-within:text-blue transition-colors">Email Address</Label>
                          <Input 
                            className="h-14 bg-slate-50 border-none rounded-2xl px-8 text-xs font-black focus:ring-4 focus:ring-blue/5 transition-all placeholder:text-slate-200"
                            type="email" placeholder="delegate@domain.com" required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                           <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6 group-focus-within:text-blue transition-colors">Work / School</Label>
                          <Input 
                            className="h-14 bg-slate-50 border-none rounded-2xl px-8 text-xs font-black focus:ring-4 focus:ring-blue/5 transition-all placeholder:text-slate-200"
                            placeholder="State University / Global Corp" required 
                            value={formData.institution}
                            onChange={(e) => setFormData({...formData, institution: e.target.value})}
                          />
                        </div>
                        <div className="space-y-3 group">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6 group-focus-within:text-blue transition-colors">Country</Label>
                          <Input 
                            className="h-14 bg-slate-50 border-none rounded-2xl px-8 text-xs font-black focus:ring-4 focus:ring-blue/5 transition-all placeholder:text-slate-200"
                            placeholder="Singapore / United Kingdom" required 
                            value={formData.country}
                            onChange={(e) => setFormData({...formData, country: e.target.value})}
                          />
                        </div>
                      </div>

                      {selectedTier.category === 'Registration' && (
                        <div className="pt-10 space-y-8 border-t border-slate-50">
                           <div className="space-y-2">
                              <h3 className="text-2xl font-black text-navy tracking-tight uppercase">Other <span className="text-blue">Options</span></h3>
                              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] italic opacity-70">Add a room or a guest.</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-3">
                                 <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-6">Select Room</Label>
                                 <select 
                                    value={selectedAccomm}
                                    onChange={(e) => setSelectedAccomm(e.target.value)}
                                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-blue/5 transition-all appearance-none cursor-pointer"
                                 >
                                    <option value="">No Room Needed</option>
                                    {tiers.filter(t => t.category === 'Accommodation').map(t => (
                                       <option key={t.id} value={t.id}>{t.name.split(':').pop()?.trim()} — {t.currency}{t.amount}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className="flex items-center justify-between p-5 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 cursor-pointer hover:border-blue/30 transition-colors" onClick={() => setGuestAddon(!guestAddon)}>
                                 <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${guestAddon ? 'bg-blue border-blue scale-110 shadow-lg shadow-blue/20' : 'border-slate-300 bg-white'}`}>
                                       {guestAddon && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                                    </div>
                                    <span className="text-[10px] font-black text-navy uppercase tracking-widest">Add a Guest</span>
                                 </div>
                                 <span className="text-xs font-black text-blue">{selectedTier.currency}{guestAddonPrice}</span>
                              </div>
                           </div>
                        </div>
                      )}

                      <div className="pt-10 space-y-8 border-t border-slate-50">
                          <div className="flex items-center justify-between">
                             <h3 className="text-2xl font-black text-navy tracking-tight uppercase">Payment <span className="text-blue">Method</span></h3>
                             <div className="flex gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue" />
                                <span className="w-2 h-2 rounded-full bg-slate-100" />
                                <span className="w-2 h-2 rounded-full bg-slate-100" />
                             </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                             {[
                               { id: 'stripe', name: 'Global Card (Stripe)', icon: CreditCard, badge: 'PCI-DSS' },
                               { id: 'razorpay', name: 'India (Razorpay)', icon: ShieldCheck, badge: 'UPI/NET' },
                               { id: 'paypal', name: 'International (PayPal)', icon: Globe, badge: 'SECURE' }
                             ].map((m) => (
                               <label key={m.id} className="cursor-pointer group relative">
                                 <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    className="hidden peer" 
                                    checked={method === m.id}
                                    onChange={() => setMethod(m.id as any)} 
                                 />
                                 <div className="p-8 border border-slate-100 rounded-3xl bg-slate-50/30 peer-checked:border-blue peer-checked:bg-blue/5 hover:border-blue/20 transition-all flex flex-col items-center gap-4 relative overflow-hidden shadow-sm hover:shadow-md">
                                    <m.icon className={`w-8 h-8 transition-all duration-500 ${method === m.id ? 'text-blue scale-110' : 'text-slate-300 group-hover:text-blue/60 group-hover:scale-105'}`} />
                                    <div className="text-center space-y-1">
                                       <span className={`block text-[10px] font-black uppercase tracking-widest ${method === m.id ? 'text-blue' : 'text-slate-500 group-hover:text-navy'}`}>{m.name}</span>
                                       <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest">{m.badge}</span>
                                    </div>
                                    {method === m.id && <div className="absolute top-3 right-3 w-4 h-4 bg-blue rounded-full flex items-center justify-center shadow-lg shadow-blue/20 animate-in zoom-in-50"><Check className="w-2.5 h-2.5 text-white" strokeWidth={4} /></div>}
                                 </div>
                               </label>
                             ))}
                          </div>
                      </div>

                      <div className="pt-10">
                        {method === 'paypal' ? (
                          <div className="space-y-6">
                             <div className="p-8 bg-blue/5 rounded-3xl border border-blue/10 flex items-center gap-6">
                                <Globe className="w-10 h-10 text-blue shrink-0 animate-pulse" />
                                <div>
                                   <p className="text-[10px] font-black text-blue uppercase tracking-widest mb-1">PayPal Secure Payment</p>
                                   <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight italic opacity-70">Use PayPal below to pay.</p>
                                </div>
                             </div>
                             <div className="px-10">
                               <PayPalButtons 
                                 forceReRender={[calculateFinalTotal()]}
                                 style={{ layout: "vertical", shape: "pill", color: "blue", label: "pay" }}
                                 createOrder={async () => {
                                     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/paypal/order`, {
                                         method: 'POST',
                                         headers: { 'Content-Type': 'application/json' },
                                         body: JSON.stringify({
                                             amount: calculateFinalTotal(),
                                             currency: selectedTier.currency
                                         })
                                     });
                                     const order = await res.json();
                                      if (!order.id) {
                                        await reportFailure({ method: 'paypal', error_description: 'Failed to create PayPal order', error_source: 'gateway', error_step: 'order_creation' });
                                        throw new Error('Failed to create PayPal order');
                                      }
                                     return order.id;
                                 }}
                                 onApprove={async (data) => {
                                     const captureRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/paypal/capture`, {
                                         method: 'POST',
                                         headers: { 'Content-Type': 'application/json' },
                                         body: JSON.stringify({ orderID: data.orderID })
                                     });
                                     
                                     if (captureRes.ok) {
                                         const params = new URLSearchParams(location.search);
                                         const regId = params.get('regId');
                                         
                                         await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record`, {
                                             method: 'POST',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({
                                                 registration_id: regId,
                                                 payment_id: data.orderID,
                                                 amount: calculateFinalTotal(),
                                                 currency: selectedTier.currency,
                                                 status: 'Completed',
                                                 method: 'paypal',
                                                 billing_details: {
                                                    ...formData,
                                                    accommodation_tier: selectedAccomm,
                                                    guest_addon: guestAddon,
                                                    tier_name: selectedTier.name,
                                                    registration_id: regId
                                                 }
                                             })
                                         });

                                         toast.success("PayPal Payment Verified and Recorded!");
                                         navigate(`/payment/success?method=paypal&regId=${regId || ''}`);
                                     } else {
                                          await reportFailure({
                                            method: 'paypal',
                                            error_description: 'PayPal payment capture failed',
                                            error_source: 'gateway',
                                            error_step: 'payment_capture',
                                            gateway_order_id: data.orderID
                                          });
                                          toast.error("Payment capture failed. Our team has been notified.");
                                      }
                                 }}
                                  onError={async (err: any) => {
                                      await reportFailure({
                                        method: 'paypal',
                                        error_description: err?.message || 'PayPal checkout error',
                                        error_source: 'gateway',
                                        error_step: 'checkout'
                                      });
                                      toast.error("PayPal payment failed. Our team will contact you.");
                                  }}
                                  onCancel={async () => {
                                      await reportFailure({
                                        method: 'paypal',
                                        error_description: 'User cancelled PayPal payment',
                                        error_source: 'user',
                                        error_step: 'checkout'
                                      });
                                      toast.error("Payment cancelled. Our team can help if you need assistance.");
                                  }}
                               />
                             </div>
                          </div>
                        ) : (
                          <Button disabled={isProcessing} className="w-full h-16 bg-blue hover:bg-navy text-white text-xs font-black uppercase tracking-[0.3em] rounded-2xl transition-all shadow-2xl shadow-blue/20 active:scale-95 group overflow-hidden">
                            {isProcessing ? (
                               <div className="flex items-center gap-3">
                                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                               </div>
                            ) : (
                               <div className="flex items-center gap-3">
                                  {method === 'stripe' ? 'Pay with Card' : 'Pay with UPI / Bank'} 
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            )}
                          </Button>
                        )}
                        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 italic opacity-60">By clicking, you agree to our payment terms.</p>
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
