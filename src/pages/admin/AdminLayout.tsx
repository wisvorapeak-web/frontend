import { useState, useEffect, type ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  FileCheck, 
  CreditCard, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu,
  Rocket,
  MapPin,
  Mic2,
  Tag,
  BookOpen,
  Globe,
  FileText,
  LayoutDashboard,
  ChevronRight,
  Send,
  Users,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin/overview' },
  { icon: FileCheck, label: 'Abstracts', path: '/admin/abstracts' },
  { icon: Mic2, label: 'Speakers', path: '/admin/speakers' },
  { icon: CreditCard, label: 'Registrations', path: '/admin/registrations' },
  { icon: AlertTriangle, label: 'Failed Payments', path: '/admin/failed-payments' },
  { icon: Tag, label: 'Pricing', path: '/admin/pricing' },
  { icon: BookOpen, label: 'Brochures', path: '/admin/brochures' },
  { icon: Mail, label: 'Inbox', path: '/admin/inbox' },
  { icon: Send, label: 'Send Emails', path: '/admin/bulk-email' },
  { icon: Rocket, label: 'Sponsors', path: '/admin/sponsors' },
  { icon: FileText, label: 'Content', path: '/admin/content' },
  { icon: Globe, label: 'Topics', path: '/admin/topics' },
  { icon: MapPin, label: 'Venue', path: '/admin/venue' },
  { icon: Calendar, label: 'Schedule', path: '/admin/events' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: Users, label: 'Team', path: '/admin/users' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ totalRegistrations: 0, totalRevenue: '$0' });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`, {
          credentials: 'include'
        });
        if (res.ok) {
           const data = await res.json();
           setStats({
             totalRegistrations: data.totalRegistrations,
             totalRevenue: data.totalRevenue
           });
        }
      } catch (err) {
        console.error('Failed to sync workspace stats:', err);
      }
    };
    fetchGlobalStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden font-inter text-slate-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 transition-transform duration-300 lg:translate-x-0 border-r border-slate-800
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          
          {/* Logo Section */}
          <div className="p-6 border-b border-slate-800 mb-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                   <img src="/logo.png" alt="ASFAA" className="h-4 w-auto brightness-0 invert" />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">Ascendix</h2>
              </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1">
            <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Management</p>
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Profile / Logout footer */}
          <div className="p-4 border-t border-slate-800">
             <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-rose-600 hover:text-white text-sm font-medium"
             >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:pl-64 transition-all duration-300">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
               Admin Panel <ChevronRight className="w-3 h-3" /> Dashboard
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 px-6 border-r border-slate-100">
               <div className="text-right">
                 <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Earnings</p>
                 <p className="text-sm font-bold text-slate-900">{stats.totalRevenue}</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Registrations</p>
                 <p className="text-sm font-bold text-slate-900">{stats.totalRegistrations}</p>
               </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 rounded border border-slate-200">
                <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                   {user?.name?.split(' ').map((n: any) => n?.[0] || '').join('') || 'AD'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                 <p className="text-xs font-bold text-slate-900 leading-none">{user?.name || 'Administrator'}</p>
                 <p className="text-[10px] text-slate-400 mt-1">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-6 lg:p-10 max-w-7xl mx-auto min-h-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
