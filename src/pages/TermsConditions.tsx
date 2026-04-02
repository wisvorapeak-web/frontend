import PageLayout from './PageLayout';
import { Scale, Calendar, Info, FileText, ShieldAlert, CreditCard, Landmark, BookOpen } from 'lucide-react';

export default function TermsConditions() {
  return (
    <PageLayout 
      title="Terms & Conditions" 
      subtitle="Comprehensive terms governing your use of our platform and services."
    >
      <div className="max-w-5xl mx-auto px-6 py-20 pb-32">
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
          
          {/* Header */}
          <div className="p-10 lg:p-16 border-b border-slate-50 bg-slate-50/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center text-blue">
                  <Scale className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-navy leading-none mb-2">General Terms</h1>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3" /> Updated: March 19th, 2024
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Status</span>
                <span className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Agreement
                </span>
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-16 space-y-16 text-slate-600 leading-relaxed font-medium">
            
            {/* Legal Notice */}
            <div className="bg-navy p-8 rounded-3xl text-white/80 text-xs space-y-4 border-l-[6px] border-blue">
               <p className="font-bold text-white uppercase tracking-widest">Legal Notice</p>
               <p>
                This document/agreement/understanding is a computer-generated electronic record published in terms of Rule 3 of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 (amended from time to time) read with Information Technology Act, 2000 (amended from time to time) and does not require any physical or digital signatures.
               </p>
            </div>

            {/* PART A */}
            <section className="space-y-8">
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-blue" />
                Part A: General Terms
              </h2>
              
              <div className="space-y-6">
                <p>
                  These Terms and Conditions (“Terms”) constitute a legal agreement between You and Razorpay Software Private Limited (“Razorpay” or “us”, or “we” or “our””). The Terms govern Your access to and use of Razorpay services, including payments, technology, software, analytics or any other services, tools or products offered or made available by Razorpay and/or its Affiliates, and/or their Facility Providers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <ShieldAlert className="w-5 h-5 text-amber-500" />
                    <h4 className="font-bold text-navy text-sm uppercase">Usage Responsibility</h4>
                    <p className="text-xs">You are responsible for maintaining the secrecy of Your passwords, login and account information.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <CreditCard className="w-5 h-5 text-indigo-500" />
                    <h4 className="font-bold text-navy text-sm uppercase">Payments & Fees</h4>
                    <p className="text-xs">Applicable fees for the provision of Services shall be levied by Razorpay from time to time as per the rates determined.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8 mt-12 bg-slate-50/30 p-8 rounded-[2rem] border border-slate-100/50">
                 <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">1. Proprietary Rights</h3>
                 <p className="text-sm">We (and our licensors, as applicable) remain the sole owner of all right, title and interest in the Services, including the Platform and the website razorpay.com, including any intellectual property rights which subsist in the Services. You shall not download, copy, create a derivative work, modify, reverse engineer, or otherwise attempt to discover any source code.</p>
                 
                 <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] pt-4">2. Usage of Services</h3>
                 <p className="text-sm">You shall register only if You are 18 or above. You agree to provide true, accurate, and complete information. Razorpay reserves the right to suspend or terminate accounts providing untrue, inaccurate, or incomplete information.</p>
              </div>
            </section>

            {/* PART B */}
            <section className="space-y-8 border-t border-slate-50 pt-16">
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3">
                <Landmark className="w-6 h-6 text-blue" />
                Part B: Specific Terms
              </h2>
              
              <div className="space-y-8">
                 <div className="p-8 bg-blue/5 rounded-3xl border border-blue/10">
                    <h3 className="text-lg font-bold text-blue mb-4">I. Online Payment Aggregation</h3>
                    <p className="text-sm mb-4">Razorpay shall facilitate collection of online payments for products/services sold by You. Razorpay shall settle the Transaction Amount (net of Permissible Deductions) into your account as per agreed timelines.</p>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-blue opacity-70">
                       <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Direct Repatriation</div>
                       <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Escrow Settlement</div>
                    </div>
                 </div>

                 <div className="space-y-6 px-4">
                    <h4 className="font-black text-navy text-xs uppercase tracking-widest">Chargebacks & Refunds</h4>
                    <p className="text-sm">If a Facility Provider communicates receipt of a Chargeback Request, You will be notified. Liability for Chargeback, whether domestic or international, solely rests with You. All Refunds initiated by You shall be routed to the same payment method through which the Transaction was processed.</p>
                    
                    <h4 className="font-black text-navy text-xs uppercase tracking-widest pt-4">Compliance & Security</h4>
                    <p className="text-sm">You represent and warrant that You shall implement, observe, and comply with applicable requirements prescribed under Applicable Laws, including but not limited to the provisions of the Payment Aggregator Guidelines. You shall not store any customer card data.</p>
                 </div>
              </div>
            </section>

            {/* Electronic Acceptance Block */}
            <div className="mt-20 pt-12 border-t border-slate-100">
               <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                       </div>
                       <h3 className="text-xl font-bold uppercase tracking-tight">Electronic Acceptance Details</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16">
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Owner ID</p>
                          <p className="text-xs font-mono font-bold tracking-wider">SYFjisUE0haQLH</p>
                       </div>
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Owner Name</p>
                          <p className="text-xs font-bold font-outfit">WISVORA PEAK PRIVATE LIMITED</p>
                       </div>
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Signatory Name</p>
                          <p className="text-xs font-bold font-outfit uppercase">Siva Shankar Podila</p>
                       </div>
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Acceptance Date</p>
                          <p className="text-xs font-bold">2026-04-01 | 19:41:08 IST</p>
                       </div>
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">IP Address</p>
                          <p className="text-xs font-mono text-blue/80">10.26.109.132</p>
                       </div>
                       <div className="space-y-1.5">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Authorization</p>
                          <p className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full inline-flex">Digitally Verified</p>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                       <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-medium max-w-2xl leading-loose">
                          THIS IS A COMPUTER GENERATED RECORD. NO PHYSICAL SIGNATURE IS REQUIRED UNDER THE INFORMATION TECHNOLOGY ACT, 2000. CONTINUED USE OF THE PLATFORM CONSTITUTES BINDING ACCEPTANCE OF THESE TERMS.
                       </p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
