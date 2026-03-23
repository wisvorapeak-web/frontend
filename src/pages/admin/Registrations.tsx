import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Search, 
  Download, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  History,
  Tag,
  SearchCode,
  ArrowRight,
  TrendingDown,
  Loader2,
  ShieldCheck,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow  
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';

export default function Registrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/registrations`, {
        credentials: 'include'
      });
      if (res.ok) setRegistrations(await res.json());
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        toast.success(`Status updated: ${newStatus}`);
        fetchRegistrations();
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const revenue = registrations.reduce((acc, reg) => {
    if (reg.payment_status === 'Paid') return acc + (Number(reg.amount) || 0);
    return acc;
  }, 0);

  const filteredRegs = registrations.filter(r => {
    const matchesSearch = 
      r.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || r.payment_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total', value: `₹${revenue.toLocaleString()}`, change: '+24%', icon: TrendingUp, color: 'text-blue bg-blue/5' },
    { label: 'Paid', value: registrations.filter(r => r.payment_status === 'Paid').length.toLocaleString(), change: '+12%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Pending', value: `₹${registrations.filter(r => r.payment_status === 'Pending').reduce((s, r) => s + (Number(r.amount) || 0), 0).toLocaleString()}`, change: '-3%', icon: Clock, color: 'text-amber-500 bg-amber-50' },
  ];

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Registrations</h1>
            <p className="text-slate-500 font-medium font-outfit">View and edit registrations.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 h-14">
                {['All', 'Paid', 'Pending', 'Failed'].map((status) => (
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2 group hover:shadow-2xl hover:border-blue/20 transition-all border border-transparent overflow-hidden">
                <CardContent className="p-8 flex items-center justify-between">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                      <div className="flex items-center gap-3">
                         <h3 className="text-3xl font-black text-slate-900 font-outfit">{stat.value}</h3>
                         <div className={`flex items-center gap-1.5 text-[10px] font-black px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                            {stat.change.startsWith('+') ? <TrendingUp className="w-2 h-2" /> : <TrendingDown className="w-2 h-2" />} {stat.change}
                         </div>
                      </div>
                   </div>
                   <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-700`}>
                      <stat.icon className="w-7 h-7" />
                   </div>
                </CardContent>
            </Card>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center gap-6 bg-slate-50/20">
             <div className="relative flex-1 w-full group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-hover:text-blue transition-colors" />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="w-full pl-16 h-16 bg-white border-none rounded-[2rem] shadow-xl shadow-slate-200/40 font-bold focus-visible:ring-blue/10 placeholder:font-bold placeholder:text-slate-200 outline-none" 
                />
             </div>
             <Button variant="outline" className="h-16 rounded-[2rem] border-slate-100 bg-white text-slate-400 hover:text-blue font-bold px-10 shadow-sm transition-all flex items-center gap-3">
                <Download className="w-5 h-5" /> Export
             </Button>
          </div>

          <div className="overflow-x-auto p-4">
            <Table>
              <TableHeader className="bg-slate-50/50 rounded- [2rem]">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="py-8 pl-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">Participant</TableHead>
                  <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tier</TableHead>
                  <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</TableHead>
                  <TableHead className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegs.map((reg) => (
                  <TableRow key={reg.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all duration-300 group">
                    <TableCell className="py-8 pl-10">
                       <div className="flex items-center gap-6">
                          <Avatar className="w-14 h-14 rounded- [1.5rem] border-4 border-white shadow-2xl ring-1 ring-slate-100 group-hover:scale-105 transition-all">
                             <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reg.name}`} />
                             <AvatarFallback className="font-bold text-slate-200">{reg.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                             <p className="text-base font-black text-slate-800 group-hover:text-blue transition-colors">{reg.name}</p>
                             <div className="flex items-center gap-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                                <SearchCode className="w-3 h-3" /> {reg.id}
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <ShieldCheck className="w-3 h-3" /> Secured
                             </div>
                          </div>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue/5 text-blue rounded-xl border border-blue/10">
                          <Tag className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{reg.tier}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                         reg.payment_status === 'Paid' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 
                         reg.payment_status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : 'bg-rose-50 text-rose-500 border border-rose-100'
                       }`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${reg.payment_status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                         {reg.payment_status}
                       </div>
                    </TableCell>
                    <TableCell className="text-center">
                       <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         {reg.payment_status !== 'Paid' && (
                           <Button 
                             onClick={() => handleUpdateStatus(reg.id, 'Paid')}
                             variant="ghost" 
                             className="h-10 px-4 rounded-xl font-bold text-[10px] text-emerald-600 hover:bg-emerald-50 uppercase tracking-widest"
                           >
                               Paid
                           </Button>
                         )}
                         <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-slate-300 hover:text-blue hover:bg-white shadow-sm transition-all border border-transparent hover:border-slate-100">
                            <ArrowRight className="w-4 h-4" />
                         </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRegs.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={4} className="py-32 text-center bg-slate-50/20">
                        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 mb-8 border-2 border-dashed border-slate-100 shadow-sm relative">
                           <History className="w-10 h-10" />
                           <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue/10 rounded-2xl flex items-center justify-center text-blue">
                              <SearchCode className="w-5 h-5" />
                           </div>
                        </div>
                         <h4 className="text-2xl font-black text-slate-800 font-outfit mb-2 tracking-tight">No registrations</h4>
                         <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed uppercase tracking-widest opacity-60">Try searching for something else.</p>
                     </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Global Enrollment Activity Section (Added Enhancement) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[3rem] bg-navy p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
              <div className="flex items-center gap-6 mb-10 relative z-10">
                 <div className="w-16 h-16 bg-white/5 text-blue rounded-3xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black tracking-tight leading-none mb-2">Growth</h3>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">Daily stats</p>
                 </div>
              </div>
              <div className="h-48 flex items-end gap-3 pb-4 relative z-10">
                 {[40, 60, 30, 80, 50, 70, 90, 60].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 group-hover:bg-white/10 rounded-2xl transition-all relative overflow-hidden h-full flex items-end">
                       <div className="w-full bg-blue transition-all duration-1000" style={{ height: `${h}%` }} />
                    </div>
                 ))}
              </div>
           </Card>

           <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[3rem] bg-white p-10 flex flex-col justify-between group">
              <div className="space-y-6">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue/5 text-blue rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                       <Package className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-2">Tickets</h3>
                       <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.2em]">By type</p>
                    </div>
                 </div>
                 <div className="space-y-4 pt-4">
                    {['Gold Track', 'Platinum Access', 'Standard Pass'].map((tier, i) => (
                      <div key={i} className="flex items-center justify-between group/line">
                         <div className="flex items-center gap-4">
                            <span className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-blue' : i === 1 ? 'bg-indigo-300' : 'bg-slate-100'}`} />
                            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{tier}</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <div className="w-32 h-2 bg-slate-50 rounded-full overflow-hidden">
                               <div className={`h-full bg-blue transition-all duration-1000 ${i === 0 ? 'w-2/3' : i === 1 ? 'w-1/3' : 'w-1/2'}`} />
                            </div>
                            <span className="text-xs font-black text-slate-900 leading-none">{i === 0 ? '68%' : i === 1 ? '32%' : '50%'}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <Button className="w-full h-16 bg-blue hover:bg-navy text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue/20 transition-all mt-10">
                 Full Report <ArrowRight className="w-4 h-4 ml-3" />
              </Button>
           </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
