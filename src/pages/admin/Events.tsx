import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Loader2,
  Clock,
  MapPin
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
    const method = editingSession._id ? 'PATCH' : 'POST';
    const url = editingSession._id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/program/${editingSession._id}`
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
        toast.success(editingSession._id ? 'Session updated' : 'Session added');
        setEditingSession(null);
        fetchData();
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveDate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingDate._id ? 'PATCH' : 'POST';
    const url = editingDate._id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/dates/${editingDate._id}`
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
        toast.success(editingDate._id ? 'Date updated' : 'Date added');
        setEditingDate(null);
        fetchData();
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteSession = async (_id: string) => {
    if (!confirm('Delete this session?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/program/${_id}`, {
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

  const handleDeleteDate = async (_id: string) => {
    if (!confirm('Delete this date?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dates/${_id}`, {
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

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading schedule...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Event Schedule</h1>
            <p className="text-sm text-slate-500 mt-1">Manage conference sessions and important administrative deadlines.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" onClick={fetchData} className="h-10 border-slate-200 text-slate-600 font-bold transition-none">
                Refresh
             </Button>
             <Button 
               onClick={() => setEditingSession({ title: '', start_time: '', end_time: '', day: 'Day 1', location: '', session_type: 'Technical Session', speaker_name: '', description: '' })}
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none gap-2"
             >
               <Plus className="w-4 h-4" /> Add Session
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scientific Program Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Programm Sessions</h3>
             </div>

             <div className="space-y-3">
                {program.map((session) => (
                   <div key={session._id} className="p-5 bg-white border border-slate-200 rounded shadow-sm flex items-start justify-between group">
                      <div className="space-y-3">
                         <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold uppercase border border-blue-100 italic">
                               {session.day}
                            </span>
                            <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-bold uppercase border border-slate-100">
                               {session.session_type}
                            </span>
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-slate-900 pr-10">{session.title}</h4>
                            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
                               <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-slate-300" /> {session.start_time} - {session.end_time}</span>
                               <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-300" /> {session.location || 'Online'}</span>
                            </div>
                         </div>
                         {session.speaker_name && (
                           <p className="text-[10px] font-bold text-slate-500 bg-slate-50 w-fit px-2 py-1 rounded border border-slate-100 uppercase tracking-widest">Speaker: <span className="text-blue-600">{session.speaker_name}</span></p>
                         )}
                      </div>
                      <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 px-1 border-l border-slate-50 ml-4 h-full pt-1">
                         <Button variant="ghost" size="icon" onClick={() => setEditingSession(session)} className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-none">
                            <Edit3 className="w-3.5 h-3.5" />
                         </Button>
                         <Button variant="ghost" size="icon" onClick={() => handleDeleteSession(session._id)} className="h-8 w-8 text-slate-400 hover:text-red-600 transition-none">
                            <Trash2 className="w-3.5 h-3.5" />
                         </Button>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Important Milestones Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Crucial Deadlines</h3>
                <Button 
                   onClick={() => setEditingDate({ event: '', date: '', description: '' })}
                   className="h-7 px-3 rounded bg-slate-50 text-slate-600 hover:text-slate-900 font-bold text-[10px] border border-slate-200 uppercase tracking-widest"
                >
                   + Add Date
                </Button>
             </div>

             <div className="space-y-3">
                {dates.map((date) => (
                   <div key={date._id} className="p-5 bg-white border border-slate-200 rounded shadow-sm group">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 w-fit px-2 rounded mb-1 border border-blue-100 italic">
                               {new Date(date.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                            <h4 className="text-sm font-bold text-slate-900">{date.event}</h4>
                            <p className="text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight">
                               {date.description || 'Milestone date for participants.'}
                            </p>
                         </div>
                         <div className="flex flex-col gap-1 opacity-20 group-hover:opacity-100 px-1 border-l border-slate-50 ml-4 pt-1 h-full">
                            <Button variant="ghost" size="icon" onClick={() => setEditingDate(date)} className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-none">
                               <Edit3 className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteDate(date._id)} className="h-8 w-8 text-slate-400 hover:text-red-600 transition-none">
                               <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Modal for Session Edit/Add */}
        {(editingSession || editingDate) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm transition-none">
             <div className="bg-white border border-slate-200 rounded-lg shadow-2xl w-full max-w-xl overflow-hidden transition-none">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                   <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{editingSession ? 'Session Details' : 'Milestone Entry'}</h2>
                   <Button variant="ghost" size="icon" onClick={() => { setEditingSession(null); setEditingDate(null); }} className="h-8 w-8 text-slate-400 hover:text-slate-900 transition-none">
                      <X className="w-4 h-4" />
                   </Button>
                </div>
                
                {editingSession ? (
                  <form onSubmit={handleSaveSession} className="p-6 space-y-5">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Title</Label>
                        <Input value={editingSession.title} onChange={(e) => setEditingSession({ ...editingSession, title: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" required />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Time</Label>
                           <Input value={editingSession.start_time} onChange={(e) => setEditingSession({ ...editingSession, start_time: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" placeholder="09:00 AM" />
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">End Time</Label>
                           <Input value={editingSession.end_time} onChange={(e) => setEditingSession({ ...editingSession, end_time: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" placeholder="10:30 AM" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Day Tag</Label>
                           <Input value={editingSession.day} onChange={(e) => setEditingSession({ ...editingSession, day: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" />
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Venue/Room</Label>
                           <Input value={editingSession.location} onChange={(e) => setEditingSession({ ...editingSession, location: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Session Type</Label>
                           <select 
                             value={editingSession.session_type} 
                             onChange={(e) => setEditingSession({ ...editingSession, session_type: e.target.value })}
                             className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 appearance-none outline-none focus:ring-4 ring-blue-600/5 font-medium transition-none"
                           >
                              <option value="Technical Session">Technical Session</option>
                              <option value="Keynote Address">Keynote Address</option>
                              <option value="Plenary Speech">Plenary Speech</option>
                              <option value="Poster Presentation">Poster Presentation</option>
                              <option value="Networking Break">Networking Break</option>
                           </select>
                        </div>
                        <div className="space-y-1.5">
                           <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Lead Speaker</Label>
                           <Input value={editingSession.speaker_name || ''} onChange={(e) => setEditingSession({ ...editingSession, speaker_name: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" />
                        </div>
                     </div>
                     <div className="flex gap-3 pt-4 border-t border-slate-50">
                        <Button type="submit" disabled={isUpdating} className="flex-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 transition-none uppercase text-[10px] tracking-widest">
                           {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Confirm Changes'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setEditingSession(null)} className="h-10 px-6 font-bold text-[10px] uppercase tracking-widest border-slate-200 text-slate-500 transition-none rounded">Discard</Button>
                     </div>
                  </form>
                ) : (
                   <form onSubmit={handleSaveDate} className="p-6 space-y-5">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Name</Label>
                         <Input value={editingDate.event} onChange={(e) => setEditingDate({ ...editingDate, event: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" required />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Calendar Date</Label>
                         <Input type="date" value={editingDate.date} onChange={(e) => setEditingDate({ ...editingDate, date: e.target.value })} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" required />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brief Description</Label>
                         <Textarea value={editingDate.description} onChange={(e) => setEditingDate({ ...editingDate, description: e.target.value })} className="min-h-[100px] bg-slate-50 border-slate-200 rounded text-sm p-3 font-medium transition-none" />
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-slate-50">
                        <Button type="submit" disabled={isUpdating} className="flex-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 transition-none uppercase text-[10px] tracking-widest">
                           {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Confirm Deadline'}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setEditingDate(null)} className="h-10 px-6 font-bold text-[10px] uppercase tracking-widest border-slate-200 text-slate-500 transition-none rounded">Discard</Button>
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
