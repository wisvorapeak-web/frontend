import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Globe, 
  Linkedin,
  X,
  Loader2
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

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
        toast.success('Speaker removed');
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
        toast.success(editingSpeaker.id ? 'Speaker updated' : 'New speaker added');
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

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading speakers...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Event Speakers</h1>
            <p className="text-sm text-slate-500 mt-1">Manage keynote speakers and presenters roster.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingSpeaker({ name: '', university: '', country: '', bio: '', image_url: '', linkedin_url: '' });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Speaker
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Total Speakers', value: speakers.length, color: 'text-blue-600' },
             { label: 'Organizations', value: [...new Set(speakers.map(s => s.university))].length, color: 'text-emerald-600' },
             { label: 'Countries', value: [...new Set(speakers.map(s => s.country))].length, color: 'text-amber-600' },
             { label: 'Verified Profiles', value: speakers.filter(s => s.linkedin_url).length, color: 'text-indigo-600' }
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Search & List */}
        <div className="space-y-6">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speakers by name, institution or country..."
                className="w-full h-12 pl-12 pr-6 bg-white border border-slate-200 rounded-lg shadow-sm font-medium text-sm focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none"
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSpeakers.map((speaker) => (
                <div key={speaker.id} className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col shadow-sm">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
                         <img src={speaker.image_url || 'https://via.placeholder.com/150'} alt={speaker.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <h3 className="text-base font-bold text-slate-900 truncate">{speaker.name}</h3>
                         <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {speaker.country}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-tight">
                         <Globe className="w-3.5 h-3.5 text-slate-300" /> {speaker.university}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 italic font-medium">
                         {speaker.bio || 'Expert speaker joining the event.'}
                      </p>
                   </div>

                   <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                      <div className="flex gap-2">
                         <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => {
                             setEditingSpeaker(speaker);
                             setIsModalOpen(true);
                           }}
                           className="h-8 border-slate-200 text-slate-600 text-[10px] font-bold uppercase transition-none"
                         >
                            <Edit3 className="w-3 h-3 mr-1.5" /> Edit
                         </Button>
                         <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => handleDelete(speaker.id)}
                           className="h-8 border-slate-200 text-rose-600 hover:bg-rose-50 transition-none"
                         >
                            <Trash2 className="w-3 h-3" />
                         </Button>
                      </div>
                      {speaker.linkedin_url && (
                        <a href={speaker.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-none">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                   <h2 className="text-lg font-bold text-slate-900">{editingSpeaker.id ? 'Edit Speaker' : 'Add New Speaker'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-none">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                         <Input 
                           value={editingSpeaker.name} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, name: e.target.value })}
                           className="h-10 bg-slate-50 border-slate-200 rounded text-sm focus:ring-4 focus:ring-blue-600/5 transition-none" 
                           required 
                         />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Organization</Label>
                         <Input 
                           value={editingSpeaker.university} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, university: e.target.value })}
                           className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                           required 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Country</Label>
                         <Input 
                           value={editingSpeaker.country} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, country: e.target.value })}
                           className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                           required 
                         />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">LinkedIn URL</Label>
                         <Input 
                           value={editingSpeaker.linkedin_url || ''} 
                           onChange={(e) => setEditingSpeaker({ ...editingSpeaker, linkedin_url: e.target.value })}
                           className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                           placeholder="https://linkedin.com/in/..."
                         />
                      </div>
                   </div>

                   <div className="space-y-1.5 pt-2">
                      <ImageUploadInput label="Profile Photo Asset" value={editingSpeaker.image_url || ''} onChange={v => setEditingSpeaker({ ...editingSpeaker, image_url: v })} />
                   </div>

                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Short Biography</Label>
                      <Textarea 
                        value={editingSpeaker.bio || ''} 
                        onChange={(e) => setEditingSpeaker({ ...editingSpeaker, bio: e.target.value })}
                        className="min-h-[100px] bg-slate-50 border-slate-200 rounded text-sm transition-none font-medium" 
                      />
                   </div>

                   <div className="flex gap-3 pt-4">
                      <Button type="submit" disabled={isUpdating} className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest transition-none">
                         {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Speaker'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-10 border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-widest transition-none">
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
