import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Speaker {
    id: string;
    name: string;
    category: string;
    role: string;
    institution: string;
    avatar_url: string;
    country: string;
    topic: string;
}

export default function Speakers() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/speakers`);
            const data: Speaker[] = await res.json();
            const featured = data.filter(s => ['plenary', 'keynote', 'invited'].includes((s.category || '').toLowerCase()));
            setSpeakers(featured.length > 0 ? featured : data.slice(0, 6));
        } catch (error) {
            console.error('Featured Speakers Error:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchSpeakers();
  }, []);

  return (
    <section id="speakers" className="relative py-24 bg-[#f9fafb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span className="text-xs font-bold text-blue">The Experts</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-none">Our <span className="text-blue">Speakers</span></h2>
          </div>
          <Link to="/speakers">
            <Button variant="outline" className="h-12 px-8 border-navy/10 text-navy text-sm font-bold rounded-xl hover:bg-navy hover:text-white transition-all">
                View All Speakers
            </Button>
          </Link>
        </div>

        <div ref={scrollContainerRef} className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => <div key={i} className="flex-shrink-0 w-[280px] h-[400px] bg-slate-100 rounded-2xl animate-pulse" />)
          ) : speakers.length > 0 ? (
            speakers.map((speaker) => (
                <div key={speaker.id} className="flex-shrink-0 w-[280px] snap-center">
                    <div className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-blue/20 transition-all">
                        <div className="h-[350px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                            <img src={speaker.avatar_url} alt={speaker.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 space-y-3">
                           <div className="flex justify-between items-start">
                               <div>
                                 <h3 className="text-sm font-bold text-navy">{speaker.name}</h3>
                                 <p className="text-[10px] font-semibold text-slate-400 mt-1">{speaker.institution}</p>
                               </div>
                               <span className="text-[10px] font-bold text-blue px-2 py-0.5 border border-blue/10 rounded">{speaker.category}</span>
                           </div>
                           <p className="text-xs font-medium text-slate-400 leading-relaxed line-clamp-2">{speaker.topic}</p>
                        </div>
                    </div>
                </div>
            ))
          ) : (
            <div className="w-full py-24 text-center">
               <p className="text-sm font-bold text-slate-300">We are announcing our speakers soon...</p>
            </div>
          )}
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
