import PageLayout from './PageLayout';
import { FileCheck, CheckCircle2, Globe, Loader2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function JournalsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageLayout title="Journals" subtitle="Loading publication info...">
       <div className="py-40 flex flex-col items-center justify-center gap-6">
          <Loader2 className="w-12 h-12 text-blue animate-spin" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest animate-pulse">Wait a moment...</p>
       </div>
    </PageLayout>
  );

  return (
    <PageLayout 
      title="Journals" 
      subtitle="Publish your research in top journals."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 space-y-16 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <FileCheck className="w-3.5 h-3.5 text-blue" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue leading-none">Partners</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy leading-tight uppercase tracking-tight">Publish Your <span className="text-blue">Research</span></h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed italic uppercase tracking-tight opacity-80">
                 {settings?.journals_description || "Top papers will be chosen for publication in our partner journals. Connect your research with global publishers."}
              </p>
              
              <ul className="space-y-4 pt-4">
                 {(settings?.journals_benefits?.split(',') || [
                    'Full Peer-Review Process',
                    'Indexing in Major Databases',
                    'Open Access Option Available',
                    'Rapid Publication Track'
                 ]).map((t: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-navy opacity-40">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.trim()}
                    </li>
                 ))}
              </ul>

              <Link to="/abstract-submission" className="inline-block h-14 px-10 bg-navy text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-navy/10 hover:bg-blue transition-all active:scale-95 text-decoration-none border-0">
                 Submit Now
              </Link>
           </div>
           
           <div className="bg-slate-950 p-10 lg:p-20 rounded-[3rem] border border-white/5 space-y-10 shadow-2xl relative overflow-hidden text-center group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity" />
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-blue mx-auto border border-white/5 group-hover:scale-110 group-hover:rotate-12 transition-all">
                 <Globe className="w-10 h-10" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Partner Journals</h3>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-relaxed italic max-w-sm mx-auto">
                    {settings?.journals_partners_info || "We are finalizing partnerships with top publishers including IEEE, Springer, and Nature Agri."}
                </p>
              </div>
              
              <div className="pt-10 grid grid-cols-2 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white/10" />
                    </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
