import { Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ChairsBanner() {
  const chairs = [
    { role: 'Conference Chair', icon: Award, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { role: 'Local Organizing Chair', icon: MapPin, color: 'text-rose-600 bg-rose-50 border-rose-100' },
    { role: 'Scientific Committee Chair', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  ];

  return (
    <section className="py-24 bg-white font-outfit">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-20">
        
        <div className="text-center space-y-6 max-w-2xl mx-auto">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full text-blue">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-xs font-bold leading-none">Scientific Excellence</span>
           </div>
           <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-none">Summit <span className="text-blue">Leadership</span></h2>
           <p className="text-slate-400 text-sm font-bold leading-loose">
              Ascendix 2026 is directed by a world-class committee of global scholars and industry pioneers.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {chairs.map((chair, i) => (
             <div key={i} className={`p-10 border rounded-[3rem] transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col items-center text-center space-y-8 ${chair.color}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-xl shadow-current/10`}>
                   <chair.icon className="w-8 h-8" />
                </div>
                 <div className="space-y-3">
                    <h3 className="text-xs font-bold opacity-60 leading-none">{chair.role}</h3>
                    <h4 className="text-2xl font-bold text-navy leading-none">To Be Announced</h4>
                 </div>
                 <div className="p-4 bg-white/40 rounded-2xl border border-white/40 w-full">
                    <p className="text-xs font-bold text-slate-400">Global Academic Institution</p>
                 </div>
             </div>
           ))}
        </div>

         <div className="flex justify-center pt-8">
            <Link to="/chairs" className="h-18 px-12 bg-navy text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-2xl shadow-navy/20 hover:bg-blue transition-all active:scale-95 text-decoration-none">
               Meet the Full Committee
            </Link>
         </div>

      </div>
    </section>
  );
}

import { MapPin } from 'lucide-react'; // Fix missing import
