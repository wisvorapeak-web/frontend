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
  Download,
  Info,
  Zap
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const navLinks = [
  { label: 'Home', href: '/' },
  { 
    label: 'About', 
    href: '/about',
    subItems: [
        { label: 'About the Event', href: '/about', icon: Info },
        { label: 'Organizers', href: '/organizers', icon: Users },
        { label: 'Key Dates', href: '/dates', icon: Calendar },
        { label: 'Venue & Travel', href: '/venue', icon: MapPin },
    ]
  },
  { 
    label: 'The Event', 
    href: '/speakers',
    subItems: [
        { label: 'Our Speakers', href: '/speakers', icon: Mic2 },
        { label: 'Event Schedule', href: '/program', icon: Monitor },
        { label: 'Talk Areas', href: '/sessions', icon: Zap },
        { label: 'Submit Your Talk', href: '/abstract-submission', icon: FileText },
    ]
  },
  { 
    label: 'Sponsors', 
    href: '/sponsorship',
    subItems: [
        { label: 'Sponsorship', href: '/sponsorship', icon: Trophy },
        { label: 'Expo Brochure', href: '/brochure', icon: Download },
    ]
  },
  { label: 'Contact', href: '/contact' },
];

// Abstract Form Component
const AbstractForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    topic: '',
    title: '',
    abstract: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/submissions/abstract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          institution: formData.institution,
          topic: formData.topic,
          title: formData.title,
          abstractText: formData.abstract
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Your talk details have been sent for review.');
      setFormData({
        firstName: '', lastName: '', email: '', institution: '', topic: '', title: '', abstract: ''
      });
    } catch (error) {
      toast.error('Failed to send. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">First Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="JOHN" 
            required 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Name</Label>
          <Input 
            className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
            placeholder="DOE" 
            required 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
          type="email" 
          placeholder="EMAIL@UNIVERSITY.EDU" 
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</Label>
        <Select onValueChange={(val) => setFormData({...formData, topic: val})}>
          <SelectTrigger className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest">
            <SelectValue placeholder="SELECT CATEGORY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crop-science" className="text-[10px] font-black uppercase">Crop Science & Genetics</SelectItem>
            <SelectItem value="food-safety" className="text-[10px] font-black uppercase">Food Safety & Quality</SelectItem>
            <SelectItem value="animal-health" className="text-[10px] font-black uppercase">Animal Health & Nutrition</SelectItem>
            <SelectItem value="agri-iot" className="text-[10px] font-black uppercase">Agri-IoT & Automation</SelectItem>
            <SelectItem value="sustainable-farming" className="text-[10px] font-black uppercase">Sustainable Farming</SelectItem>
            <SelectItem value="bio-engineering" className="text-[10px] font-black uppercase">Bio-resource Engineering</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Title of Your Talk</Label>
        <Input 
          className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
          placeholder="ENTER RESEARCH TITLE" 
          required 
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Short Description</Label>
        <Textarea 
          className="bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all min-h-[120px]"
          placeholder="TELL US ABOUT YOUR WORK..." 
          required 
          value={formData.abstract}
          onChange={(e) => setFormData({...formData, abstract: e.target.value})}
        />
      </div>

      <Button type="submit" className="w-full h-12 bg-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-navy transition-all" disabled={isSubmitting}>
        {isSubmitting ? 'SENDING...' : 'SUBMIT YOUR TALK'}
      </Button>
    </form>
  );
};

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

  return (
    <>
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled || !isHomePage
            ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-navy/5 py-2' 
            : 'bg-transparent py-3'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className={`text-lg font-black transition-all font-montserrat tracking-tighter hover:scale-105 active:scale-95 ${isScrolled || !isHomePage ? 'text-navy' : 'text-white'}`}
            >
              ASCENDIX <span className="text-blue">SUMMITS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.subItems ? (
                  <DropdownMenu key={link.label}>
                    <DropdownMenuTrigger className={`
                      flex items-center gap-1 text-[11px] font-black uppercase tracking-widest transition-all outline-none group font-montserrat
                      ${isScrolled || !isHomePage ? 'text-navy hover:text-indigo-600' : 'text-white/70 hover:text-white'}
                    `}>
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-100 transition-all group-data-[state=open]:rotate-180" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 p-2 bg-white/95 backdrop-blur-xl rounded-[1.5rem] border-slate-100 shadow-2xl shadow-indigo-600/10 animate-in fade-in duration-300">
                      {link.subItems.map((sub) => (
                        <DropdownMenuItem key={sub.label} asChild className="mb-0.5 last:mb-0 focus:bg-indigo-50 rounded-xl p-0">
                          <Link to={sub.href} className="flex items-center gap-3 py-2.5 px-4 w-full cursor-pointer">
                            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                              <sub.icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{sub.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.href}
                    className={({ isActive }) => `
                      text-[11px] font-black transition-all uppercase tracking-[0.15em] font-montserrat
                      ${isScrolled || !isHomePage ? 'text-navy hover:text-indigo-600' : 'text-white/70 hover:text-white'}
                      ${isActive ? 'text-indigo-600' : ''}
                    `}
                  >
                    {link.label}
                  </NavLink>
                )
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`
                      ${isScrolled || !isHomePage
                        ? 'text-navy hover:text-blue hover:bg-blue/10' 
                        : 'text-white hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Your Talk
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-navy">Submit Your Talk</DialogTitle>
                  </DialogHeader>
                  <AbstractForm />
                </DialogContent>
              </Dialog>

              <Button 
                asChild
                className="bg-blue hover:bg-blue-600 text-white"
              >
                <Link to="/registration">Register Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-lg transition-colors
                ${isScrolled || !isHomePage ? 'text-navy hover:bg-gray-100' : 'text-white hover:bg-white/10'}
              `}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-300
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div 
          className={`
            absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl
            transform transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="p-6 pt-20">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-1">
                   {link.subItems ? (
                      <>
                        <div className="py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50 mb-2 mt-4 ml-1">
                           {link.label}
                        </div>
                        {link.subItems.map((sub) => (
                          <NavLink
                            key={sub.label}
                            to={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) => `
                              flex items-center gap-4 py-3 px-4 text-sm font-bold text-navy hover:text-indigo-600 transition-all rounded-2xl hover:bg-slate-50
                              ${isActive ? 'bg-indigo-50 text-indigo-600' : ''}
                            `}
                          >
                            <sub.icon className="w-5 h-5 opacity-40" />
                            {sub.label}
                          </NavLink>
                        ))}
                      </>
                   ) : (
                    <NavLink
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        block py-4 px-4 text-sm font-black uppercase tracking-widest text-navy hover:text-indigo-600 transition-all border-b border-slate-50
                        ${isActive ? 'text-indigo-600' : ''}
                      `}
                    >
                      {link.label}
                    </NavLink>
                   )}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Submit Abstract
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-navy">Submit Your Talk</DialogTitle>
                  </DialogHeader>
                  <AbstractForm />
                </DialogContent>
              </Dialog>

              <Button 
                asChild
                className="w-full bg-blue hover:bg-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/registration">Register Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
