import { BookOpen, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JournalsBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="bg-slate-950 rounded-3xl p-10 lg:p-12 flex flex-col lg:flex-row items-center gap-10 overflow-hidden relative border border-white/10 shadow-2xl">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue/10 to-transparent blur-3xl opacity-20" />
          
          <div className="flex-grow space-y-10 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue">
                 <BookOpen className="w-3.5 h-3.5" />
                 <span className="text-xs font-bold leading-none">Scopus & Web of Science Indexed</span>
              </div>
                          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-none">Expert <span className="text-blue">Journal Collaborations</span></h2>
                          <p className="text-white/40 text-sm font-bold leading-loose max-w-2xl">
                 Elevate your research impact. High-quality papers will be fast-tracked for publication in our globally indexed partner journals in food and agriculture.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                 {['Peer-Review Process', 'Indexing Support', 'Open Access Options'].map((t, i) => (
                   <div key={i} className="flex items-center gap-3 text-white/30 text-xs font-bold whitespace-nowrap">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
                   </div>
                 ))}
              </div>
          </div>

          <div className="flex-shrink-0 relative z-10 w-full lg:w-auto">
              <Link to="/journals" className="h-20 w-full lg:w-72 bg-white text-navy rounded-3xl flex items-center justify-center text-sm font-bold shadow-2xl hover:bg-blue hover:text-white transition-all active:scale-95 text-decoration-none group">
                 Journal List <ArrowUpRight className="ml-3 w-5 h-5 opacity-40 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
