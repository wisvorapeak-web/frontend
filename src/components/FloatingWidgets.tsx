import { MessageSquare } from 'lucide-react';

export default function FloatingWidgets() {




  const openTawk = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] group/stack">
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
       >
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
       </button>
    </div>
  );
}
