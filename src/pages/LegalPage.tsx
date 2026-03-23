import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { Loader2, ArrowLeft, ShieldCheck, Scale, Cookie, AlertCircle } from 'lucide-react';

export default function LegalPage() {
  const { slug } = useParams();
  const [content, setContent] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/legal/${slug}`).then(res => res.ok ? res.json() : Promise.reject()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.ok ? res.json() : null)
    ]).then(([lData, sData]) => {
      setContent(lData);
      setSettings(sData);
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
      title={content?.title || 'Legal Document'} 
      subtitle={`Last Updated: ${content ? new Date(content.updated_at).toLocaleDateString() : 'N/A'}`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-16 pb-12 py-8 font-outfit">
        
        <Link to="/" className="inline-flex items-center gap-2 text-[8px] font-black text-blue uppercase tracking-widest hover:gap-3 transition-all mb-8">
            <ArrowLeft className="w-3 h-3" /> Home
        </Link>

        {loading ? (
             <div className="flex flex-col items-center justify-center py-12 gap-4 bg-slate-50 rounded-2xl border border-slate-50">
                <Loader2 className="w-6 h-6 text-blue animate-spin" />
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest animate-pulse">Loading Document</p>
             </div>
        ) : error ? (
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-red-500 mx-auto" />
                <h3 className="text-sm font-black text-navy uppercase tracking-tight">Error Loading</h3>
            </div>
        ) : (
            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-50 shadow-xl shadow-navy/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] -rotate-12">
                    <Icon className="w-32 h-32" />
                </div>
                
                <div className="relative z-10 prose prose-slate max-w-none">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 rounded-full border border-blue/10 mb-6">
                        <Icon className="w-3 h-3 text-blue" />
                        <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">{content.title}</span>
                     </div>
                     
                     <div className="text-slate-500 font-bold leading-relaxed whitespace-pre-wrap text-[11px] uppercase tracking-tight opacity-80 italic">
                        {content.content}
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em]">{settings?.site_title || 'Ascendix Summits'} &bull; 2026</p>
                        <ShieldCheck className="w-4 h-4 text-emerald-500 opacity-20" />
                     </div>
                </div>
            </div>
        )}

      </div>
    </PageLayout>
  );
}
