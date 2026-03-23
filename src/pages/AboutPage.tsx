import PageLayout from './PageLayout';
import { 
  Users, 
  Globe, 
  Mic2, 
  FileText, 
  Rocket 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [settings] = useState<any>({
    site_tagline: "Better farming and food for the future.",
    about_image_url: "/venue-image-1.jpg"
  });

  useEffect(() => {
    // Static mode
  }, []);

  const stats = [
    { icon: Users, label: 'Attendees', count: '4,200+' },
    { icon: Mic2, label: 'Speakers', count: '120+' },
    { icon: Globe, label: 'Countries', count: '45+' },
    { icon: FileText, label: 'Abstracts', count: '850+' },
  ];

  return (
    <PageLayout 
      title="About" 
      subtitle={settings?.site_tagline || "Better farming and food for the future."}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-10 py-10 font-outfit">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full mb-2">
                <Rocket className="w-3 h-3 text-blue" />
                <span className="text-[8px] font-black uppercase tracking-widest text-blue leading-none">Singapore</span>
             </div>
             
             <h2 className="text-xl lg:text-2xl font-black text-navy leading-none uppercase tracking-tight">
                <span className="text-blue">Innovation</span>
             </h2>

             <div className="text-slate-500 text-[11px] font-bold leading-relaxed whitespace-pre-wrap italic opacity-80 uppercase tracking-tight">
                Our global meeting for leaders in food and agriculture.
             </div>
             
             <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest leading-relaxed italic opacity-70 border-l-2 border-blue/10 pl-4 py-2">
                We focus on ways to grow food sustainably and protect our planet.
             </p>
          </div>

          <div className="relative">
             <div className="rounded-2xl overflow-hidden border-2 border-slate- family rotate-1 group transition-transform duration-1000 hover:rotate-0 shadow-2xl">
                <img 
                   src={settings?.about_image_url || "/venue-image-1.jpg"} 
                   alt="Research" 
                   className="w-full h-[280px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy py-6 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 border-b-4 border-blue shadow-2xl shadow-navy/20">
          {stats.map((s, i) => (
            <div key={i} className="text-center space-y-0">
              <p className="text-xl font-black text-white uppercase tracking-tighter">{s.count}</p>
              <p className="text-[7px] font-black text-blue uppercase tracking-widest opacity-60 leading-none">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Highlights */}
        <section className="bg-white p-6 border border-slate-50 rounded-2xl space-y-4">
           <h3 className="text-sm font-black text-navy uppercase tracking-tight text-center">Our Approach</h3>
           <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest text-center max-w-2xl mx-auto italic opacity-70">
              We connect research and business to create better food systems.
           </p>
        </section>

        {/* Focus areas */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
           {[
             { title: 'Global Reach', desc: 'Working together in Singapore to share new ideas.', icon: Globe },
             { title: 'Growth', desc: 'Connecting research with top companies.', icon: Rocket },
             { title: 'Opportunities', desc: 'A place for startups and investors to connect.', icon: Users }
           ].map((obj, i) => (
             <div key={i} className="p-6 border border-slate-50 rounded-2xl hover:border-blue/10 hover:shadow-xl hover:shadow-blue/5 transition-all space-y-3 bg-white">
                <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-blue opacity-40">
                   <obj.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-navy uppercase tracking-tight">{obj.title}</h3>
                <p className="text-[9px] font-black text-slate-400 leading-relaxed uppercase tracking-widest opacity-70 italic">{obj.desc}</p>
             </div>
           ))}
        </section>

        {/* Bottom CTA */}
        <section className="bg-blue p-10 lg:p-12 rounded-3xl text-center text-white space-y-8 shadow-2xl shadow-blue/20">
            <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight">Ready to join us?</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/registration">
                    <button className="h-12 px-10 bg-navy text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-navy transition-all shadow-xl active:scale-95">
                        Register Now
                    </button>
                </Link>
                <Link to="/topics">
                    <button className="h-12 px-10 border border-white/20 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                        View Topics
                    </button>
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
