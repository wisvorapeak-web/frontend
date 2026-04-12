import { 
  Linkedin, 
  Twitter, 
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Topics', href: '/#topics' },
  { label: 'Dates', href: '/dates' },
  { label: 'Registration', href: '/registration' },
  { label: 'Venue', href: '/venue' },
  { label: 'Contact', href: '/contact' },
];

const resources = [
  { label: 'Send Research', href: '/abstract-submission' },
  { label: 'Schedule', href: '/program' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Downloads', href: '/brochures' },
  { label: 'Partners', href: '/sponsorship' },
];

export default function Footer() {
  const location = useLocation();
  const [settings, setSettings] = useState<any>({
    site_tagline: 'Leading the future of food and farming.',
    site_title: 'ASFAA 2026',
    contact_email: 'contact@foodagriexpo.com',
    support_emails: [
      'conference@foodagriexpo.com',
      'foodtech@foodagriexpo.com',
      'agritech@foodagriexpo.com'
    ],
    contact_phone: '+65 6123 4567',
    contact_address: 'Singapore Innovation Hub',
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`)
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length > 0) {
           setSettings(data);
        }
      })
      .catch(err => console.error('Footer sync error:', err));
  }, []);

  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')) return null;

  const socialLinks = [
    { icon: Linkedin, href: settings?.linkedin_url || '#', label: 'LinkedIn' },
    { icon: Twitter, href: settings?.twitter_url || '#', label: 'Twitter' },
    { icon: Facebook, href: settings?.facebook_url || '#', label: 'Facebook' },
    { icon: Instagram, href: settings?.instagram_url || '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-navy font-outfit">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity group">
               <img 
                 src="/logo.png" 
                 alt={settings?.site_title || "Ascendix Summit"} 
                 className="h-12 w-auto object-contain brightness-0 invert transition-all group-hover:scale-105" 
               />
            </Link>
            <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase tracking-widest italic">
              Helping the world grow better food and farm animals through research.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <a href={`mailto:${settings?.contact_email || 'contact@foodagriexpo.com'}`} className="flex items-center gap-2 text-[9px] font-bold text-white/30 hover:text-blue transition-colors uppercase tracking-wider">
                <Mail className="w-3 h-3" /> {settings?.contact_email || 'contact@foodagriexpo.com'}
              </a>
              <a href={`tel:${settings?.contact_phone || '+65 6123 4567'}`} className="flex items-center gap-2 text-[9px] font-bold text-white/30 hover:text-blue transition-colors uppercase tracking-wider">
                <Phone className="w-3 h-3" /> {settings?.contact_phone || '+65 6123 4567'}
              </a>
              <p className="flex items-center gap-2 text-[9px] font-bold text-white/20 uppercase tracking-wider">
                <MapPin className="w-3 h-3" /> {settings?.contact_address || 'Singapore Innovation Hub'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[9px] font-black text-blue mb-5 uppercase tracking-[0.4em]">Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[10px] font-bold text-white/35 hover:text-white transition-colors uppercase tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[9px] font-black text-blue mb-5 uppercase tracking-[0.4em]">Resources</h4>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[10px] font-bold text-white/35 hover:text-white transition-colors uppercase tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-5">
            <h4 className="text-[9px] font-black text-blue mb-5 uppercase tracking-[0.4em]">Connect</h4>
            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/30 hover:bg-blue hover:text-white transition-all border border-white/5 hover:shadow-lg hover:shadow-blue/20">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            <div className="space-y-2 pt-2">
              <Link to="/privacy-policy" className="flex items-center gap-2 text-[9px] font-bold text-white/20 hover:text-blue transition-colors uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 opacity-40" /> Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="flex items-center gap-2 text-[9px] font-bold text-white/20 hover:text-blue transition-colors uppercase tracking-wider">
                <Scale className="w-3" /> Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
           <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">
               © 2026 {settings?.site_title || 'ASFAA-2026'}. All Rights Reserved.
           </p>
           <p className="text-[8px] font-bold text-white/10 uppercase tracking-wider">
              Registered in Singapore
           </p>
        </div>
      </div>
    </footer>
  );
}
