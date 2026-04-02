import PageLayout from './PageLayout';
import { Clock, MapPin, Zap, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('session')) return Zap;
    if (t.includes('break')) return Clock;
    return Rocket;
};

const getColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('session')) return 'bg-blue/5 text-blue border-blue/10';
    if (t.includes('break')) return 'bg-amber-50 text-amber-600 border-amber-100';
    return 'bg-emerald-50 text-emerald-600 border-emerald-100';
};

export default function ProgramPage() {
  const [schedule] = useState<any[]>([
    {
      day: 'Day 1',
      sessions: [
        { title: 'Opening Event', start_time: '09:00', end_time: '10:00', location: 'Main Hall', session_type: 'Opening', description: 'Kickoff for our event.' },
        { title: 'Food Safety Talk', start_time: '10:30', end_time: '12:30', location: 'Hall A', session_type: 'Session', description: 'New ways to grow food.' },
        { title: 'Lunch Break', start_time: '12:30', end_time: '14:00', location: 'Dining Area', session_type: 'Break', description: 'Lunch and networking.' }
      ]
    },
    {
      day: 'Day 2',
      sessions: [
        { title: 'Farming Tech Class', start_time: '09:30', end_time: '11:30', location: 'Lab 1', session_type: 'Workshop', description: 'New tech for farming.' },
        { title: 'Main Talk', start_time: '14:00', end_time: '15:30', location: 'Auditorium', session_type: 'Keynote', description: 'The future of science.' }
      ]
    },
    {
      day: 'Day 3',
      sessions: [
        { title: 'Animal Research Discussion', start_time: '10:00', end_time: '12:00', location: 'Hall B', session_type: 'Panel', description: 'Advances in farm animals.' },
        { title: 'Closing & Awards', start_time: '16:00', end_time: '17:30', location: 'Main Hall', session_type: 'Closing', description: 'Giving awards for top research.' }
      ]
    }
  ]);

  useEffect(() => {
    // Static mode
  }, []);

  return (
    <PageLayout 
      title="Program" 
      subtitle="The full schedule for our event."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-16 pb-20 font-outfit">
        
        {/* Header Summary */}
        <section className="bg-navy p-8 lg:p-10 rounded-2xl relative overflow-hidden group shadow-2xl shadow-navy/20">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                     <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">Daily Plan</span>
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight uppercase">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue to-indigo-400">Schedule</span></h2>
                  <p className="max-w-2xl text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic">
                     See the full plan for our {schedule.length} day event.
                  </p>
               </div>
               <div className="hidden lg:flex justify-end pr-10">
                  <div className="w-32 h-32 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center space-y-2 shadow-2xl relative">
                     <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue/40 rotate-12">{schedule.length}</div>
                     <p className="text-xs font-black text-white uppercase tracking-widest leading-none">Days</p>
                     <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Schedule</p>
                  </div>
               </div>
            </div>
        </section>

        {schedule.length > 0 ? (
            <Tabs defaultValue={schedule[0]?.day} className="w-full">
            <div className="bg-slate-50 p-1 rounded-full mb-12 border border-slate-100 overflow-x-auto scrollbar-none flex justify-center h-14 items-center max-w-2xl mx-auto shadow-inner">
                <TabsList className="bg-transparent h-full flex gap-2 px-4">
                    {schedule.map((day) => (
                        <TabsTrigger 
                            key={day.day} 
                            value={day.day} 
                            className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-xl shadow-indigo-100/50 rounded-full font-black text-[9px] uppercase tracking-widest px-8 py-2 transition-all h-10 group"
                        >
                            {day.day}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {schedule.map((day) => (
                <TabsContent key={day.day} value={day.day} className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <div className="grid grid-cols-1 gap-6">
                        {day.sessions.map((session: any, i: number) => {
                            const Icon = getIcon(session.session_type || 'Session');
                            const colorClass = getColor(session.session_type || 'Session');
                            return (
                                <div key={i} className="group relative flex gap-6 md:gap-10 transition-all duration-700 hover:-translate-x-2">
                                    {/* Time Column */}
                                    <div className="flex flex-col items-center min-w-[100px] md:min-w-[140px]">
                                        <div className="p-4 rounded-2xl bg-white border border-slate-50 shadow-xl shadow-slate-200/50 group-hover:border-blue group-hover:scale-105 transition-all text-center w-full">
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 leading-none">Time</p>
                                            <p className="text-base font-black text-navy uppercase tracking-tighter">{session.start_time} - {session.end_time}</p>
                                        </div>
                                        <div className="flex-1 w-px bg-gradient-to-b from-blue/20 to-transparent my-4 group-last:hidden" />
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex-1 pb-10">
                                        <div className="p-6 md:p-8 bg-white rounded-3xl border border-slate-50 shadow-xl shadow-slate-200/30 group-hover:shadow-blue/5 group-hover:border-blue/10 transition-all relative overflow-hidden h-full">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 group-hover:bg-blue/5 transition-colors" />
                                            
                                            <div className="relative z-10 space-y-4">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} shadow-xl shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50/50 px-5 py-1.5 rounded-full border border-indigo-100">{session.session_type}</span>
                                                    <div className="flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-5 py-1.5 rounded-full">
                                                       <MapPin className="w-3.5 h-3.5" /> {session.location || 'Hall'}
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-bold text-navy leading-tight uppercase tracking-tight group-hover:text-blue transition-colors">{session.title}</h3>
                                                    <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-2xl opacity-80">{session.description || 'We will update the details soon.'}</p>
                                                </div>
                                            </div>
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
            <div className="py-20 text-center space-y-8 bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-200/30">
               <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-200 shadow-inner group">
                  <Zap className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div className="space-y-4">
                  <h3 className="text-3xl font-black font-outfit text-navy tracking-tight">Plan Coming Soon</h3>
                  <p className="text-slate-400 text-xs font-bold max-w-sm mx-auto leading-loose uppercase tracking-[0.2em]">Our team is finishing the plan.</p>
               </div>
            </div>
        )}

        {/* Networking CTA */}
        <section className="bg-navy p-10 lg:p-16 rounded-[3rem] text-center text-white space-y-10 relative overflow-hidden group shadow-2xl shadow-navy/40">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue/20 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="space-y-4 relative z-10">
               <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight">Join the <span className="text-blue">Future</span></h2>
               <p className="text-white/40 text-base lg:text-lg font-medium max-w-2xl mx-auto italic">
                  Join experts for three days of learning in Singapore.
               </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link to="/registration" className="h-14 px-10 bg-blue text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center hover:bg-white hover:text-navy transition-all shadow-xl active:scale-95 text-decoration-none border-0">
                   Register Now
                </Link>
                <Link to="/about" className="h-14 px-10 border border-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center hover:bg-white/5 transition-all text-decoration-none">
                   Learn More
                </Link>
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
