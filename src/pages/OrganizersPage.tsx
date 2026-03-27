import PageLayout from './PageLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function OrganizersPage() {
  const [committee, setCommittee] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/chairs`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCommittee(data);
      })
      .catch(err => console.error('Chairs Sync Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
     <PageLayout title="Team" subtitle="Loading Scientific Committee...">
         <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Syncing Committee Members...</p>
         </div>
     </PageLayout>
  );
  return (
    <PageLayout 
      title="Team" 
      subtitle="The leaders and experts behind the summit."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-16">
        {/* Management Team */}
        <section className="space-y-10">
           <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl font-bold text-slate-900 font-outfit uppercase tracking-tight">Scientific Team</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">Global experts leading our event.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {committee.map((member, i) => (
                <div key={i} className="p-6 bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-slate-50 relative group transition-all duration-700 hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="w-20 h-20 mb-4 border-[4px] border-slate-50 group-hover:border-indigo-50 shadow-lg transition-all duration-700">
                           <AvatarImage src={member.image} />
                           <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-bold text-slate-900 font-outfit leading-tight mb-0.5 uppercase tracking-tight">{member.name}</h3>
                        <p className="text-[9px] font-black text-indigo-500 mb-4 uppercase tracking-widest">{member.role}</p>
                        <div className="bg-slate-50 w-full p-4 rounded-xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                           <p className="text-[10px] font-black text-slate-600 mb-1 uppercase tracking-tight">{member.affiliation}</p>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{member.location}</p>
                        </div>
                    </div>
                </div>
              ))}
           </div>
        </section>



        {/* Advisory footer */}
        <section className="bg-indigo-600 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-xl shadow-indigo-600/10">
           <div className="text-center md:text-left mb-4 md:mb-0">
             <h4 className="text-lg font-bold font-outfit mb-0.5 uppercase tracking-tight">Want to join us?</h4>
             <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">contact@foodagriexpo.com</p>
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
