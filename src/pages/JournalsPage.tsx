import PageLayout from './PageLayout';
import { FileText, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JournalsPage() {
  return (
    <PageLayout 
      title="Journals" 
      subtitle="Publish your research in high-impact journals."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 space-y-16 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <FileText className="w-3.5 h-3.5 text-blue" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue leading-none">Partners</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy leading-tight uppercase tracking-tight">Publish Your <span className="text-blue">Research</span></h2>
              <p className="text-slate-500 text-xs font-medium leading-relaxed italic">
                 Top papers will be chosen for publication in our partner journals.
              </p>
              
              <ul className="space-y-2 pt-2">
                 {[
                   'Full Peer-Review Process',
                   'Indexing in Major Databases',
                   'Open Access Option Available',
                   'Rapid Publication Track'
                 ].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-navy opacity-40">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {t}
                    </li>
                 ))}
              </ul>

              <Link to="/abstract-submission" className="inline-block h-12 px-10 bg-navy text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-xl shadow-navy/10 hover:bg-blue transition-all active:scale-95 text-decoration-none">
                 Submit Now
              </Link>
           </div>
           
           <div className="bg-slate-950 p-10 lg:p-12 rounded-3xl border border-white/5 space-y-8 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -translate-y-12 translate-x-12" />
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-blue mx-auto border border-white/5">
                 <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Coming Soon</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-relaxed italic">
                 We are finalizing partnerships with top publishers.
              </p>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
