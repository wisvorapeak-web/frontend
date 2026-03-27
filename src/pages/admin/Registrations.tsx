import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Search, 
  Download, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow  
} from '@/components/ui/table';

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
      if (res.ok) {
        const json = await res.json();
        setRegistrations(Array.isArray(json) ? json : json.data || []);
      }
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
    { label: 'Total Revenue', value: `$${revenue.toLocaleString()}`, color: 'text-blue-600' },
    { label: 'Paid Attendees', value: registrations.filter(r => r.payment_status === 'Paid').length.toLocaleString(), color: 'text-emerald-600' },
    { label: 'Pending Orders', value: registrations.filter(r => r.payment_status === 'Pending').length.toLocaleString(), color: 'text-amber-600' },
  ];

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3 text-xs uppercase tracking-widest"><Loader2 className="w-4 h-4 animate-spin" /> Loading registrations...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Delegate Registrations</h1>
            <p className="text-sm text-slate-500 mt-1">Review event participant ledger and verify transaction records.</p>
          </div>
          <Button variant="outline" className="h-10 border-slate-200 text-slate-600 font-bold text-xs uppercase transition-none gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* List Controls */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Lookup participant by name, email or order-id..." 
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded text-sm font-medium focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none transition-none" 
              />
            </div>
            <div className="flex bg-slate-100 p-1 rounded gap-1 border border-slate-100">
              {['All', 'Paid', 'Pending', 'Failed'].map((status) => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded uppercase tracking-widest transition-none ${filterStatus === status ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-b border-slate-100 divide-x divide-slate-100">
                  <TableHead className="py-4 pl-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delegate Identification</TableHead>
                  <TableHead className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tier</TableHead>
                  <TableHead className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Status</TableHead>
                  <TableHead className="py-4 pr-6 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Management</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegs.map((reg) => (
                  <TableRow key={reg.id} className="border-b border-slate-100 divide-x divide-slate-100 hover:bg-slate-50/30 transition-none">
                    <TableCell className="py-4 pl-6">
                       <div className="space-y-0.5">
                          <p className="text-sm font-bold text-slate-900">{reg.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{reg.email}</p>
                          <p className="text-[9px] text-slate-300 font-mono tracking-tighter">{reg.id}</p>
                       </div>
                    </TableCell>
                    <TableCell className="text-center">
                       <span className="inline-block px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200">
                          {reg.tier}
                       </span>
                    </TableCell>
                    <TableCell className="text-center">
                       <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${
                         reg.payment_status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                         reg.payment_status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                       }`}>
                         {reg.payment_status}
                       </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                       <div className="flex items-center justify-end gap-3">
                         {reg.payment_status !== 'Paid' && (
                           <button 
                             onClick={() => handleUpdateStatus(reg.id, 'Paid')}
                             className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest"
                           >
                              Confirm Payment
                           </button>
                         )}
                         <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-200 text-slate-400 hover:text-slate-900 transition-none rounded">
                            <ArrowRight className="w-3.5 h-3.5" />
                         </Button>
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredRegs.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={4} className="py-20 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">
                        No ledger entries found.
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
