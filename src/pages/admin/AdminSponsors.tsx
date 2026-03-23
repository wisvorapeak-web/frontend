import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Rocket, 
  Globe, 
  ShieldCheck,
  X,
  Save,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  Award
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

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
        toast.success('Partnership terminated from database');
        fetchSponsors();
      }
    } catch (err) {
      toast.error('Failed to delete sponsor');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const method = editingSponsor.id ? 'PATCH' : 'POST';
    const url = editingSponsor.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/sponsors/${editingSponsor.id}`
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
        toast.success(editingSponsor.id ? 'Partner credentials updated' : 'New global partner onboarded');
        setIsModalOpen(false);
        fetchSponsors();
      }
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading sponsors...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Sponsors</h1>
            <p className="text-slate-500 font-medium font-outfit">Add and edit sponsors and event partners.</p>
          </div>
          <Button 
            onClick={() => {
              setEditingSponsor({ name: '', tier: 'Sponsor', logo_url: '', website_url: '' });
              setIsModalOpen(true);
            }}
            className="rounded-xl bg-blue hover:bg-navy text-white font-bold shadow-xl shadow-blue/20 gap-2 h-12 px-8 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Sponsor
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { label: 'Total', value: sponsors.length, sub: 'Partners', icon: Rocket, color: 'text-blue bg-blue/5' },
             { label: 'Exhibitors', value: sponsors.filter(s => s.tier === 'Exhibitor').length, sub: 'Booth holders', icon: Globe, color: 'text-emerald-500 bg-emerald-50' },
             { label: 'Premium', value: sponsors.filter(s => s.tier === 'Premium').length, sub: 'Premium tiers', icon: Award, color: 'text-amber-500 bg-amber-50' }
           ].map((stat, i) => (
             <Card key={i} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                <CardContent className="p-8 flex items-center gap-6">
                   <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-7 h-7" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-3xl font-black text-slate-800 leading-none mb-1">{stat.value}</p>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{stat.sub}</p>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {sponsors.map((sponsor) => (
             <div key={sponsor.id} className="group bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 p-8 border border-slate-50 hover:border-blue/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 w-24 h-24 bg-blue/5 rounded-full -ml-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="mb-8 relative z-10 p-6 bg-slate-50/50 rounded-[2rem] w-full aspect-square flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-50">
                   <img src={sponsor.logo_url || 'https://via.placeholder.com/150'} alt={sponsor.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-100" />
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-blue" />
                      <span className="text-[10px] font-black text-blue uppercase tracking-widest">{sponsor.tier}</span>
                   </div>
                   <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{sponsor.name}</h3>
                </div>

                <div className="flex items-center justify-center gap-3 relative z-10 w-full pt-6 border-t border-slate-50">
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     onClick={() => {
                       setEditingSponsor(sponsor);
                       setIsModalOpen(true);
                     }}
                     className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue hover:bg-blue/5"
                   >
                      <Edit3 className="w-5 h-5" />
                   </Button>
                   {sponsor.website_url && (
                     <a href={sponsor.website_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue hover:bg-blue/5 transition-all">
                        <ExternalLink className="w-5 h-5" />
                     </a>
                   )}
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     onClick={() => handleDelete(sponsor.id)}
                     className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                   >
                      <Trash2 className="w-5 h-5" />
                   </Button>
                </div>
             </div>
           ))}
           {sponsors.length === 0 && (
             <div className="col-span-full py-32 text-center bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-8 shadow-sm">
                   <Rocket className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-400 font-outfit uppercase tracking-widest">No sponsors found</h4>
                <p className="text-xs text-slate-300 font-bold mt-2 font-outfit">Add your first sponsor to get started.</p>
             </div>
           )}
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-navy/40 backdrop-blur-md animate-in fade-in duration-300">
             <div className="bg-white rounded-[3.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
                <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                   <h2 className="text-2xl font-black text-navy">{editingSponsor.id ? 'Edit Sponsor' : 'Add Sponsor'}</h2>
                   <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-2xl hover:bg-slate-50">
                      <X className="w-6 h-6" />
                   </Button>
                </div>
                <form onSubmit={handleSave} className="p-10 space-y-8">
                   <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Sponsor Name</Label>
                      <Input 
                        value={editingSponsor.name} 
                        onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold text-lg font-outfit" 
                        required 
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Category</Label>
                         <select 
                           value={editingSponsor.tier} 
                           onChange={(e) => setEditingSponsor({ ...editingSponsor, tier: e.target.value })}
                           className="w-full h-14 bg-slate-50 border-none rounded-2xl font-bold px-4 appearance-none outline-none focus:ring-2 ring-blue/5 text-slate-600 font-outfit"
                         >
                            <option value="Sponsor">Sponsor</option>
                            <option value="Premium">Premium</option>
                            <option value="Exhibitor">Exhibitor</option>
                            <option value="Media Partner">Media Partner</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Website</Label>
                         <Input 
                           value={editingSponsor.website_url || ''} 
                           onChange={(e) => setEditingSponsor({ ...editingSponsor, website_url: e.target.value })}
                           className="h-14 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           placeholder="https://"
                         />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Logo URL</Label>
                      <div className="flex gap-4">
                         <Input 
                           value={editingSponsor.logo_url || ''} 
                           onChange={(e) => setEditingSponsor({ ...editingSponsor, logo_url: e.target.value })}
                           className="h-14 bg-slate-50 border-none rounded-2xl font-bold flex-1 font-outfit" 
                         />
                         <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
                            <ImageIcon className="w-6 h-6" />
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4 pt-6">
                      <Button type="submit" disabled={isUpdating} className="flex-1 rounded-[1.5rem] bg-blue hover:bg-navy font-black text-xs uppercase tracking-widest h-16 shadow-2xl shadow-blue/20">
                         {isUpdating ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 mr-3" /> Save Sponsor</>}
                      </Button>
                      <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-[1.5rem] h-16 px-10 font-black text-xs uppercase tracking-widest border-2 border-slate-50">
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
