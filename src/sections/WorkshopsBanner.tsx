import { Rocket, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkshopsBanner() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="space-y-6 relative z-10 max-w-xl text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-indigo-200 rounded-full text-indigo-600">
                <Rocket className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">Enhanced Learning</span>
             </div>
             <h2 className="text-2xl lg:text-3xl font-bold text-navy uppercase tracking-tight">Technical Workshops</h2>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                 Deep-dive sessions led by world experts in sustainable technology and modern agriculture.
              </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
             <div className="flex items-center gap-3 text-indigo-400">
                <Clock className="w-5 h-5 opacity-40" strokeWidth={3} />
                <span className="text-xs font-bold">Limited Seats</span>
             </div>
              <Link to="/workshops" className="h-12 px-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-navy transition-all active:scale-95 text-decoration-none">
                 Browse Workshops <ArrowUpRight className="ml-2 w-3.5 h-3.5 opacity-50" />
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
