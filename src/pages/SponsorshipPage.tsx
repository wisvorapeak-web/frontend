import PageLayout from './PageLayout';
import { 
  Building2, 
  Award, 
  Target, 
  Zap, 
  FileCheck,
  CheckCircle2,
  Mail,
  ZapIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const sponsorshipTiers = [
  { 
    name: 'Platinum Sponsorship', 
    price: '$5000', 
    benefits: [
      '4 Complimentary Registrations',
      'Stall Space (3x3 Mtrs)',
      '1/2 Page Ad in Final Program',
      'Workshop Access',
      'Lunch & Coffee Breaks',
      'Logo Placement on Social Media',
      'Logo on Website (Home Page)',
      'Logo Placement on Local Site',
      '15-Min Product/Service Presentation'
    ],
    icon: Award,
    color: 'text-indigo-500 bg-indigo-50 border-indigo-100 shadow-indigo-100/50',
    slug: 'platinum'
  },
  { 
    name: 'Gold Sponsorship', 
    price: '$4000', 
    benefits: [
      '3 Complimentary Registrations',
      'Workshop Access',
      'Lunch & Coffee Breaks',
      'Logo on Website',
      'Social Media Promotion',
      'Conference Proceedings',
      'Main Poster Logo'
    ],
    icon: Target,
    color: 'text-amber-500 bg-amber-50 border-amber-100 shadow-amber-100/50',
    slug: 'gold'
  },
  { 
    name: 'Silver Sponsorship', 
    price: '$3000', 
    benefits: [
      '2 Complimentary Registrations',
      'Workshop Access',
      'Lunch & Coffee Breaks',
      'Logo on Website',
      'Social Media Promotion',
      'Conference Proceedings',
      'Main Poster Logo'
    ],
    icon: Zap,
    color: 'text-slate-500 bg-slate-50 border-slate-100 shadow-slate-100/50',
    slug: 'silver'
  },
];

const exhibitorTiers = [
  { 
    name: 'Standard Exhibitor', 
    price: '$2000', 
    benefits: [
      '1 Standard Stall (3x3 Mtrs)',
      '2 Complimentary Registrations',
      'Workshop Access',
      'Lunch & Coffee Breaks',
      'Website Logo Placement',
      'Logo Placement on Venue Banners'
    ],
    icon: Building2,
    color: 'text-emerald-500 bg-emerald-50 border-emerald-100 shadow-emerald-100/50',
    slug: 'standard'
  },
  { 
    name: 'Additional Person', 
    price: '$500', 
    benefits: [
      'Full Conference Access',
      'Lunch & Coffee Breaks',
      'Speaker/Delegate Sessions',
      'Networking Event Access',
      'Conference Kit Included'
    ],
    icon: ZapIcon,
    color: 'text-slate-500 bg-slate-50 border-slate-100 shadow-slate-100/50',
    slug: 'additional-person'
  },
];

const sharedBenefits = [
  'Prominent Logo Placement',
  'Access to Attendee List',
  'Networking Gala Dinner',
  'Mention in Newsletters',
  'Social Media Spotlights'
];

export default function SponsorshipPage() {
  return (
    <PageLayout 
      title="Sponsorship & Exhibitor" 
      subtitle="Partner with Ascendix 2026 and showcase your innovations to a global audience."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-24 space-y-32">
        
        {/* Intro */}
        <section className="relative rounded-[3rem] bg-navy p-12 lg:p-20 overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                        <span className="text-xs font-bold text-white">Global Partnership</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                        Elevate Your <span className="text-blue">Brand</span>
                    </h2>
                    <p className="text-white/50 text-lg font-medium leading-relaxed">
                        Join the world's leading Material Summit. Connect with industry pioneers, researchers, and decision-makers from across the globe.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="/contact">
                            <button className="h-14 px-10 bg-blue text-white font-bold text-sm rounded-2xl hover:bg-white hover:text-navy transition-all">
                                Download Brochure
                            </button>
                        </Link>
                        <Link to="/contact">
                            <button className="h-14 px-10 border border-white/10 text-white font-bold text-sm rounded-2xl hover:bg-white/5 transition-all">
                                Custom Packages
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {sharedBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <CheckCircle2 className="w-4 h-4 text-blue" />
                            <span className="text-xs font-bold text-white/70">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="space-y-16">
            <div className="text-center space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-navy">Sponsorship <span className="text-blue">Packages</span></h3>
                <p className="text-slate-400 text-sm font-bold">Choose the level of visibility for your organization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sponsorshipTiers.map((tier, i) => (
                    <div key={i} className="group relative flex flex-col p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-blue/20 hover:shadow-2xl hover:shadow-navy/5 transition-all duration-500">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all ${tier.color}`}>
                            <tier.icon className="w-7 h-7" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-2">{tier.name}</h4>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold text-blue">{tier.price}</span>
                        </div>

                        <ul className="space-y-4 mb-10 overflow-y-auto max-h-[300px] pr-4 custom-scrollbar">
                            {tier.benefits.map((benefit, j) => (
                                <li key={j} className="flex items-start gap-3 text-xs font-bold text-slate-500 leading-relaxed">
                                    <FileCheck className="w-4 h-4 text-blue/40 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <Link to={`/pay/sponsorship/${tier.slug}`} className="w-full mt-auto h-16 rounded-2xl bg-slate-950 text-white hover:bg-indigo-600 font-bold text-sm transition-all flex items-center justify-center">
                           Pay & Secure Spot
                        </Link>
                    </div>
                ))}
            </div>
        </section>

        {/* Exhibitor */}
        <section className="space-y-16">
            <div className="text-center space-y-4">
                <h3 className="text-3xl lg:text-4xl font-bold text-navy">Exhibitor <span className="text-blue">Packages</span></h3>
                <p className="text-slate-400 text-sm font-bold">Direct interaction with conference attendees</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {exhibitorTiers.map((tier, i) => (
                    <div key={i} className="flex flex-col p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-teal-500/20 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-all ${tier.color}`}>
                            <tier.icon className="w-7 h-7" />
                        </div>
                        <h4 className="text-xl font-bold text-navy mb-2">{tier.name}</h4>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-4xl font-bold text-blue">{tier.price}</span>
                        </div>

                        <ul className="space-y-4 mb-10">
                            {tier.benefits.map((benefit, j) => (
                                <li key={j} className="flex items-start gap-3 text-xs font-bold text-slate-500 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500/40 shrink-0" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <Link to={`/pay/exhibitor/${tier.slug}`} className="w-full mt-auto h-16 rounded-2xl bg-slate-950 text-white hover:bg-teal-600 font-bold text-sm transition-all flex items-center justify-center">
                           Pay & Secure Spot
                        </Link>
                    </div>
                ))}
            </div>

            <p className="text-center text-xs font-bold text-slate-400 mt-8">
              * Additional person for exhibitor stall is available at <span className="text-navy">$500</span> per person.
            </p>
        </section>

        {/* CTA */}
        <section className="bg-slate-50 rounded-[3rem] p-12 lg:p-20 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6">
                <h3 className="text-3xl font-bold text-navy">Need a <span className="text-blue">Custom</span> Package?</h3>
                <p className="text-slate-500 font-medium max-w-lg">
                    Contact our sponsorship team to create a visibility package tailored specifically to your organization's goals.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Link to="/contact">
                    <button className="h-16 px-12 bg-navy text-white font-bold text-sm rounded-2xl hover:bg-blue transition-all w-full">
                        Contact Team
                    </button>
                </Link>
                <a href="mailto:contact@foodagriexpo.com">
                    <button className="h-16 px-12 border border-slate-200 text-navy font-bold text-sm rounded-2xl hover:bg-white transition-all w-full flex items-center justify-center gap-3">
                        <Mail className="w-4 h-4" /> Email Us
                    </button>
                </a>
            </div>
        </section>

      </div>
    </PageLayout>
  );
}
