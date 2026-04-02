import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe2, Sparkles, ArrowRight, UserCheck, Mic2, Star, Zap } from 'lucide-react';

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
    fetch(`${import.meta.env.VITE_API_URL}/api/site/speakers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
           setSpeakers(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="speakers" className="relative py-12 bg-slate-50 overflow-hidden font-outfit">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 space-y-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
               <Mic2 className="w-3 h-3 text-blue animate-pulse" />
               <span className="text-[9px] font-black text-blue uppercase tracking-[0.3em] leading-none">Our Speakers</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-navy leading-[1.1] tracking-tighter uppercase">
              Meet Our <span className="text-blue">Speakers</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] italic opacity-70 max-w-xl">
               World-class experts leading the future of food systems.
            </p>
          </div>
          <Link to="/speakers" className="w-full lg:w-auto">
            <Button variant="outline" className="h-11 px-8 border-2 border-slate-200 text-navy text-[10px] uppercase font-black tracking-[0.3em] rounded-xl hover:bg-navy hover:text-white hover:border-navy transition-all shadow-lg active:scale-95 group bg-white">
                View All <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Carousel */}
        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth p-2 -m-2">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-[260px] h-[360px] bg-white rounded-2xl animate-pulse border border-slate-100" />
             ))
          ) : speakers.length > 0 ? (
            speakers.map((speaker, index) => (
                <div key={speaker.id} className="flex-shrink-0 w-[260px] snap-center">
                    <SpeakerCard speaker={speaker} index={index} />
                </div>
            ))
          ) : (
            <div className="w-full py-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100">
               <UserCheck className="w-14 h-14 text-slate-100 mx-auto mb-4 animate-bounce opacity-40" />
               <h3 className="text-lg font-black text-slate-300 uppercase tracking-widest opacity-60">Speaker List Coming Soon</h3>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 opacity-40">
            <div className="flex items-center gap-3">
                <Star className="w-4 h-4 text-blue animate-spin-slow" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">95% Ph.D Excellence</span>
            </div>
            <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-blue" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">50+ Global Universities</span>
            </div>
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin-slow { animation: spin-slow 8s linear infinite; }`}</style>
    </section>
  );
}

function SpeakerCard({ speaker, index }: { speaker: Speaker, index: number }) {
    return (
        <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg hover:border-blue/20 hover:-translate-y-2 transition-all duration-700 flex flex-col h-[380px]">
            {/* Image */}
            <div className="h-[240px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-10" />
                <img 
                    src={speaker.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover transition-transform duration-3000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                
                <div className="absolute top-4 left-4 z-20">
                   <div className="px-3 py-1 bg-blue/90 backdrop-blur-xl text-white rounded-lg text-[8px] font-black uppercase tracking-[0.3em] shadow-lg border border-white/20">
                      ID {index + 101}
                   </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                   <div className="flex items-center gap-2 text-white/50 text-[9px] font-black uppercase tracking-[0.2em] leading-none group-hover:text-blue transition-colors">
                      <Globe2 className="w-3 h-3" /> {speaker.country || 'International'}
                   </div>
                   <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-lg">{speaker.name}</h3>
                   <div className="w-8 h-0.5 bg-blue rounded-full group-hover:w-full transition-all duration-700" />
                </div>

                <Sparkles className="absolute top-4 right-4 w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Meta */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-white group-hover:bg-slate-50 transition-colors">
               <div className="space-y-2">
                   <p className="text-[10px] font-black text-blue uppercase tracking-[0.2em] leading-none opacity-60 group-hover:opacity-100 transition-opacity">
                       {speaker.category || 'Expert Speaker'}
                   </p>
                   <p className="text-[10px] font-bold text-slate-500 leading-relaxed line-clamp-2 italic opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                      "{speaker.bio || 'Pioneering strategic innovations across food and agriculture.'}"
                   </p>
               </div>
               
               <div className="pt-3 border-t border-slate-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Speaker Bio</span>
                  <div className="w-8 h-8 rounded-lg bg-blue/5 text-blue flex items-center justify-center group-hover:bg-blue group-hover:text-white transition-all shadow-sm"><ArrowRight className="w-3.5 h-3.5" /></div>
               </div>
            </div>
        </div>
    );
}
