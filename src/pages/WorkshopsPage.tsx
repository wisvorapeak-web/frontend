import PageLayout from './PageLayout';
import { Rocket, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkshopsPage() {
  return (
    <PageLayout 
      title="Hands-on Workshops" 
      subtitle="Exclusive technical sessions led by industry leaders in AgroTech."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 space-y-32 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                 <Rocket className="w-3.5 h-3.5 text-blue" />
                 <span className="text-xs font-bold text-blue leading-none">Registration Open</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-navy leading-tight">Interactive <span className="text-blue">Technical Training</span></h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                 Our workshops provide practical skills and deep-dives into the latest agricultural technologies. 
                 From AI-driven farming to sustainable food science, gain hands-on experience with world experts.
              </p>
              
              <ul className="space-y-4 pt-4">
                 {[
                   'Certificates for all participants',
                   'Work with real-world equipment',
                   'Small group sizes for better interaction',
                   'Lunch and materials included'
                 ].map((t, i) => (
                   <li key={i} className="flex items-center gap-3 text-xs font-semibold text-navy opacity-60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
                   </li>
                 ))}
              </ul>

              <Link to="/registration" className="inline-block h-16 px-12 bg-navy text-white rounded-2xl flex items-center justify-center text-sm font-bold shadow-xl shadow-navy/10 hover:bg-blue transition-all active:scale-95 text-decoration-none">
                 Register for Workshops
              </Link>
           </div>
           
           <div className="bg-slate-50 p-12 lg:p-16 rounded-[4rem] border border-slate-100 space-y-8 text-center">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-blue shadow-xl shadow-blue/5 mx-auto border border-blue/5">
                 <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-navy">Schedule to be announced</h3>
               <p className="text-slate-400 font-semibold text-xs leading-relaxed">
                  Final workshop topics and timings will be released in the official program. 
                  Workshop spots are limited and given on a first-come, first-served basis.
               </p>
           </div>
        </div>
      </div>
    </PageLayout>
  );
}
