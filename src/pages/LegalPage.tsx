import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { ArrowLeft, ShieldCheck, Scale, Cookie, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LegalPage() {
  const { slug } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/legal/${slug}`).then(res => res.ok ? res.json() : Promise.reject())
    ]).then(([lData]) => {
      setContent(lData);
      setLoading(false);
    }).catch(() => {
      setError(true);
      setLoading(false);
    });
  }, [slug]);

  const getIcon = () => {
    if (slug === 'privacy') return ShieldCheck;
    if (slug === 'terms') return Scale;
    if (slug === 'cookies') return Cookie;
    return ShieldCheck;
  };

  const Icon = getIcon();

  return (
    <PageLayout 
      title={content?.title || 'Legal Page'} 
      subtitle={`Our rules and policies for the ASFAA 2026 Summit.`}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-16 pb-32 font-outfit animate-in fade-in slide-in-from-bottom-5 duration-1000">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <Link to="/" className="inline-flex items-center gap-3 px-5 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group shrink-0">
                <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-blue group-hover:-translate-x-1 transition-all" />
                <span className="text-[10px] font-black text-slate-400 group-hover:text-navy uppercase tracking-widest">Back Home</span>
            </Link>

            <div className="flex items-center gap-4 bg-emerald-50/50 border border-emerald-100 px-6 py-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">
                    Last Updated: {content ? new Date(content.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'March 2026'}
                </p>
            </div>
        </div>

        {loading ? (
             <div className="flex flex-col items-center justify-center py-32 gap-6 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
                <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse text-center">Loading Policies...</p>
             </div>
        ) : error ? (
            <div className="bg-red-50 p-16 rounded-[3rem] border border-red-100 text-center space-y-4">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto opacity-40" />
                <h3 className="text-lg font-black text-navy uppercase tracking-tight">Load Error</h3>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest max-w-sm mx-auto">This page could not be found at the moment.</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="mt-4 border-red-200 text-red-600 hover:bg-red-100 uppercase text-[10px] font-black tracking-widest h-12 px-10 rounded-xl">Try Again</Button>
            </div>
        ) : (
            <div className="bg-white border border-slate-50 rounded-[3.5rem] p-10 lg:p-16 shadow-2xl shadow-blue/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-blue/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue/10 transition-colors" />
                
                <div className="relative z-10 space-y-12">
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-100 pb-10">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 rounded-full border border-blue/10">
                                <Icon className="w-3 h-3 text-blue" />
                                <span className="text-[9px] font-black text-blue uppercase tracking-widest">{content?.slug || 'Legal'} Info</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-black text-navy uppercase tracking-tighter">{content?.title}</h1>
                        </div>
                        <div className="flex items-center gap-3 opacity-20 hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                        </div>
                     </div>
                     
                     <div className="prose prose-slate max-w-none">
                        <div className="text-slate-600 font-bold leading-relaxed whitespace-pre-wrap text-sm lg:text-base tracking-tight opacity-90">
                           {content?.content}
                        </div>
                     </div>

                     <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue/5 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-blue opacity-40" />
                            </div>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
                                Confirmed by Organizer &bull; Legal Team
                            </p>
                        </div>
                        
                        <div className="flex gap-4">
                           <div className="w-8 h-8 rounded-lg bg-slate-50" />
                           <div className="w-8 h-8 rounded-lg bg-slate-50" />
                           <div className="w-8 h-8 rounded-lg bg-slate-50" />
                        </div>
                     </div>
                </div>
            </div>
        )}

      </div>
    </PageLayout>
  );
}
