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
import AbstractSubmissionForm from '@/components/forms/AbstractSubmissionForm';

const guidelines = [
  'Abstracts should be between 250 and 400 words.',
  'Include your methods, results, and key words.',
  'Accepted formats: PDF or Microsoft Word (.docx).',
  'Must match one of our event topics.'
];

export default function AbstractSubmissionPage() {
  return (
    <PageLayout 
      title="Submit Your Talk" 
      subtitle="Share your research with the world and be part of Ascendix 2026."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 space-y-16">
        {/* Intro Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-1">
                 <Rocket className="w-3.5 h-3.5 text-indigo-600" />
                 <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">Submissions Open</span>
              </div>
               <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 leading-tight font-outfit uppercase tracking-tight">Share Your <span className="text-indigo-600">Research</span></h2>
              <p className="text-slate-600 leading-relaxed text-sm font-medium italic">
                 New research on sustainable farming, food technology, and animal science.
              </p>
              
              <div className="space-y-4">
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-6 group hover:bg-white hover:border-indigo-100 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform"><CheckCircle2 className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">Expert Review</h4>
                       <p className="text-slate-500 text-sm font-medium">Checked by experts from around the world.</p>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center gap-6 group hover:bg-white hover:border-indigo-100 transition-all">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-slate-50 group-hover:scale-110 transition-transform"><Search className="w-6 h-6" /></div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-1">Poster Gallery</h4>
                       <p className="text-slate-500 text-sm font-medium">Digitally archived research available for 18 months.</p>
                    </div>
                 </div>
              </div>

               <Link to="/register" className="w-full sm:w-auto h-12 px-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 text-decoration-none">
                  Register and Submit <Upload className="w-3.5 h-3.5 opacity-50" />
               </Link>
           </div>
           
           {/* Guidelines */}
           <div className="bg-slate-950 p-10 lg:p-12 rounded-3xl text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
              <div className="space-y-4 relative z-10">
                  <h3 className="text-xl font-bold font-outfit text-white mb-1 uppercase tracking-tight">Submission Guidelines</h3>
                 <p className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">Follow these criteria for acceptance.</p>
              </div>
              <ul className="space-y-4 relative z-10">
                 {guidelines.map((guide, i) => (
                     <li key={i} className="flex gap-4">
                        <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                        <span className="text-sm font-semibold text-slate-300 leading-relaxed font-outfit">{guide}</span>
                     </li>
                 ))}
              </ul>
                            <div className="pt-8 border-t border-white/5 relative z-10 flex items-center gap-3 text-amber-400 font-bold">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm font-outfit">Deadline: Dec 05, 2025</span>
               </div>
           </div>
        </section>

        {/* Form Section */}
        <section id="submit-form" className="space-y-12">
            <div className="text-center space-y-3">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                  <span className="text-[9px] font-black text-blue tracking-widest uppercase">Submission Portal</span>
               </div>
               <h2 className="text-2xl lg:text-3xl font-black text-navy leading-none uppercase tracking-tight">Technical <span className="text-blue">Program</span></h2>
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-xl mx-auto opacity-60 italic">Initiate your research review.</p>
            </div>
            
            {/* The actual form component */}
            <div className="max-w-4xl mx-auto pb-12">
              <AbstractSubmissionForm />
            </div>
        </section>
      </div>
    </PageLayout>
  );
}
