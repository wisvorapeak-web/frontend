import PageLayout from './PageLayout';
import { MapPin, Plane, Train, Hotel, ExternalLink } from 'lucide-react';

export default function VenuePage() {
  const directions = [
    { title: 'By Air', desc: 'Indira Gandhi International Airport (DEL) is about 45 minutes from the event.', icon: Plane },
    { title: 'By Train', desc: 'New Delhi Railway Station makes it easy to travel from other cities.', icon: Train },
    { title: 'Where to Stay', desc: 'We have special rates at nearby five-star hotels for our guests.', icon: Hotel },
  ];

  return (
    <PageLayout 
      title="Venue & Travel" 
      subtitle="The event will be held in New Delhi, India, at a top-tier center."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <MapPin className="w-3 h-3 text-blue" />
                 <span className="text-[9px] font-black text-blue uppercase tracking-widest">New Delhi, India</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-navy uppercase tracking-tight leading-none">The Perfect <span className="text-blue">Location</span></h2>
              <p className="text-slate-500 text-[13px] font-bold uppercase tracking-wide leading-relaxed">
                 New Delhi is a great place to meet and share new ideas. 
                 Our event center has plenty of space for all our sessions and exhibits.
              </p>
              
              <div className="flex gap-4">
                 <button className="h-14 px-8 bg-navy text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue transition-all flex items-center gap-2">
                    Open Maps <ExternalLink className="w-3.5 h-3.5" />
                 </button>
                 <button className="h-14 px-8 border border-slate-100 text-navy text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">
                    Venue Tour
                 </button>
              </div>
           </div>
           
           <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl transition-all duration-1000 group">
              <img 
                 src="/venue-agrotech.png" 
                 alt="New Delhi" 
                 className="w-full h-[350px] object-cover group-hover:scale-110 transition-all duration-1000"
              />
           </div>
        </section>

        {/* Global Directions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {directions.map((dir, i) => (
              <div key={i} className="p-10 border border-slate-100 rounded-2xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all space-y-6">
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue opacity-40">
                    <dir.icon className="w-5 h-5" />
                 </div>
                 <h3 className="text-lg font-black text-navy uppercase tracking-tight">{dir.title}</h3>
                 <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose">{dir.desc}</p>
              </div>
           ))}
        </section>

        {/* Travel & Visa */}
        <section className="bg-navy p-12 lg:p-16 rounded-[2.5rem] text-center space-y-8">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Plane className="w-3 h-3 text-blue" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Travel Help</span>
           </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">Travel & <span className="text-blue">Visa</span></h2>
            <p className="text-white/40 text-[13px] font-bold uppercase tracking-wide leading-relaxed max-w-2xl mx-auto">
               Our team will help you with travel and visa letters. We also have special rates at nearby hotels for our guests.
            </p>
           <div className="flex flex-wrap justify-center gap-6">
               <button className="h-16 px-10 bg-blue text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-navy transition-all">
                  Get Visa Letter
               </button>
               <button className="h-16 px-10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/5 transition-all">
                  Where to Stay
               </button>
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
