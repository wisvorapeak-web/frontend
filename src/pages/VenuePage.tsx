import PageLayout from './PageLayout';
import { MapPin, Hotel, ExternalLink, Plane, CheckCircle2, Globe, Palmtree } from 'lucide-react';
import { Link } from 'react-router-dom';

import VenueGallery from '../sections/VenueGallery';

import { useState, useEffect } from 'react';

export default function VenuePage() {
  const [venue, setVenue] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/venue`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.json())
    ]).then(([vData, sData]) => {
      setVenue(vData);
      setSettings(sData);
    }).catch(err => console.error('Failed to fetch venue info:', err));
  }, []);

  return (
    <PageLayout 
      title="Venue" 
      subtitle={settings?.site_tagline || "Experience the culture of Singapore during the summit."}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-16 pb-12 font-outfit">
        
        {/* Main Venue Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div className="space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <MapPin className="w-3.5 h-3.5 text-blue" />
                 <span className="text-[10px] font-black text-blue uppercase tracking-widest">{venue?.host_city || 'Singapore'}</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-black text-navy leading-tight uppercase tracking-tight">{venue?.venue_name || 'Event Venue'}</h2>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed whitespace-pre-wrap italic">
                 {venue?.venue_description || `The summit will be held in Singapore, a global center for research and business.`}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                 <a 
                   href={venue?.map_url || "#"} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="h-12 px-8 bg-navy text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-blue transition-all flex items-center gap-2 shadow-xl shadow-navy/10 text-decoration-none"
                 >
                    Maps <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                 </a>
                 <a 
                   href={venue?.virtual_tour_url || "#"}
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="h-12 px-8 border border-slate-100 text-navy text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center text-decoration-none"
                 >
                    Virtual Tour
                 </a>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4 h-[320px]">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                 <img src="/venue-image-1.jpg" className="w-full h-full object-cover" alt="Singapore" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl translate-y-8">
                 <img src="/venue-image-2.jpg" className="w-full h-full object-cover" alt="Singapore Skyline" />
              </div>
           </div>
        </section>

        <VenueGallery />

        {/* Where to Stay Section */}
        <section id="accommodation" className="bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-50 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue shadow-xl shadow-blue/5 border border-blue/5">
                  <Hotel className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-navy uppercase tracking-tight">Hotels</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed italic">
                   We have partnered with hotels in Singapore to offer you special rates.
                </p>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Official Hotels', 'Special Rates', 'Luxury Rooms', 'Walking Distance'].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-[9px] font-black text-navy opacity-60 uppercase tracking-tight">
                       <CheckCircle2 className="w-3.5 h-3.5 text-blue" /> {t}
                    </li>
                  ))}
               </ul>
               <Link to="/registration" className="inline-block h-12 px-10 bg-blue text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest shadow-xl shadow-blue/20 hover:bg-navy transition-all active:scale-95 text-decoration-none">
                  Book Now
               </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 h-[300px]">
               <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 -rotate-2 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                     <img src="/venue-image-3.jpg" className="w-full h-full object-cover" alt="Hotel Interior" />
                  </div>
               </div>
               <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 rotate-2 translate-y-8 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                     <img src="/venue-image-4.jpg" className="w-full h-full object-cover" alt="Hotel Exterior" />
                  </div>
               </div>
            </div>
        </section>

        {/* Tourism Section */}
        <section className="space-y-12">
           <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto">
                 <Palmtree className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight">Visit {venue?.host_city?.split(',')[0] || 'Singapore'}</h2>
              <div className="text-slate-400 font-bold text-[9px] uppercase tracking-widest whitespace-pre-wrap italic">
                 Explore the famous landmarks of the city.
              </div>
           </div>
           
           <div className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl h-[400px]">
              <img src="/venue-image-1.jpg" className="w-full h-full object-cover" alt="Singapore Tourism" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-end justify-between gap-6">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Places to See</h3>
                     <p className="text-white/60 text-[9px] font-black uppercase tracking-widest">
                        From famous parks to modern buildings.
                     </p>
                 </div>
                 <button className="h-12 px-10 bg-white text-navy rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue hover:text-white transition-all whitespace-nowrap">
                    Download Guide
                 </button>
              </div>
           </div>
        </section>

        {/* Travel & Visa Section */}
        <section className="bg-navy p-10 lg:p-12 rounded-3xl text-center space-y-8 shadow-2xl shadow-navy/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />
            
            <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue mx-auto animate-bounce">
                   <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-white leading-none uppercase tracking-tight">Travel & <span className="text-blue">Visa</span></h2>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest max-w-xl mx-auto italic">
                   We send invitation letters after you register.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
                <Link to="/registration" className="h-12 px-10 bg-blue text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-navy transition-all shadow-2xl shadow-blue/20 flex items-center justify-center text-decoration-none">
                   Get Visa Letter
                </Link>
                <a href="#accommodation" className="h-12 px-10 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center text-decoration-none">
                   Hotels
                </a>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-10 relative z-10">
               <div className="flex items-center gap-3 text-white/30">
                  <Plane className="w-5 h-5" />
                  <p className="text-[9px] font-black uppercase tracking-widest">Flights</p>
               </div>
               <div className="flex items-center gap-3 text-white/30">
                  <MapPin className="w-5 h-5" />
                  <p className="text-[9px] font-black uppercase tracking-widest">Visa Help</p>
               </div>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
