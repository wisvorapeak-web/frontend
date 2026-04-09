import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShieldCheck,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReceiptPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/registration/${id}`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.json())
    ]).then(([reg, settings]) => {
      setData(reg);
      setSiteSettings(settings);
    }).catch(err => {
      console.error('Receipt Error:', err);
    }).finally(() => {
      setLoading(false);
    });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-outfit">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Generating Receipt...</p>
        </div>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-outfit p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-navy uppercase tracking-tight">Receipt Not Found</h1>
          <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase tracking-widest opacity-70">
            We couldn't find a record for ID: <span className="text-navy">{id}</span>
          </p>
          <Button onClick={() => window.close()} className="h-12 w-full bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
            Close Window
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center py-12 px-6 print:p-0 print:bg-white font-outfit">
      
      {/* Control Bar (Hidden on Print) */}
      <div className="max-w-4xl w-full flex justify-between items-center mb-8 print:hidden">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
                <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-navy uppercase tracking-widest">Official Registration Receipt</p>
         </div>
         <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint} className="h-10 bg-white border-slate-200 text-navy font-black text-[9px] uppercase tracking-widest px-6 rounded-lg flex items-center gap-2">
                <Printer className="w-3.5 h-3.5" /> Print
            </Button>
            <Button onClick={handlePrint} className="h-10 bg-blue text-white font-black text-[9px] uppercase tracking-widest px-6 rounded-lg flex items-center gap-2 shadow-xl shadow-blue/20">
                <Download className="w-3.5 h-3.5" /> Download PDF
            </Button>
         </div>
      </div>

      {/* Main Receipt Content */}
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 overflow-hidden print:shadow-none print:border-none print:rounded-none">
        
        {/* Header Header */}
        <div className="bg-navy p-10 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto brightness-0 invert" />
                        <div className="w-px h-8 bg-white/20" />
                        <h1 className="text-xl font-black tracking-tighter uppercase leading-none">{siteSettings?.site_short_name || 'ASFAA-2026'}</h1>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-blue uppercase tracking-[0.4em] mb-1">Receipt for Registration</p>
                        <h2 className="text-3xl font-black uppercase tracking-tight">{siteSettings?.site_title || 'Ascendix World Summit'}</h2>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-center gap-4 min-w-[240px]">
                    <div className="space-y-0.5 border-b border-white/10 pb-3">
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Receipt ID</p>
                        <p className="text-xs font-black uppercase tracking-tight">{data.registrationId}</p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Order On</p>
                        <p className="text-xs font-black uppercase tracking-tight">{new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Details Wrapper */}
        <div className="p-10 lg:p-16 space-y-12">
            
            {/* Status Strip */}
            <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[8px] font-black text-emerald-600/60 uppercase tracking-widest leading-none mb-1">Payment Status</p>
                        <p className="text-xs font-black text-navy uppercase tracking-tight">{data.payment_status?.toUpperCase() || 'PAID'}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black text-emerald-600/60 uppercase tracking-widest leading-none mb-1">Method</p>
                    <p className="text-xs font-black text-navy uppercase tracking-tight">{data.payment_method?.toUpperCase() || 'ONLINE'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Registrant Info */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <Users className="w-4 h-4 text-blue" />
                        <h4 className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">Registered User</h4>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Full Name</p>
                            <p className="text-sm font-black text-navy uppercase tracking-tight">{data.firstName} {data.lastName}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Email Address</p>
                            <p className="text-sm font-black text-navy">{data.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Institution / School</p>
                            <p className="text-sm font-black text-navy uppercase tracking-tight">{data.institution || 'Individual Researcher'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Home Region</p>
                            <p className="text-sm font-black text-navy uppercase tracking-tight">{data.country}</p>
                        </div>
                    </div>
                </div>

                {/* Event Summary */}
                <div className="space-y-8 border-l border-slate-100 pl-8 md:pl-16">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <Calendar className="w-4 h-4 text-blue" />
                        <h4 className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">Summary</h4>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Plan Selected</p>
                            <span className="inline-block px-3 py-1 bg-navy text-white text-[9px] font-black uppercase tracking-widest rounded-full">{data.tier}</span>
                        </div>
                        
                        <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100 space-y-6">
                            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Base Price ({data.currency || 'USD'})</span>
                                <span>{(Number(data.amount) - Number(data.tax || 0)).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span>Tax (5%)</span>
                                <span>{Number(data.tax || 0).toLocaleString()}</span>
                            </div>
                            {data.guest_addon && (
                                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Guest Add-on</span>
                                    <span>Included</span>
                                </div>
                            )}
                            <div className="pt-6 border-t border-slate-200 flex justify-between items-center">
                                <span className="text-[10px] font-black text-navy uppercase tracking-[0.2em]">Total Amount Paied</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xs font-black text-blue">{data.currency || 'USD'}</span>
                                    <span className="text-3xl font-black text-navy tracking-tighter">{Number(data.amount).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-400">
                             <ShieldCheck className="w-4 h-4" />
                             <p className="text-[8px] font-black uppercase tracking-widest italic opacity-60 leading-relaxed">
                                This is a computer-generated receipt. <br /> Valid for entry and visa.
                             </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Footer Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue">
                        <MapPin className="w-3.5 h-3.5" />
                        <p className="text-[8px] font-black uppercase tracking-widest">Location</p>
                    </div>
                    <p className="text-[10px] font-black text-navy uppercase tracking-tight">{siteSettings?.contact_address || 'Singapore'}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue">
                        <Mail className="w-3.5 h-3.5" />
                        <p className="text-[8px] font-black uppercase tracking-widest">Email Support</p>
                    </div>
                    <p className="text-[10px] font-black text-navy italic lowercase">{siteSettings?.contact_email || 'support@asfaa2026.com'}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue">
                        <Phone className="w-3.5 h-3.5" />
                        <p className="text-[8px] font-black uppercase tracking-widest">Call Us</p>
                    </div>
                    <p className="text-[10px] font-black text-navy uppercase tracking-tight">{siteSettings?.contact_phone || '+65 6123 4567'}</p>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue">
                        <Globe className="w-3.5 h-3.5" />
                        <p className="text-[8px] font-black uppercase tracking-widest">Web</p>
                    </div>
                    <p className="text-[10px] font-black text-navy uppercase tracking-tight">asfaa2026.com</p>
                </div>
            </div>
        </div>

        {/* Fine Print Footer */}
        <div className="p-8 bg-slate-50 text-center space-y-4">
            <p className="max-w-2xl mx-auto text-slate-400 text-[8px] font-bold uppercase tracking-widest leading-loose italic opacity-60">
                Please present this ID at the registration desk in Singapore to collect your delegate badge. 
                Keep this document for your visa application if required.
            </p>
            <div className="flex items-center justify-center gap-6 opacity-30">
                <ShieldCheck className="w-4 h-4" />
                <LockIcon className="w-4 h-4" />
                <VerificationIcon className="w-4 h-4" />
            </div>
        </div>
      </div>
      
      <p className="mt-8 text-[8px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Wisvora Scientific Protocol v1.0.4 • {id}</p>

    </div>
  );
}

const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
)

const VerificationIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 15 8"/>
    </svg>
)
