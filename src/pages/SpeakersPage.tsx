import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic2, Star, UserCheck, Zap, Laptop, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      title="Our Honoured Speakers" 
      subtitle="The visionary leaders and experts at the forefront of global research."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-24 pb-32">
        <Tabs defaultValue="plenary" className="w-full">
           <div className="bg-slate-50 p-1.5 rounded-[2.5rem] mb-12 border border-slate-100 overflow-x-auto scrollbar-none flex justify-center h-20 items-center">
              <TabsList className="bg-transparent h-full flex gap-3 px-4">
                 {speakerCategories.map((cat) => (
                    <TabsTrigger 
                        key={cat.id} 
                        value={cat.id} 
                        className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl shadow-indigo-100/50 rounded-2xl font-bold text-xs px-8 py-4 gap-3 transition-all h-14"
                    >
                        <cat.icon className="w-4 h-4" /> {cat.label}
                    </TabsTrigger>
                 ))}
              </TabsList>
           </div>

           {speakerCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id} className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-80 bg-slate-50 rounded-[2.5rem] animate-pulse" />
                        ))
                    ) : speakers.filter(s => s.category === cat.id).length > 0 ? (
                        speakers.filter(s => s.category === cat.id).map((speaker, i) => (
                            <Card key={i} className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white group overflow-hidden transition-all duration-700 hover:-translate-y-2">
                                <CardContent className="p-8 flex flex-col items-center text-center">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl scale-75 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                                        <Avatar className="w-28 h-28 border-[8px] border-slate-50 group-hover:border-white shadow-2xl group-hover:scale-105 transition-all duration-700">
                                            <AvatarImage src={speaker.avatar_url} />
                                            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                     <h3 className="text-xl font-bold text-slate-900 font-outfit mb-1">{speaker.name}</h3>
                                    <p className="text-xs font-bold text-indigo-500 mb-6">{speaker.role}</p>
                                     <div className="w-full p-6 bg-slate-50 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                                        <p className="text-xs font-bold text-slate-600 leading-relaxed">{speaker.institution}</p>
                                    </div>
                                </CardContent>
                            </Card>
                         ))
                    ) : (
                        <div className="col-span-full py-32 text-center space-y-6">
                           <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 border border-slate-100">
                              <cat.icon className="w-10 h-10" />
                           </div>
                           <h3 className="text-2xl font-bold font-outfit text-navy">Speakers to be announced soon</h3>
                           <p className="text-slate-400 text-xs font-bold max-w-sm mx-auto leading-loose">
                              Our team is currently finalizing the technical program for the {cat.label} track.
                           </p>
                        </div>
                    )}
                 </div>
              </TabsContent>
           ))}
        </Tabs>

        {/* Invite CTA */}
        <section className="bg-indigo-600 p-12 lg:p-20 rounded-[4rem] text-center text-white space-y-10 shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full">
               <Rocket className="w-3.5 h-3.5 text-white" />
               <span className="text-xs font-bold text-white">Speaker Series 2026</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold font-outfit leading-tight">Become an Honoured Speaker</h2>
            <p className="max-w-2xl mx-auto text-indigo-100 text-lg font-medium opacity-80 leading-relaxed">
               Join the most prestigious scientific platform in global research and development. 
               Share your breakthrough discoveries with an international audience.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 pt-6">
               <Link to="/abstract-submission" className="h-18 px-12 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-bold shadow-2xl hover:bg-slate-50 transition-all active:scale-95 text-decoration-none">
                  Apply to Speak
               </Link>
               <Link to="/sessions" className="h-18 px-12 border-2 border-white/20 text-white rounded-2xl flex items-center justify-center text-sm font-bold hover:bg-white/10 transition-all text-decoration-none">
                  View Tracks
               </Link>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
