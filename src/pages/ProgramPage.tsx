import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  MapPin, 
  Mic2, 
  Coffee, 
  Utensils, 
  Zap, 
  Monitor, 
  UserCircle 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Session {
    id: string;
    day: string;
    date: string;
    start_time: string;
    end_time: string;
    title: string;
    location: string;
    session_type: string;
    speaker_name?: string;
}

interface GroupedDay {
    day: string;
    date: string;
    sessions: Session[];
}

export default function ProgramPage() {
  const [schedule, setSchedule] = useState<GroupedDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/program`);
            const data: Session[] = await res.json();
            
            // Group by day
            const grouped = data.reduce((acc: GroupedDay[], session) => {
                const day = session.day;
                const existing = acc.find(d => d.day === day);
                if (existing) {
                    existing.sessions.push(session);
                } else {
                    acc.push({ day, date: session.date || '', sessions: [session] });
                }
                return acc;
            }, []);

            setSchedule(grouped);
        } catch (error) {
            console.error('Failed to fetch program:', error);
        } finally {
            setLoading(false);
        }
    };
    fetchProgram();
  }, []);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'registration': return UserCircle;
        case 'plenary':
        case 'keynote': return Zap;
        case 'break': return Coffee;
        case 'lunch': return Utensils;
        default: return Monitor;
    }
  };

  const getColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'registration': return 'bg-slate-100 text-slate-500';
        case 'plenary':
        case 'keynote': return 'bg-indigo-100 text-indigo-600';
        case 'break': return 'bg-amber-100 text-amber-600';
        case 'lunch': return 'bg-emerald-100 text-emerald-600';
        default: return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <PageLayout 
      title="Event Schedule" 
      subtitle="See our full schedule for the 3rd world food and agriculture summit."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12">
        {loading ? (
            <div className="space-y-8 animate-pulse">
                <div className="h-16 bg-slate-100 rounded-[2rem] w-full" />
                <div className="space-y-4">
                    <div className="h-40 bg-slate-50 rounded-[2.5rem]" />
                    <div className="h-40 bg-slate-50 rounded-[2.5rem]" />
                </div>
            </div>
        ) : schedule.length > 0 ? (
            <Tabs defaultValue={schedule[0]?.day} className="w-full">
            <div className="bg-slate-50 p-1.5 rounded-[2rem] mb-8 border border-slate-100 overflow-x-auto scrollbar-none flex justify-center h-16 items-center">
                <TabsList className="bg-transparent h-full flex gap-2">
                    {schedule.map((day) => (
                        <TabsTrigger 
                            key={day.day} 
                            value={day.day} 
                            className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl shadow-indigo-100/50 rounded-xl font-black text-[9px] px-8 py-3 gap-3 uppercase tracking-widest transition-all h-full"
                        >
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[9px] text-slate-400 group-active:text-indigo-400 mb-1">{day.date}</span>
                                <span>{day.day}</span>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {schedule.map((day) => (
                <TabsContent key={day.day} value={day.day} className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="space-y-6">
                        {day.sessions.map((session, i) => {
                            const Icon = getIcon(session.session_type);
                            const colorClass = getColor(session.session_type);
                            return (
                            <div key={i} className="group relative">
                                <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-slate-100 group-last:hidden" />
                                <div className="p-8 lg:p-10 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-50 flex flex-col md:flex-row gap-10 hover:-translate-y-2 transition-all duration-500 group relative z-10 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50/50 rotate-45 translate-x-32 -translate-y-32 group-hover:bg-indigo-50/50 group-hover:scale-150 transition-all duration-700" />
                                    
                                    {/* Time Area */}
                                    <div className="flex flex-col gap-2 min-w-[180px]">
                                        <div className="flex items-center gap-3 text-slate-400 font-bold mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-[10px] uppercase tracking-widest leading-none">TIME SLOT</span>
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 uppercase font-outfit tracking-tight">{session.start_time} - {session.end_time}</h4>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em]">{session.session_type}</span>
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-black text-slate-900 font-outfit leading-tight group-hover:text-indigo-600 transition-colors">
                                            {session.title}
                                        </h3>
                                        
                                        <div className="flex flex-wrap items-center gap-6 pt-2">
                                            <div className="flex items-center gap-2 text-slate-400 font-bold">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-xs">{session.location}</span>
                                            </div>
                                            {session.speaker_name && (
                                                <div className="flex items-center gap-2 text-slate-400 font-bold">
                                                    <Mic2 className="w-4 h-4" />
                                                    <span className="text-xs text-indigo-500">Speaker: {session.speaker_name}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Link */}
                                    <div className="flex items-center justify-center md:justify-end">
                                        <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-500 flex items-center justify-center">
                                            <Badge className="p-0 border-none">+</Badge>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </TabsContent>
            ))}
            </Tabs>
        ) : (
            <div className="py-20 text-center">
                <h3 className="text-2xl font-black text-slate-300">We are still finishing the schedule...</h3>
            </div>
        )}

        {/* Full PDF Download CTA */}
        <section className="bg-slate-950 p-10 lg:p-12 rounded-[2.5rem] text-white flex flex-col items-center text-center space-y-6 relative overflow-hidden mt-12">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
           <div className="bg-indigo-600/20 p-6 rounded-[2rem] border border-white/5 mb-2 group">
              <Monitor className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
           </div>
           <h2 className="text-3xl lg:text-4xl font-black font-outfit uppercase tracking-tight">Download Schedule</h2>
           <p className="text-slate-400 text-lg font-medium max-w-xl">
              Get the full schedule with all the details and floor plans in one PDF document.
           </p>
           <button className="px-12 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black uppercase tracking-widest text-[10px] active:scale-95 transition-all shadow-xl shadow-indigo-600/20 group inline-flex items-center gap-3">
              Download PDF <Clock className="w-3.5 h-3.5 opacity-50" />
           </button>
        </section>
      </div>
    </PageLayout>
  );
}
