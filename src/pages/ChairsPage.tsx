import PageLayout from './PageLayout';
import { Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import Loader from '@/components/ui/Loader';

export default function ChairsPage() {
  const [chairs, setChairs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/chairs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Only show members with category "Chairs"
          setChairs(data.filter(m => m.category === 'Chairs'));
        }
      })
      .catch(err => console.error('Chairs fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageLayout title="Chairs" subtitle="Loading...">
      <div className="flex flex-col items-center justify-center py-40 space-y-6">
        <Loader />
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading chairs...</p>
      </div>
    </PageLayout>
  );

  return (
    <PageLayout 
      title="Chairs" 
      subtitle="The experts leading the 2026 Summit."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {chairs.map((chair, i) => (
             <div key={chair.id || i} className="p-5 bg-white rounded-[2rem] shadow-xl shadow-indigo-100/20 border border-slate-50 relative group transition-all duration-700 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                    <div className="w-44 h-44 mb-5 border-[6px] border-slate-50 group-hover:border-indigo-50 shadow-xl transition-all duration-700 relative overflow-hidden rounded-3xl">
                       <img src={chair.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${chair.name}`} alt={chair.name} className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                    </div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-blue mb-1">{chair.role || 'Chair'}</h3>
                    <h4 className="text-lg font-black text-slate-900 font-outfit leading-tight mb-4 uppercase tracking-tight">{chair.name}</h4>
                    <div className="bg-slate-50 w-full p-4 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                       <p className="text-[10px] font-black text-slate-600 mb-1 uppercase tracking-tight">{chair.affiliation || '-'}</p>
                       <div className="flex items-center justify-center gap-1.5 mt-2">
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{chair.location || 'Global'}</p>
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                       </div>
                    </div>
                </div>
             </div>
           ))}
           {chairs.length === 0 && (
             <div className="col-span-3 py-20 text-center">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Chairs will be announced soon</p>
             </div>
           )}
        </div>

        <div className="bg-navy p-10 lg:p-12 rounded-3xl text-center text-white space-y-6 shadow-2xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Scientific Committee</h2>
            <p className="max-w-xl mx-auto text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
               The full committee will be listed soon.
            </p>
        </div>
      </div>
    </PageLayout>
  );
}
