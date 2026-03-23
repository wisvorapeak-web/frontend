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
  { label: 'Research Rules', href: '/abstract-submission' },
  { label: 'Program', href: '/program' },
  { label: 'Visa', href: '/venue' },
  { label: 'Guides', href: '/brochure' },
  { label: 'Sponsorship', href: '/sponsorship' },
  { label: 'Media', href: '/contact' },
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
            <Link to="/" className="inline-block hover:scale-105 active:scale-95 transition-all">
              <img src="/logo.png" alt="Ascendix Summits" className="h-16 md:h-20 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-sm font-medium text-white/40 leading-loose">
              {settings?.site_tagline || 'Leading the future of food and agriculture.'}
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
            <h4 className="text-xs font-bold text-blue mb-8">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-blue mb-8">Resources</h4>
            <ul className="space-y-4">
              {resources.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-bold text-blue mb-8">Newsletter</h4>
            <form className="space-y-3">
              <input type="email" placeholder="Email Address" className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-blue transition-all" />
              <button className="w-full h-12 bg-blue text-white text-sm font-bold rounded-xl hover:bg-white hover:text-navy transition-all">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-white/20">
            © 2026 {settings?.site_title || 'Ascendix Summits'}. All rights reserved. Registered in India.
          </p>
          <div className="flex gap-8">
            {[
              { label: 'Privacy', slug: 'privacy' },
              { label: 'Terms', slug: 'terms' },
              { label: 'Cookies', slug: 'cookies' }
            ].map((t) => (
              <Link key={t.slug} to={`/legal/${t.slug}`} className="text-xs font-medium text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]">{t.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
