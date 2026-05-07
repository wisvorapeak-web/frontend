import PageLayout from './PageLayout';
import { MapPin, Hotel, ExternalLink, CheckCircle2, Globe, Palmtree } from 'lucide-react';
import { Link } from 'react-router-dom';

import VenueGallery from '../sections/VenueGallery';

import { useState, useEffect } from 'react';

export default function VenuePage() {
  const [venue, setVenue] = useState<any>({
    host_city: 'Singapore',
    country: 'Singapore',
    venue_name: 'Crowne Plaza Changi Airport',
    venue_address: '75 Airport Blvd., #01-01, Singapore 819664',
    venue_description: 'Voted the World\'s Best Airport Hotel, Crowne Plaza Changi Airport offers premium facilities and direct access to Changi Airport.',
    map_url: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3801.7266078870543!2d103.9853923!3d1.3585663!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da3c936a9124bf%3A0x74a0170f1cc50445!2sCrowne%20Plaza%20Changi%20Airport%20by%20IHG!5e1!3m2!1sen!2sin!4v1778159244706!5m2!1sen!2sin',
    virtual_tour_url: '#'
  });
  const [settings, setSettings] = useState<any>({
    site_tagline: 'See the culture of Singapore during the event.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/site/venue`).then(res => res.json())
    ]).then(([sData, vData]) => {
      const extractUrl = (input: string) => {
        if (!input) return '';
        if (input.includes('<iframe')) {
          const match = input.match(/src="([^"]+)"/);
          return match ? match[1] : input;
        }
        return input;
      };

      if (sData) setSettings(sData);
      if (vData) {
        setVenue({
          ...vData,
          map_url: extractUrl(vData.map_url)
        });
      }
    }).catch(err => console.error('Venue Sync Error:', err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return (
     <PageLayout title="Venue" subtitle="Loading...">
         <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Wait a moment...</p>
         </div>
     </PageLayout>
  );

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
                 <span className="text-[10px] font-black text-blue uppercase tracking-widest">{venue?.host_city || 'Singapore'}{venue?.country ? `, ${venue.country}` : ''}</span>
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
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-50">
                 <img 
                   src={venue?.venue_image_url || "/venue-image-1.jpg"} 
                   className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110" 
                   alt={venue?.venue_name || "Summit Venue"} 
                 />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl translate-y-8 bg-slate-50">
                 <img src="https://images.unsplash.com/photo-1525624941314-9602a0b833f1?w=800&q=80" className="w-full h-full object-cover" alt="Singapore Skyline" />
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
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed italic whitespace-pre-wrap">
                   {venue?.accommodation_info || `We have partnered with hotels in ${venue?.host_city || 'the host city'} to offer you special rates.`}
                </p>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(venue?.accommodation_features || ['Partner Hotels', 'Low Rates', 'Top Rooms', 'Near Venue']).map((t: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-[9px] font-black text-navy opacity-60 uppercase tracking-tight">
                       <CheckCircle2 className="w-3.5 h-3.5 text-blue" /> {t}
                    </li>
                  ))}
               </ul>
               <Link to="/registration" className="inline-block h-12 px-10 bg-blue text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-widest shadow-xl shadow-blue/20 hover:bg-navy transition-all active:scale-95 text-decoration-none">
                  Book Hotel
               </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 h-[300px]">
               <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 -rotate-2 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1540575861501-7ce0e220beff?w=800&q=80" className="w-full h-full object-cover" alt="Conference Center" />
                  </div>
               </div>
               <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 rotate-2 translate-y-8 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" className="w-full h-full object-cover" alt="Hotel Interior" />
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
                 {venue?.tourism_info || `Explore the famous landmarks of ${venue?.host_city || 'the city'}.`}
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
                <h2 className="text-3xl lg:text-4xl font-black text-white leading-none uppercase tracking-tight">Travel & <span className="text-blue">Entry</span></h2>
                <p className="text-white/40 text-[9px] font-black uppercase tracking-widest max-w-xl mx-auto italic">
                   {venue?.visa_info || 'We will send you an invite letter after you register and book a room. Use this for your visa.'}
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
                <Link to="/registration" className="h-12 px-10 bg-blue text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-navy transition-all shadow-2xl shadow-blue/20 flex items-center justify-center text-decoration-none">
                   Get Official Invitation Letter – Register
                </Link>
                <a href="#accommodation" className="h-12 px-10 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all flex items-center justify-center text-decoration-none">
                   Hotels
                </a>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-10 relative z-10">
               <div className="flex items-center gap-3 text-white/30">
                  <Globe className="w-5 h-5 text-blue" />
                  <p className="text-[9px] font-black uppercase tracking-widest">Visa Support</p>
               </div>
               <div className="flex items-center gap-3 text-white/30">
                  <MapPin className="w-5 h-5 text-blue" />
                  <p className="text-[9px] font-black uppercase tracking-widest">Global Access</p>
               </div>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
