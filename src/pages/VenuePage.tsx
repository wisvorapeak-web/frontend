import PageLayout from './PageLayout';
import { MapPin, Hotel, ExternalLink, Plane, CheckCircle2, Globe, Palmtree } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VenuePage() {
  return (
    <PageLayout 
      title="Venue & Location" 
      subtitle="Experience the vibrant culture of New Delhi while attending Ascendix 2026."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-32 pb-24 font-outfit">
        
        {/* Main Venue Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <MapPin className="w-3.5 h-3.5 text-blue" />
                 <span className="text-xs font-bold text-blue">Host City: New Delhi, India</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">The Perfect <span className="text-blue">Innovation Hub</span></h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                 Our 2026 summit takes place at a world-class convention center in the heart of India's capital. 
                 New Delhi offers a unique blend of history and modern facilities, providing an 
                 inspiring backdrop for our international meetings.
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <button className="h-16 px-10 bg-navy text-white text-sm font-bold rounded-2xl hover:bg-blue transition-all flex items-center gap-3 shadow-xl shadow-navy/10">
                    Open Google Maps <ExternalLink className="w-4 h-4 opacity-50" />
                 </button>
                 <button className="h-16 px-10 border-2 border-slate-100 text-navy text-sm font-bold rounded-2xl hover:bg-slate-50 transition-all">
                    Virtual Venue Tour
                 </button>
              </div>
           </div>
           
           <div className="relative">
              <div className="absolute inset-0 bg-blue/20 rounded-[3rem] blur-3xl opacity-20 -rotate-6" />
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transition-all duration-1000 group">
                 <img 
                    src="/venue-center.png" 
                    alt="Conference Venue Center" 
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-all duration-1000"
                 />
                 <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-xs font-bold">World Class Facility</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Where to Stay Section */}
        <section id="accommodation" className="bg-slate-50 p-12 lg:p-20 rounded-[4rem] border border-slate-100 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue shadow-xl shadow-blue/5 border border-blue/5">
                  <Hotel className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-bold text-navy">Where to Stay</h3>
                <p className="text-slate-500 text-sm font-medium leading-loose">
                   We have partnered with several hotels near the venue to provide special rates for our guests. 
                   These hotels offer great facilities, free shuttles, and are very close to major city attractions.
                </p>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Official Partner Hotels', 'Exclusive Delegate Rates', 'Luxury Amenities', 'Walking Distance Options'].map((t, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-semibold text-navy opacity-60">
                       <CheckCircle2 className="w-4 h-4 text-blue" /> {t}
                    </li>
                  ))}
               </ul>
               <Link to="/registration" className="inline-block h-16 px-12 bg-blue text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-xl shadow-blue/20 hover:bg-navy transition-all active:scale-95 text-decoration-none">
                  Book Accommodation
               </Link>
            </div>
            <div className="grid grid-cols-2 gap-6 h-[400px]">
               <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 -rotate-3 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hotel Interior" />
                  </div>
               </div>
               <div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 rotate-3 translate-y-12 hover:rotate-0 transition-all duration-700">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Hotel Exterior" />
                  </div>
               </div>
            </div>
        </section>

        {/* Tourism Section */}
        <section className="space-y-16">
           <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
                 <Palmtree className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-navy">Explore New Delhi</h2>
              <p className="text-slate-500 font-bold text-xs leading-relaxed">
                 Beyond the conference halls, New Delhi is a city of incredible history and vibrant life. 
                 Don't miss the chance to explore these iconic landmarks during your stay.
              </p>
           </div>
           
           <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white shadow-2xl h-[500px]">
              <img src="/india-tourism.png" className="w-full h-full object-cover" alt="New Delhi Tourism" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
                 <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white">Iconic Landscapes</h3>
                     <p className="text-white/60 text-sm font-bold max-w-md">
                        From the famous India Gate to the historic Qutub Minar and the modern Lotus Temple.
                     </p>
                 </div>
                 <button className="h-16 px-10 bg-white text-navy rounded-2xl text-sm font-bold shadow-2xl hover:bg-blue hover:text-white transition-all whitespace-nowrap">
                    Download Tourist Guide
                 </button>
              </div>
           </div>
        </section>

        {/* Travel & Visa Section */}
        <section className="bg-navy p-12 lg:p-24 rounded-[4rem] text-center space-y-12 shadow-2xl shadow-navy/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />
            
            <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue mx-auto mb-8 animate-bounce">
                   <Globe className="w-8 h-8" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-none">Travel & <span className="text-blue">Visa Support</span></h2>
                <p className="text-white/40 text-sm font-bold leading-loose max-w-3xl mx-auto">
                   Registration must be complete and travel details confirmed to receive an invitation letter for your visa.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 relative z-10 pt-8">
                <Link to="/registration" className="h-18 px-12 bg-blue text-white text-sm font-bold rounded-2xl hover:bg-white hover:text-navy transition-all shadow-2xl shadow-blue/20 flex items-center justify-center text-decoration-none">
                   Get Official Invitation Letter – Register
                </Link>
                <a href="#accommodation" className="h-18 px-12 border-2 border-white/10 text-white text-sm font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center justify-center text-decoration-none">
                   Where to Stay
                </a>
            </div>
            
            <div className="pt-16 border-t border-white/5 flex flex-wrap justify-center gap-12 relative z-10">
               <div className="flex items-center gap-4 text-white/30">
                  <Plane className="w-6 h-6" />
                  <p className="text-xs font-bold">Global Flight Connections</p>
               </div>
               <div className="flex items-center gap-4 text-white/30">
                  <MapPin className="w-6 h-6" />
                  <p className="text-xs font-bold">Visa Assistance Desk</p>
               </div>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
