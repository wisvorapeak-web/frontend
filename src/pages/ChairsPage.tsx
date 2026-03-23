import PageLayout from './PageLayout';
import { Award } from 'lucide-react';

export default function ChairsPage() {
  const chairs = [
    { role: 'Event Chair', name: 'To Be Announced', affiliation: 'Global University' },
    { role: 'Co-Chair', name: 'To Be Announced', affiliation: 'International Institute' },
    { role: 'Host Chair', name: 'To Be Announced', affiliation: 'Host University, Singapore' },
  ];

  return (
    <PageLayout 
      title="Chairs" 
      subtitle="The experts leading the 2026 Summit."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {chairs.map((chair, i) => (
             <div key={i} className="p-8 bg-white border border-slate-50 rounded-3xl shadow-xl shadow-slate-200/50 text-center space-y-4">
                <div className="w-12 h-12 bg-blue/5 rounded-xl flex items-center justify-center text-blue mx-auto">
                   <Award className="w-6 h-6" />
                </div>
                 <div>
                    <h3 className="text-[9px] font-black uppercase tracking-widest text-blue mb-1.5">{chair.role}</h3>
                    <h4 className="text-xl font-bold text-navy uppercase tracking-tight">{chair.name}</h4>
                    <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest">{chair.affiliation}</p>
                 </div>
             </div>
           ))}
        </div>

        <div className="bg-navy p-10 lg:p-12 rounded-3xl text-center text-white space-y-6 shadow-2xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Scientific Committee</h2>
            <p className="max-w-xl mx-auto text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed">
               The full committee will be listed soon.
            </p>
        </div>
      </div>
    </PageLayout>
  );
}
