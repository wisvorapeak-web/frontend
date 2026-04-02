import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import PageLayout from './PageLayout';
import { 
  CheckCircle2, 
  Download, 
  Calendar, 
  ArrowRight, 
  Loader2,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [regId, setRegId] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    const method = searchParams.get('method');
    const existingRegId = searchParams.get('regId');

    const verifyPayment = async () => {
      try {
        if (sessionId && method === 'stripe') {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/record`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payment_id: sessionId,
                    registration_id: existingRegId,
                    status: 'Completed',
                    method: 'stripe',
                    metadata: { stripe_session_id: sessionId }
                })
            });
            const data = await res.json();
            if (res.ok) {
                setRegId(data.registration_id);
                setStatus('success');
                // Auto-redirect to receipt
                setTimeout(() => navigate(`/receipt/${data.registration_id}`), 2000);
            } else {
                setStatus('error');
            }
        } else {
            setStatus('success');
            const finalId = existingRegId || searchParams.get('regId');
            if (finalId) {
                setRegId(finalId);
                setTimeout(() => navigate(`/receipt/${finalId}`), 2000);
            }
        }
      } catch (err) {
        console.error('Success Verification Error:', err);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading || status === 'verifying') return (
    <PageLayout title="Payment Check" subtitle="Wait a moment...">
        <div className="flex flex-col items-center justify-center py-40 gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Connecting...</p>
        </div>
    </PageLayout>
  );

  if (status === 'error') return (
    <PageLayout title="Verification Error" subtitle="We had a problem checking your payment.">
        <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <ShieldCheck className="w-10 h-10" />
            </div>
            <p className="max-w-md text-center text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                We couldn't confirm your payment. Please email support@asfaa2026.com with your Order ID.
            </p>
            <Link to="/contact">
                <Button variant="outline" className="h-12 px-8 uppercase text-[10px] font-black tracking-widest">Contact Support</Button>
            </Link>
        </div>
    </PageLayout>
  );

  return (
    <PageLayout 
        title="Payment Successful" 
        subtitle="You are now registered."
    >
        <div className="max-w-4xl mx-auto px-6 pb-32 font-outfit text-center space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full scale-150 animate-pulse" />
                <div className="w-32 h-32 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 relative z-10 mx-auto">
                    <CheckCircle2 className="w-16 h-16 drop-shadow-sm" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-4xl font-black text-navy uppercase tracking-tight">Payment <span className="text-emerald-500">Received</span></h2>
                <p className="text-[10px] font-black text-blue uppercase tracking-widest animate-pulse">Redirecting to your receipt...</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                <div className="bg-white border border-slate-50 p-8 rounded-[2rem] shadow-xl shadow-slate-900/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue/5 text-blue flex items-center justify-center">
                            <Tag className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-black text-blue uppercase tracking-widest leading-none">Registration ID</p>
                    </div>
                    <p className="text-navy text-xl font-black uppercase tracking-tight">ID: {regId || 'CONFIRMED'}</p>
                </div>

                <div className="bg-white border border-slate-50 p-8 rounded-[2rem] shadow-xl shadow-slate-900/5 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue/5 text-blue flex items-center justify-center">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] font-black text-blue uppercase tracking-widest leading-none">Summit Dates</p>
                    </div>
                    <p className="text-navy text-xl font-black uppercase tracking-tight">Nov 2026</p>
                </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                    onClick={() => navigate(`/receipt/${regId}`)}
                    className="h-14 px-10 bg-navy hover:bg-blue text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all group"
                >
                    View Receipt <Download className="w-4 h-4 ml-3" />
                </Button>
                <Link to="/">
                    <Button variant="ghost" className="h-14 px-10 border-2 border-slate-100 hover:bg-slate-50 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                        Back to Home <ArrowRight className="w-4 h-4 ml-3" />
                    </Button>
                </Link>
            </div>
        </div>
    </PageLayout>
  );
}
