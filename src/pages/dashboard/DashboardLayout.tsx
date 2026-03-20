import { useState, type ReactNode } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  History, 
  User, 
  Settings, 
  FileText, 
  LogOut, 
  Bell, 
  Search,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/overview' },
  { icon: Calendar, label: 'Upcoming Events', path: '/dashboard/events' },
  { icon: History, label: 'Past Registrations', path: '/dashboard/registrations' },
  { icon: FileText, label: 'My Abstracts', path: '/dashboard/abstracts' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Just navigate home for now
    navigate('/');
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 w-64 bg-navy z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-full flex flex-col p-6 overflow-y-auto scrollbar-none">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-10 group flex-none">
            <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-blue/20">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <div className="text-white">
              <p className="font-bold text-lg leading-tight tracking-tight">Wisvora</p>
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Scientific</p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-blue text-white shadow-lg shadow-blue/20 translate-x-1' 
                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:translate-x-1'}
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'scale-110' : ''}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-400/10 transition-all mt-6 group flex-none"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sm:px-10 flex-none z-30">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-navy hover:bg-gray-100 rounded-xl"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl text-sm w-72 transition-all focus:ring-0 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:text-blue hover:bg-blue/5 transition-all shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>
            
            <Link to="/dashboard/profile" className="flex items-center gap-3 pl-4 border-l border-gray-100 group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-navy group-hover:text-blue transition-colors">Dr. Anand Verma</p>
                <p className="text-[10px] text-gray-400 font-medium">Research Fellow</p>
              </div>
              <Avatar className="w-11 h-11 border-2 border-white shadow-md ring-1 ring-gray-100 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-blue text-white font-bold">AV</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Dynamic Content - This is the only part that scrolls */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <main className="p-6 sm:p-10 max-w-[1600px] mx-auto min-h-full">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
