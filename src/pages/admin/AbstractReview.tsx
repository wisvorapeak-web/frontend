import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  MessageSquare,
  Tags,
  FileText,
  XCircle,
  Clock,
  ChevronRight,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

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
      if (res.ok) setAbstracts(await res.json());
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
        headers: { 
          'Content-Type': 'application/json'
        },
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

  const filteredAbstracts = abstracts.filter(a => {
    const matchesSearch = 
      a.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Abstracts</h1>
            <p className="text-slate-500 font-medium font-outfit">Review and approve submitted abstracts.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 h-14">
                {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                   <Button 
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`rounded-xl h-full px-6 font-bold text-xs transition-all ${filterStatus === status ? 'bg-white text-blue shadow-xl shadow-slate-200/50 border-none' : 'variant-ghost text-slate-400 hover:text-slate-600'}`}
                  >
                    {status}
                  </Button>
                ))}
             </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-3">
              <div className="relative group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-blue transition-colors" />
                 <input 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search..." 
                   className="w-full pl-16 h-16 bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/40 font-bold focus:outline-none focus:ring-4 focus:ring-blue/5 placeholder:font-bold placeholder:text-slate-300"
                 />
              </div>
           </div>
           <Card className="border-none shadow-xl shadow-blue/5 rounded-[2rem] bg-blue group overflow-hidden">
              <CardContent className="p-0 h-16 flex items-center justify-between px-8 text-white relative">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700" />
                 <div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-none mb-1">To Review</p>
                    <h2 className="text-xl font-black">{abstracts.filter(a => a.status === 'Pending').length} Pending</h2>
                 </div>
                 <FileText className="w-6 h-6 text-white/20" />
              </CardContent>
           </Card>
        </div>

        {/* Abstract Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {filteredAbstracts.map((abs) => (
             <Card key={abs.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] bg-white overflow-hidden group hover:shadow-2xl hover:border-blue/20 transition-all duration-500 border border-slate-50">
                <div className="p-10 space-y-8">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                         <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue/5 transition-colors">
                            <FileCheck className="w-7 h-7 text-slate-300 group-hover:text-blue transition-colors" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-300 tracking-widest">{abs.id}</p>
                            <h3 className="line-clamp-1 font-black text-slate-800 font-outfit text-xl group-hover:text-blue transition-colors leading-tight">
                                {abs.title}
                            </h3>
                         </div>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          abs.status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100/50' :
                          abs.status === 'Approved' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100/50' :
                          'bg-rose-50 text-rose-500 border border-rose-100/50'
                      }`}>
                          {abs.status}
                      </div>
                   </div>

                   <div className="flex items-center gap-6 border-y border-slate-50 py-6">
                      <div className="flex items-center gap-3">
                         <Avatar className="w-10 h-10 rounded-xl shadow-lg ring-4 ring-white">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${abs.name}`} />
                            <AvatarFallback className="font-bold text-slate-400">EX</AvatarFallback>
                         </Avatar>
                         <p className="text-xs font-black text-slate-600 leading-none">{abs.name}</p>
                      </div>
                      <div className="h-4 w-px bg-slate-100" />
                      <div className="flex items-center gap-2 text-slate-400">
                         <Tags className="w-4 h-4 text-slate-300" />
                         <span className="text-xs font-bold truncate max-w-[120px]">{abs.topic}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                         <Dialog>
                            <DialogTrigger asChild>
                               <Button 
                                 onClick={() => setSelectedAbs(abs)}
                                 className="h-12 px-8 bg-blue hover:bg-navy text-white rounded-2xl font-bold text-xs shadow-xl shadow-blue/20 group/btn"
                               >
                                  Review <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                               </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl rounded-[3.5rem] p-0 overflow-hidden border-none shadow-2xl bg-white focus:outline-none">
                               {selectedAbs && (
                                 <div className="flex flex-col h-[90vh]">
                                    <div className="p-10 bg-slate-50/50 border-b border-slate-100">
                                       <div className="flex justify-between items-start">
                                          <div className="space-y-4">
                                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                                                <span className="text-[10px] font-black text-blue tracking-widest uppercase">{selectedAbs.id}</span>
                                             </div>
                                             <h2 className="text-3xl font-black text-slate-900 font-outfit leading-tight max-w-2xl">{selectedAbs.title}</h2>
                                             <div className="flex items-center gap-6">
                                                <div className="flex items-center gap-3">
                                                   <Avatar className="w-8 h-8 rounded-lg shadow-sm"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAbs.name}`} /></Avatar>
                                                   <span className="text-xs font-black text-slate-600 uppercase tracking-wider">{selectedAbs.name}</span>
                                                </div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                                <span className="text-xs font-bold text-slate-400 italic">{selectedAbs.email}</span>
                                             </div>
                                          </div>
                                          <a href={selectedAbs.file_url} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue hover:shadow-xl transition-all border border-slate-100 shadow-sm">
                                             <ExternalLink className="w-6 h-6" />
                                          </a>
                                       </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                          <div className="lg:col-span-2 space-y-12">
                                             <div className="space-y-4">
                                                <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.25em]">Abstract Text</h4>
                                                <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100/50 relative">
                                                   <div className="absolute top-8 left-8 text-6xl text-blue/5 font-serif">"</div>
                                                   <p className="text-base text-slate-600 leading-relaxed font-outfit font-medium relative z-10 whitespace-pre-wrap">
                                                      {selectedAbs.abstract_text}
                                                   </p>
                                                </div>
                                             </div>
                                             <div className="space-y-4">
                                                <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.25em]">Notes</h4>
                                                <Textarea 
                                                   placeholder="Add notes here..."
                                                   className="min-h-[160px] p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] focus:border-blue/10 focus:ring-0 outline-none text-sm font-medium text-slate-600 shadow-inner"
                                                />
                                             </div>
                                          </div>

                                          <div className="space-y-8">
                                             <div className="p-8 bg-navy rounded-[2.5rem] text-white overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                                                <h4 className="text-xs font-bold text-blue tracking-widest uppercase mb-6">Score</h4>
                                                <div className="flex items-baseline gap-2 mb-2">
                                                   <span className="text-5xl font-black">{selectedAbs.score || '8.5'}</span>
                                                   <span className="text-white/20 font-bold">/ 10</span>
                                                </div>
                                                <p className="text-[10px] font-bold text-white/40 leading-relaxed">Score based on quality.</p>
                                             </div>
                                             
                                             <div className="space-y-4 pt-10">
                                                <Button 
                                                   onClick={() => handleStatusUpdate(selectedAbs.id, 'Approved')}
                                                   disabled={isUpdating}
                                                   className="w-full bg-emerald-500 hover:bg-emerald-600 h-16 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-white border-none"
                                                >
                                                   {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5 mr-3" /> Approve</>}
                                                </Button>
                                                <Button 
                                                   onClick={() => handleStatusUpdate(selectedAbs.id, 'Rejected')}
                                                   variant="ghost" 
                                                   className="w-full h-16 border-2 border-slate-50 text-rose-500 hover:text-white hover:bg-rose-500 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest transition-all"
                                                >
                                                   <XCircle className="w-5 h-5 mr-3" /> Reject
                                                </Button>
                                                <Button variant="ghost" className="w-full h-14 text-slate-400 hover:text-indigo-600 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] border border-transparent hover:border-indigo-100">
                                                   <Clock className="w-4 h-4 mr-2" /> Request Edit
                                                </Button>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                               )}
                            </DialogContent>
                         </Dialog>

                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-12 h-12 text-slate-300 hover:text-blue hover:bg-blue/5 rounded-2xl transition-all"
                         >
                            <MessageSquare className="w-5 h-5" />
                         </Button>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 font-bold text-[10px] uppercase tracking-widest">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         Status: Done
                      </div>
                   </div>
                </div>
             </Card>
           ))}
           {filteredAbstracts.length === 0 && (
             <div className="md:col-span-2 py-32 text-center bg-slate-50/50 rounded-[4rem] border-4 border-dashed border-slate-100">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 mb-8 shadow-sm">
                   <Clock className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-400 font-outfit uppercase tracking-widest">None found</h4>
                <p className="text-xs text-slate-300 font-bold mt-2">Try searching for something else.</p>
             </div>
           )}
        </div>

        {/* Action Bar */}
        <div className="bg-navy rounded-[3.5rem] p-10 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-[100px] pointer-events-none" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center text-blue border border-white/5 shadow-inner">
                 <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-2xl font-black tracking-tight leading-none mb-2">Notify Authors</h4>
                 <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Send the results to all authors.</p>
              </div>
           </div>
           <Button className="rounded-2xl bg-blue hover:bg-white hover:text-navy h-16 px-12 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-2xl shadow-blue/20 mt-8 md:mt-0 relative z-10">
              Notify Authors
           </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
