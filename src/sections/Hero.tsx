import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Mic2, ArrowRight, Sparkles, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [settings] = useState<any>({
    site_title: 'Ascendix Summit on Food, Agri-Tech and Animal Science',
    site_tagline: 'ASFAA-2026: Join leaders in food and agriculture.',
    hero_title: 'Ascendix Summit on Food, Agri-Tech and Animal Science',
    hero_tagline: 'Join experts in Singapore for a major scientific meeting.',
    hero_image_url: '/hero.png',
    event_dates: 'November 18-20, 2026',
    global_reach: '50+ Countries'
  });
  const [venue] = useState<any>({
    venue_name: 'Singapore',
    city: 'Singapore',
    country: 'Singapore'
  });

  useEffect(() => {
    // Static mode: no fetch
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-navy overflow-hidden font-outfit">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 text-decoration-none">
        <img
          src={settings.hero_image_url || "/hero.png"}
          alt="Event Background"
          className="w-full h-full object-cover opacity-80 scale-110 transition-transform duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-navy/20 pointer-events-none" />
      </div>

      <div className="relative z-20 w-full px-6 lg:px-16 xl:px-24 flex flex-col items-center justify-center h-full pt-20">
        <div className="max-w-5xl space-y-4 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          <div className="space-y-2 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue/10 border border-blue/20 rounded-full backdrop-blur-xl mb-2 group hover:bg-blue/20 transition-all cursor-default shadow-2xl shadow-blue/10">
               <Sparkles className="w-3 h-3 text-blue animate-pulse" />
               <span className="text-[8px] font-black text-white uppercase tracking-[0.3em] leading-none">Global Event 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter text-balance uppercase drop-shadow-2xl">
              {settings.hero_title || settings.site_title}
            </h1>
          </div>

          <p className="text-[10px] sm:text-[12px] font-black text-white/50 leading-relaxed max-w-2xl mx-auto px-6 font-inter uppercase tracking-[0.2em] italic opacity-80 decoration-blue/20 decoration-1 underline-offset-[6px] underline">
            {settings.hero_tagline || settings.site_tagline}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8 border-y border-white/5 w-full max-w-3xl backdrop-blur-[2px] rounded-2xl mt-4">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 shadow-xl border border-white/10">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[6.5px] text-white/30 font-black leading-none uppercase tracking-widest">Dates</p>
                <p className="font-black text-[10px] text-white tracking-tight uppercase">{settings.event_dates || 'November 18-20, 2026'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 group border-x border-white/5 px-8">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 shadow-xl border border-white/10">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[7px] text-white/30 font-black leading-none uppercase tracking-widest">City</p>
                <p className="font-black text-[11px] text-white tracking-tight uppercase">{venue.city || 'Singapore'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 group">
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-500 shadow-xl border border-white/10">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[7px] text-white/30 font-black leading-none uppercase tracking-widest">Global Reach</p>
                <p className="font-black text-[11px] text-white tracking-tight uppercase">{settings.global_reach || '50+ Countries'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <Link to="/registration" className="w-full sm:w-auto text-decoration-none">
               <Button className="w-full h-12 px-12 bg-blue hover:bg-white hover:text-navy text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-lg transition-all shadow-2xl shadow-blue/20 active:scale-95 group text-decoration-none">
                Register Now <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/abstract-submission" className="w-full sm:w-auto text-decoration-none">
              <Button variant="ghost" className="w-full h-12 px-12 border border-white/10 text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-lg hover:bg-white/5 transition-all active:scale-95 bg-white/5 backdrop-blur-md text-decoration-none">
                Submit Research <Mic2 className="w-4 h-4 ml-3 opacity-50" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 animate-bounce">
         <div className="w-px h-10 bg-gradient-to-b from-transparent via-white to-transparent" />
         <span className="text-[6px] font-black text-white uppercase tracking-[0.5em] rotate-90">Scroll Down</span>
      </div>
    </section>
  );
}
