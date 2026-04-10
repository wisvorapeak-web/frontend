import { Award, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const colorPalette = [
  'text-indigo-600 bg-indigo-50 border-indigo-100',
  'text-rose-600 bg-rose-50 border-rose-100',
  'text-emerald-600 bg-emerald-50 border-emerald-100',
  'text-amber-600 bg-amber-50 border-amber-100',
  'text-cyan-600 bg-cyan-50 border-cyan-100',
];

export default function ChairsBanner() {
  const [chairs, setChairs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/chairs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const chairMembers = data.filter(m => m.category === 'Chairs');
          setChairs(chairMembers.length > 0 ? chairMembers.slice(0, 3) : []);
        }
      })
      .catch(err => console.error('ChairsBanner fetch error:', err));
  }, []);

  // Fallback to static placeholders if no chairs in DB yet
  const displayChairs = chairs.length > 0 ? chairs : [
    { role: 'Conference Chair', name: 'To Be Announced', affiliation: 'University or Organization' },
    { role: 'Local Organizing Chair', name: 'To Be Announced', affiliation: 'University or Organization' },
    { role: 'Scientific Committee Chair', name: 'To Be Announced', affiliation: 'University or Organization' },
  ];

  return (
    <section className="py-20 bg-white font-outfit">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full text-blue">
              <ShieldCheck className="w-3.5 h-3.5" />
               <span className="text-[9px] font-black uppercase tracking-widest leading-none">Our Experts</span>
           </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-navy leading-none uppercase tracking-tight">Event <span className="text-blue">Leaders</span></h2>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">
               Our team is made up of top experts and researchers.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {displayChairs.map((chair: any, i: number) => (
             <div key={chair.id || i} className={`p-8 border rounded-3xl transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col items-center text-center space-y-6 ${colorPalette[i % colorPalette.length]}`}>
                {chair.image ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg">
                    <img src={chair.image} alt={chair.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 border-white/20 shadow-lg shadow-current/10`}>
                    <Award className="w-6 h-6" />
                  </div>
                )}
                 <div className="space-y-1.5">
                    <h3 className="text-[9px] font-black opacity-60 leading-none uppercase tracking-widest">{chair.role || 'Chair'}</h3>
                    <h4 className="text-xl font-bold text-navy leading-none uppercase tracking-tight">{chair.name}</h4>
                 </div>
                 <div className="p-3 bg-white/40 rounded-xl border border-white/40 w-full">
                     <p className="text-[10px] font-bold text-slate-400">{chair.affiliation || 'University or Organization'}</p>
                 </div>
             </div>
           ))}
        </div>

         <div className="flex justify-center pt-4">
             <Link to="/chairs" className="h-12 px-10 bg-navy text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-xl shadow-navy/20 hover:bg-blue transition-all active:scale-95 text-decoration-none">
                Meet the Team
             </Link>
         </div>

      </div>
    </section>
  );
}
