import PageLayout from './PageLayout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '@/components/ui/Loader';


export default function OrganizersPage() {
  const [committee, setCommittee] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/chairs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCommittee(data.filter(m => m.category !== 'Chairs'));
      })
      .catch(err => console.error('Chairs Sync Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
     <PageLayout title="Our Team" subtitle="Loading...">
         <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <Loader />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading team members...</p>
         </div>
     </PageLayout>
  );
  const categories = [...new Set(committee.map(m => m.category || 'Scientific Committee'))];

  return (
    <PageLayout 
      title="Our Team" 
      subtitle="The people leading our event."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-24">
        {categories.map((category) => (
          <section key={category} className="space-y-12">
             <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-2xl font-bold text-slate-900 font-outfit uppercase tracking-tight">{category}</h2>
                <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {committee.filter(m => (m.category || 'Scientific Committee') === category).map((member, i) => (
                  <div key={member.id || i} className="p-5 bg-white rounded-[2rem] shadow-xl shadow-indigo-100/20 border border-slate-50 relative group transition-all duration-700 hover:-translate-y-1">
                      <div className="flex flex-col items-center text-center">
                          <div className="w-44 h-44 mb-5 border-[6px] border-slate-50 group-hover:border-indigo-50 shadow-xl transition-all duration-700 relative overflow-hidden rounded-3xl">
                             <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                          </div>
                          <h3 className="text-lg font-black text-slate-900 font-outfit leading-tight mb-4 uppercase tracking-tight">{member.name}</h3>
                          <div className="bg-slate-50 w-full p-4 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                             <p className="text-[10px] font-black text-slate-600 mb-1 uppercase tracking-tight">{member.affiliation}</p>
                             <div className="flex items-center justify-center gap-1.5 mt-2">
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{member.location}</p>
                                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                             </div>
                          </div>
                      </div>
                  </div>
                ))}
             </div>
          </section>
        ))}



        {/* Advisory footer */}
        <section className="bg-indigo-600 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-xl shadow-indigo-600/10">
           <div className="text-center md:text-left mb-4 md:mb-0">
             <h4 className="text-lg font-bold font-outfit mb-0.5 uppercase tracking-tight">Want to join us?</h4>
             <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">conference@foodagriexpo.com</p>
           </div>
           <Link to="/contact">
             <button className="bg-white text-indigo-600 h-10 px-8 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg hover:bg-slate-50 transition-all active:scale-95">
                Contact
             </button>
           </Link>
        </section>
      </div>
    </PageLayout>
  );
}
