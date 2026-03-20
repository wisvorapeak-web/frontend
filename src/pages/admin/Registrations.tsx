/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  History
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow  
} from '../../components/ui/table';

export default function Registrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/registrations`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}` }
      });
      if (res.ok) {
        setRegistrations(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const revenue = registrations.reduce((acc, reg) => {
    if (reg.payment_status === 'Paid') {
       if (reg.tier?.toLowerCase().includes('gold') || reg.tier?.toLowerCase().includes('platinum')) return acc + 1500;
       if (reg.tier?.toLowerCase().includes('premium')) return acc + 800;
       return acc + 400;
    }
    return acc;
  }, 0);

  const stats = [
    { label: 'Total Revenue', value: `₹${revenue.toLocaleString()}`, change: '+24%', icon: TrendingUp, color: 'text-blue bg-blue/5' },
    { label: 'Paid Tickets', value: registrations.filter(r => r.payment_status === 'Paid').length.toLocaleString(), change: '+12%', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
    { label: 'Pending Payout', value: `₹${registrations.filter(r => r.payment_status === 'Pending').length * 400}`, change: '-3%', icon: Clock, color: 'text-amber-500 bg-amber-50' },
  ];

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading financial data...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit text-indigo-900">Payment Records</h1>
            <p className="text-slate-500 font-medium font-outfit">View ticket sales and total income.</p>
          </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6 shadow-sm border-2">
              <Download className="w-4 h-4" /> Export to CSV
            </Button>
            <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-600/20 gap-2 h-11 px-6 active:scale-95 transition-all">
              <CreditCard className="w-4 h-4" /> Issue Refund
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 flex items-center justify-between group hover:border-indigo-500/20 transition-all cursor-pointer">
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-slate-900 font-outfit">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-emerald-500">{stat.change}</span>
                </div>
              </div>
              <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row items-center gap-4 bg-slate-50/20">
             <div className="relative flex-1 w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search by name, ID or email..." className="pl-13 h-14 bg-white border-slate-100 rounded-[1.25rem] focus-visible:ring-indigo-500/10 font-bold shadow-sm" />
             </div>
             <Button variant="outline" className="h-14 rounded-[1.25rem] border-slate-100 bg-white text-slate-600 font-bold px-8 shadow-sm group">
                <Filter className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform" /> Filter
             </Button>
          </div>

          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none font-outfit text-xs text-slate-400 font-bold">
                <TableHead className="py-6 pl-10">User Details</TableHead>
                <TableHead className="py-6">Package Type</TableHead>
                <TableHead className="py-6">Payment Status</TableHead>
                <TableHead className="py-6">Payment Date</TableHead>
                <TableHead className="py-6 text-right pr-10">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="py-6 pl-10">
                     <div className="flex items-center gap-4">
                        <Avatar className="w-11 h-11 border-2 border-white shadow-xl ring-1 ring-slate-100 group-hover:scale-105 transition-all">
                           <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reg.name}`} />
                           <AvatarFallback className="font-bold text-slate-400">{reg.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                           <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{reg.name}</p>
                           <p className="text-[10px] font-bold text-slate-400">{reg.email}</p>
                        </div>
                     </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700 leading-none mb-1">{reg.tier}</span>
                        <span className="text-[10px] font-bold text-slate-300">Full Access</span>
                     </div>
                  </TableCell>
                  <TableCell>
                     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                       reg.payment_status === 'Paid' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100' : 
                       reg.payment_status === 'Pending' ? 'bg-amber-50 text-amber-500 border border-amber-100' : 'bg-rose-50 text-rose-500 border border-rose-100'
                     }`}>
                       <div className="w-1.5 h-1.5 rounded-full" />
                       {reg.payment_status}
                     </div>
                  </TableCell>
                  <TableCell>
                     <span className="text-xs font-bold text-slate-400">{new Date(reg.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </TableCell>
                  <TableCell className="text-right pr-10">
                     <Button variant="ghost" size="sm" className="rounded-xl font-bold text-[10px] text-slate-400 hover:text-indigo-600 hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
                        View Receipt
                     </Button>
                  </TableCell>
                </TableRow>
              ))}
              {registrations.length === 0 && (
                <TableRow>
                   <TableCell colSpan={5} className="py-24 text-center">
                      <div className="w-24 h-24 bg-slate-50/50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 mb-8 border-2 border-dashed border-slate-100">
                         <History className="w-12 h-12" />
                      </div>
                       <h4 className="text-xl font-bold text-slate-900 font-outfit mb-2">No Payments Found</h4>
                       <p className="text-xs text-slate-400 font-bold max-w-sm mx-auto leading-relaxed">No payments have been made yet. New sales will show up here as they happen.</p>
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
