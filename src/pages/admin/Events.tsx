import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  CalendarDays,
  MapPin, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Save,
  Loader2,
  RefreshCcw,
  Mic2,
  Layers
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AdminEvents() {
  const [program, setProgram] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [editingDate, setEditingDate] = useState<any>(null);

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

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingSession.id ? 'PATCH' : 'POST';
    const url = editingSession.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/program/${editingSession.id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/program`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editingSession)
      });
      if (res.ok) {
        toast.success(editingSession.id ? 'Updated' : 'Added');
        setEditingSession(null);
        fetchData();
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingDate.id ? 'PATCH' : 'POST';
    const url = editingDate.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/dates/${editingDate.id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/dates`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editingDate)
      });
      if (res.ok) {
        toast.success(editingDate.id ? 'Updated' : 'Added');
        setEditingDate(null);
        fetchData();
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (!confirm('Delete this session?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/program/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Deleted');
        fetchData();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleDeleteDate = async (id: string) => {
    if (!confirm('Delete this date?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dates/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Deleted');
        fetchData();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Schedule</h1>
            <p className="text-slate-500 font-medium font-outfit text-sm">Add and edit event sessions and dates.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" onClick={fetchData} className="rounded-2xl border-slate-100 font-bold text-slate-400 gap-3 h-14 px-8 bg-white shadow-xl shadow-slate-200/40 hover:text-blue transition-all">
                <RefreshCcw className="w-4 h-4" /> Refresh
             </Button>
             <Button 
               onClick={() => setEditingSession({ title: '', start_time: '', end_time: '', day: 'Day 1', location: '', session_type: 'Technical Session', speaker_name: '', description: '' })}
               className="rounded-2xl bg-blue hover:bg-navy font-bold shadow-2xl shadow-blue/20 gap-3 h-14 px-10 active:scale-95 transition-all"
             >
               <Plus className="w-4 h-4" /> Add
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Scientific Program Section */}
          <div className="space-y-10">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-blue/5 text-blue rounded-3xl flex items-center justify-center">
                      <Layers className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-800 leading-none mb-2">Sessions</h3>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">All</p>
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                {program.map((session) => (
                   <div key={session.id} className="group p-10 bg-white border border-slate-100 rounded-[3.5rem] shadow-xl shadow-slate-200/30 hover:shadow-2xl transition-all duration-500 relative">
                      <div className="absolute top-10 right-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                         <Button variant="ghost" size="icon" onClick={() => setEditingSession(session)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue hover:bg-blue/5">
                            <Edit3 className="w-5 h-5" />
                         </Button>
                         <Button variant="ghost" size="icon" onClick={() => handleDeleteSession(session.id)} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50">
                            <Trash2 className="w-5 h-5" />
                         </Button>
                      </div>

                      <div className="space-y-8">
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <div className="px-4 py-1.5 bg-blue text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                  {session.day}
                               </div>
                               <div className="px-4 py-1.5 bg-blue/5 text-blue rounded-full text-[10px] font-black uppercase tracking-widest border border-blue/10">
                                  {session.session_type}
                               </div>
                            </div>
                            <h4 className="text-2xl font-black text-slate-800 leading-tight pr-12">{session.title}</h4>
                            <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
                               <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" /> {session.start_time} — {session.end_time}
                               </div>
                               <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" /> {session.location || 'Main Hall'}
                               </div>
                            </div>
                         </div>

                         {session.speaker_name && (
                           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                              <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue">
                                 <Mic2 className="w-5 h-5" />
                              </div>
                              <p className="text-xs font-bold text-slate-600 tracking-tight leading-none uppercase">Speaker: <span className="text-blue">{session.speaker_name}</span></p>
                           </div>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Important Milestones Section */}
          <div className="space-y-10">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center">
                      <CalendarDays className="w-8 h-8" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-black text-slate-800 leading-none mb-2">Important Dates</h3>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Deadlines</p>
                   </div>
                </div>
                <Button 
                   onClick={() => setEditingDate({ event: '', date: '', description: '' })}
                   className="h-10 px-6 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-bold text-xs border border-emerald-100"
                >
                   Add Date
                </Button>
             </div>

             <div className="space-y-8">
                {dates.map((date) => (
                   <div key={date.id} className="relative group p-10 bg-emerald-950 text-white rounded-[3.5rem] shadow-xl shadow-emerald-900/10 overflow-hidden border border-emerald-900">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
                      
                      <div className="relative z-10 space-y-8">
                         <div className="flex justify-between items-start">
                            <div className="space-y-2">
                               <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                                  {new Date(date.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                               </p>
                               <h4 className="text-3xl font-black tracking-tight">{date.event}</h4>
                            </div>
                            <div className="flex gap-2">
                               <Button variant="ghost" size="icon" onClick={() => setEditingDate(date)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-emerald-950 transition-all">
                                  <Edit3 className="w-5 h-5" />
                               </Button>
                               <Button variant="ghost" size="icon" onClick={() => handleDeleteDate(date.id)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-rose-500">
                                  <Trash2 className="w-5 h-5" />
                               </Button>
                            </div>
                         </div>
                         <p className="text-sm font-medium text-emerald-300 leading-relaxed max-w-sm">
                            {date.description || 'Deadline for the summit.'}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Modal for Session Edit/Add */}
        {(editingSession || editingDate) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/40 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-500">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                   <h2 className="text-3xl font-black text-navy">{editingSession ? 'Edit' : 'Add'}</h2>
                   <Button variant="ghost" size="icon" onClick={() => { setEditingSession(null); setEditingDate(null); }} className="rounded-2xl hover:bg-slate-50">
                      <X className="w-8 h-8" />
                   </Button>
                </div>
                
                {editingSession ? (
                  <form onSubmit={handleSaveSession} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                     <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400 ml-1">Session Title</Label>
                        <Input value={editingSession.title} onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })} className="h-16 bg-slate-50 border-none rounded-2xl font-black text-xl" required />
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Start Time</Label>
                           <Input value={editingSession.start_time} onChange={(e) => setEditingSession({ ...editingSession, start_time: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" placeholder="09:00 AM" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">End Time</Label>
                           <Input value={editingSession.end_time} onChange={(e) => setEditingSession({ ...editingSession, end_time: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" placeholder="10:30 AM" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Day</Label>
                           <Input value={editingSession.day} onChange={(e) => setEditingSession({ ...editingSession, day: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Location</Label>
                           <Input value={editingSession.location} onChange={(e) => setEditingSession({ ...editingSession, location: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Session Type</Label>
                           <select 
                             value={editingSession.session_type} 
                             onChange={(e) => setEditingSession({ ...editingSession, session_type: e.target.value })}
                             className="w-full h-14 bg-slate-50 border-none rounded-2xl font-bold px-4 appearance-none outline-none focus:ring-2 ring-blue/5 text-slate-600"
                           >
                              <option value="Technical Session">Technical Session</option>
                              <option value="Keynote Address">Keynote Address</option>
                              <option value="Plenary Speech">Plenary Speech</option>
                              <option value="Poster Presentation">Poster Presentation</option>
                              <option value="Networking Break">Networking Break</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Speaker Name</Label>
                           <Input value={editingSession.speaker_name || ''} onChange={(e) => setEditingSession({ ...editingSession, speaker_name: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" />
                        </div>
                     </div>
                     <div className="flex gap-4 pt-4 pb-4">
                        <Button type="submit" disabled={isUpdating} className="flex-1 rounded-[2rem] bg-blue hover:bg-navy font-black text-xs uppercase tracking-widest h-20 shadow-2xl shadow-blue/20">
                           {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Save</>}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setEditingSession(null)} className="rounded-[2rem] h-20 px-12 font-black text-xs uppercase tracking-widest border-2 border-slate-50">Cancel</Button>
                     </div>
                  </form>
                ) : (
                   <form onSubmit={handleSaveDate} className="p-10 space-y-8">
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Event Name</Label>
                         <Input value={editingDate.event} onChange={(e) => setEditingDate({ ...editingDate, event: e.target.value })} className="h-16 bg-slate-50 border-none rounded-2xl font-black text-xl" required />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Date</Label>
                         <Input type="date" value={editingDate.date} onChange={(e) => setEditingDate({ ...editingDate, date: e.target.value })} className="h-14 bg-slate-50 border-none rounded-2xl font-bold" required />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Description</Label>
                         <Textarea value={editingDate.description} onChange={(e) => setEditingDate({ ...editingDate, description: e.target.value })} className="min-h-[140px] bg-slate-50 border-none rounded-[2rem] font-medium p-6" />
                      </div>
                      <div className="flex gap-4 pt-4 pb-4">
                        <Button type="submit" disabled={isUpdating} className="flex-1 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 font-black text-xs uppercase tracking-widest h-20 shadow-2xl shadow-emerald-600/20">
                           {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Save</>}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setEditingDate(null)} className="rounded-[2rem] h-20 px-12 font-black text-xs uppercase tracking-widest border-2 border-slate-50">Cancel</Button>
                      </div>
                   </form>
                )}
             </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
