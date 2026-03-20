/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  FileCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  Download, 
  MessageSquare,
  Tags,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';

export default function AbstractReview() {
  const [abstracts, setAbstracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAbs, setSelectedAbs] = useState<any | null>(null);

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const fetchAbstracts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/abstracts`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('wisvora_token')}` }
      });
      if (res.ok) {
        setAbstracts(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch abstracts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 p-12">Evaluating Manifest...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-outfit">Review Portal</h1>
            <p className="text-slate-500 font-medium">Evaluate scientific submissions and manage peer review cycles.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-slate-100 p-1 rounded-xl flex gap-1 h-11">
                <Button className="rounded-lg h-full bg-white text-indigo-600 shadow-sm border-none font-bold text-xs px-6 uppercase tracking-widest">Pending</Button>
                <Button variant="ghost" className="rounded-lg h-full text-slate-500 font-bold text-xs px-6 uppercase tracking-widest">Reviewed</Button>
             </div>
          </div>
        </div>

        {/* Filters and Stats Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search by abstract ID, title or author..." 
                    className="pl-12 h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 placeholder:font-medium"
                  />
                </div>
                <Button variant="outline" className="rounded-2xl border-slate-100 bg-slate-50/50 text-slate-600 font-bold h-12 gap-2 px-8">
                  <Filter className="w-4 h-4 text-slate-400" /> Filter
                </Button>
              </div>
           </div>
           <div className="bg-indigo-600 p-4 rounded-3xl shadow-xl shadow-indigo-600/20 text-white flex items-center justify-between px-8">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200">Pending Review</p>
                 <h2 className="text-2xl font-black font-outfit">{abstracts.filter(a => a.status === 'Pending').length} Papers</h2>
              </div>
              <FileText className="w-7 h-7 text-indigo-400 opacity-50" />
           </div>
        </div>

        {/* Abstract Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {abstracts.map((abs) => (
             <Card key={abs.id} className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white overflow-hidden group">
                <div className="p-8">
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                         <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                            <FileCheck className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                         </div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{abs.id}</p>
                            <h3 className="line-clamp-1 font-black text-slate-900 font-outfit text-lg transition-colors leading-tight">
                                {abs.title}
                            </h3>
                         </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          abs.status === 'Pending' ? 'bg-amber-50 text-amber-500' :
                          abs.status === 'In Review' ? 'bg-indigo-50 text-indigo-500' :
                          'bg-blue-50 text-blue-500'
                      }`}>
                          {abs.status}
                      </div>
                   </div>

                   <div className="flex items-center gap-6 mb-8 border-y border-slate-50 py-4">
                      <div className="flex items-center gap-2">
                         <Avatar className="w-8 h-8 rounded-lg shadow-sm">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${abs.name}`} />
                            <AvatarFallback>AD</AvatarFallback>
                         </Avatar>
                         <p className="text-xs font-bold text-slate-600 transition-colors">{abs.name}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                         <Tags className="w-4 h-4" />
                         <span className="text-xs font-bold">{abs.topic}</span>
                      </div>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                         <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-xl border-slate-100 font-bold h-10 px-4 text-slate-600 hover:bg-slate-50"
                                onClick={() => setSelectedAbs(abs)}
                              >
                                Review Paper
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl bg-white">
                               {selectedAbs && (
                                 <div className="flex flex-col">
                                    <div className="p-10 border-b border-slate-50 bg-slate-50/20">
                                       <div className="flex justify-between items-start mb-6">
                                          <div>
                                             <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{selectedAbs.id}</p>
                                              <h2 className="text-2xl font-black text-slate-900 font-outfit uppercase leading-tight mb-4">{selectedAbs.title}</h2>
                                             <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                   <Avatar className="w-6 h-6"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedAbs.name}`} /></Avatar>
                                                   <span className="text-xs font-bold text-slate-600">{selectedAbs.name}</span>
                                                </div>
                                                <span className="text-slate-200">|</span>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedAbs.topic}</span>
                                             </div>
                                          </div>
                                          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-300 hover:text-slate-900 hover:bg-white shadow-sm border border-slate-100">
                                             <Download className="w-5 h-5" />
                                          </Button>
                                       </div>
                                    </div>

                                    <div className="p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                                       <div className="lg:col-span-2 space-y-8">
                                          <div className="p-6 bg-slate-50 rounded-[2rem]">
                                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Abstract Summary</h4>
                                              <p className="text-sm text-slate-600 leading-relaxed font-outfit font-medium">
                                                {selectedAbs.abstract_text}
                                             </p>
                                          </div>
                                          <div className="space-y-4">
                                             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-2">Reviewer Feedback</h4>
                                             <textarea 
                                                placeholder="Enter internal committee notes..."
                                                className="w-full h-32 p-6 bg-slate-50/50 border-2 border-slate-100/50 rounded- [2rem] focus:border-indigo-500/10 focus:ring-0 outline-none text-sm font-medium text-slate-600 resize-none font-outfit"
                                             />
                                          </div>
                                       </div>

                                       <div className="space-y-6">
                                          <div className="p-6 bg-indigo-900 rounded- [2rem] text-white">
                                             <h4 className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-4">Scientific Score</h4>
                                             <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-4xl font-black">{selectedAbs.score || 'N/A'}</span>
                                                <span className="text-white/40 font-bold">/ 10</span>
                                             </div>
                                             <p className="text-[10px] font-bold text-indigo-300">BASED ON PEER METRICS</p>
                                          </div>
                                          
                                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                                             Approve Submission
                                          </Button>
                                          <Button variant="outline" className="w-full border-slate-200 h-14 rounded-2xl font-black uppercase text-xs tracking-widest text-slate-600 hover:bg-slate-50">
                                             Request Revision
                                          </Button>
                                          <Button variant="ghost" className="w-full h-12 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl font-black uppercase text-xs tracking-widest transition-all">
                                             Reject Paper
                                          </Button>
                                       </div>
                                    </div>
                                 </div>
                               )}
                            </DialogContent>
                         </Dialog>

                         <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-10 h-10 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                         >
                            <MessageSquare className="w-4 h-4" />
                         </Button>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase text-[9px] tracking-widest">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         Reviewed by 2
                      </div>
                   </div>
                </div>
             </Card>
           ))}
        </div>

        {/* Action Bar */}
        <div className="bg-slate-900 rounded- [2.5rem] p-8 flex items-center justify-between text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
           <div className="flex items-center gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-400 border border-white/5">
                 <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                 <h4 className="text-xl font-bold font-outfit mb-1">Finalize Batch Review</h4>
                 <p className="text-slate-400 text-xs font-medium">Send approval notifications to 4 accepted researchers.</p>
              </div>
           </div>
           <Button className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 h-14 px-10 font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-xl shadow-indigo-500/20 relative z-10">
              Send Notifications
           </Button>
        </div>
      </div>
    </AdminLayout>
  );
}

// Helper card component missing import fix
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);
