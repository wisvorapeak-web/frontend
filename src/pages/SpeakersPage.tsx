import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic2, Star, UserCheck, Zap, Laptop } from 'lucide-react';

const speakerCategories = [
  { id: 'plenary', label: 'Plenary', icon: Star, color: 'text-amber-500 bg-amber-50' },
  { id: 'keynote', label: 'Keynote', icon: Mic2, color: 'text-indigo-500 bg-indigo-50' },
  { id: 'invited', label: 'Invited', icon: UserCheck, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'young-research', label: 'Young Research', icon: Zap, color: 'text-rose-500 bg-rose-50' },
  { id: 'posters', label: 'Posters', icon: Laptop, color: 'text-blue-500 bg-blue-50' },
];

interface Speaker {
    id: string;
    name: string;
    category: string;
    role: string;
    institution: string;
    avatar_url: string;
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/speakers`);
            const data = await res.json();
            setSpeakers(data);
        } catch (error) {
            console.error('Failed to fetch speakers:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchSpeakers();
  }, []);

  return (
    <PageLayout 
      title="Our Speakers" 
      subtitle="Meet the experts who are changing the future of farming and food technology."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-12">
        <Tabs defaultValue="plenary" className="w-full">
           <div className="bg-slate-50 p-1.5 rounded-[2rem] mb-8 border border-slate-100 overflow-x-auto scrollbar-none flex justify-center h-16">
              <TabsList className="bg-transparent h-full flex gap-2">
                 {speakerCategories.map((cat) => (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id} 
                        className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl shadow-indigo-100/50 rounded-xl font-black text-[9px] px-6 py-3 gap-2 uppercase tracking-widest transition-all h-full"
                    >
                        <cat.icon className="w-4 h-4" /> {cat.label}
                    </TabsTrigger>
                 ))}
              </TabsList>
           </div>

           {speakerCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-64 bg-slate-50 rounded-[2rem] animate-pulse" />
                        ))
                    ) : speakers.filter(s => s.category === cat.id).length > 0 ? (
                        speakers.filter(s => s.category === cat.id).map((speaker, i) => (
                            <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-white group overflow-hidden">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl scale-75 opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                                        <Avatar className="w-24 h-24 border-[6px] border-slate-50 group-hover:border-white shadow-xl group-hover:scale-105 transition-all duration-700">
                                            <AvatarImage src={speaker.avatar_url} />
                                            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 font-outfit mb-1">{speaker.name}</h3>
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.15em] mb-4">{speaker.role}</p>
                                    <div className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                                        <p className="text-xs font-bold text-slate-600 leading-tight">{speaker.institution}</p>
                                    </div>
                                </CardContent>
                            </Card>
                         ))
                    ) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                           <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
                              <cat.icon className="w-10 h-10" />
                           </div>
                           <h3 className="text-xl font-bold font-outfit text-slate-400">Speakers to be announced soon</h3>
                           <p className="text-slate-400 text-sm font-medium">Our team is currently finalizing the speaker list for this category.</p>
                        </div>
                    )}
                 </div>
              </TabsContent>
           ))}
        </Tabs>
        {/* Invite CTA */}
        <section className="bg-slate-950 p-10 lg:p-12 rounded-[2.5rem] text-white relative overflow-hidden text-center space-y-6">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
           <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-black font-outfit uppercase tracking-tight">Become a Featured Speaker</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                 We are still reviewing abstracts for specialized tracks and invited sessions. Share your breakthrough research with a global audience.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                 <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-xl shadow-indigo-600/20">
                    Apply to Speak
                 </button>
                 <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all">
                    View Tracks
                 </button>
              </div>
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
