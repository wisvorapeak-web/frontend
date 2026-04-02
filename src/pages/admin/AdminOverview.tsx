import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Clock,
  CheckCircle2,
  Mail,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Globe,
  MapPin
} from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AdminOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState<any>({
    totalRegistrations: 0,
    totalAbstracts: 0,
    totalRevenue: '$0',
    totalInquiries: 0,
    totalSponsors: 0,
    recentInquiries: [],
    registrationChartData: [40, 60, 30, 80, 50, 70, 90]
  });

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
        credentials: 'include'
      });
      if (res.ok) {
         const data = await res.json();
         setAdminStats(data);
      }
    } catch (err) {
      console.error('Admin Stats Fetch Failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayStats = [
    { label: 'Total Delegates', value: adminStats.totalRegistrations.toLocaleString(), icon: Users, color: 'text-blue-600' },
    { label: 'Abstracts Received', value: adminStats.totalAbstracts.toLocaleString(), icon: FileText, color: 'text-indigo-600' },
    { label: 'Total Revenue', value: adminStats.totalRevenue, icon: CreditCard, color: 'text-emerald-600' },
    { label: 'Payment Failures', value: adminStats.failedPayments || 0, icon: AlertCircle, color: 'text-rose-600' },
  ];

  if (loading) return (
    <AdminLayout>
       <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading metrics...</p>
          </div>
       </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="space-y-8 font-inter">
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Real-time statistics for the Ascendix World Food, AgroTech & Animal Science Summit (ASFAA-2026).</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded">
             <Clock className="w-4 h-4" />
             Last synced: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => (
            <div key={stat.label} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
               <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 bg-slate-50 rounded ${stat.color}`}>
                     <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                     <TrendingUp className="w-3 h-3" /> +12.5%
                  </div>
               </div>
               <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
               </div>
            </div>
          ))}
        </div>

        {/* Charts and Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Chart */}
           <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold text-slate-900">Registration Trends</h3>
                 <div className="flex gap-1">
                    {['7D', '30D', '1Y'].map(t => (
                      <button key={t} className={`px-3 py-1.5 rounded text-xs font-medium border ${t === '7D' ? 'bg-slate-950 text-white border-slate-950' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{t}</button>
                    ))}
                 </div>
              </div>
              
              <div className="h-64 flex items-end gap-3 px-2">
                 {(adminStats.registrationChartData || []).map((val: number, i: number) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                       <div 
                          className="w-full bg-blue-600 rounded-t-sm" 
                          style={{ height: `${val}%` }}
                          title={`Period ${i+1}: ${val}%`}
                       />
                       <p className="mt-3 text-[10px] text-slate-400 text-center font-medium">P-{i+1}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Inquiries Feed */}
           <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-8 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-slate-900">Recent Inquiries</h3>
                 <button onClick={() => navigate('/admin/inbox')} className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1">
                    View All <ArrowUpRight className="w-3 h-3" />
                 </button>
              </div>

              <div className="space-y-4 flex-1">
                 {(adminStats.recentInquiries || []).length > 0 ? adminStats.recentInquiries.map((inquiry: any) => (
                    <div key={inquiry.id} className="p-4 bg-slate-50 border border-slate-100 rounded hover:border-slate-300 transition-colors cursor-pointer">
                       <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-bold text-slate-900">{inquiry.name}</p>
                          <span className="text-[10px] text-slate-400">{new Date(inquiry.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                       </div>
                       <p className="text-xs text-slate-500 line-clamp-1 truncate">{inquiry.subject}</p>
                    </div>
                 )) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                       <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <CheckCircle2 className="w-6 h-6 text-slate-300" />
                       </div>
                       <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">No New Inquiries</p>
                    </div>
                 )}
              </div>
              
              <Button onClick={() => navigate('/admin/bulk-email')} className="w-full mt-6 bg-slate-900 text-white hover:bg-slate-800 rounded py-6 text-xs font-bold flex items-center justify-center gap-2">
                 <Mail className="w-4 h-4" /> Send Bulk Email
              </Button>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
              { label: 'Manage Abstracts', icon: FileText, color: 'text-indigo-600', path: '/admin/abstracts' },
              { label: 'View Delegates', icon: Users, color: 'text-emerald-600', path: '/admin/registrations' },
              { label: 'System Settings', icon: Globe, color: 'text-blue-600', path: '/admin/settings' },
              { label: 'Venue & Logistics', icon: MapPin, color: 'text-rose-600', path: '/admin/venue' },
           ].map((action) => (
             <button 
               key={action.label} 
               onClick={() => navigate(action.path)}
               className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col items-center gap-3 hover:border-blue-600 hover:bg-blue-50/10 text-center"
             >
               <div className={`p-3 bg-slate-50 rounded ${action.color}`}>
                  <action.icon className="w-5 h-5" />
               </div>
               <h4 className="text-xs font-bold text-slate-900">{action.label}</h4>
             </button>
           ))}
        </div>
      </div>
    </AdminLayout>
  );
}
