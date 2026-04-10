import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic2, Star, UserCheck, Zap, Laptop, Rocket, Linkedin, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const speakerCategories = [
  { id: 'All', label: 'All', icon: LayoutGrid, color: 'text-slate-500 bg-slate-50' },
  { id: 'Plenary', label: 'Plenary', icon: Star, color: 'text-amber-500 bg-amber-50' },
  { id: 'Keynote', label: 'Keynote', icon: Mic2, color: 'text-indigo-500 bg-indigo-50' },
  { id: 'Invited', label: 'Invited', icon: UserCheck, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'New Researchers', label: 'New Researchers', icon: Zap, color: 'text-rose-500 bg-rose-50' },
  { id: 'Poster Displays', label: 'Poster Displays', icon: Laptop, color: 'text-blue-500 bg-blue-50' },
  { id: 'Regular', label: 'Featured', icon: UserCheck, color: 'text-slate-500 bg-slate-50' },
];

interface Speaker {
    id: string;
    name: string;
    category: string;
    university?: string;
    country?: string;
    bio?: string;
    image_url?: string;
    linkedin_url?: string;
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/speakers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSpeakers(data);
      })
      .catch(err => console.error('Speaker Sync Error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout 
      title="Speakers" 
      subtitle="Meet the experts leading the future of food and farming."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-24 pb-32">
        <Tabs defaultValue="All" className="w-full">
           <div className="bg-slate-50 p-1 rounded-full mb-10 border border-slate-100 overflow-x-auto scrollbar-none flex justify-center h-16 items-center">
              <TabsList className="bg-transparent h-full flex gap-2 px-4">
                 {speakerCategories.map((cat) => (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id} 
                        className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl shadow-indigo-100/50 rounded-full font-black text-[9px] uppercase tracking-widest px-6 py-3 gap-2 transition-all h-12"
                    >
                        <cat.icon className="w-3.5 h-3.5" /> {cat.label}
                    </TabsTrigger>
                 ))}
              </TabsList>
           </div>

           {speakerCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-[380px] bg-slate-50 rounded-[2rem] animate-pulse" />
                        ))
                    ) : (cat.id === 'All' ? speakers : speakers.filter(s => s.category === cat.id)).length > 0 ? (
                        (cat.id === 'All' ? speakers : speakers.filter(s => s.category === cat.id)).map((speaker, i) => (
                            <div key={i} className="p-5 bg-white rounded-[2rem] shadow-xl shadow-indigo-100/20 border border-slate-50 relative group transition-all duration-700 hover:-translate-y-1">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-44 h-44 mb-5 border-[6px] border-slate-50 group-hover:border-indigo-50 shadow-xl transition-all duration-700 relative overflow-hidden rounded-3xl">
                                       <img src={speaker.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`} alt={speaker.name} className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 font-outfit leading-tight mb-4 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{speaker.name}</h3>
                                    <div className="bg-slate-50 w-full p-4 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors mb-3">
                                       <p className="text-[10px] font-black text-slate-600 mb-1 uppercase tracking-tight">{speaker.university || 'Global Hub'}</p>
                                       <div className="flex items-center justify-center gap-1.5 mt-2">
                                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{speaker.country || 'International'}</p>
                                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                       </div>
                                    </div>
                                    {speaker.linkedin_url && (
                                      <a href={speaker.linkedin_url} target="_blank" rel="noopener noreferrer" className="mt-2 w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue hover:bg-white hover:shadow-xl transition-all flex items-center justify-center">
                                         <Linkedin className="w-4 h-4" />
                                      </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center space-y-8 animate-in fade-in duration-1000">
                           <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto text-slate-200 border-2 border-dashed border-slate-100 shadow-inner group">
                              <cat.icon className="w-12 h-12 group-hover:rotate-12 transition-transform" />
                           </div>
                           <div className="space-y-4">
                              <h3 className="text-3xl font-black font-outfit text-navy tracking-tight">Coming Soon</h3>
                              <p className="text-slate-400 text-xs font-bold max-w-sm mx-auto leading-loose uppercase tracking-[0.2em]">
                                 We are picking the speakers now. 
                                 <br /> <span className="text-indigo-400">We are checking the applications.</span>
                              </p>
                           </div>
                        </div>
                    )}
                 </div>
              </TabsContent>
           ))}
        </Tabs>

        {/* Invite CTA */}
        <section className="bg-indigo-950 p-10 lg:p-16 rounded-[3rem] text-center text-white space-y-8 shadow-[0_50px_100px_-20px_rgba(30,27,75,0.4)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full relative z-10 bg-indigo-900/40 backdrop-blur-md">
               <Rocket className="w-3.5 h-3.5 text-white animate-pulse" />
               <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Event 2026</span>
            </div>

            <div className="space-y-4 relative z-10">
               <h2 className="text-3xl lg:text-5xl font-black font-outfit leading-[1.1] tracking-tight">Join Us as a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-indigo-400">Speaker</span></h2>
               <p className="max-w-xl mx-auto text-indigo-200/60 text-base lg:text-lg font-medium leading-relaxed">
                  Join our top speakers and share your work with the world.
               </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-5 pt-4 relative z-10">
               <Link to="/abstract-submission" className="h-14 px-10 bg-white text-indigo-950 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all active:scale-95 text-decoration-none group-hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)]">
                  Send Research <Mic2 className="w-3.5 h-3.5 ml-3 opacity-50" />
               </Link>
               <Link to="/sessions" className="h-14 px-10 border-2 border-white/10 text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-decoration-none bg-white/5 backdrop-blur-sm">
                  See Talks
               </Link>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
