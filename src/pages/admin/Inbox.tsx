/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Inbox as InboxIcon, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Reply, 
  Clock,
  MoreVertical,
  Paperclip
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

export default function Inbox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/inbox`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        if (data.length > 0) setSelectedMsg(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (loading) return <AdminLayout><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 p-12">Decrypting Communications...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="h-full flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-outfit">Contact Inbox</h1>
            <p className="text-slate-500 font-medium">Handle site inquiries, support tickets, and scientist communication.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="bg-slate-100 flex p-1 rounded-xl">
               <Button className="rounded-lg h-9 bg-white text-indigo-600 shadow-sm border-none font-bold text-xs px-4">Focused</Button>
               <Button variant="ghost" className="rounded-lg h-9 text-slate-500 font-bold text-xs px-4">Other</Button>
             </div>
          </div>
        </div>

        {/* Messaging Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[600px]">
          {/* List Sidebar */}
          <div className="xl:col-span-4 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-slate-50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 placeholder:font-medium"
                />
              </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50 scrollbar-none">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`p-6 cursor-pointer transition-all relative group ${
                    selectedMsg?.id === msg.id 
                    ? 'bg-indigo-50/50' 
                    : 'hover:bg-slate-50'
                  }`}
                >
                  {selectedMsg?.id === msg.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                  )}
                  
                   <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${msg.status === 'Unread' ? 'bg-indigo-500 animate-pulse' : 'bg-transparent'}`} />
                       <p className={`text-sm font-bold ${msg.status === 'Unread' ? 'text-slate-900' : 'text-slate-500'}`}>{msg.name}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{formatTime(msg.created_at)}</span>
                  </div>
                  
                  <h4 className={`text-xs font-bold mb-2 line-clamp-1 ${msg.status === 'Unread' ? 'text-slate-900' : 'text-slate-600'}`}>
                    {msg.subject}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">
                    {msg.message}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4">
                     {msg.isStarred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                     <span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full uppercase tracking-widest">{msg.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Pane */}
          <div className="xl:col-span-8 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col overflow-hidden">
             {selectedMsg ? (
               <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-10 duration-500">
                  {/* Pane Header */}
                  <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-4">
                       <Avatar className="w-12 h-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
                         <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMsg.name}`} />
                         <AvatarFallback>SJ</AvatarFallback>
                       </Avatar>
                       <div>
                         <h2 className="text-xl font-black text-slate-900 font-outfit leading-tight">{selectedMsg.name}</h2>
                         <p className="text-xs text-slate-400 font-bold">{selectedMsg.email}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                          <Star className={`w-5 h-5 ${selectedMsg.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-400 hover:text-red-500 hover:bg-rose-50 rounded-xl">
                          <Trash2 className="w-5 h-5" />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-10 h-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl">
                          <MoreVertical className="w-5 h-5" />
                       </Button>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="flex-1 p-10 overflow-y-auto scrollbar-none">
                     <div className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full tracking-widest">Scientific Inquiry</span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                             <Clock className="w-3.5 h-3.5" /> Received {formatTime(selectedMsg.created_at)}
                          </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 font-outfit mb-6 leading-tight">{selectedMsg.subject}</h2>
                     </div>

                     <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 leading-relaxed font-outfit text-base whitespace-pre-wrap">
                           {selectedMsg.message}
                        </p>
                        <p className="mt-8 text-slate-600 leading-relaxed font-outfit text-base">
                           Thank you for your assistance.
                        </p>
                     </div>

                     {/* Attachments Placeholder */}
                     {selectedMsg.id === 1 && (
                        <div className="mt-12 p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-flex items-center gap-4 group cursor-pointer hover:bg-indigo-50 transition-colors">
                           <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-500">
                              <Paperclip className="w-5 h-5" />
                           </div>
                           <div className="pr-4">
                              <p className="text-xs font-bold text-slate-900">Curriculum_Vitae.pdf</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2.1 MB • SCANNED</p>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Reply Section */}
                  <div className="p-8 border-t border-slate-50 bg-slate-50/20">
                     <div className="flex gap-4">
                        <Button className="rounded-xl grow bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 font-bold h-12 gap-2">
                           <Reply className="w-4 h-4" /> Compose Reply
                        </Button>
                        <Button variant="outline" className="rounded-xl font-bold h-12 border-slate-200 text-slate-600 px-6">
                           Forward
                        </Button>
                        <Button variant="outline" className="rounded-xl font-bold h-12 border-slate-200 text-slate-600 px-6">
                           <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Mark as Resolved
                        </Button>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                     <InboxIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 font-outfit leading-tight">No Message Selected</h3>
                  <p className="text-slate-400 text-sm font-medium max-w-sm">Select a conversation from the sidebar to read full communication thread.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
