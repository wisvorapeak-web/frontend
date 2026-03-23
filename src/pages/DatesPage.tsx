import PageLayout from './PageLayout';
import { Clock, Calendar, AlertCircle, FileCheck, CheckCircle2, Award, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const milestoneStyles = [
  { icon: FileCheck, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: Clock, color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { icon: AlertCircle, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  { icon: Award, color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { icon: Calendar, color: 'bg-slate-50 text-slate-800 border-slate-200' },
];

export default function DatesPage() {
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/dates`)
      .then(res => res.json())
      .then(data => {
        const enriched = data.map((d: any, i: number) => ({
          title: d.event,
          description: d.description || 'Final deadline for this event.',
          date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: d.is_active ? 'Active' : 'Closed',
          ...milestoneStyles[i % milestoneStyles.length]
        }));
        setMilestones(enriched);
      })
      .catch(err => console.error('Dates fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLayout title="Dates" subtitle="Loading..."><div className="p-40 text-center"><Zap className="w-12 h-12 text-slate-100 animate-spin mx-auto mb-6" /> <p className="text-slate-300 font-black text-xs uppercase tracking-[0.3em]">Loading dates...</p></div></PageLayout>;
  
  return (
    <PageLayout 
      title="Dates" 
      subtitle="See all important dates for the summit in Singapore."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-16 pb-20">
        
        {/* Timeline Header Section */}
        <div className="bg-navy p-8 lg:p-10 rounded-2xl relative overflow-hidden group shadow-2xl shadow-navy/20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue/20 transition-all duration-1000" />
            <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-4 text-blue">
                  <Clock className="w-8 h-8" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">Dates</span>
               </div>
               <h2 className="text-2xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase">Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-indigo-400">Dates</span></h2>
               <p className="max-w-2xl text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic">
                  Important dates for your research and registration.
               </p>
            </div>
        </div>

        {/* Milestones Registry */}
        <section className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-50 p-8 lg:p-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.02),transparent)] pointer-events-none" />
           <div className="space-y-12 relative z-10">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-12 group">
                   <div className="flex flex-col items-center md:items-end min-w-[240px] text-center md:text-right space-y-2">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Deadline</p>
                       <h4 className="text-2xl font-black font-outfit text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{milestone.date}</h4>
                   </div>

                   {/* Connector Dot */}
                    <div className="relative py-2 md:py-0">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all shadow-xl shadow-slate-200/50 group-hover:shadow-indigo-600/20 group-hover:rotate-12">
                          <milestone.icon className="w-5 h-5" />
                       </div>
                       <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-indigo-50 to-transparent group-last:hidden" />
                    </div>

                   <div className="flex-1 space-y-4 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                          <h3 className="text-xl font-black text-slate-800 font-outfit leading-tight pr-6">{milestone.title}</h3>
                         <div className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${milestone.color} shadow-sm`}>
                            {milestone.status}
                         </div>
                      </div>
                      <p className="text-slate-400 font-medium text-base leading-relaxed max-w-2xl px-4 md:px-0">
                         {milestone.description}
                         <br />
                         <span className="text-[10px] uppercase font-black tracking-widest text-slate-300 mt-4 block opacity-60">Final deadlines set by the team.</span>
                      </p>
                   </div>
                </div>
              ))}

              {milestones.length === 0 && (
                <div className="py-20 text-center space-y-6">
                   <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 shadow-inner group">
                      <Calendar className="w-10 h-10 group-hover:scale-110 transition-transform" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-800">Coming Soon</h3>
                   <p className="max-w-sm mx-auto text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">The team is finishing the schedule for 2026.</p>
                </div>
              )}
           </div>
        </section>

        {/* Global Time Reminder CTA */}
        <section className="bg-slate-900 p-10 lg:p-16 rounded-[3rem] text-white flex flex-col items-center text-center space-y-8 overflow-hidden relative group">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent)] pointer-events-none group-hover:scale-150 transition-transform duration-[2000ms]" />
           <div className="space-y-4 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black font-outfit tracking-tight leading-tight">Add to your <span className="text-blue">calendar?</span></h2>
              <p className="text-slate-400 text-base lg:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                 Add the event dates to your calendar to get alerts for deadlines.
              </p>
           </div>
           <button className="h-14 px-10 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-blue hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5 relative z-10 group inline-flex items-center gap-4">
              Add to Calendar <CheckCircle2 className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:rotate-12" />
           </button>
        </section>
      </div>
    </PageLayout>
  );
}
