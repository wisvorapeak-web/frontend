import PageLayout from './PageLayout';
import { ShieldCheck, Calendar, Info, Lock, Globe, FileText, UserCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <PageLayout 
      title="Privacy Policy" 
      subtitle="Your data security and privacy are our top priorities."
    >
      <div className="max-w-4xl mx-auto px-6 py-20 pb-32">
        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-slate-200/50">
          
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center text-blue">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-navy leading-none mb-2">Privacy Policy</h1>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <Calendar className="w-3 h-3" /> Last updated: March 19th, 2024
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
            
            {/* Section: Introduction */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-navy">
                <Info className="w-5 h-5 text-blue" />
                <h2 className="text-xl font-bold uppercase tracking-tight">1. Introduction</h2>
              </div>
              <p>
                This privacy policy (the "Privacy Policy") applies to your use of the website of Razorpay hosted at razorpay.com, the Services (as defined under the Razorpay "Terms of Use") and Razorpay applications on mobile platforms (Android, Blackberry, Windows Phone, iOS etc.) (collectively ("RAZORPAY" or "WEBSITE")), but does not apply to any third party websites that may be linked to them, or any relationships you may have with the businesses listed on Razorpay.
              </p>
              <p>
                The terms "we", "our" and "us" refer to Razorpay and the terms "you", "your" and "User" refer to you, as a user of Razorpay. The term "Personal Information" means information that you provide to us which personally identifies you to be contacted or identified, such as your name, phone number, email address, and any other data that is tied to such information. Our practices and procedures in relation to the collection and use of Personal Information have been set-out below in order to ensure safe usage of the Website for you.
              </p>
            </section>

            {/* Section: Security Standards */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-navy">
                <Lock className="w-5 h-5 text-blue" />
                <h2 className="text-xl font-bold uppercase tracking-tight">2. Security Standards</h2>
              </div>
              <p>
                We have implemented reasonable security practices and procedures that are commensurate with the information assets being protected and with the nature of our business. While we try our best to provide security that is better than the industry standards, because of the inherent vulnerabilities of the internet, we cannot ensure or warrant complete security of all information that is being transmitted to us by you.
              </p>
              <p className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue italic text-sm">
                By visiting this Website, you agree and acknowledge to be bound by this Privacy Policy and you hereby consent that we will collect, use, process and share your Personal Information in the manner set out herein below. If you do not agree with these terms, do not use the Website.
              </p>
            </section>

            {/* Section: Data Collection */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-navy">
                <FileText className="w-5 h-5 text-blue" />
                <h2 className="text-xl font-bold uppercase tracking-tight">3. Information we collect and how we use it</h2>
              </div>
              <p>
                We collect, receive and store your Personal Information. If you provide your third-party account credentials ("Third Party Account Information") to us, you understand that some content and information in those accounts may be transmitted to your account with us if you authorise such transmissions and that Third Party Account Information transmitted to us shall be covered by this Privacy Policy.
              </p>
              <p>
                The Personal Information collected will be used only for the purpose of enabling you to use the services provided by us, to help promote a safe service, calibrate consumer interest in our products and services, inform you about online offers and updates, troubleshoot problems, customize User experience, detect and protect us against error, fraud and other criminal activity, collect money, enforce our terms and conditions, and as otherwise described to you at the time of collection of such information.
              </p>
            </section>

            {/* Section: Merchant Info */}
            <section className="space-y-4">
               <div className="flex items-center gap-3 text-navy">
                <UserCircle className="w-5 h-5 text-blue" />
                <h2 className="text-xl font-bold uppercase tracking-tight">4. Account information of Merchants</h2>
              </div>
              <p>
                If you create an account to take advantage of the full range of services offered on Razorpay, we ask for and record Personal Information such as your name, email address and mobile number. We may collect and store your Sensitive Personal Data or Information (such as any financial information including inter alia credit card, debit card details, bank account and know your customer ("KYC") documents as per RBI regulations and any other information as may be applicable) that the User may opt to save in the User account created with Razorpay.
              </p>
              <p>
                We use your email address to send you updates, news, and newsletters and contact you on behalf of other Users. We use your mobile numbers to send you transaction alerts and SMS alerts based on your preferences.
              </p>
            </section>

            {/* Section: Cookies */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-navy">
                <Globe className="w-5 h-5 text-blue" />
                <h2 className="text-xl font-bold uppercase tracking-tight">5. Cookies</h2>
              </div>
              <p>
                We send cookies to your computer in order to uniquely identify your browser and improve the quality of our service. The term "cookies" refers to small pieces of information that a website sends to your computer's hard drive while you are viewing the site. Razorpay uses third party tools, who may collect anonymous information about your visits to Razorpay using cookies, and interaction with Razorpay products and services.
              </p>
            </section>

            {/* Acceptance Footer */}
            <div className="mt-16 pt-10 border-t border-slate-100 bg-slate-50/50 -mx-10 lg:-mx-16 px-10 lg:px-16 py-10 rounded-b-[3rem]">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Owner</p>
                    <p className="text-sm font-bold text-navy uppercase">WISVORA PEAK PRIVATE LIMITED</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grievance Officer</p>
                    <p className="text-sm font-bold text-navy">DPO Mr. SHASHANK KARINCHETI</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Email</p>
                    <p className="text-sm font-bold text-blue underline">wisvorapeak@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jurisdiction</p>
                    <p className="text-sm font-bold text-navy">Bengaluru, India</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
