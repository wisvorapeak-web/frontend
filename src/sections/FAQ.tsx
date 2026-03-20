import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I submit an abstract?',
    answer: 'Abstracts can be submitted through our online submission portal. Click the "Submit Abstract" button in the hero section or navigation menu. You will need to create an account, fill in your details, and upload your abstract (maximum 300 words) along with any supporting figures.',
  },
  {
    question: 'What are the presentation formats?',
    answer: 'We offer three formats: Talks (15 mins), Posters, and Short Talks (5 mins). The event team will choose the format based on your work and topic.',
  },
  {
    question: 'Do you provide visa support letters?',
    answer: 'Yes, we provide official invitation letters for visa applications. Please register for the conference first, then contact our support team with your registration confirmation and passport details. We recommend applying for visas at least 2 months before the conference.',
  },
  {
    question: 'Is there a student discount?',
    answer: 'Yes! Students receive a 50% discount on all registration types. Valid student ID is required at check-in. We also offer a limited number of travel grants for outstanding student presenters. Contact us for more information.',
  },
  {
    question: 'What is included in the registration fee?',
    answer: 'Registration includes access to all conference sessions, keynote presentations, conference materials (program, abstracts book), lunch and refreshments during breaks, welcome reception, and certificate of attendance. Accommodation is not included.',
  },
  {
    question: 'Can I get a refund if I cannot attend?',
    answer: 'Full refunds are available until May 1, 2026. Between May 1-31, a 50% refund is available. After June 1, registrations are non-refundable but can be transferred to another attendee from the same institution.',
  },
  {
    question: 'Will the presentations be recorded?',
    answer: 'Yes, all keynote and oral presentations will be recorded and made available to registered attendees for 30 days after the conference. Poster sessions will be photographed and included in the digital conference proceedings.',
  },
  {
    question: 'How can I become a sponsor or exhibitor?',
    answer: 'We have different ways to partner with us. Please contact our team at sponsors@foodagriexpo.com for the guide.',
  },
];

export default function FAQ() {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setIsVisible(true), { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/5 border border-blue/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-xs font-bold text-blue">Inquiries</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-navy">Questions?</h2>
          <p className="text-slate-500 text-base font-medium max-w-2xl mx-auto">
            Find answers to the most common questions about our event.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className={`bg-white rounded-2xl border ${openIndex === i ? 'border-blue/20 ring-4 ring-blue/5' : 'border-slate-100'} overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${i * 50}ms` }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left group">
                <span className={`text-sm font-bold ${openIndex === i ? 'text-blue' : 'text-navy'} transition-colors`}>{f.question}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${openIndex === i ? 'rotate-180 text-blue' : 'text-slate-300 group-hover:text-navy'}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 text-sm font-medium text-slate-500 leading-relaxed opacity-80">
                  {f.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           <p className="text-xs font-bold text-slate-400 mb-4">Still have questions?</p>
           <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white text-xs font-bold rounded-xl hover:bg-black transition-all">
             Send us an Email
           </a>
        </div>
      </div>
    </section>
  );
}
