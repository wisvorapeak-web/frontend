import PageLayout from './PageLayout';
import { 
  FileText, 
  CheckCircle2, 
  Upload, 
  Search, 
  Rocket, 
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const guidelines = [
  'Scientific abstracts should be 250-400 words in length.',
  'Include a clear methodology, results summary, and keywords.',
  'Accepted formats: PDF or Microsoft Word (.docx).',
  'Must belong to one of our 18 technical sessions.',
  'Maximum 2 abstract submissions per lead author.'
];

export default function AbstractSubmissionPage() {
  return (
    <PageLayout 
      title="Call for Abstracts" 
      subtitle="Contribute your breakthrough research to the global scientific archive of Polymers 2026."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-24">
        {/* Intro Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-2">
                 <Rocket className="w-3.5 h-3.5 text-indigo-600" />
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">Submissions Open</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight font-outfit uppercase">Share Your Research</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                 We are seeking high-quality, unpublished research that addresses the summit's core themes: sustainability, performance composites, and bio-macromolecular systems.
              </p>
              
              <div className="space-y-4">
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-6 group hover:bg-white hover:border-indigo-100 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform"><CheckCircle2 className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">Double-Blind Peer Review</h4>
                       <p className="text-slate-500 text-sm font-medium">Ensuring unbiased evaluation by international experts.</p>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-6 group hover:bg-white hover:border-indigo-100 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform"><Search className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">Electronic Poster Gallery</h4>
                       <p className="text-slate-500 text-sm font-medium">Digitally archived research available for 18 months.</p>
                    </div>
                 </div>
              </div>

              <Link to="/register" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3">
                 Register to Submit <Upload className="w-4 h-4 opacity-50" />
              </Link>
           </div>
           
           {/* Guidelines */}
           <div className="bg-slate-950 p-12 lg:p-20 rounded-[4rem] text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
              <div className="space-y-4 relative z-10">
                 <h3 className="text-2xl font-black font-outfit uppercase tracking-tight text-white mb-2">Submission Guidelines</h3>
                 <p className="text-slate-400 font-medium text-sm">Follow these criteria to ensure your abstract is accepted for the technical program.</p>
              </div>
              <ul className="space-y-6 relative z-10">
                 {guidelines.map((guide, i) => (
                    <li key={i} className="flex gap-4">
                       <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                       <span className="text-sm font-bold text-slate-300 leading-relaxed font-outfit uppercase tracking-tight">{guide}</span>
                    </li>
                 ))}
              </ul>
              
              <div className="pt-8 border-t border-white/5 relative z-10 flex items-center gap-3 text-amber-400 font-bold">
                 <AlertCircle className="w-5 h-5" />
                 <span className="text-xs uppercase tracking-widest font-outfit">Deadline: Dec 05, 2025</span>
              </div>
           </div>
        </section>
      </div>
    </PageLayout>
  );
}
