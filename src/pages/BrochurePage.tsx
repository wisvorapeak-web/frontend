import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { toast } from 'sonner';
import { 
  FileDown, 
  BookOpen, 
  Map, 
  Users, 
  Mic2, 
  CheckCircle2,
  Calendar,
  Loader2,
  FileText,
  Smartphone,
  ShieldCheck
} from 'lucide-react';

const icons: any = {
  FileDown,
  BookOpen,
  Map,
  Mic2,
  FileText,
  Calendar,
  Smartphone,
  ShieldCheck
};

export default function BrochurePage() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/brochures`);
      if (res.ok) {
        const data = await res.json();
        setBrochures(data);
      }
    } catch (err) {
      console.error('Failed to fetch brochures:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (brochure: any) => {
    toast.success(`Preparing ${brochure.title} for download...`);
    window.open(brochure.file_url, '_blank');
  };

  return (
    <PageLayout 
      title="Guides" 
      subtitle="Get event guides, program details, and maps."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-16">
        {loading ? (
          <div className="py-32 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Repository...</p>
          </div>
        ) : (
          <>
            {/* Resource Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {brochures.map((seg, i) => {
                const Icon = icons[seg.icon_name || 'FileDown'] || FileDown;
                return (
                  <div key={i} className="group p-8 lg:p-10 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50/50 rotate-45 translate-x-24 -translate-y-24 group-hover:bg-indigo-50/50 group-hover:scale-110 transition-all duration-700" />
                    
                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm relative z-10">
                        <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-3 relative z-10 w-full">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{seg.category}</p>
                          <h3 className="text-xl font-bold text-slate-950 font-outfit leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{seg.title}</h3>
                        </div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{seg.file_size}</p>
                    </div>
                    <button
                        className="w-full mt-4 h-12 rounded-xl bg-slate-950 text-white hover:bg-slate-900 font-black text-[9px] uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 active:scale-95 group-hover:bg-indigo-600"
                        onClick={() => handleDownload(seg)}
                    >
                        Download Resource <FileDown className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  </div>
                );
              })}
              {brochures.length === 0 && (
                <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No guides available at the moment.</p>
                </div>
              )}
            </section>

            {/* Global Access Footer */}
            <section className="bg-slate-950 p-10 lg:p-12 rounded-3xl text-white flex flex-col lg:grid lg:grid-cols-2 gap-12 relative overflow-hidden items-center">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />
              <div className="space-y-6 relative z-10 text-center lg:text-left w-full">
                  <h2 className="text-2xl lg:text-3xl font-bold font-outfit uppercase tracking-tight leading-tight">Can't find what you're looking for?</h2>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl italic">
                      Our team can provide custom guides for your group.
                  </p>
                  <button className="h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                      Get Help
                  </button>
              </div>
              
              <div className="space-y-4 relative z-10 w-full max-w-sm">
                  {[
                    { t: 'Updated Weekly', i: Calendar },
                    { t: 'Mobile Optimized', i: CheckCircle2 },
                    { t: 'Guides in Many Languages', i: Users },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-colors">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform"><item.i className="w-5 h-5" /></div>
                      <h4 className="text-base font-bold text-white font-outfit uppercase tracking-tight">{item.t}</h4>
                    </div>
                  ))}
              </div>
            </section>
          </>
        )}
      </div>
    </PageLayout>
  );
}
