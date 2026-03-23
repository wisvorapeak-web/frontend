import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Tag,
  Plus,
  Trash2,
  Edit3,
  DollarSign,
  CheckCircle2,
  XCircle,
  Layers,
  Package,
  ListPlus,
  Save,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow  
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminPricing() {
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Registration',
    amount: 0,
    currency: 'USD',
    description: '',
    features: '',
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/pricing`, {
        credentials: 'include'
      });
      if (res.ok) setTiers(await res.json());
    } catch (err) {
      console.error('Failed to fetch pricing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingTier 
        ? `${import.meta.env.VITE_API_URL}/api/admin/pricing/${editingTier.id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/pricing`;
      
      const method = editingTier ? 'PATCH' : 'POST';
      
      const payload = {
        ...formData,
        features: Array.isArray(formData.features) ? formData.features : formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success(`Pricing tier ${editingTier ? 'updated' : 'created'} successfully.`);
        setIsDialogOpen(false);
        fetchPricing();
        resetForm();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Operation failed');
      }
    } catch (err) {
      toast.error('Connection failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this financial tier?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/pricing/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Tier removed from registry.');
        fetchPricing();
      }
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Registration',
      amount: 0,
      currency: 'USD',
      description: '',
      features: '',
      is_active: true,
      display_order: 0
    });
    setEditingTier(null);
  };

  const handleEdit = (tier: any) => {
    setEditingTier(tier);
    setFormData({
      ...tier,
      features: Array.isArray(tier.features) ? tier.features.join(', ') : tier.features
    });
    setIsDialogOpen(true);
  };

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading pricing...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Pricing</h1>
            <p className="text-slate-500 font-medium">Add and edit tickets and sponsorship packages.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="h-16 rounded- [2rem] bg-blue hover:bg-navy text-white font-black px-10 shadow-2xl shadow-blue/20 transition-all flex items-center gap-3">
                 <Plus className="w-5 h-5" /> Add Pricing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-[3rem] p-10 border-none">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black flex items-center gap-3 font-outfit">
                  <Package className="w-6 h-6 text-blue" />
                  {editingTier ? 'Edit Pricing' : 'Add Pricing'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</Label>
                       <Input 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-blue/10 font-outfit" 
                        placeholder="e.g. Early Bird Platinum" required
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                       <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-2 focus:ring-blue/10 outline-none font-outfit"
                       >
                          {['Registration', 'Sponsorship', 'Exhibition', 'Accommodation', 'Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price</Label>
                       <Input 
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-blue/10 font-outfit" 
                        placeholder="0.00" required
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Currency</Label>
                       <Input 
                        value={formData.currency}
                        onChange={e => setFormData({...formData, currency: e.target.value.toUpperCase()})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-blue/10 font-outfit" 
                        placeholder="USD/INR" required
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                    <textarea 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full h-24 bg-slate-50 border-none rounded-2xl font-bold px-6 py-4 focus:ring-2 focus:ring-blue/10 outline-none resize-none font-outfit"
                      placeholder="Brief overview of what this tier entails..."
                    />
                 </div>

                 <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Features (Comma Separated)</Label>
                    <Input 
                      value={formData.features}
                      onChange={e => setFormData({...formData, features: e.target.value})}
                      className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-blue/10 font-outfit" 
                      placeholder="Access to all halls, Tea & Snacks, E-certificate..."
                    />
                 </div>

                 <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                    <label className="flex items-center gap-3 cursor-pointer group">
                       <div className={`w-12 h-6 rounded-full transition-all relative ${formData.is_active ? 'bg-blue' : 'bg-slate-200'}`}>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={formData.is_active}
                            onChange={e => setFormData({...formData, is_active: e.target.checked})}
                          />
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active on website</span>
                    </label>
                 </div>

                 <DialogFooter className="pt-6 gap-3 sm:justify-end">
                    <Button type="button" variant="ghost" className="rounded-xl h-14 font-black text-xs uppercase tracking-widest" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button disabled={isSaving} className="rounded-xl h-14 bg-blue text-white px-10 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue/20">
                       {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
                       {editingTier ? 'Save' : 'Add Pricing'}
                    </Button>
                 </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {['Registration', 'Sponsorship', 'Exhibition', 'Other'].map((cat, i) => {
             const count = tiers.filter(t => t.category === cat).length;
             return (
               <Card key={i} className="border-none shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white p-2 group hover:shadow-2xl transition-all border border-transparent">
                  <CardContent className="p-8">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                        {cat}
                        <span className="w-6 h-6 rounded-full bg-blue/5 text-blue flex items-center justify-center font-black">{count}</span>
                     </p>
                     <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-blue/5 text-blue' : i === 1? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                           {i === 0 ? <Plus className="w-5 h-5" /> : i === 1 ? <CheckCircle2 className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1">
                             {tiers.filter(t => t.category === cat).reduce((s, t) => s + (Number(t.amount) || 0), 0).toLocaleString()}
                             <span className="text-[10px] text-slate-400 ml-1">AVG.VAL</span>
                           </h4>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Revenue Potential</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
             );
           })}
        </div>

        {/* Pricing Registry Table */}
        <div className="bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/30 border border-slate-50 overflow-hidden relative">
           <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/20">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2 font-outfit">Pricing</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">View and edit all pricing tiers.</p>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="outline" className="h-14 rounded-2xl border-slate-100 bg-white text-slate-400 font-bold px-8 shadow-sm">
                    Reorder Display <ListPlus className="w-4 h-4 ml-3" />
                 </Button>
              </div>
           </div>

           <div className="overflow-x-auto p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="py-8 pl-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier Name</TableHead>
                    <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</TableHead>
                    <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Features Included</TableHead>
                    <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.map((tier) => (
                    <TableRow key={tier.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all group">
                       <TableCell className="py-8 pl-10">
                          <div className="flex items-center gap-6">
                             <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-105 transition-all
                                ${tier.category === 'Registration' ? 'bg-blue text-white' : tier.category === 'Sponsorship' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-400'}`}>
                                <Tag className="w-6 h-6" />
                             </div>
                             <div>
                                <div className="flex items-center gap-3 mb-1">
                                   <p className="text-base font-black text-slate-800">{tier.name}</p>
                                   {!tier.is_active && <XCircle className="w-3 h-3 text-rose-500" />}
                                </div>
                                <div className="flex items-center gap-3 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                                   <Layers className="w-3 h-3" /> {tier.category}
                                   <span className="w-1 h-1 rounded-full bg-slate-200" />
                                   <CheckCircle2 className="w-3 h-3" /> {tier.is_active ? 'Published' : 'Draft'}
                                </div>
                             </div>
                          </div>
                       </TableCell>
                       <TableCell>
                          <div className="flex items-baseline gap-1">
                             <span className="text-[10px] font-black text-blue mb-1">{tier.currency}</span>
                             <span className="text-2xl font-black text-slate-800 tracking-tighter">{Number(tier.amount).toLocaleString()}</span>
                          </div>
                       </TableCell>
                       <TableCell>
                          <div className="space-x-1">
                             {Array.isArray(tier.features) && tier.features.slice(0, 2).map((f: string, idx: number) => (
                               <span key={idx} className="inline-flex text-[9px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-lg uppercase tracking-widest border border-slate-100">
                                 {f}
                               </span>
                             ))}
                             {tier.features.length > 2 && <span className="text-[9px] font-bold text-slate-300">+{tier.features.length - 2} More</span>}
                          </div>
                       </TableCell>
                       <TableCell>
                          <div className="flex items-center justify-center gap-3">
                             <Button 
                              onClick={() => handleEdit(tier)}
                              variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-300 hover:text-blue hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
                                <Edit3 className="w-4 h-4" />
                             </Button>
                             <Button 
                              onClick={() => handleDelete(tier.id)}
                              variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-rose-100 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
                                <Trash2 className="w-4 h-4" />
                             </Button>
                          </div>
                       </TableCell>
                    </TableRow>
                  ))}
                  {tiers.length === 0 && (
                    <TableRow>
                       <TableCell colSpan={4} className="py-32 text-center bg-slate-50/20">
                          <div className="w-20 h-20 bg-white rounded- [2.5rem] flex items-center justify-center mx-auto text-slate-200 mb-6 border-2 border-dashed border-slate-100 relative">
                             <DollarSign className="w-10 h-10" />
                          </div>
                          <h4 className="text-2xl font-black text-slate-800 font-outfit mb-2 tracking-tight">No pricing tiers yet</h4>
                          <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-widest opacity-60">Add your first ticket or sponsorship package to get started.</p>
                       </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </div>
        </div>

      </div>
    </AdminLayout>
  );
}
