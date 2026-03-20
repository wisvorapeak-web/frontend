import { 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Topics', href: '/topics' },
  { label: 'Dates', href: '/dates' },
  { label: 'Registration', href: '/registration' },
  { label: 'Venue', href: '/venue' },
  { label: 'Contact', href: '/contact' },
];

const resources = [
  { label: 'Abstract Guidelines', href: '#' },
  { label: 'Presentation Templates', href: '#' },
  { label: 'Visa Information', href: '#' },
  { label: 'Accommodation', href: '#' },
  { label: 'Sponsorship', href: '#' },
  { label: 'Media Kit', href: '#' },
];

export default function Footer() {
  const location = useLocation();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/settings`);
        if (res.ok) setSettings(await res.json());
      } catch (err) {
        console.error('Failed to fetch footer settings:', err);
      }
    };
    fetchSettings();
  }, []);

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')) return null;

  const socialLinks = [
    { icon: Linkedin, href: settings?.linkedin_url || '#', label: 'LinkedIn' },
    { icon: Twitter, href: settings?.twitter_url || '#', label: 'Twitter' },
    { icon: Facebook, href: settings?.facebook_url || '#', label: 'Facebook' },
    { icon: Instagram, href: settings?.instagram_url || '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-navy py-20 overflow-hidden border-t border-white/5 font-outfit">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
              {settings?.site_title?.split(' ')[0] || 'WISVORA'} <span className="text-blue">{settings?.site_title?.split(' ')[1] || 'PEAK'}</span> 
            </h3>
            <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest leading-loose">
              {settings?.site_tagline || 'Pioneering the future of Sustainable Agriculture and Food Technology.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 hover:bg-blue hover:text-white transition-all transform hover:-translate-y-1">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-blue uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-blue uppercase tracking-[0.3em] mb-8">Resources</h4>
            <ul className="space-y-4">
              {resources.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-xs font-black text-white/50 hover:text-white uppercase tracking-widest transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-blue uppercase tracking-[0.3em] mb-8">Newsletter</h4>
            <form className="space-y-3">
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-[10px] font-black text-white placeholder:text-white/20 focus:outline-none focus:border-blue transition-all" />
              <button className="w-full h-12 bg-blue text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-navy transition-all">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
            © 2026 WISVORA PEAK PRIVATE LIMITED. 
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms', 'Cookies'].map((t) => (
              <a key={t} href="#" className="text-[9px] font-black text-white/20 hover:text-white uppercase tracking-widest transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
