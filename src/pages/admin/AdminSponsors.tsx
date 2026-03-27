import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  X,
  Loader2
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<any>(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/sponsors`, {
        credentials: 'include'
      });
      if (res.ok) setSponsors(await res.json());
    } catch (err) {
      console.error('Failed to fetch sponsors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this partner?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/sponsors/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Partner removed');
        fetchSponsors();
      }
    } catch (err) {
      toast.error('Failed to delete sponsor');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingSponsor._id ? 'PATCH' : 'POST';
    const url = editingSponsor._id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/sponsors/${editingSponsor._id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/sponsors`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(editingSponsor)
      });
      if (res.ok) {
        toast.success(editingSponsor._id ? 'Partner updated' : 'New partner added');
        setIsModalOpen(false);
        fetchSponsors();
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading sponsors...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sponsors & Partners</h1>
            <p className="text-sm text-slate-500 mt-1">Manage event sponsorships and organizational partnerships.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingSponsor({ name: '', tier: 'Sponsor', logo_url: '', website_url: '' });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Sponsor
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: 'Total Partners', value: sponsors.length, color: 'text-blue-600' },
             { label: 'Exhibitors', value: sponsors.filter(s => s.tier === 'Exhibitor').length, color: 'text-emerald-600' },
             { label: 'Premium Partners', value: sponsors.filter(s => s.tier === 'Premium').length, color: 'text-amber-600' }
           ].map((stat, i) => (
             <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
             </div>
           ))}
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {sponsors.map((sponsor) => (
             <div key={sponsor._id} className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm">
                <div className="mb-6 w-full aspect-video flex items-center justify-center bg-slate-50 rounded border border-slate-100 p-4">
                   <img 
                    src={sponsor.logo_url || 'https://via.placeholder.com/150'} 
                    alt={sponsor.name} 
                    className="max-w-full max-h-full object-contain" 
                   />
                </div>

                <div className="mb-6 flex-1">
                   <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{sponsor.tier}</span>
                   <h3 className="text-base font-bold text-slate-900 mt-2">{sponsor.name}</h3>
                </div>

                <div className="flex items-center justify-center gap-2 w-full pt-4 border-t border-slate-100">
                   <Button 
                     variant="outline" 
                     size="sm" 
                     onClick={() => {
                       setEditingSponsor(sponsor);
                       setIsModalOpen(true);
                     }}
                     className="h-8 border-slate-200 text-slate-600 text-[10px] font-bold uppercase transition-none"
                   >
                      <Edit3 className="w-3 h-3 mr-1.5" /> Edit
                   </Button>
                   <Button 
                     variant="outline" 
                     size="sm" 
                     onClick={() => handleDelete(sponsor._id)}
                     className="h-8 border-slate-200 text-rose-600 hover:bg-rose-50 transition-none"
                   >
                      <Trash2 className="w-3 h-3" />
                   </Button>
                </div>
             </div>
           ))}
           {sponsors.length === 0 && (
             <div className="col-span-full py-20 text-center bg-slate-50 border border-slate-100 rounded-lg">
                <p className="text-sm font-bold text-slate-400">No sponsors found. Add your first partner to get started.</p>
             </div>
           )}
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/50 backdrop-blur-sm">
             <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                   <h2 className="text-lg font-bold text-slate-900">{editingSponsor._id ? 'Edit Partner' : 'Add New Partner'}</h2>
                   <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-none">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <form onSubmit={handleSave} className="p-6 space-y-6">
                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Partner Name</Label>
                      <Input 
                        value={editingSponsor.name} 
                        onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm focus:ring-4 focus:ring-blue-600/5 transition-none" 
                        required 
                      />
                   </div>

                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category / Tier</Label>
                      <select 
                        value={editingSponsor.tier} 
                        onChange={(e) => setEditingSponsor({ ...editingSponsor, tier: e.target.value })}
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded px-3 text-sm focus:ring-4 focus:ring-blue-600/5 outline-none font-medium"
                      >
                         <option value="Sponsor">General Sponsor</option>
                         <option value="Premium">Premium Partner</option>
                         <option value="Exhibitor">Exhibitor</option>
                         <option value="Media Partner">Media Partner</option>
                      </select>
                   </div>

                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Website URL</Label>
                      <Input 
                        value={editingSponsor.website_url || ''} 
                        onChange={(e) => setEditingSponsor({ ...editingSponsor, website_url: e.target.value })}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                        placeholder="https://"
                      />
                   </div>

                   <div className="space-y-1.5 pt-2">
                       <ImageUploadInput label="Logo Asset" value={editingSponsor.logo_url || ''} onChange={v => setEditingSponsor({ ...editingSponsor, logo_url: v })} />
                   </div>

                   <div className="flex gap-3 pt-4">
                      <Button type="submit" disabled={isUpdating} className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest transition-none">
                         {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
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
