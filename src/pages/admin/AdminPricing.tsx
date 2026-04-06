import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Tag,
  Plus,
  Edit3,
  Trash2,
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminPricing() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [tiers, setTiers] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<any>(null);

  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerFormData, setOfferFormData] = useState({
    email: '',
    tierId: '',
    amount: '',
    currency: 'USD',
    expiresAt: ''
  });

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
    fetchOffers();
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/pricing`, { credentials: 'include' });
      if (res.ok) setTiers(await res.json());
    } catch (err) { console.error('Failed to fetch pricing:', err); } finally { setLoading(false); }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/offers`, { credentials: 'include' });
      if (res.ok) setOffers(await res.json());
    } catch (err) { console.error('Failed to fetch offers:', err); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingTier?._id 
        ? `${import.meta.env.VITE_API_URL}/api/admin/pricing/${editingTier._id}`
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
        toast.success(`Pricing tier ${editingTier?._id ? 'updated' : 'created'} successfully.`);
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
    if (!confirm('Are you sure you want to remove this tier?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/pricing/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Tier removed');
        fetchPricing();
      }
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(offerFormData)
      });
      if (res.ok) {
        toast.success('Offer link created and emailed.');
        setIsOfferDialogOpen(false);
        fetchOffers();
        setOfferFormData({ email: '', tierId: '', amount: '', currency: 'USD', expiresAt: '' });
      } else {
        const err = await res.json();
        toast.error(err.error || 'Failed to create offer');
      }
    } catch (err) { toast.error('Connection failed'); } finally { setIsSaving(false); }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this offer?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/offers/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) { toast.success('Offer removed'); fetchOffers(); }
    } catch (err) { toast.error('Action failed'); }
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

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Registration & Packages</h1>
            <p className="text-sm text-slate-500 mt-1">Manage prices for registration, sponsorships, and booths.</p>
          </div>
          
          {activeTab === 'pricing' ? (
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none flex items-center gap-2 rounded shadow-sm">
                   <Plus className="w-4 h-4" /> Add New Item
                </Button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 border-none rounded-lg overflow-hidden shadow-2xl">
              <DialogHeader className="p-6 border-b border-slate-200">
                <DialogTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  {editingTier?._id ? 'Edit Pricing' : 'Add New Item'}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Manage prices and features for attendees and sponsors.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="p-6 space-y-5">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</Label>
                       <Input 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm focus:ring-4 focus:ring-blue-600/5 transition-none font-bold" 
                        placeholder="Early Bird, Platinum, etc." required
                       />
                    </div>
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</Label>
                       <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded px-3 text-sm focus:ring-4 focus:ring-blue-600/5 outline-none font-medium appearance-none"
                       >
                          {['Registration', 'Sponsorship', 'Exhibition', 'Accommodation', 'Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price</Label>
                       <Input 
                        type="number"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" 
                        placeholder="0.00" required
                       />
                    </div>
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Currency</Label>
                       <Input 
                        value={formData.currency}
                        onChange={e => setFormData({...formData, currency: e.target.value.toUpperCase()})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" 
                        placeholder="USD" required
                       />
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</Label>
                    <textarea 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full h-20 bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-4 focus:ring-blue-600/5 outline-none resize-none font-medium"
                      placeholder="What customers will see..."
                    />
                 </div>

                 <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Features (Comma separated)</Label>
                    <Input 
                      value={formData.features}
                      onChange={e => setFormData({...formData, features: e.target.value})}
                      className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                      placeholder="Access to all halls, Tea & Snacks..."
                    />
                 </div>

                 <div className="flex items-center gap-3 pt-2">
                    <input 
                      type="checkbox" 
                      id="is_active"
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 transition-none" 
                      checked={formData.is_active}
                      onChange={e => setFormData({...formData, is_active: e.target.checked})}
                    />
                    <Label htmlFor="is_active" className="text-xs font-bold text-slate-600 cursor-pointer">Show on website</Label>
                 </div>

                 <DialogFooter className="pt-4 gap-3 bg-slate-50 -mx-6 -mb-6 p-6">
                    <Button type="button" variant="outline" className="h-10 border-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest transition-none px-6 rounded" onClick={() => setIsDialogOpen(false)}>Discard</Button>
                    <Button disabled={isSaving} className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest transition-none px-8 rounded shadow-sm">
                       {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Item'}
                    </Button>
                 </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
         ) : (
            <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-6 transition-none flex items-center gap-2 rounded shadow-sm">
                   <Plus className="w-4 h-4" /> Create Custom Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px] p-0 border-none rounded-lg overflow-hidden shadow-2xl">
                <DialogHeader className="p-6 border-b border-slate-200 bg-slate-50">
                  <DialogTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">New Payment Offer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateOffer} className="p-6 space-y-4">
                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Recipient Email</Label>
                      <Input type="email" required value={offerFormData.email} onChange={e => setOfferFormData({...offerFormData, email: e.target.value})} className="h-10 text-sm" placeholder="user@example.com" />
                   </div>
                   <div className="space-y-1.5">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Source Package</Label>
                      <select required value={offerFormData.tierId} onChange={e => {
                        const tier = tiers.find(t => t._id === e.target.value);
                        setOfferFormData({...offerFormData, tierId: e.target.value, amount: tier?.amount.toString() || '', currency: tier?.currency || 'USD'});
                      }} className="w-full h-10 border rounded px-3 text-sm">
                         <option value="">Select a package...</option>
                         {tiers.filter(t => t.is_active).map(t => <option key={t._id} value={t._id}>{t.name} ({t.amount} {t.currency})</option>)}
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Offer Price</Label>
                         <Input type="number" required value={offerFormData.amount} onChange={e => setOfferFormData({...offerFormData, amount: e.target.value})} className="h-10" />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expiration Date</Label>
                         <Input type="date" required value={offerFormData.expiresAt} onChange={e => setOfferFormData({...offerFormData, expiresAt: e.target.value})} className="h-10" />
                      </div>
                   </div>
                   <Button disabled={isSaving} className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs mt-4">
                     {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Offer Link'}
                   </Button>
                </form>
              </DialogContent>
            </Dialog>
         )}
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded w-fit border border-slate-200 gap-1 mb-8">
           <button onClick={() => setActiveTab('pricing')} className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded transition-none ${activeTab === 'pricing' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Standard Pricing</button>
           <button onClick={() => setActiveTab('offers')} className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded transition-none flex items-center gap-2 ${activeTab === 'offers' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>Special Offers <span className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-700 text-[8px]">{offers.length}</span></button>
        </div>

        {activeTab === 'pricing' && (
          <>
            {/* Category Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {['Registration', 'Accommodation', 'Sponsorship', 'Exhibition'].map((cat, i) => {
             const count = tiers.filter(t => t.category === cat).length;
             return (
               <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cat}</p>
                    <span className="text-[10px] font-bold bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">{count} items</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                     <span className="text-xl font-bold text-slate-900">
                       {tiers.filter(t => t.category === cat).reduce((s, t) => s + (Number(t.amount) || 0), 0).toLocaleString()}
                     </span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
                  </div>
               </div>
             );
           })}
        </div>

        {/* Pricing List Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Pricing List</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active items: {tiers.filter(t => t.is_active).length}</span>
              </div>
           </div>

           <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/30 border-b border-slate-100 divide-x divide-slate-100">
                    <TableHead className="py-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name & Type</TableHead>
                    <TableHead className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</TableHead>
                    <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Features</TableHead>
                    <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {tiers.map((tier) => (
                    <TableRow key={tier._id} className="border-b border-slate-100 divide-x divide-slate-100 hover:bg-slate-50/30 transition-none group">
                       <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-4">
                             <div className={`w-10 h-10 rounded shrink-0 flex items-center justify-center border border-slate-100
                                ${tier.category === 'Registration' ? 'bg-blue-600 text-white' : 
                                  tier.category === 'Accommodation' ? 'bg-emerald-600 text-white' : 
                                  tier.category === 'Sponsorship' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                <Tag className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">{tier.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tier.category}</p>
                             </div>
                          </div>
                       </TableCell>
                       <TableCell className="py-4 text-center">
                          <div className="flex items-baseline justify-center gap-1">
                             <span className="text-[10px] font-bold text-blue-600 mb-1">{tier.currency}</span>
                             <span className="text-xl font-bold text-slate-900 tracking-tight">{Number(tier.amount).toLocaleString()}</span>
                          </div>
                       </TableCell>
                       <TableCell className="py-4">
                          <div className="flex flex-wrap gap-1 max-w-sm">
                             {Array.isArray(tier.features) && tier.features.slice(0, 3).map((f: string, idx: number) => (
                               <span key={idx} className="inline-flex text-[9px] font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[120px]">
                                 {f}
                               </span>
                             ))}
                             {tier.features.length > 3 && <span className="text-[9px] font-bold text-blue-400 px-1">+{tier.features.length - 3}</span>}
                          </div>
                       </TableCell>
                       <TableCell className="py-4 pr-6">
                          <div className="flex items-center justify-end gap-3 h-full">
                             <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border italic ${tier.is_active ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-rose-200 bg-rose-50 text-rose-600'}`}>
                                {tier.is_active ? 'Live' : 'Hidden'}
                             </div>
                             <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-none">
                                <Button 
                                  onClick={() => handleEdit(tier)}
                                  variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-none rounded">
                                    <Edit3 className="w-3.5 h-3.5" />
                                </Button>
                                <Button 
                                  onClick={() => handleDelete(tier._id)}
                                  variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 transition-none rounded">
                                    <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                             </div>
                          </div>
                       </TableCell>
                    </TableRow>
                  ))}
                  {tiers.length === 0 && (
                    <TableRow>
                       <TableCell colSpan={4} className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                          The pricing registry is empty.
                       </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
           </div>
        </div>
        </>
        )}

        {activeTab === 'offers' && (
           <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mt-6">
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Active Special Offers</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Offers: {offers.length}</span>
                </div>
             </div>
             
             <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/30 border-b border-slate-100">
                      <TableHead className="py-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recipient</TableHead>
                      <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base Package</TableHead>
                      <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offer Amount</TableHead>
                      <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiration</TableHead>
                      <TableHead className="py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</TableHead>
                      <TableHead className="py-4"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {offers.map((offer) => (
                      <TableRow key={offer._id} className="border-b border-slate-100 hover:bg-slate-50/30 transition-none group">
                         <TableCell className="py-4 pl-6 font-medium text-slate-900 text-sm">
                            {offer.email}
                         </TableCell>
                         <TableCell className="py-4 text-xs font-bold text-slate-600">
                            {offer.tierId?.name || 'Deleted Package'}
                         </TableCell>
                         <TableCell className="py-4">
                            <span className="text-[10px] font-bold text-blue-600 mb-1 mr-1">{offer.currency}</span>
                            <span className="text-sm font-bold text-slate-900">{Number(offer.amount).toLocaleString()}</span>
                         </TableCell>
                         <TableCell className="py-4">
                            <span className="text-xs font-medium text-amber-600">{new Date(offer.expiresAt).toLocaleDateString()}</span>
                         </TableCell>
                         <TableCell className="py-4 text-center">
                            <div className={`inline-flex text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                              offer.status === 'Paid' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' :
                              offer.status === 'Expired' || new Date(offer.expiresAt) < new Date() ? 'border-rose-200 bg-rose-50 text-rose-600' :
                              'border-amber-200 bg-amber-50 text-amber-600'
                            }`}>
                               {new Date(offer.expiresAt) < new Date() && offer.status !== 'Paid' ? 'Expired' : offer.status}
                            </div>
                         </TableCell>
                         <TableCell className="py-4 pr-6 text-right">
                            <Button 
                              onClick={() => handleDeleteOffer(offer._id)}
                              variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 transition-none rounded opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                         </TableCell>
                      </TableRow>
                    ))}
                    {offers.length === 0 && (
                      <TableRow>
                         <TableCell colSpan={6} className="py-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                            No special offers created.
                         </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
             </div>
           </div>
        )}

      </div>
    </AdminLayout>
  );
}
