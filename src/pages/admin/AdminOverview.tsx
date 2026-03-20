import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Activity, 
  Clock,
  CheckCircle2,
  Mail
} from 'lucide-react';


export default function AdminOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [adminStats, setAdminStats] = useState({
    totalRegistrations: 0,
    abstractsSubmitted: 0,
    totalRevenue: '$0',
    activeSessions: 0,
    recentInquiries: [],
    chartData: [40, 60, 30, 80, 50, 70, 90]
  });

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}` }
        });
        if (res.ok) setAdminStats(await res.json());
      } catch (err) {
        console.error('Admin Stats Fetch Failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  const displayStats = [
    { label: 'Registrations', value: adminStats.totalRegistrations.toLocaleString(), change: '+12%', icon: Users },
    { label: 'Abstracts', value: adminStats.abstractsSubmitted.toLocaleString(), change: '+8%', icon: FileText },
    { label: 'Revenue', value: adminStats.totalRevenue, change: '+24%', icon: CreditCard },
    { label: 'Active Sessions', value: adminStats.activeSessions.toString(), change: '-3%', icon: Activity },
  ];

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading Dashboard...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
              <Activity className="w-3 h-3 text-blue" />
              <span className="text-xs font-bold text-blue">Real-time Metrics</span>
            </div>
            <h1 className="text-4xl font-bold text-navy leading-none text-outfit">Admin <span className="text-blue">Dashboard</span></h1>
          </div>
          <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
            <Clock className="w-4 h-4 text-slate-300" />
            <div>
              <p className="text-xs font-bold text-slate-400 leading-none">Last Updated</p>
              <p className="text-xs font-bold text-navy mt-1">Active Now</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => (
            <div key={stat.label} className="p-8 border border-slate-100 rounded-2xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all space-y-6">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue opacity-40">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-blue px-2 py-0.5 bg-blue/5 rounded-full">{stat.change}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400">{stat.label}</p>
                <h3 className="text-3xl font-bold text-navy">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Traffic */}
          <div className="lg:col-span-2 p-10 border border-slate-100 rounded-3xl space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy">System <span className="text-blue">Activity</span></h3>
              <div className="flex gap-2">
                {['D', 'W', 'M'].map(t => (
                  <button key={t} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${t === 'W' ? 'bg-blue text-white' : 'text-slate-400 hover:bg-slate-50'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end gap-3 pt-6">
              {adminStats.chartData.map((val, i) => (
                <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-slate-50 group-hover:bg-blue/10 rounded-lg transition-all relative overflow-hidden"
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute inset-0 bg-navy opacity-5 group-hover:opacity-20 transition-all" />
                    <div className="absolute bottom-0 w-full bg-blue rounded-t-lg transition-all duration-700" style={{ height: '30%' }} />
                  </div>
                  <p className="mt-4 text-[10px] font-bold text-slate-300 text-center">Period {i+1}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Communications */}
          <div className="p-10 bg-navy rounded-3xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue">
                <Mail className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-bold text-white">Direct <span className="text-blue">Inbox</span></h3>
            </div>
            
            <div className="space-y-4">
              {adminStats.recentInquiries.length > 0 ? adminStats.recentInquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-3 hover:bg-white/10 transition-all cursor-pointer">
                  <p className="text-sm font-bold text-white truncate">{inquiry.name}</p>
                  <p className="text-xs font-bold text-white/30 leading-relaxed line-clamp-1">{inquiry.subject}</p>
                </div>
              )) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-white/10" />
                  </div>
                  <p className="text-xs font-bold text-white/20">Empty Queue</p>
                </div>
              )}
            </div>
            
            <button className="w-full h-14 bg-blue text-white text-sm font-bold rounded-2xl hover:bg-white hover:text-navy transition-all">
              Open Inbox
            </button>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'User Management', sub: 'Manage Scientists', icon: Users, color: 'text-blue', path: '/admin/users' },
            { label: 'Abstract Review', sub: 'Review Submissions', icon: CheckCircle2, color: 'text-indigo-600', path: '/admin/abstracts' },
            { label: 'Financial Overview', sub: 'Payment History', icon: CreditCard, color: 'text-emerald-600', path: '/admin/registrations' },
          ].map((action, i) => (
            <button 
              key={i} 
              onClick={() => navigate(action.path)}
              className="p-10 border border-slate-100 rounded-3xl flex items-center gap-8 hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all text-left group"
            >
              <div className={`w-12 h-12 bg-slate-50 ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-navy">{action.label}</h4>
                <p className="text-xs font-bold text-slate-400">{action.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
