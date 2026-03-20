import PageLayout from './PageLayout';
import { 
  Users, 
  Globe, 
  Mic2, 
  FileText, 
  Rocket 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Attendees', count: '4,200+' },
    { icon: Mic2, label: 'Speakers', count: '120+' },
    { icon: Globe, label: 'Countries', count: '45+' },
    { icon: FileText, label: 'Abstracts', count: '850+' },
  ];

  return (
    <PageLayout 
      title="About the Event" 
      subtitle="Bringing people together to improve farming and food technology."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24">
        {/* Intro */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full">
                <Rocket className="w-3 h-3 text-blue" />
                <span className="text-xs font-bold text-blue">Working Together</span>
             </div>
             
             <h2 className="text-3xl lg:text-4xl font-bold text-navy leading-none">
                Building a Better <span className="text-blue">Future</span>
             </h2>

             <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Ascendix 2026 is a top meeting for researchers and business leaders to share new ideas that will change how we produce food. Our focus is on sustainable farming and new technology.
             </p>
          </div>

          <div className="relative">
             <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl rotate-1 group transition-transform duration-1000 hover:rotate-0">
                <img 
                   src="/about-agrotech.png" 
                   alt="Research Lab" 
                   className="w-full h-[450px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
             </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy py-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-3xl font-bold text-white">{s.count}</p>
              <p className="text-xs font-semibold text-blue opacity-60">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Honoured Speaker CTA */}
        <section className="bg-indigo-600 p-12 lg:p-20 rounded-[4rem] text-center text-white space-y-10 shadow-2xl shadow-indigo-600/20">
            <h2 className="text-3xl lg:text-4xl font-bold font-outfit">Become an Honoured Speaker</h2>
            <p className="max-w-xl mx-auto text-indigo-100 text-lg font-medium opacity-80 leading-relaxed">
               Join the most prestigious scientific platform in the world for 
               advancing the boundaries of global research and development.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
               <Link to="/abstract-submission" className="h-16 px-10 bg-white text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-bold shadow-2xl hover:bg-slate-50 transition-all active:scale-95 text-decoration-none">
                  Apply to Speak
               </Link>
               <Link to="/sessions" className="h-16 px-10 border border-white/20 text-white rounded-2xl flex items-center justify-center text-sm font-bold hover:bg-white/5 transition-all text-decoration-none">
                  View Tracks
               </Link>
            </div>
        </section>

        {/* Focus areas */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
           {[
             { title: 'Worldwide Meetings', desc: 'Sharing ideas from all over the world to help science grow.', icon: Globe },
             { title: 'Business Connections', desc: 'Connecting new research with real-world farming and manufacturing.', icon: Rocket },
             { title: 'Support for Students', desc: 'Helping the next generation of experts grow their careers.', icon: Users }
           ].map((obj, i) => (
             <div key={i} className="p-10 border border-slate-100 rounded-2xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all space-y-6">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue opacity-40">
                   <obj.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">{obj.title}</h3>
                <p className="text-xs font-semibold text-slate-400 leading-loose">{obj.desc}</p>
             </div>
           ))}
        </section>
      </div>
    </PageLayout>
  );
}
