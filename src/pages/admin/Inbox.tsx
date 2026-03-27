/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Inbox as InboxIcon, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Star, 
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        const messages = Array.isArray(json) ? json : json.data || [];
        setMessages(messages);
        if (messages.length > 0) setSelectedMsg(messages[0]);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently remove this communication from the registry?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/inbox/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Communication removed');
        const updated = messages.filter(m => m.id !== id);
        setMessages(updated);
        setSelectedMsg(updated.length > 0 ? updated[0] : null);
      }
    } catch (err) {
      toast.error('Deletion failed');
    }
  };


  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + 
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading messages...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="h-full flex flex-col space-y-6 font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Communications Inbox</h1>
            <p className="text-sm text-slate-500 mt-1">Review and manage inquiries from the contact portal.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded border border-slate-200">
            <button className="px-5 py-1.5 text-xs font-bold bg-white text-blue-600 rounded shadow-sm">Inbox</button>
            <button className="px-5 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">Archive</button>
          </div>
        </div>

        {/* Messaging Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[calc(100vh-280px)] min-h-[600px]">
          {/* List Sidebar */}
          <div className="xl:col-span-4 bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden shadow-sm">
            {/* Search Bar */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  placeholder="Search inquiries..." 
                  className="w-full pl-10 h-10 bg-slate-50 border border-slate-200 rounded px-4 text-sm font-medium focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-none">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  className={`p-5 cursor-pointer flex flex-col gap-2 ${
                    selectedMsg?.id === msg.id 
                    ? 'bg-blue-50/50' 
                    : 'hover:bg-slate-50'
                  }`}
                >
                   <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${msg.status === 'Unread' ? 'bg-blue-600' : 'bg-transparent'}`} />
                       <p className="text-sm font-bold text-slate-900">{msg.name || `${msg.firstName} ${msg.lastName}`}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{formatTime(msg.createdAt)}</span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-slate-600 line-clamp-1">{msg.subject}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-medium">{msg.message}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                     <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200">{msg.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reading Pane */}
          <div className="xl:col-span-8 bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden shadow-sm">
             {selectedMsg ? (
               <div className="flex flex-col h-full">
                  {/* Pane Header */}
                  <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                       <Avatar className="w-12 h-12 border border-slate-200">
                         <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMsg.name}`} />
                         <AvatarFallback>{selectedMsg.name?.[0] || 'U'}</AvatarFallback>
                       </Avatar>
                       <div>
                         <h2 className="text-xl font-bold text-slate-900">{selectedMsg.name || `${selectedMsg.firstName} ${selectedMsg.lastName}`}</h2>
                         <p className="text-xs text-slate-500 font-bold">{selectedMsg.email}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="w-9 h-9 border-slate-200 text-slate-400 hover:text-blue-600">
                          <Star className={`w-4 h-4 ${selectedMsg.isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
                       </Button>
                       <Button 
                        variant="outline" size="icon" 
                        onClick={() => handleDelete(selectedMsg.id)}
                        className="w-9 h-9 border-slate-200 text-slate-400 hover:text-rose-600 transition-none"
                       >
                          <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                 </div>

                  {/* Message Body */}
                  <div className="flex-1 p-8 overflow-y-auto space-y-6">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase">Message Details</span>
                           <div className="text-[10px] text-slate-400 font-bold">Received: {formatTime(selectedMsg.createdAt)}</div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedMsg.subject}</h2>
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded min-h-[200px] text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap italic">
                          {selectedMsg.message}
                        </div>
                     </div>
                  </div>

                  {/* Reply Section */}
                  <div className="p-6 border-t border-slate-200 bg-white">
                     <div className="flex gap-3">
                        <Button className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded transition-none">
                           <Reply className="w-4 h-4 mr-2" /> Mark for Follow-up
                        </Button>
                        <Button variant="outline" className="flex-1 h-11 border-slate-200 text-slate-600 font-bold text-xs rounded transition-none">
                           <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Mark as Resolved
                        </Button>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-400">
                  <InboxIcon className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm font-bold">Select a message from the list to view its contents.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
