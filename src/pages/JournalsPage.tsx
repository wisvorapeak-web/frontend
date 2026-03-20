import PageLayout from './PageLayout';
import { FileText, CheckCircle2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JournalsPage() {
  return (
    <PageLayout 
      title="Journal Collaborations" 
      subtitle="Publish your research in high-impact Scopus & Web of Science journals."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 space-y-32 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <FileText className="w-3.5 h-3.5 text-blue" />
                 <span className="text-xs font-bold text-blue leading-none">Journal Partner Series</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">Elite <span className="text-blue">Scientific Publication</span></h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                 Selected papers presented at Ascendix 2026 will be recommended for publication in our partner 
                 journals. All journals are indexed in major scientific databases (Scopus, WoS, PubMed). 
                 This platform provides an excellent opportunity for researchers to increase their work's impact.
              </p>
              
              <ul className="space-y-4 pt-4">
                 {[
                   'Full Peer-Review Process',
                   'Indexing in Major Databases',
                   'Open Access Option Available',
                   'Rapid Publication Track'
                 ].map((t, i) => (
                   <li key={i} className="flex items-center gap-3 text-xs font-semibold text-navy opacity-60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
                   </li>
                 ))}
              </ul>

              <Link to="/abstract-submission" className="inline-block h-16 px-12 bg-navy text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-xl shadow-navy/10 hover:bg-blue transition-all active:scale-95 text-decoration-none">
                 Submit Manuscript
              </Link>
           </div>
           
           <div className="bg-slate-950 p-12 lg:p-16 rounded-[4rem] border border-white/5 space-y-12 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 -translate-y-12 translate-x-12" />
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-blue mx-auto border border-white/5">
                 <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Journal List Coming Soon</h3>
              <p className="text-slate-400 font-semibold text-xs leading-relaxed">
                 We are currently finalizing collaboration agreements with leading publishers from Elsevier, 
                 Springer, and MDPI. The official journal list will be updated shortly on this page.
              </p>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
