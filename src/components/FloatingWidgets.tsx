import { useEffect } from 'react';
import { MessageSquare, PhoneCall, Linkedin } from 'lucide-react';

export default function FloatingWidgets() {
  useEffect(() => {
    // --- Tawk.to Integration ---
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_TAWK_ID/default'; // USER needs to replace this
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode?.insertBefore(s1, s0);

    return () => {
       // Cleanup if needed
    };
  }, []);

  const openWhatsapp = () => {
    window.open('https://wa.me/91XXXXXXXXXX', '_blank'); // USER needs to replace number
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-1000">
       {/* LinkedIn Link */}
       <a 
          href="https://linkedin.com/company/polymers2026" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white text-[#0077b5] rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-slate-100"
       >
          <Linkedin className="w-6 h-6 fill-current" />
       </a>

       {/* WhatsApp Widget */}
       <button 
          onClick={openWhatsapp}
          className="w-14 h-14 bg-[#25d366] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-none"
       >
          <PhoneCall className="w-6 h-6 fill-current" />
       </button>

       {/* Custom Chat Indication (for Tawk) */}
       <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-none">
          <MessageSquare className="w-6 h-6" />
       </div>
    </div>
  );
}
