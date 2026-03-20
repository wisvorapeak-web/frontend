import PageLayout from './PageLayout';
import { toast } from 'sonner';
import { 
  FileDown, 
  BookOpen, 
  Map, 
  Users, 
  Mic2, 
  CheckCircle2,
  Calendar 
} from 'lucide-react';

const segments = [
  { title: 'Conference Brochure', icon: FileDown, size: '2.4 MB', type: 'Complete Overview' },
  { title: 'Exhibitor Prospectus', icon: BookOpen, size: '4.8 MB', type: 'Sponsor Guide' },
  { title: 'Technical Tracks', icon: Mic2, size: '1.2 MB', type: 'Session Details' },
  { title: 'Venue Floor Plan', icon: Map, size: '3.1 MB', type: 'Logistical Map' },
];

export default function BrochurePage() {
  const handleDownload = (title: string) => {
    toast.success(`Preparing ${title} for download... Please check your downloads folder.`);
  };
  return (
    <PageLayout 
      title="Electronic Resources" 
      subtitle="Download event guides, research plans, and travel handbooks."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-24">
        {/* Resource Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           {segments.map((seg, i) => (
              <div key={i} className="group p-10 lg:p-12 bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50/50 rotate-45 translate-x-24 -translate-y-24 group-hover:bg-indigo-50/50 group-hover:scale-110 transition-all duration-700" />
                 
                 <div className="w-20 h-20 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm relative z-10">
                    <seg.icon className="w-8 h-8" />
                 </div>

                 <div className="space-y-4 relative z-10 w-full">
                    <div className="space-y-1">
                       <p className="text-xs font-bold text-indigo-500">{seg.type}</p>
                       <h3 className="text-2xl font-bold text-slate-900 font-outfit leading-tight group-hover:text-indigo-600 transition-colors">{seg.title}</h3>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold">{seg.size}</p>
                 </div>
                 <button
                    className="w-full mt-6 h-16 rounded-2xl bg-slate-950 text-white hover:bg-slate-900 font-bold text-sm transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95 group-hover:bg-indigo-600"
                    onClick={() => handleDownload(seg.title)}
                 >
                    Download Resource <FileDown className="w-4 h-4 opacity-50" />
                 </button>
              </div>
           ))}
        </section>

        {/* Global Access Footer */}
        <section className="bg-slate-950 p-12 lg:p-20 rounded-[4rem] text-white flex flex-col lg:grid lg:grid-cols-2 gap-16 relative overflow-hidden items-center">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
           <div className="space-y-8 relative z-10 text-center lg:text-left w-full">
              <h2 className="text-3xl lg:text-4xl font-bold font-outfit leading-tight">Can't find what you're looking for?</h2>
               <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">
                  Our support team can provide custom guides for universities and companies.
               </p>
               <button className="px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold text-sm shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all">
                  Get Help
               </button>
           </div>
           
           <div className="space-y-6 relative z-10 w-full max-w-sm">
              {[
                { t: 'Updated Weekly', i: Calendar },
                { t: 'Mobile Optimized', i: CheckCircle2 },
                 { t: 'Guides in Many Languages', i: Users },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-colors">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform"><item.i className="w-6 h-6" /></div>
                   <h4 className="text-lg font-bold text-white font-outfit">{item.t}</h4>
                </div>
              ))}
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
