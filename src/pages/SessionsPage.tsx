import PageLayout from './PageLayout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  MapPin, 
  Clock, 
  Mic2,
  Loader2,
  Calendar,
  Layers
} from 'lucide-react';
import Topics from '../sections/Topics';

const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('session')) return Zap;
    if (t.includes('break')) return Clock;
    return Mic2;
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/program`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
            // Filter out breaks, only show technical/keynote sessions
            const talks = data.filter((s: any) => !s.session_type.toLowerCase().includes('break'));
            setSessions(talks);
        }
      })
      .catch(err => console.error('Sessions fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout 
      title="Sessions" 
      subtitle="Explore our expert-led talks and technical presentations."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-16">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading Sessions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sessions.map((session, i) => {
              const Icon = getIcon(session.session_type || 'Session');
              return (
                <div key={i} className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:border-blue/20 hover:shadow-3xl hover:shadow-navy/10 transition-all duration-700">
                   <div className="p-8 flex-grow flex flex-col space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="w-12 h-12 rounded-2xl bg-blue/5 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all shadow-xl shadow-transparent group-hover:shadow-blue/20">
                            <Icon className="w-6 h-6" />
                         </div>
                         <div className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue transition-colors">
                            {session.day || 'Day 1'}
                         </div>
                      </div>

                      <div className="space-y-2">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-black text-blue uppercase tracking-widest bg-blue/5 px-3 py-1 rounded-full border border-blue/10">{session.session_type}</span>
                         </div>
                         <h3 className="text-xl font-black text-navy group-hover:text-blue transition-colors duration-500 uppercase tracking-tighter leading-snug">{session.title}</h3>
                         {session.speaker_name && (
                            <div className="flex items-center gap-2 pt-1">
                               <Mic2 className="w-3.5 h-3.5 text-blue opacity-40" />
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{session.speaker_name}</p>
                            </div>
                         )}
                      </div>
                      
                      <p className="text-slate-500 text-[11px] font-bold leading-relaxed opacity-60 italic group-hover:opacity-100 transition-opacity duration-700 line-clamp-4">
                        {session.description || 'Join us for this deep dive into agricultural science and technology.'}
                      </p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-blue opacity-20" />
                            <span className="text-[10px] font-black text-navy uppercase tracking-widest">{session.start_time} - {session.end_time}</span>
                         </div>
                         <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{session.location || 'Main Hall'}</span>
                         </div>
                      </div>
                   </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Conference Themes Section */}
        <div className="pt-20 border-t border-slate-50">
           <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue/5 rounded-full border border-blue/10">
                 <Layers className="w-3.5 h-3.5 text-blue" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue">Conference Themes</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-navy tracking-tight uppercase">Scientific <span className="text-blue">Domains</span></h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">The core areas of our research</p>
           </div>
           <Topics />
        </div>

        <div className="bg-navy p-10 lg:p-16 rounded-[3rem] text-center text-white space-y-8 shadow-2xl shadow-navy/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue/20 transition-all duration-1000" />
            <div className="relative z-10 space-y-4">
               <h2 className="text-3xl font-black uppercase tracking-tight">Full Conference Schedule</h2>
               <p className="text-white/40 text-base font-medium max-w-2xl mx-auto italic">
                  Check out the full day-by-day plan for the summit.
               </p>
            </div>
            <Link to="/program" className="relative z-10 inline-flex h-14 px-10 bg-blue text-white rounded-xl font-black text-[9px] uppercase tracking-widest items-center justify-center hover:bg-white hover:text-navy transition-all shadow-xl active:scale-95 text-decoration-none border-0">
               View Full Program <Calendar className="w-4 h-4 ml-3" />
            </Link>
        </div>
      </div>
    </PageLayout>
  );
}
