import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  FileText,
  ChevronRight,
  Loader2,
  ExternalLink,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

export default function AbstractReview() {
  const [abstracts, setAbstracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAbs, setSelectedAbs] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const fetchAbstracts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abstracts`, {
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        setAbstracts(Array.isArray(json) ? json : json.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch abstracts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abstracts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Status updated: ${newStatus}`);
        fetchAbstracts();
        setSelectedAbs(null);
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this submission?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abstracts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Submission deleted');
        fetchAbstracts();
        setSelectedAbs(null);
      }
    } catch (err) {
      toast.error('Deletion failed');
    }
  };

  const filteredAbstracts = abstracts.filter(a => {
    const matchesSearch = 
      a.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading abstracts...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Abstract Review</h1>
            <p className="text-sm text-slate-500 mt-1">Evaluate and manage scientific abstract submissions.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 text-xs font-bold rounded transition-none ${filterStatus === status ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Stats & Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or ID..." 
                className="w-full pl-11 h-12 bg-white border border-slate-200 rounded px-4 text-sm font-medium focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none" 
              />
            </div>
          </div>
          <div className="bg-blue-600 rounded-lg p-4 text-white flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">Awaiting Review</p>
              <h3 className="text-xl font-bold">{abstracts.filter(a => a.status === 'Pending').length} Pending</h3>
            </div>
            <FileText className="w-8 h-8 opacity-20" />
          </div>
        </div>

        {/* Abstract List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          {filteredAbstracts.map((abs) => (
            <div key={abs.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between group relative">
              <button 
                onClick={() => handleDelete(abs.id)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-slate-50 text-slate-400 rounded">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${
                    abs.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    abs.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {abs.status}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="px-2 py-0.5 bg-blue/10 text-blue rounded-[4px] text-[9px] font-bold uppercase tracking-wider border border-blue/10">
                      {abs.category || 'N/A'}
                   </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">{abs.id}</p>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-2 min-h-[3.5rem]">{abs.title}</h3>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <Avatar className="w-8 h-8 border border-slate-200">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${abs.name || 'User'}`} />
                    <AvatarFallback className="text-[10px] font-bold">{abs.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{abs.name}</p>
                    <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]">{abs.topic}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedAbs(abs)} className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded">
                      View Submission <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0 border-none rounded-lg overflow-hidden shadow-2xl bg-white">
                    {selectedAbs && (
                      <div className="flex flex-col h-[85vh]">
                        <DialogHeader className="sr-only">
                          <DialogTitle>Abstract Submission Details</DialogTitle>
                          <DialogDescription>Reviewing the submitted scientific paper from {selectedAbs.name}</DialogDescription>
                        </DialogHeader>
                        <div className="p-8 border-b border-slate-200 bg-slate-50">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedAbs.id}</span>
                              <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedAbs.title}</h2>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs font-bold text-slate-600">{selectedAbs.name}</span>
                                <span className="text-xs text-slate-400 font-medium italic">({selectedAbs.email})</span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                 <span className="text-[10px] font-black text-blue uppercase tracking-[0.2em] px-2 py-1 bg-blue/5 border border-blue/10 rounded">Category: {selectedAbs.category || 'N/A'}</span>
                                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] px-2 py-1 bg-indigo-50 border border-indigo-100 rounded">Topic: {selectedAbs.topic || 'N/A'}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href={selectedAbs.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                                  <ExternalLink className="w-4 h-4" /> Open Full text
                                </a>
                                <Button onClick={() => handleDelete(selectedAbs.id)} variant="ghost" size="icon" className="text-slate-300 hover:text-rose-600 transition-colors">
                                   <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Abstract Content</h4>
                            <div className="p-6 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                              {selectedAbs.abstract_text}
                            </div>
                          </div>
                        </div>

                        <div className="p-8 border-t border-slate-200 bg-white flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button onClick={() => handleStatusUpdate(selectedAbs.id, 'Approved')} disabled={isUpdating} className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8 font-bold text-xs text-white rounded">
                              {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Approve Submission'}
                            </Button>
                            <Button onClick={() => handleStatusUpdate(selectedAbs.id, 'Rejected')} variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 h-11 px-8 font-bold text-xs rounded">
                              Reject
                            </Button>
                          </div>
                          <Button variant="ghost" className="text-xs font-bold text-slate-400 hover:text-slate-900">
                            Download PDF Copy
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  <div className={`w-1.5 h-1.5 rounded-full ${abs.status === 'Approved' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  Review Status
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Action Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between text-white shadow-lg overflow-hidden relative">
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <CheckCircle2 className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Release Decisions</h4>
              <p className="text-white/40 text-sm mt-1">Notify all authors about their submission status via email.</p>
            </div>
          </div>
          <Button className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded mt-6 md:mt-0 relative z-10 transition-none">
            Notify All Authors
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
