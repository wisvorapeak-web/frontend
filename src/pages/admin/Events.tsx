/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  CalendarDays,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AdminEvents() {
  const [program, setProgram] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progRes, datesRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/site/program`),
        fetch(`${import.meta.env.VITE_API_URL}/api/site/dates`)
      ]);
      if (progRes.ok) setProgram(await progRes.json());
      if (datesRes.ok) setDates(await datesRes.json());
    } catch (err) {
      console.error('Failed to fetch event data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 p-12">Synchronizing Itineraries...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-outfit text-indigo-900">Summit Manager</h1>
            <p className="text-slate-500 font-medium font-outfit">Control the scientific program, schedule releases, and milestone dates.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6 shadow-sm border-2">
               Publish Changes
            </Button>
            <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-600/20 gap-2 h-11 px-6 active:scale-95 transition-all">
              <Plus className="w-4 h-4" /> Add Session
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Scientific Program Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-indigo-900">
                   <div className="p-2.5 bg-indigo-50 rounded-xl">
                      <Clock className="w-5 h-5" />
                   </div>
                   <h3 className="text-xl font-black font-outfit tracking-tight uppercase">Program Timeline</h3>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase underline decoration-2 underline-offset-4 cursor-pointer hover:text-indigo-600">Reorder All</span>
             </div>

             <div className="space-y-4">
                {program.map((session) => (
                   <div key={session.id} className="group p-6 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 hover:border-indigo-500/20 transition-all">
                      <div className="flex justify-between items-start mb-4">
                         <div className="space-y-1">
                            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">{session.day} • {session.start_time} - {session.end_time}</span>
                            <h4 className="text-lg font-black text-slate-900 font-outfit leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{session.title}</h4>
                         </div>
                         <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50">
                               <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50">
                               <Trash2 className="w-4 h-4" />
                            </Button>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                         <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                            <MapPin className="w-3.5 h-3.5" /> {session.location || 'Main Hall'}
                         </div>
                         <div className="flex items-center gap-1.5 bg-indigo-50/30 text-indigo-600 px-3 py-1.5 rounded-xl border border-indigo-100/50">
                            <CheckCircle2 className="w-3.5 h-3.5" /> High Impact
                         </div>
                      </div>
                   </div>
                ))}
                {program.length === 0 && (
                   <div className="py-16 text-center bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[3rem]">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-6 shadow-sm">
                         <Clock className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Active Sessions</p>
                   </div>
                )}
             </div>
          </div>

          {/* Important Milestones Section */}
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-900">
                   <div className="p-2.5 bg-emerald-50 rounded-xl">
                      <CalendarDays className="w-5 h-5 text-emerald-600" />
                   </div>
                   <h3 className="text-xl font-black font-outfit tracking-tight uppercase">Critical Milestones</h3>
                </div>
                <Button variant="ghost" className="h-9 px-4 rounded-xl text-emerald-600 hover:bg-emerald-50 font-bold text-[10px] uppercase">
                   Add Date
                </Button>
             </div>

             <div className="space-y-4">
                {dates.map((date) => (
                   <div key={date.id} className="relative group p-6 bg-emerald-900 text-white rounded-[2rem] shadow-xl shadow-emerald-900/10 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="flex justify-between items-start relative z-10">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">{new Date(date.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            <h4 className="text-lg font-black font-outfit uppercase tracking-tight">{date.event}</h4>
                         </div>
                         <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-emerald-900 transition-all">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                         </Button>
                      </div>
                      <p className="mt-4 text-[10px] font-bold text-emerald-400/80 uppercase tracking-[0.2em] leading-relaxed">
                         {date.description || 'Public deployment pending final confirmation.'}
                      </p>
                   </div>
                ))}
                {dates.length === 0 && (
                   <div className="py-16 text-center bg-slate-50/50 border-2 border-dashed border-slate-100 rounded-[3rem]">
                      <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-6 shadow-sm">
                         <Calendar className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Static Milestones Pending</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
