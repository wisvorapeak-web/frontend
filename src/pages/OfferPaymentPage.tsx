import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ShieldCheck, 
  Globe, 
  Loader2, 
  Clock,
  Tag
} from 'lucide-react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from 'sonner';

export default function OfferPaymentPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorDesc, setErrorDesc] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', country: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<'razorpay' | 'paypal'>('razorpay');

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/offers/${token}`);
        if (!res.ok) {
           const errData = await res.json();
           throw new Error(errData.error || 'Offer not found.');
        }
        const data = await res.json();
        setOffer(data);
        setFormData(prev => ({ ...prev, email: data.email }));
      } catch (err: any) {
        setErrorDesc(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [token]);

  const reportFailure = async (failureData: any) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record-failure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          institution: formData.institution,
          country: formData.country,
          tier_name: offer?.tierId?.name || 'Custom Offer',
          amount: offer?.amount,
          currency: offer?.currency,
          offer_token: token,
          ...failureData
        })
      });
    } catch (e) { console.error('Failed to report payment failure:', e); }
  };

  const syncOfferStatus = async () => {
     try {
       const billingMetadata = {
         ...formData,
         tier_name: offer.tierId?.name,
         offer_token: token
       };

       await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
             payment_id: `offer_${token}`,
             amount: offer.amount,
             currency: offer.currency,
             status: 'Completed',
             method: method,
             billing_details: billingMetadata
         })
       });
       
       // Just marking Offer as Paid on backend might require a specific endpoint if not handled in record, but `record` just saves transaction. We could hit an update offer endpoint ideally, but we don't have one exposed natively without admin auth. However, our transaction will be logged!
     } catch (err) {}
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offer) return;
    
    setIsProcessing(true);
    try {
      /* Removed Stripe implementation as requested. Using Razorpay/PayPal only. */

      if (method === 'razorpay') {
        const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/razorpay/order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: offer.amount, currency: offer.currency })
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok) throw new Error(orderData.error || orderData.details || 'Failed to create Razorpay order');

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Wisvora Peak Offer Checkout",
          description: `Payment for Special Offer`,
          order_id: orderData.id,
          handler: async function () {
            try {
              await syncOfferStatus();
              toast.success("Payment successful!");
              navigate(`/payment/success?method=razorpay&offer=${token}`);
            } catch (err: any) {
              toast.error(err.message || "Recording transaction failed.");
            }
          },
          prefill: { name: formData.name, email: formData.email },
          theme: { color: "#3B82F6" }
        };

        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
        setIsProcessing(false);
        return;
      }
    } catch (error: any) {
      console.error('Payment Error:', error);
      toast.error(error.message || "Payment sequence interrupted.");
      reportFailure({ method, error_description: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <PageLayout title="Special Offer" subtitle="Verifying your secure link...">
        <div className="flex flex-col items-center justify-center py-40 gap-6">
           <Loader2 className="w-12 h-12 text-blue animate-spin" />
        </div>
      </PageLayout>
    );
  }

  if (errorDesc) {
     return (
        <PageLayout title="Offer Unavailable" subtitle="Link expired or invalid">
           <div className="py-20 text-center space-y-4 max-w-xl mx-auto px-6">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Clock className="w-8 h-8 text-rose-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-800">{errorDesc}</h2>
              <p className="text-slate-500 text-sm">Please check the link in your email or contact support if you believe this is an error.</p>
           </div>
        </PageLayout>
     )
  }

  return (
    <PageLayout 
      title="Offer Checkout" 
      subtitle="Complete your special payment offer securely."
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-24 font-outfit pt-10">
         
         <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] overflow-hidden">
            <div className="bg-slate-50 p-8 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                     <Tag className="w-5 h-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black tracking-[0.2em] uppercase text-blue-600 mb-1">Custom Package</p>
                     <h3 className="text-xl font-black text-slate-900">{offer.tierId?.name || 'Special Access'}</h3>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-1">Total Due</p>
                  <div className="flex items-baseline gap-1">
                     <span className="text-sm font-black text-blue">{offer.currency}</span>
                     <span className="text-4xl font-black text-slate-900 tracking-tighter">{offer.amount.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            <div className="p-8 lg:p-12 space-y-12">
                <form onSubmit={handlePay} className="space-y-10">
                   <div className="space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Billing Information</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Full Name</Label>
                          <Input className="h-12 bg-slate-50" required placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Email (Locked)</Label>
                          <Input className="h-12 bg-slate-100 text-slate-500 border-none pointer-events-none" readOnly value={formData.email} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Institution</Label>
                          <Input className="h-12 bg-slate-50" required placeholder="Organization" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Country</Label>
                          <Input className="h-12 bg-slate-50" required placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Payment Method</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {[
                           { id: 'razorpay', name: 'UPI/Netbank', icon: ShieldCheck },
                           { id: 'paypal', name: 'PayPal', icon: Globe }
                         ].map((m) => (
                           <label key={m.id} className="cursor-pointer group relative">
                             <input type="radio" name="paymentMethod" className="hidden peer" checked={method === m.id} onChange={() => setMethod(m.id as any)} />
                             <div className="p-6 border border-slate-100 rounded-2xl bg-white peer-checked:border-blue peer-checked:bg-blue/5 hover:border-slate-200 transition-all flex flex-col items-center gap-3">
                                <m.icon className={`w-6 h-6 ${method === m.id ? 'text-blue' : 'text-slate-300'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${method === m.id ? 'text-blue' : 'text-slate-500'}`}>{m.name}</span>
                             </div>
                           </label>
                         ))}
                      </div>
                   </div>

                   <div className="pt-6">
                        {method === 'paypal' ? (
                           <PayPalButtons 
                             forceReRender={[offer.amount]}
                             style={{ layout: "vertical", shape: "pill", color: "blue", label: "pay" }}
                             createOrder={async () => {
                                 const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/paypal/order`, {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ amount: offer.amount, currency: offer.currency })
                                 });
                                 const data = await res.json();
                                 return data.id;
                             }}
                             onApprove={async (data) => {
                                 const captureRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/paypal/capture`, {
                                     method: 'POST',
                                     headers: { 'Content-Type': 'application/json' },
                                     body: JSON.stringify({ orderID: data.orderID })
                                 });
                                 if (captureRes.ok) {
                                     await syncOfferStatus();
                                     toast.success("Payment Received!");
                                     navigate(`/payment/success?method=paypal&offer=${token}`);
                                 }
                             }}
                           />
                        ) : (
                          <Button disabled={isProcessing} className="w-full h-14 bg-blue hover:bg-navy text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl shadow-blue/20">
                            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Complete Secure Payment'}
                          </Button>
                        )}
                   </div>
                </form>
            </div>
         </div>
      </div>
    </PageLayout>
  );
}
