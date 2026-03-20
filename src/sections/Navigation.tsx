import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  FileText, 
  ChevronDown,
  Users,
  Calendar,
  Mic2,
  Monitor,
  Trophy,
  MapPin,
  Info,
  Zap,
  Award,
  Rocket,
  Building2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Home', href: '/' },
  { 
    label: 'About', 
    href: '/about',
    subItems: [
        { label: 'About the Event', href: '/about', icon: Info },
        { label: 'Organizers', href: '/organizers', icon: Users },
        { label: 'Conference Chairs', href: '/chairs', icon: Award },
        { label: 'Key Dates', href: '/dates', icon: Calendar },
        { label: 'Venue & Travel', href: '/venue', icon: MapPin },
    ]
  },
  { 
    label: 'Event', 
    href: '/speakers',
    subItems: [
        { label: 'Honoured Speakers', href: '/speakers', icon: Mic2 },
        { label: 'Event Program', href: '/program', icon: Monitor },
        { label: 'Talk Areas', href: '/sessions', icon: Zap },
        { label: 'Workshops', href: '/workshops', icon: Rocket },
    ]
  },
  { 
    label: 'Partners', 
    href: '/sponsorship',
    subItems: [
        { label: 'Sponsorship', href: '/sponsorship', icon: Trophy },
        { label: 'Exhibitors', href: '/sponsorship#exhibitors', icon: Building2 },
        { label: 'Journal Collaborations', href: '/journals', icon: FileText },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/dashboard')) return null;

  const NavItem = ({ link, scrolled, home }: any) => {
    if (link.subItems) {
      return (
        <DropdownMenu key={link.label}>
          <DropdownMenuTrigger className={`
            flex items-center gap-1 text-sm font-semibold transition-all outline-none group
            ${scrolled || !home ? 'text-navy hover:text-indigo-600' : 'text-white/70 hover:text-white'}
          `}>
            {link.label}
            <ChevronDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-all group-data-[state=open]:rotate-180" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 bg-white/95 backdrop-blur-xl rounded-[1.5rem] border-slate-100 shadow-2xl shadow-indigo-600/10 animate-in fade-in duration-300">
            {link.subItems.map((sub: any) => (
              <DropdownMenuItem key={sub.label} asChild className="mb-0.5 last:mb-0 focus:bg-indigo-50 rounded-xl p-0">
                <Link to={sub.href} className="flex items-center gap-3 py-2.5 px-4 w-full cursor-pointer">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                    <sub.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{sub.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <NavLink
        key={link.label}
        to={link.href}
        className={({ isActive }) => `
          text-sm font-semibold transition-all
          ${scrolled || !home ? 'text-navy hover:text-indigo-600' : 'text-white/70 hover:text-white'}
          ${isActive ? 'text-indigo-600 font-bold' : ''}
        `}
      >
        {link.label}
      </NavLink>
    );
  };

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled || !isHomePage
            ? 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-navy/5 py-4 border-b border-white/20' 
            : 'bg-transparent py-6'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              <img 
                src="/logo.png" 
                alt="Ascendix Summits" 
                className={`h-8 sm:h-10 md:h-12 w-auto object-contain transition-all ${isScrolled || !isHomePage ? '' : 'brightness-0 invert'}`} 
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 ml-auto">
              {navLinks.map((link) => (
                <NavItem key={link.label} link={link} scrolled={isScrolled} home={isHomePage} />
              ))}
              <Button asChild className="bg-blue hover:bg-blue-600 text-white h-10 px-6 rounded-xl font-bold shadow-lg shadow-blue/20">
                <Link to="/registration">Register Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-xl transition-colors
                ${isScrolled || !isHomePage ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'}
              `}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 z-[60] lg:hidden transition-all duration-500
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        
        {/* Menu Panel */}
        <div className={`
          absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-white shadow-2xl
          transform transition-transform duration-500 ease-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="p-6 flex items-center justify-between border-b border-gray-50 bg-slate-50/50">
             <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-navy hover:bg-white rounded-xl transition-colors">
                <X className="w-6 h-6" />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
            <div className="space-y-4">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-2">
                   {link.subItems ? (
                      <div className="space-y-2">
                        <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                           {link.label}
                        </div>
                        <div className="grid gap-1">
                          {link.subItems.map((sub: any) => (
                            <NavLink
                              key={sub.label}
                              to={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) => `
                                flex items-center gap-4 py-3 px-4 text-xs font-bold text-navy hover:text-blue transition-all rounded-xl hover:bg-blue/5
                                ${isActive ? 'bg-blue/5 text-blue' : ''}
                              `}
                            >
                              <sub.icon className="w-4 h-4 opacity-40 shrink-0" />
                              {sub.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                   ) : (
                    <NavLink
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        block py-4 px-4 text-sm font-bold text-navy hover:text-blue transition-all border-b border-gray-50
                        ${isActive ? 'text-blue' : ''}
                      `}
                    >
                      {link.label}
                    </NavLink>
                   )}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild className="w-full h-14 bg-blue hover:bg-navy text-white font-bold rounded-2xl shadow-xl shadow-blue/20" onClick={() => setIsMobileMenuOpen(false)}>
                <Link to="/registration">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
