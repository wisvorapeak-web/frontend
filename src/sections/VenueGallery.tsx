import { useState, useEffect } from 'react';
import { Maximize2, Loader2 } from 'lucide-react';

const venueImagesFallback = [
  {
    image_url: '/venue-image-1.jpg',
    caption: 'Pragati Maidan Exterior',
    category: 'Venue'
  },
  {
    image_url: '/venue-image-2.jpg',
    caption: 'Grand Conference Hall',
    category: 'Venue'
  },
  {
    image_url: '/venue-image-3.jpg',
    caption: 'Networking Lounge',
    category: 'Lobby'
  },
  {
    image_url: '/venue-image-4.jpg',
    caption: 'City Skyline',
    category: 'Destination'
  }
];

export default function VenueGallery() {
  const [activeTab, setActiveTab] = useState(0);
  const [gallery] = useState<any[]>(venueImagesFallback);
  const [loading] = useState(false);

  useEffect(() => {
    // Static mode
  }, []);

  const currentImage = gallery[activeTab] || gallery[0] || venueImagesFallback[0];

  if (loading) return <div className="py-24 text-center text-slate-400 font-bold flex items-center justify-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading Gallery...</div>;

  return (
    <section className="py-12 bg-slate-50 overflow-hidden font-outfit">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="space-y-1 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue/5 border border-blue/10 rounded-full mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span className="text-[8px] font-black text-blue uppercase tracking-widest leading-none">Visual Registry</span>
            </div>
            <h2 className="text-2xl font-black text-navy leading-none uppercase tracking-tight">
              Event <span className="text-blue">Showcase</span>
            </h2>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
              State-of-the-art facilities hosting the summit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[280px] lg:h-[350px]">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative group rounded-2xl overflow-hidden shadow-xl shadow-navy/5 bg-slate-200">
                <img 
                    src={currentImage.image_url} 
                    alt={currentImage.caption}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 space-y-0.5">
                    <p className="text-[7px] font-black text-blue tracking-[0.2em] uppercase">{currentImage.category}</p>
                    <h3 className="text-sm font-black text-white uppercase tracking-tight leading-none">{currentImage.caption}</h3>
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white hover:bg-white hover:text-navy transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                </button>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {gallery.map((img, i) => (
              <div 
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative cursor-pointer group rounded-xl overflow-hidden min-h-[80px] border-2 transition-all duration-500 ${activeTab === i ? 'border-blue shadow-lg shadow-blue/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                  <img 
                    src={img.image_url} 
                    alt={img.caption} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${activeTab === i ? 'bg-blue/10' : 'bg-black/40 group-hover:bg-black/20'}`} />
                  <div className="absolute bottom-2 left-3">
                    <h4 className="text-[7px] font-black text-white uppercase tracking-wider leading-none">{img.caption}</h4>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
