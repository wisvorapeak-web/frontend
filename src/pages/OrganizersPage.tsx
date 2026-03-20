import PageLayout from './PageLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const committee = [
  { 
    name: 'Prof. Ananda Verma', 
    role: 'Conference Chair', 
    affiliation: 'Delhi Technological University', 
    location: 'India',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anand' 
  },
  { 
    name: 'Dr. Sarah Jenkins', 
    role: 'Scientific Committee Chair', 
    affiliation: 'Oxford University', 
    location: 'United Kingdom',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' 
  },
  { 
    name: 'Prof. Michael Chen', 
    role: 'Organizing Secretary', 
    affiliation: 'MIT Materials Science', 
    location: 'USA',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' 
  },
  { 
    name: 'Dr. Elena Rodriguez', 
    role: 'Technical Program Chair', 
    affiliation: 'CSIC Madrid', 
    location: 'Spain',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' 
  },
  { 
    name: 'Prof. Hiroshi Tanaka', 
    role: 'Exhibition Chair', 
    affiliation: 'University of Tokyo', 
    location: 'Japan',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi' 
  },
];

export default function OrganizersPage() {
  return (
    <PageLayout 
      title="Organizing Committee" 
      subtitle="The visionary leaders and experts driving the success of Ascendix Summits."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 space-y-24">
        {/* Management Team */}
        <section className="space-y-12">
           <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-slate-900 font-outfit">Core Scientific Leadership</h2>
              <p className="text-slate-500 font-medium">Meet the global experts overseeing the technical integrity of our summit.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {committee.map((member, i) => (
                <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-indigo-100/50 border border-slate-50 relative group transition-all duration-700 hover:-translate-y-2">
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="w-24 h-24 mb-6 border-[6px] border-slate-50 group-hover:border-indigo-50 shadow-xl transition-all duration-700">
                           <AvatarImage src={member.image} />
                           <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold text-slate-900 font-outfit leading-tight mb-1">{member.name}</h3>
                        <p className="text-xs font-bold text-indigo-500 mb-4">{member.role}</p>
                        <div className="bg-slate-50 w-full p-4 rounded-2xl border border-slate-100/50 group-hover:bg-indigo-50 transition-colors">
                           <p className="text-xs font-bold text-slate-600 mb-1">{member.affiliation}</p>
                           <p className="text-xs font-semibold text-slate-400">{member.location}</p>
                        </div>
                    </div>
                </div>
              ))}
           </div>
        </section>

        {/* Global Regional Advisors */}
        <section className="bg-slate-950 p-12 lg:p-20 rounded-[4rem] text-white">
           <h3 className="text-2xl font-bold mb-12 font-outfit text-center">Regional Scientific Advisors</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { region: 'Europe', leads: '12 Advisors' },
                { region: 'Asia Pacific', leads: '18 Advisors' },
                { region: 'Americas', leads: '15 Advisors' },
                { region: 'Middle East', leads: '8 Advisors' },
              ].map((adv, i) => (
                 <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 text-center group hover:bg-white/10 transition-colors">
                    <p className="text-xs font-bold text-indigo-400 mb-2">{adv.region}</p>
                    <p className="text-xl font-bold font-outfit">{adv.leads}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* Advisory footer */}
        <section className="bg-indigo-600 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between text-white shadow-2xl shadow-indigo-600/20">
           <div className="text-center md:text-left mb-6 md:mb-0">
             <h4 className="text-xl font-bold font-outfit mb-1">Interested in joining the Scientific Program Committee?</h4>
             <p className="text-indigo-200 text-sm font-medium">Please send your academic CV to scientific@foodagriexpo.com</p>
           </div>
           <button className="bg-white text-indigo-600 px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-900/10 hover:bg-slate-50 transition-all active:scale-95">
              Apply to join
           </button>
        </section>
      </div>
    </PageLayout>
  );
}
