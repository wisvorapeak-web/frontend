import PageLayout from './PageLayout';
import { 
  Users, 
  Globe, 
  Mic2, 
  FileText, 
  Rocket,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function AboutPage() {
  const [settings, setSettings] = useState<any>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`).then(res => res.json()),
        fetch(`${import.meta.env.VITE_API_URL}/api/site/metrics`).then(res => res.json())
    ]).then(([sData, mData]) => {
        if (sData) setSettings(sData);
        if (Array.isArray(mData)) setMetrics(mData);
    })
    .catch(err => console.error('About Data Fetch Failed:', err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageLayout title="About" subtitle="Loading Summit Details...">
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="w-12 h-12 text-blue animate-spin" />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Loading Info...</p>
        </div>
    </PageLayout>
  );

  return (
    <PageLayout 
      title="About" 
      subtitle={settings?.site_tagline || "Better farming and food for the future."}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-10 py-10 font-outfit">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-10 duration-1000">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full mb-2">
                <Rocket className="w-3 h-3 text-blue" />
                <span className="text-[8px] font-black uppercase tracking-widest text-blue leading-none">{settings?.city || 'Singapore'}</span>
             </div>
             
             <h2 className="text-2xl lg:text-4xl font-black text-navy leading-none uppercase tracking-tight">
                {settings?.about_title || "Better farming and food for the future."}
             </h2>
 
             <div className="text-slate-500 text-[12px] font-bold leading-relaxed whitespace-pre-wrap italic opacity-80 uppercase tracking-tight">
                {settings?.about_content || "Our global meeting for leaders in food and agriculture."}
             </div>
          </div>

          <div className="relative">
             <div className="rounded-[3rem] overflow-hidden border border-slate-100 group transition-transform duration-1000 shadow-2xl">
                <img 
                   src={settings?.about_image_url || "/food_processing_factory_1774551627831.png"} 
                   alt="Research" 
                   className="w-full h-[320px] object-cover transition-all duration-1000"
                />
             </div>
          </div>
        </section>

        {/* Stats */}
        {metrics.length > 0 && (
            <section className="bg-navy py-10 rounded-[3rem] grid grid-cols-2 lg:grid-cols-4 gap-8 px-10 border-b-8 border-blue shadow-2xl shadow-navy/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />
                {metrics.map((s, i) => (
                    <div key={i} className="text-center space-y-2 relative z-10">
                    <p className="text-3xl font-black text-white uppercase tracking-tighter">{s.value}</p>
                    <p className="text-[8px] font-black text-blue uppercase tracking-widest opacity-80 leading-none">{s.label}</p>
                    </div>
                ))}
            </section>
        )}

        {/* Highlights */}
        <section className="bg-slate-50 p-10 rounded-[3rem] space-y-4 border border-slate-100">
           <h3 className="text-xl font-black text-navy uppercase tracking-tight text-center">{settings?.about_approach_title || "Our Approach"}</h3>
           <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest text-center max-w-2xl mx-auto italic opacity-70">
              {settings?.about_approach_desc || "We connect research and business to create better food systems."}
           </p>
        </section>

        {/* Focus areas */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
           {[
             { title: 'Around the World', desc: `Working together to share ideas in ${settings?.city || 'Singapore'}.`, icon: Globe },
             { title: 'Growth', desc: 'Sharing research with big companies.', icon: Rocket },
             { title: 'New Ideas', desc: 'A place for new teams and business leaders to meet.', icon: Users }
           ].map((obj, i) => (
             <div key={i} className="p-8 border border-slate-100 rounded-[2.5rem] hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all space-y-4 bg-white group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue opacity-40 group-hover:opacity-100 group-hover:bg-blue group-hover:text-white transition-all">
                   <obj.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-navy uppercase tracking-tight group-hover:text-blue transition-colors">{obj.title}</h3>
                <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-widest opacity-70 italic">{obj.desc}</p>
             </div>
           ))}
        </section>

        {/* Bottom CTA */}
        <section className="bg-blue p-12 lg:p-20 rounded-[4rem] text-center text-white space-y-10 shadow-2xl shadow-blue/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
            <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight relative z-10">Ready to join us?</h2>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
                <Link to="/registration" className="text-decoration-none">
                    <button className="h-16 px-12 bg-navy text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-navy transition-all shadow-2xl active:scale-95 border-0">
                        Register Now
                    </button>
                </Link>
                <Link to="/topics" className="text-decoration-none">
                    <button className="h-16 px-12 border-2 border-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95">
                        See Themes
                    </button>
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
