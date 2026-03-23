import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  FileDown,
  Plus,
  Trash2,
  Edit3,
  BookOpen,
  Layers,
  FileText,
  Save,
  Loader2,
  ExternalLink,
  Smartphone,
  ShieldCheck
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

export default function AdminBrochures() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Overview',
    icon_name: 'FileDown',
    file_url: '',
    file_size: '',
    type: 'Guide',
    display_order: 0
  });

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/brochures`, {
        credentials: 'include'
      });
      if (res.ok) setBrochures(await res.json());
    } catch (err) {
      console.error('Failed to fetch brochures:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingBrochure 
        ? `${import.meta.env.VITE_API_URL}/api/admin/brochures/${editingBrochure.id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/brochures`;
      
      const method = editingBrochure ? 'PATCH' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast.success(`Brochure ${editingBrochure ? 'updated' : 'created'} successfully.`);
        setIsDialogOpen(false);
        fetchBrochures();
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
    if (!confirm('Are you sure you want to remove this resource guide?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/brochures/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Resource removed from library.');
        fetchBrochures();
      }
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Overview',
      icon_name: 'FileDown',
      file_url: '',
      file_size: '',
      type: 'Guide',
      display_order: 0
    });
    setEditingBrochure(null);
  };

  const handleEdit = (brochure: any) => {
    setEditingBrochure(brochure);
    setFormData({
      title: brochure.title,
      category: brochure.category,
      icon_name: brochure.icon_name || 'FileDown',
      file_url: brochure.file_url,
      file_size: brochure.file_size,
      type: brochure.type || 'Guide',
      display_order: brochure.display_order || 0
    });
    setIsDialogOpen(true);
  };

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading brochures...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Brochures</h1>
            <p className="text-slate-500 font-medium">Add and edit guides and brochures.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="h-16 rounded-[2rem] bg-indigo-600 hover:bg-navy text-white font-black px-10 shadow-2xl shadow-indigo-600/20 transition-all flex items-center gap-3">
                 <Plus className="w-5 h-5" /> Add Brochure
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] rounded-[3rem] p-10 border-none">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-black flex items-center gap-3 text-indigo-600">
                  <FileText className="w-6 h-6" />
                  {editingBrochure ? 'Edit' : 'Add Brochure'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title</Label>
                       <Input 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-indigo-600/10" 
                        placeholder="e.g. Overview" required
                       />
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Type</Label>
                       <Input 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-indigo-600/10" 
                        placeholder="e.g. Guide, Map" required
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                       <select 
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-2 focus:ring-indigo-600/10 outline-none"
                       >
                          {['Overview', 'Sponsors', 'Sessions', 'Map', 'Visa', 'Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Size</Label>
                       <Input 
                        value={formData.file_size}
                        onChange={e => setFormData({...formData, file_size: e.target.value})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-indigo-600/10" 
                        placeholder="e.g. 2.4 MB" required
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">URL</Label>
                    <Input 
                      value={formData.file_url}
                      onChange={e => setFormData({...formData, file_url: e.target.value})}
                      className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-indigo-600/10" 
                      placeholder="https://..." required
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Icon</Label>
                       <select 
                        value={formData.icon_name}
                        onChange={e => setFormData({...formData, icon_name: e.target.value})}
                        className="w-full h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus:ring-2 focus:ring-indigo-600/10 outline-none"
                       >
                          {['FileDown', 'BookOpen', 'FileText', 'Calendar', 'Smartphone', 'ShieldCheck'].map(ic => (
                            <option key={ic} value={ic}>{ic}</option>
                          ))}
                       </select>
                    </div>
                    <div className="space-y-3">
                       <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order</Label>
                       <Input 
                        type="number"
                        value={formData.display_order}
                        onChange={e => setFormData({...formData, display_order: Number(e.target.value)})}
                        className="h-14 bg-slate-50 border-none rounded-2xl font-bold px-6 focus-visible:ring-indigo-600/10" 
                       />
                    </div>
                 </div>

                 <DialogFooter className="pt-6 gap-3 sm:justify-end">
                    <Button type="button" variant="ghost" className="rounded-xl h-14 font-black text-xs uppercase tracking-widest" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button disabled={isSaving} className="rounded-xl h-14 bg-indigo-600 text-white px-10 font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                       {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} 
                       {editingBrochure ? 'Save Changes' : 'Save'}
                    </Button>
                 </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card className="border-none shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white p-2">
              <CardContent className="p-8 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 leading-none mb-1">{brochures.length}</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Total</p>
                 </div>
              </CardContent>
           </Card>
           <Card className="border-none shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white p-2">
              <CardContent className="p-8 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 leading-none mb-1">Mobile</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Mobile Ready</p>
                 </div>
              </CardContent>
           </Card>
           <Card className="border-none shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white p-2">
              <CardContent className="p-8 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue/5 text-blue flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black text-slate-900 leading-none mb-1">Secure</h4>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Secure</p>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Catalog Table */}
        <div className="bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/30 border border-slate-50 overflow-hidden">
           <div className="p-10 border-b border-slate-50 bg-slate-50/20">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-2 font-outfit">All Brochures</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">View and edit your brochures.</p>
           </div>

           <div className="overflow-x-auto p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="py-8 pl-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Brochure</TableHead>
                    <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</TableHead>
                    <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brochures.map((item) => (
                    <TableRow key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all group">
                       <TableCell className="py-8 pl-10">
                          <div className="flex items-center gap-6">
                             <div className="w-14 h-14 rounded-[1.5rem] bg-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                                <FileDown className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-base font-black text-slate-800 mb-1">{item.title}</p>
                                <div className="flex items-center gap-3 text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                                   <Layers className="w-3 h-3" /> {item.type}
                                   <span className="w-1 h-1 rounded-full bg-slate-200" />
                                   <ExternalLink className="w-3 h-3" /> <a href={item.file_url} target="_blank" className="hover:text-indigo-600 normal-case overflow-hidden max-w-[150px] truncate">{item.file_url}</a>
                                </div>
                             </div>
                          </div>
                       </TableCell>
                       <TableCell>
                          <div className="space-y-1">
                             <p className="text-xs font-black text-slate-800">{item.category}</p>
                             <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{item.file_size}</p>
                          </div>
                       </TableCell>
                       <TableCell>
                          <div className="flex items-center justify-center gap-3">
                             <Button 
                              onClick={() => handleEdit(item)}
                              variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-white shadow-sm border border-transparent hover:border-slate-100 transition-all">
                                <Edit3 className="w-4 h-4" />
                             </Button>
                             <Button 
                              onClick={() => handleDelete(item.id)}
                              variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-rose-100 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100">
                                <Trash2 className="w-4 h-4" />
                             </Button>
                          </div>
                       </TableCell>
                    </TableRow>
                  ))}
                  {brochures.length === 0 && (
                    <TableRow>
                       <TableCell colSpan={3} className="py-32 text-center bg-slate-50/20">
                          <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                             <FileText className="w-10 h-10" />
                          </div>
                          <h4 className="text-2xl font-black text-slate-800 font-outfit mb-2 tracking-tight">No brochures</h4>
                          <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-widest opacity-60">Add your first brochure or guide to get started.</p>
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
