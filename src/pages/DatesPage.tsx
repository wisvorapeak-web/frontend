import PageLayout from './PageLayout';
import { Clock, Calendar, AlertCircle, FileCheck, CheckCircle2, Award } from 'lucide-react';

const milestones = [
  { 
    title: 'Submissions Start', 
    date: 'Dec 15, 2025', 
    status: 'Opened',
    icon: FileCheck,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  },
  { 
    title: 'Submission Deadline', 
    date: 'Feb 05, 2026', 
    status: 'Final Call',
    icon: Clock,
    color: 'bg-rose-50 text-rose-600 border-rose-100'
  },
  { 
    title: 'Review Results', 
    date: 'Feb 20, 2026', 
    status: 'Upcoming',
    icon: AlertCircle,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  },
  { 
    title: 'Early Bird Registration', 
    date: 'Mar 05, 2026', 
    status: 'Limited Time',
    icon: Award,
    color: 'bg-amber-50 text-amber-600 border-amber-100'
  },
  { 
    title: 'Event Starts', 
    date: 'June 24, 2026', 
    status: 'Final Phase',
    icon: Calendar,
    color: 'bg-slate-50 text-slate-800 border-slate-200'
  },
];

export default function DatesPage() {
  return (
    <PageLayout 
      title="Key Dates" 
      subtitle="Keep track of the important deadlines for Ascendix 2026."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-12">
        <section className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-50 p-10 lg:p-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-[100px]" />
           <div className="space-y-12 relative z-10">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-10 group">
                   <div className="flex flex-col items-center md:items-end min-w-[200px] text-center md:text-right">
                      <p className="text-xs font-bold text-indigo-400 mb-1">Target Date</p>
                      <h4 className="text-2xl font-bold font-outfit text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{milestone.date}</h4>
                   </div>

                   {/* Connector Dot */}
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                      <milestone.icon className="w-5 h-5" />
                   </div>

                   <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                         <h3 className="text-xl font-bold text-slate-900 font-outfit leading-tight">{milestone.title}</h3>
                         <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${milestone.color}`}>
                            {milestone.status}
                         </div>
                      </div>
                      <p className="text-slate-500 font-medium text-sm">Please ensure all submissions reach the scientific panel before 23:59 GMT on this date.</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Global Time Reminder CTA */}
        <section className="bg-slate-900 p-10 lg:p-12 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
           <div className="space-y-4 relative z-10">
              <h2 className="text-3xl font-bold font-outfit">Need a customized schedule?</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                 Sync the entire summit calendar to your Google or Outlook calendar to receive mobile alerts for scientific track deadlines.
              </p>
           </div>
           <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-2xl relative z-10 group inline-flex items-center gap-2">
              Sync to Calendar <CheckCircle2 className="w-3.5 h-3.5 opacity-50" />
           </button>
        </section>
      </div>
    </PageLayout>
  );
}
