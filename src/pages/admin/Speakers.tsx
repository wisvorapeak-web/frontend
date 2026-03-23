import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  User, 
  Globe, 
  Mic2, 
  Linkedin,
  X,
  Save,
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<any>(null);

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/speakers`, {
        credentials: 'include'
      });
      if (res.ok) setSpeakers(await res.json());
    } catch (err) {
      console.error('Failed to fetch speakers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this speaker?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/speakers/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Speaker removed from global panel');
        fetchSpeakers();
      }
    } catch (err) {
      toast.error('Failed to delete speaker');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingSpeaker.id ? 'PATCH' : 'POST';
    const url = editingSpeaker.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/speakers/${editingSpeaker.id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/speakers`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editingSpeaker)
      });
      if (res.ok) {
        toast.success(editingSpeaker.id ? 'Speaker details updated' : 'New speaker added to summit');
        setIsModalOpen(false);
        fetchSpeakers();
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredSpeakers = speakers.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading speakers...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Speakers</h1>
            <p className="text-slate-500 font-medium font-outfit">Add and edit speakers for the event.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingSpeaker({ name: '', university: '', country: '', bio: '', image_url: '', linkedin_url: '' });
              setIsModalOpen(true);
            }}
            className="rounded-xl bg-blue hover:bg-navy text-white font-bold shadow-xl shadow-blue/20 gap-2 h-12 px-8 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Speaker
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total', value: speakers.length, icon: Mic2, color: 'text-blue bg-blue/5' },
             { label: 'Organizations', value: [...new Set(speakers.map(s => s.university))].length, icon: Globe, color: 'text-emerald-500 bg-emerald-50' },
             { label: 'Countries', value: [...new Set(speakers.map(s => s.country))].length, icon: User, color: 'text-amber-500 bg-amber-50' },
             { label: 'LinkedIn Profiles', value: speakers.filter(s => s.linkedin_url).length, icon: Linkedin, color: 'text-indigo-500 bg-indigo-50' }
           ].map((stat, i) => (
             <Card key={i} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                <CardContent className="p-6 flex items-center gap-5">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                      <p className="text-2xl font-black text-slate-800 leading-none">{stat.value}</p>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        {/* Search & List */}
        <div className="space-y-6">
           <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speakers..."
                className="w-full h-16 pl-14 pr-8 bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/40 font-bold focus-visible:ring-blue/10 outline-none"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredSpeakers.map((speaker) => (
                <div key={speaker.id} className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-6 border border-slate-50 hover:border-blue/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue/5 rounded-full -mr-12 -mt-12 group-hover:bg-blue/10 transition-colors" />
                   
                   <div className="flex items-center gap-6 mb-8 relative z-10">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white border border-slate-100 flex-shrink-0">
                         <img src={speaker.image_url || 'https://via.placeholder.com/150'} alt={speaker.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-slate-800 truncate max-w-[160px] leading-tight group-hover:text-blue transition-colors">{speaker.name}</h3>
                         <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" /> {speaker.country}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3 mb-8 relative z-10">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                         <Globe className="w-4 h-4 text-slate-300" /> {speaker.university}
                      </div>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed line-clamp-2 italic">
                         "{speaker.bio || 'Expert speaker joining the event.'}"
                      </p>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-slate-50 relative z-10">
                      <div className="flex gap-2">
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => {
                             setEditingSpeaker(speaker);
                             setIsModalOpen(true);
                           }}
                           className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue hover:bg-blue/5"
                         >
                            <Edit3 className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => handleDelete(speaker.id)}
                           className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                         >
                            <Trash2 className="w-4 h-4" />
                         </Button>
                      </div>
                      {speaker.linkedin_url && (
                        <a href={speaker.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue/5 flex items-center justify-center text-blue hover:bg-blue hover:text-white transition-all">
                           <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/40 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                   <h2 className="text-2xl font-black text-navy">{editingSpeaker.id ? 'Edit Speaker' : 'Add New Speaker'}</h2>
                   <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-2xl hover:bg-slate-50">
                      <X className="w-6 h-6" />
                   </Button>
                </div>
                <form onSubmit={handleSave} className="p-10 space-y-8">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Full Name</Label>
                         <Input 
                           value={editingSpeaker.name} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, name: e.target.value })}
                           className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           required 
                         />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Organization</Label>
                         <Input 
                           value={editingSpeaker.university} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, university: e.target.value })}
                           className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           required 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Country</Label>
                         <Input 
                           value={editingSpeaker.country} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, country: e.target.value })}
                           className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           required 
                         />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">LinkedIn</Label>
                         <Input 
                           value={editingSpeaker.linkedin_url || ''} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, linkedin_url: e.target.value })}
                           className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Image URL</Label>
                      <div className="flex gap-4">
                         <Input 
                           value={editingSpeaker.image_url || ''} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, image_url: e.target.value })}
                           className="h-12 bg-slate-50 border-none rounded-2xl font-bold flex-1 font-outfit" 
                         />
                         <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-5 h-5" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Bio</Label>
                      <Textarea 
                        value={editingSpeaker.bio || ''} 
                        onChange={(e) => setEditingSpeaker({ ...editingSpeaker, bio: e.target.value })}
                        className="min-h-[120px] bg-slate-50 border-none rounded-[1.5rem] font-medium leading-relaxed font-outfit" 
                      />
                   </div>

                   <div className="flex gap-4 pt-4">
                      <Button type="submit" disabled={isUpdating} className="flex-1 rounded-2xl bg-blue hover:bg-navy font-bold h-14 shadow-xl shadow-blue/20">
                         {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> {editingSpeaker.id ? 'Save' : 'Add Speaker'}</>}
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-2xl h-14 px-8 font-bold border-2 border-slate-100">
                         Cancel
                      </Button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
