import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  FileDown,
  Plus,
  Trash2,
  Edit3,
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
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminBrochures() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Overview',
    icon_name: 'FileDown',
    file_url: '',
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
      const url = editingBrochure?._id 
        ? `${import.meta.env.VITE_API_URL}/api/admin/brochures/${editingBrochure._id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/brochures`;
      
      const method = editingBrochure?._id ? 'PATCH' : 'POST';
      
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString());
      });
      
      if (selectedFile) {
        formDataToSend.append('file', selectedFile);
      }
      
      const res = await fetch(url, {
        method,
        credentials: 'include',
        body: formDataToSend
      });

      if (res.ok) {
        toast.success(`Resource saved successfully.`);
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
    if (!confirm('Permanently remove this resource from the library?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/brochures/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Resource removed.');
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
      type: 'Guide',
      display_order: 0
    });
    setEditingBrochure(null);
    setSelectedFile(null);
  };

  const handleEdit = (brochure: any) => {
    setEditingBrochure(brochure);
    setFormData({
      title: brochure.title,
      category: brochure.category,
      icon_name: brochure.icon_name || 'FileDown',
      file_url: brochure.file_url,
      type: brochure.type || 'Guide',
      display_order: brochure.display_order || 0
    });
    setIsDialogOpen(true);
  };

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading brochures...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resource Library</h1>
            <p className="text-sm text-slate-500 mt-1">Manage downloadable PDF guides, brochures and event maps.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 transition-none gap-2">
                 <Plus className="w-4 h-4" /> Add New Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border border-slate-200 p-0 overflow-hidden rounded-lg">
              <DialogHeader className="p-6 border-b border-slate-100 bg-slate-50">
                <DialogTitle className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  {editingBrochure?._id ? 'Edit Resource' : 'New Resource'}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Upload and manage PDF guides, maps and other downloadable assets for summit participants.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Resource Title</Label>
                       <Input 
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" 
                        placeholder="Overview..." required
                       />
                    </div>
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Description</Label>
                       <Input 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                        placeholder="PDF Guide..." required
                       />
                    </div>
                 </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</Label>
                        <select 
                         value={formData.category}
                         onChange={e => setFormData({...formData, category: e.target.value})}
                         className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 appearance-none outline-none focus:ring-4 focus:ring-blue-600/5 transition-none font-medium"
                        >
                           {['Overview', 'Sponsors', 'Sessions', 'Map', 'Visa', 'Other'].map(c => (
                             <option key={c} value={c}>{c}</option>
                           ))}
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Icon</Label>
                        <select 
                         value={formData.icon_name}
                         onChange={e => setFormData({...formData, icon_name: e.target.value})}
                         className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 appearance-none outline-none focus:ring-4 focus:ring-blue-600/5 transition-none font-medium"
                        >
                           {['FileDown', 'BookOpen', 'FileText', 'Calendar', 'Smartphone', 'ShieldCheck'].map(ic => (
                             <option key={ic} value={ic}>{ic}</option>
                           ))}
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">File Link (URL)</Label>
                        <Input 
                          value={formData.file_url}
                          onChange={e => setFormData({...formData, file_url: e.target.value})}
                          className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                          placeholder="https://..." 
                          required={!selectedFile && !editingBrochure}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Upload File</Label>
                        <Input 
                          type="file"
                          onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                          className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sort Order</Label>
                       <Input 
                        type="number"
                        value={formData.display_order}
                        onChange={e => setFormData({...formData, display_order: Number(e.target.value)})}
                        className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                       />
                    </div>
                  </div>

                 <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-50">
                    <Button type="button" variant="outline" className="h-10 border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-widest transition-none px-6 rounded" onClick={() => setIsDialogOpen(false)}>Discard</Button>
                    <Button disabled={isSaving} className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-[10px] tracking-widest transition-none px-8 rounded">
                       {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : 'Save Resource'}
                    </Button>
                 </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Assets</p>
              <h3 className="text-2xl font-bold text-slate-900">{brochures.length}</h3>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <h3 className="text-2xl font-bold text-emerald-600 flex items-center gap-2 italic">Active</h3>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Access</p>
              <h3 className="text-2xl font-bold text-blue-600 flex items-center gap-2 italic">Working</h3>
            </div>
        </div>

        {/* Catalog Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
           <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Library Catalog</h2>
           </div>

           <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="border-b border-slate-100 divide-x divide-slate-100">
                    <TableHead className="py-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asset Details</TableHead>
                    <TableHead className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</TableHead>
                    <TableHead className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Size</TableHead>
                    <TableHead className="py-4 pr-6 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brochures.map((item) => (
                    <TableRow key={item._id} className="border-b border-slate-100 divide-x divide-slate-100 hover:bg-slate-50/30 transition-none group">
                       <TableCell className="py-4 pl-6">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-slate-50 text-slate-300 border border-slate-100 flex items-center justify-center rounded transition-none">
                                <FileDown className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate max-w-[200px] italic">{item.file_url}</p>
                             </div>
                          </div>
                       </TableCell>
                       <TableCell className="text-center font-bold text-xs text-slate-600">
                          {item.category}
                       </TableCell>
                       <TableCell className="text-center">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.file_size} / {item.type}</span>
                       </TableCell>
                       <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                             <Button 
                              onClick={() => handleEdit(item)}
                              variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-none rounded">
                                <Edit3 className="w-3.5 h-3.5" />
                             </Button>
                             <Button 
                              onClick={() => handleDelete(item._id)}
                              variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 transition-none rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                             </Button>
                          </div>
                       </TableCell>
                    </TableRow>
                  ))}
                  {brochures.length === 0 && (
                    <TableRow>
                       <TableCell colSpan={4} className="py-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                          The resource library is currently empty.
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
