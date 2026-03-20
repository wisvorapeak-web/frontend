import PageLayout from './PageLayout';
import { Award } from 'lucide-react';

export default function ChairsPage() {
  const chairs = [
    { role: 'Conference Chair', name: 'To Be Announced', affiliation: 'Global University' },
    { role: 'Conference Co-Chair', name: 'To Be Announced', affiliation: 'International Institute' },
    { role: 'Local Organizing Chair', name: 'To Be Announced', affiliation: 'Host University, New Delhi' },
  ];

  return (
    <PageLayout 
      title="Conference Leadership" 
      subtitle="Meet the chairs overseeing the excellence of Ascendix 2026."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-20 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {chairs.map((chair, i) => (
             <div key={i} className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50 text-center space-y-6">
                <div className="w-16 h-16 bg-blue/5 rounded-2xl flex items-center justify-center text-blue mx-auto">
                   <Award className="w-8 h-8" />
                </div>
                 <div>
                    <h3 className="text-xs font-bold text-blue mb-2">{chair.role}</h3>
                    <h4 className="text-xl font-bold text-navy">{chair.name}</h4>
                    <p className="text-slate-400 text-xs font-semibold mt-2">{chair.affiliation}</p>
                 </div>
             </div>
           ))}
        </div>

        <div className="bg-navy p-12 lg:p-20 rounded-[4rem] text-center text-white space-y-8 shadow-2xl">
            <h2 className="text-3xl font-bold">Scientific Committee</h2>
            <p className="max-w-xl mx-auto text-white/40 text-sm font-semibold leading-relaxed">
               The full scientific program committee will be released after the first round of abstract evaluations.
            </p>
        </div>
      </div>
    </PageLayout>
  );
}
