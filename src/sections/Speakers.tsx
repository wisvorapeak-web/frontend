import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe2, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

interface Speaker {
    id: string;
    name: string;
    category: string;
    university?: string;
    country?: string;
    image_url?: string;
    bio?: string;
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/speakers`);
            const data: Speaker[] = await res.json();
            // Prioritize Plenary and Keynote for home feature
            const featured = data.filter(s => ['plenary', 'keynote', 'invited'].includes((s.category || '').toLowerCase()));
            setSpeakers(featured.length > 0 ? featured : data.slice(0, 8));
        } catch (error) {
            console.error('Featured Speakers Error:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchSpeakers();
  }, []);

  return (
    <section id="speakers" className="relative py-12 bg-slate-50 overflow-hidden font-outfit">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 space-y-10">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full mb-2">
               <Sparkles className="w-3.5 h-3.5 text-blue animate-pulse" />
               <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Speakers</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-navy leading-tight tracking-tight uppercase max-w-2xl">
              Our <span className="text-blue">Speakers</span>
            </h2>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
               Experts in food and agriculture.
            </p>
          </div>
          <Link to="/speakers" className="text-decoration-none">
            <Button variant="outline" className="h-10 px-8 border-slate-200 text-slate-500 text-[8px] uppercase font-black tracking-widest rounded-lg hover:bg-slate-900 hover:text-white hover:border-slate-950 transition-all shadow-lg active:scale-95 group">
                See All Speakers <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform opacity-30 group-hover:opacity-100" />
            </Button>
          </Link>
        </div>

        {/* Dynamic Carousel / Grid */}
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth outline-none">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[240px] h-[360px] bg-white rounded-3xl animate-pulse border border-slate-50" />
             ))
          ) : speakers.length > 0 ? (
            speakers.map((speaker) => (
                <div key={speaker.id} className="flex-shrink-0 w-[240px] snap-center">
                    <SpeakerCard speaker={speaker} />
                </div>
            ))
          ) : (
            <div className="w-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-100 shadow-inner">
               <UserCheck className="w-10 h-10 text-slate-100 mx-auto mb-3" />
               <h3 className="text-lg font-black text-slate-400 uppercase tracking-tight">Coming Soon</h3>
            </div>
          )}
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}

function SpeakerCard({ speaker }: { speaker: Speaker }) {
    return (
        <div className="group relative bg-white border border-slate-50 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-500 h-[380px] flex flex-col">
            <div className="h-[260px] overflow-hidden transition-transform duration-[2000ms] group-hover:scale-105 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <img src={speaker.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`} alt={speaker.name} className="w-full h-full object-cover" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                   <div className="px-3 py-1 bg-blue/90 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg border border-white/10 group-hover:bg-navy transition-all">
                      {speaker.category || 'Expert'}
                   </div>
                </div>

                {/* Hover Reveal Details */}
                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                   <div className="flex items-center gap-2 text-white/80 text-[8px] font-black uppercase tracking-widest leading-none mb-0.5">
                      <Globe2 className="w-3 h-3 text-blue" /> {speaker.country || 'International'}
                   </div>
                   <h3 className="text-lg font-black text-white leading-tight font-outfit uppercase tracking-tight">{speaker.name}</h3>
                   <p className="text-[8px] font-black text-blue uppercase tracking-widest leading-none pt-0.5">{speaker.university || 'University'}</p>
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-center bg-white group-hover:bg-indigo-50/30 transition-colors">
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed line-clamp-2 italic opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-tight">
                  “{speaker.bio || 'Expert in food and agriculture.'}”
               </p>
               <div className="pt-3 mt-3 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest leading-none">Details</span>
                  <div className="w-6 h-6 rounded-lg bg-blue/10 text-blue flex items-center justify-center group-hover:bg-blue group-hover:text-white transition-all"><ArrowRight className="w-3.5 h-3.5" /></div>
               </div>
            </div>
        </div>
    );
}
