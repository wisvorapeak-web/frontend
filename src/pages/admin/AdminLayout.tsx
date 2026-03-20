import { useState, useEffect, type ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileCheck, 
  CreditCard, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  { icon: BarChart3, label: 'Performance', path: '/admin/overview' },
  { icon: Users, label: 'User Directory', path: '/admin/users' },
  { icon: FileCheck, label: 'Abstract Review', path: '/admin/abstracts' },
  { icon: CreditCard, label: 'Financials', path: '/admin/registrations' },
  { icon: Mail, label: 'Communication Hub', path: '/admin/inbox' },
  { icon: Calendar, label: 'Summit Manager', path: '/admin/events' },
  { icon: Settings, label: 'System Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ totalRegistrations: 0, totalRevenue: '₹0' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}` }
        });
        if (res.ok) {
          const data = await res.json();
          setStats({
            totalRegistrations: data.totalRegistrations,
            totalRevenue: data.totalRevenue
          });
        }
      } catch (err) {
        console.error('Failed to fetch global stats:', err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden font-inter">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 w-64 bg-navy z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:flex-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto">
          {/* Identity */}
          <Link to="/" className="flex items-center gap-4 mb-12 px-2 group hover:scale-105 active:scale-95 transition-all">
            <img src="/logo.png" alt="Ascendix Summits" className="h-8 w-auto object-contain brightness-0 invert" />
            <div>
              <p className="text-[10px] text-white/30 font-bold">Admin Panel</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            <p className="text-xs font-bold text-white/20 mb-4 ml-2">Navigation</p>
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all group
                  ${isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-blue' : 'group-hover:text-blue'}`} />
                    <span className="font-bold text-xs">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sign Out */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-4 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all mt-6 font-bold text-xs"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-slate-400"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-6 py-2 bg-slate-50 border-transparent focus:bg-white focus:border-blue transition-all rounded-lg text-xs font-bold w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-300 leading-none">Global Registrations</p>
                <p className="text-xs font-bold text-navy mt-1">{(stats.totalRegistrations / 1000).toFixed(1)}K</p>
              </div>
              <div className="w-px h-6 bg-slate-100" />
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-300 leading-none">Revenue</p>
                <p className="text-xs font-bold text-blue mt-1">{stats.totalRevenue}</p>
              </div>
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-blue hover:bg-blue/5 transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-navy leading-none">{user?.full_name || 'Admin'}</p>
                <p className="text-[10px] text-slate-300 font-bold mt-1">{user?.role || 'Administrator'}</p>
              </div>
              <Avatar className="w-10 h-10 border border-slate-100">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.full_name || 'Admin'}`} />
                <AvatarFallback className="bg-slate-100 text-slate-400 text-[10px] font-black">
                   {user?.full_name?.split(' ').map((n: any) => n[0]).join('') || 'AD'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
