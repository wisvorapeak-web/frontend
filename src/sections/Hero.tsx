import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Mic2, ArrowRight, Sparkles, Globe2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function Hero() {
  const [settings, setSettings] = useState<any>({
    site_title: 'ASFAA 2026: Food & Farming Summit',
    hero_title: 'ASFAA 2026: Food & Farming Summit',
    hero_tagline: 'ASFAA 2026: The future of food and farming.',
    hero_image_url: '/ai_digital_agri_dashboard_1774551431773.png',
    event_dates: 'November 18-20, 2026',
    global_reach: '50+ Countries',
    city: 'Singapore'
  });

  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', mins: '00', secs: '00' });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/hero`)
      .then(res => res.json())
      .then(data => {
         if (data && Object.keys(data).length > 0) {
            setSettings((prev: any) => ({
               ...prev,
               hero_title: data.title,
               hero_tagline: data.description,
               hero_image_url: data.bg_image_url,
            }));
         }
      })
      .catch(err => console.error('Hero fetch error:', err));

    // Social Proof interval
    const interval = setInterval(() => {
        const names = ['Dr. Sarah', 'Prof. Ahmed', 'John D.', 'Xiao Li', 'Maria G.', 'Dr. Raj'];
        const countries = ['USA', 'UAE', 'UK', 'China', 'Germany', 'India', 'Singapore'];
        const name = names[Math.floor(Math.random() * names.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        
        toast.success(`${name} from ${country} just signed up!`, {
            description: 'Come join us in Singapore!',
            duration: 4000,
            icon: <Sparkles className="w-4 h-4 text-blue" />
        });
    }, 45000);

    // Countdown logic
    const targetDate = new Date('2026-11-18T09:00:00').getTime();
    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if (diff < 0) {
            clearInterval(countdownTimer);
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
            days: d.toString().padStart(2, '0'),
            hours: h.toString().padStart(2, '0'),
            mins: m.toString().padStart(2, '0'),
            secs: s.toString().padStart(2, '0')
        });
    }, 1000);

    return () => {
        clearInterval(interval);
        clearInterval(countdownTimer);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-navy overflow-hidden font-outfit">
      {/* Background Section */}
      <div className="absolute inset-0 z-0 text-decoration-none">
        <img
          src={settings.hero_image_url || "/hero.png"}
          alt="Event Background"
          className="w-full h-full object-cover opacity-60 scale-110 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/40 to-navy pointer-events-none" />
      </div>

      <div className="relative z-20 w-full px-6 lg:px-16 xl:px-24 flex flex-col items-center justify-center h-full pt-20">
        <div className="max-w-6xl space-y-5 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">

          <div className="space-y-4 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl mb-2 group hover:bg-white/10 transition-all cursor-default shadow-2xl">
              <Sparkles className="w-4 h-4 text-blue animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] leading-none">Big Event 2026</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[0.95] tracking-tighter text-balance uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              {settings.hero_title || settings.site_title}
            </h1>
          </div>

          <p className="text-[10px] sm:text-[12px] font-bold text-white/50 leading-relaxed max-w-3xl mx-auto px-6 font-inter uppercase tracking-[0.3em] italic opacity-80 decoration-blue/40 decoration-2 underline-offset-[8px] underline">
            {settings.hero_tagline || settings.site_tagline}
          </p>

          {/* Countdown Bridge */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 py-6">
              {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.mins },
                  { label: 'Secs', value: timeLeft.secs }
              ].map((unit, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-blue/10 group-hover:border-blue/20 transition-all duration-500">
                          <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">{unit.value}</span>
                      </div>
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">{unit.label}</span>
                  </div>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 py-6 border-y border-white/5 w-full max-w-4xl backdrop-blur-[2px] rounded-3xl mt-2">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-700 shadow-xl border border-white/10 group-hover:rotate-12">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-white/30 font-black leading-none uppercase tracking-[0.3em]">Dates</p>
                <p className="font-black text-[12px] text-white tracking-tight uppercase">{settings.event_dates || 'November 18-20, 2026'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 group border-x border-white/5 px-12">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-700 shadow-xl border border-white/10 group-hover:-rotate-12">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-white/30 font-black leading-none uppercase tracking-[0.3em]">Venue</p>
                <p className="font-black text-[12px] text-white tracking-tight uppercase">{settings.city || 'Singapore'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all duration-700 shadow-xl border border-white/10 group-hover:scale-110">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-white/30 font-black leading-none uppercase tracking-[0.3em]">Around the World</p>
                <p className="font-black text-[12px] text-white tracking-tight uppercase">{settings.global_reach || '50+ Countries'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6 pb-10">
            <Link to="/registration" className="w-full sm:w-auto text-decoration-none">
              <Button className="w-full h-12 px-10 bg-blue hover:bg-white hover:text-navy text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-xl transition-all shadow-[0_20px_40px_rgba(59,130,246,0.3)] active:scale-95 group text-decoration-none">
                Register Now <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link to="/abstract-submission" className="w-full sm:w-auto text-decoration-none">
              <Button variant="ghost" className="w-full h-12 px-10 border-2 border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-xl hover:bg-white/5 transition-all active:scale-95 bg-white/5 backdrop-blur-3xl text-decoration-none flex items-center justify-center gap-3">
                <Mic2 className="w-5 h-5 opacity-40 group-hover:opacity-100" /> Send Your Research
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-bounce">
        <Clock className="w-4 h-4 text-white" />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </section>
  );
}
