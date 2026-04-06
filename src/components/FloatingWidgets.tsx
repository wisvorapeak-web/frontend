import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingWidgets() {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`)
      .then(res => res.json())
      .then(data => {
        if (data && data.whatsapp_number) {
          setWhatsappNumber(data.whatsapp_number);
        }
      })
      .catch(err => console.error('Failed to load WhatsApp settings:', err));
  }, []);

  const openTawk = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4 items-end">
       {/* WhatsApp Button */}
       {whatsappNumber && (
         <a 
            href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-all border-none group"
          aria-label="Contact us on WhatsApp"
       >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 group-hover:scale-110 transition-transform">
             <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.556 4.195 1.615 6L.252 24l6.14-1.611A11.972 11.972 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.996c-1.8 0-3.565-.483-5.116-1.401l-.367-.217-3.8.997 1.015-3.705-.239-.379A9.972 9.972 0 011.975 12.03c0-5.542 4.51-10.053 10.056-10.053 5.542 0 10.051 4.511 10.051 10.053s-4.509 10.052-10.051 10.052zm5.518-7.531c-.302-.152-1.792-.885-2.072-.987-.28-.101-.482-.152-.686.152-.202.303-.787.987-.962 1.189-.176.202-.353.228-.655.076-.303-.152-1.28-.472-2.438-1.503-.902-.803-1.509-1.794-1.685-2.098-.176-.303-.019-.467.132-.619.136-.137.303-.353.454-.53.152-.176.202-.303.303-.505.101-.202.05-.379-.025-.53-.075-.152-.684-1.645-.935-2.253-.245-.595-.494-.515-.684-.523-.176-.01-.379-.012-.582-.012-.202 0-.53.076-.808.379-.278.303-1.06 1.036-1.06 2.525s1.085 2.93 1.237 3.132c.152.202 2.138 3.262 5.176 4.57 2.222.955 2.871.86 3.399.782.684-.1 2.072-.846 2.362-1.666.29-.82.29-1.523.202-1.67-.087-.145-.316-.228-.618-.379z" />
          </svg>
       </a>
       )}

       <div className="group/stack relative">
          {/* Support Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover/stack:opacity-100 transition-all scale-95 group-hover/stack:scale-100 pointer-events-none origin-bottom-right">
             <div className="bg-white/95 backdrop-blur-xl border border-slate-100 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-navy whitespace-nowrap">Need help? We're online</span>
             </div>
          </div>

          {/* Tawk.to Chat Widget Trigger */}
          <button 
             onClick={openTawk}
             className="w-14 h-14 bg-indigo-600 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 hover:-rotate-12 active:scale-95 transition-all border-none group"
             aria-label="Open live chat"
          >
             <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
       </div>
    </div>
  );
}
