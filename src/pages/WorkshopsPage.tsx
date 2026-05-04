import PageLayout from './PageLayout';
import { Rocket, Clock, CheckCircle2, Loader2, MapPin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/program`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            // Filter for workshops (case-insensitive)
            const filtered = data.filter((s: any) => 
                s.session_type.toLowerCase().includes('workshop') || 
                s.title.toLowerCase().includes('workshop')
            );
            setWorkshops(filtered);
        }
      })
      .catch(err => console.error('Workshops fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout 
      title="Workshops" 
      subtitle="Learn practical skills from industry leaders in Agri-Tech."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 space-y-32 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
           <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000 sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <Rocket className="w-3.5 h-3.5 text-blue" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-blue leading-none">Registration Open</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-navy leading-tight uppercase tracking-tight">Practical <span className="text-blue">Training</span></h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed italic opacity-80 uppercase tracking-tight">
                 Our workshops provide practical skills in the latest agricultural technologies. 
                 From AI farming to food science, gain hands-on experience with experts.
              </p>
              
              <ul className="space-y-4 pt-4">
                 {[
                   'Certificates for all participants',
                   'Work with real-world equipment',
                   'Small group sizes for better learning',
                   'Lunch and materials included'
                 ].map((t, i) => (
                   <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-navy opacity-40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
                   </li>
                 ))}
              </ul>

              <Link to="/registration" className="inline-block h-16 px-12 bg-navy text-white rounded-[2rem] flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-navy/10 hover:bg-blue transition-all active:scale-95 text-decoration-none">
                 Register Now
              </Link>
           </div>
           
           <div className="space-y-8">
              {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-6 bg-slate-50 rounded-[4rem] border border-slate-100">
                    <Loader2 className="w-12 h-12 text-blue animate-spin" />
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading Workshops...</p>
                </div>
              ) : workshops.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {workshops.map((workshop, i) => (
                        <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-900/5 hover:border-blue/20 hover:shadow-blue/10 transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue/5 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{workshop.day || 'Day 2'}</span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-navy uppercase tracking-tight group-hover:text-blue transition-colors">{workshop.title}</h3>
                                <p className="text-slate-500 text-xs font-medium leading-relaxed italic opacity-70 line-clamp-3">{workshop.description}</p>
                                
                                <div className="pt-6 border-t border-slate-50 flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-blue opacity-30" />
                                        <span className="text-[10px] font-black text-navy uppercase tracking-widest">{workshop.start_time} - {workshop.end_time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-blue opacity-30" />
                                        <span className="text-[10px] font-black text-navy uppercase tracking-widest">{workshop.location || 'Lab'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              ) : (
                <div className="bg-slate-50 p-12 lg:p-16 rounded-[4rem] border border-slate-100 space-y-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue shadow-xl shadow-blue/5 mx-auto border border-blue/5">
                        <Clock className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-navy uppercase tracking-tight">Coming Soon</h3>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest leading-relaxed italic">
                        Topics and timings will be announced soon. 
                        Spots are limited and given on a first-come basis.
                    </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
