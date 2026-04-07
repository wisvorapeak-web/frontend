import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  MapPin, 
  Building2,
  X,
  Loader2
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

export default function AdminOrganizers() {
  const [organizers, setOrganizers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<any>(null);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/organizers`, {
        credentials: 'include'
      });
      if (res.ok) setOrganizers(await res.json());
    } catch (err) {
      console.error('Failed to fetch organizers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/organizers/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Team member removed');
        fetchOrganizers();
      }
    } catch (err) {
      toast.error('Failed to delete organizer');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingOrganizer._id ? 'PATCH' : 'POST';
    const url = editingOrganizer._id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/organizers/${editingOrganizer._id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/organizers`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editingOrganizer)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(editingOrganizer._id ? 'Updated successfully' : 'Team member added');
        setIsModalOpen(false);
        fetchOrganizers();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch (err: any) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrganizers = organizers.filter(o => 
            o.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.affiliation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            o.category?.toLowerCase().includes(searchQuery.toLowerCase())
          );

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading team members...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Our Team / Organizers</h1>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-tight font-bold opacity-70">Manage committee members and event organizers</p>
          </div>
          <Button 
            onClick={() => {
              setEditingOrganizer({ name: '', role: '', affiliation: '', location: '', image_url: '', display_order: organizers.length + 1 });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none gap-2 rounded"
          >
            <Plus className="w-4 h-4" /> Add Member
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role or affiliation..."
            className="w-full h-12 pl-12 pr-6 bg-white border border-slate-200 rounded shadow-sm font-medium text-sm focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all"
          />
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrganizers.map((org) => (
            <div key={org._id} className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col shadow-sm group hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 flex-shrink-0 bg-slate-50 group-hover:border-blue-100 transition-all">
                  <img src={org.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${org.name}`} alt={org.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-900 truncate uppercase tracking-tight">{org.name}</h3>
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {org.role}
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-start gap-2 text-[11px] font-bold text-slate-600 uppercase tracking-tight leading-relaxed">
                  <Building2 className="w-3.5 h-3.5 text-slate-300 mt-0.5" /> {org.affiliation || 'Wisvora Peak'}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" /> {org.location || 'Global'}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Order: {org.display_order}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setEditingOrganizer(org);
                      setIsModalOpen(true);
                    }}
                    className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-none rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(org._id)}
                    className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-none rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filteredOrganizers.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No team members found matched your search</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm transition-none">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  {editingOrganizer?._id ? 'Edit Team Member' : 'Add Team Member'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-none">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5 italic font-bold">
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                  <Input 
                    required
                    value={editingOrganizer.name} 
                    onChange={e => setEditingOrganizer({...editingOrganizer, name: e.target.value})}
                    className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Role / Designation</Label>
                    <Input 
                      required
                      value={editingOrganizer.role} 
                      onChange={e => setEditingOrganizer({...editingOrganizer, role: e.target.value})}
                      className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Category</Label>
                    <select 
                      value={editingOrganizer.category || 'Scientific Committee'} 
                      onChange={e => setEditingOrganizer({...editingOrganizer, category: e.target.value})}
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 font-bold outline-none"
                    >
                      {['Scientific Committee', 'Organizing Committee', 'Advisory Board', 'Technical Committee'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 pt-px">
                     <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Display Order</Label>
                     <Input 
                       type="number"
                       value={editingOrganizer.display_order} 
                       onChange={e => setEditingOrganizer({...editingOrganizer, display_order: parseInt(e.target.value)})}
                       className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                     />
                  </div>
                  <div className="space-y-1.5">
                     <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Location</Label>
                     <Input 
                       value={editingOrganizer.location} 
                       onChange={e => setEditingOrganizer({...editingOrganizer, location: e.target.value})}
                       className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                     />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Affiliation / Institution</Label>
                  <Input 
                    value={editingOrganizer.affiliation} 
                    onChange={e => setEditingOrganizer({...editingOrganizer, affiliation: e.target.value})}
                    className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                  />
                </div>

                <div className="space-y-1.5">
                  <ImageUploadInput 
                    label="Profile Photo" 
                    value={editingOrganizer.image_url} 
                    onChange={v => setEditingOrganizer({...editingOrganizer, image_url: v})} 
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-10 border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-widest transition-none px-6 rounded">Discard</Button>
                  <Button type="submit" disabled={isUpdating} className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-[10px] tracking-widest transition-none px-8 rounded shadow-sm">
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Member'}
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
