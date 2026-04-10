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
  Loader2,
  Award,
  ShieldCheck,
  Users2
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

type TabType = 'organizers' | 'chairs';

const ORGANIZER_CATEGORIES = ['Scientific Committee', 'Organizing Committee', 'Advisory Board', 'Technical Committee'];
const CHAIR_CATEGORY = 'Chairs';

export default function AdminOrganizers() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('organizers');

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/organizers`, {
        credentials: 'include'
      });
      if (res.ok) setAllMembers(await res.json());
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
      toast.error('Failed to delete member');
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

  // Split data based on active tab
  const isChairsTab = activeTab === 'chairs';
  const tabMembers = allMembers.filter(o => 
    isChairsTab ? o.category === CHAIR_CATEGORY : o.category !== CHAIR_CATEGORY
  );

  const filteredMembers = tabMembers.filter(o => 
    o.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.affiliation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chairsCount = allMembers.filter(o => o.category === CHAIR_CATEGORY).length;
  const organizersCount = allMembers.filter(o => o.category !== CHAIR_CATEGORY).length;

  // Default new member values based on active tab
  const openAddModal = () => {
    if (isChairsTab) {
      setEditingOrganizer({ 
        name: '', role: '', affiliation: '', location: '', image_url: '', 
        category: CHAIR_CATEGORY, 
        display_order: chairsCount + 1 
      });
    } else {
      setEditingOrganizer({ 
        name: '', role: '', affiliation: '', location: '', image_url: '', 
        category: 'Scientific Committee', 
        display_order: organizersCount + 1 
      });
    }
    setIsModalOpen(true);
  };

  // Category options based on active tab
  const categoryOptions = isChairsTab ? [CHAIR_CATEGORY] : ORGANIZER_CATEGORIES;

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading team members...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Our Team / Organizers</h1>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-tight font-bold opacity-70">Manage committee members and event chairs</p>
          </div>
          <Button 
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none gap-2 rounded"
          >
            <Plus className="w-4 h-4" /> {isChairsTab ? 'Add Chair' : 'Add Member'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => { setActiveTab('organizers'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'organizers'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users2 className="w-3.5 h-3.5" />
            Organizers
            <span className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              activeTab === 'organizers' ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-400'
            }`}>{organizersCount}</span>
          </button>
          <button
            onClick={() => { setActiveTab('chairs'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'chairs'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Chairs
            <span className={`ml-1 text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              activeTab === 'chairs' ? 'bg-amber-50 text-amber-600' : 'bg-slate-200 text-slate-400'
            }`}>{chairsCount}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isChairsTab ? 'Search chairs by name or role...' : 'Search by name, role or affiliation...'}
            className="w-full h-12 pl-12 pr-6 bg-white border border-slate-200 rounded shadow-sm font-medium text-sm focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-all"
          />
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMembers.map((org) => (
            <div key={org._id} className={`bg-white rounded-xl border p-6 flex flex-col shadow-sm group transition-all ${
              isChairsTab 
                ? 'border-amber-100 hover:border-amber-300' 
                : 'border-slate-200 hover:border-blue-200'
            }`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0 bg-slate-50 transition-all ${
                  isChairsTab 
                    ? 'border-amber-100 group-hover:border-amber-200' 
                    : 'border-slate-100 group-hover:border-blue-100'
                }`}>
                  <img src={org.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${org.name}`} alt={org.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-extrabold text-slate-900 truncate uppercase tracking-tight">{org.name}</h3>
                  <div className={`text-[10px] font-black uppercase tracking-widest ${
                    isChairsTab ? 'text-amber-600' : 'text-blue-600'
                  }`}>
                    {org.role}
                  </div>
                  {!isChairsTab && (
                    <span className="inline-block mt-1.5 text-[8px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                      {org.category || 'Scientific Committee'}
                    </span>
                  )}
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
          {filteredMembers.length === 0 && !loading && (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
               <div className="flex flex-col items-center gap-3">
                 {isChairsTab ? <Award className="w-8 h-8 text-slate-200" /> : <Users2 className="w-8 h-8 text-slate-200" />}
                 <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                   {searchQuery 
                     ? `No ${isChairsTab ? 'chairs' : 'organizers'} matched your search` 
                     : `No ${isChairsTab ? 'chairs' : 'organizers'} added yet`}
                 </p>
                 {!searchQuery && (
                   <Button onClick={openAddModal} variant="outline" className="mt-2 h-9 px-5 text-[10px] font-black uppercase tracking-widest rounded border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-none">
                     <Plus className="w-3.5 h-3.5 mr-2" /> Add {isChairsTab ? 'Chair' : 'Member'}
                   </Button>
                 )}
               </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm transition-none">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
              <div className={`px-6 py-4 border-b flex items-center justify-between ${
                editingOrganizer?.category === CHAIR_CATEGORY 
                  ? 'bg-amber-50 border-amber-100' 
                  : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  {editingOrganizer?.category === CHAIR_CATEGORY 
                    ? <Award className="w-4 h-4 text-amber-500" /> 
                    : <ShieldCheck className="w-4 h-4 text-slate-400" />}
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                    {editingOrganizer?._id 
                      ? `Edit ${editingOrganizer?.category === CHAIR_CATEGORY ? 'Chair' : 'Team Member'}` 
                      : `Add ${editingOrganizer?.category === CHAIR_CATEGORY ? 'Chair' : 'Team Member'}`}
                  </h3>
                </div>
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
                      placeholder={isChairsTab ? 'e.g. Conference Chair' : 'e.g. Committee Member'}
                      className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Category</Label>
                    <select 
                      value={editingOrganizer.category || (isChairsTab ? CHAIR_CATEGORY : 'Scientific Committee')} 
                      onChange={e => setEditingOrganizer({...editingOrganizer, category: e.target.value})}
                      className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 font-bold outline-none"
                    >
                      {[CHAIR_CATEGORY, ...ORGANIZER_CATEGORIES].map(c => (
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
                  <Button type="submit" disabled={isUpdating} className={`h-10 text-white font-bold uppercase text-[10px] tracking-widest transition-none px-8 rounded shadow-sm ${
                    editingOrganizer?.category === CHAIR_CATEGORY 
                      ? 'bg-amber-600 hover:bg-amber-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}>
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingOrganizer?.category === CHAIR_CATEGORY ? 'Save Chair' : 'Save Member')}
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
