import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Globe, 
  Layout, 
  Save, 
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminTopics() {
  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<any>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/topics`, {
        credentials: 'include'
      });
      if (res.ok) setTopics(await res.json());
    } catch (err) {
      toast.error('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentTopic.id ? 'PATCH' : 'POST';
    const url = currentTopic.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/topics/${currentTopic.id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/topics`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(currentTopic)
      });

      if (res.ok) {
        toast.success(currentTopic.id ? 'Topic updated' : 'Topic created');
        setIsEditing(false);
        fetchTopics();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error('Failed to save topic');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this topic?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/topics/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Topic deleted');
        fetchTopics();
      }
    } catch (err) {
      toast.error('Failed to delete topic');
    }
  };

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 font-outfit">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Topics</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">Add and edit topics.</p>
        </div>
        <button 
          onClick={() => {
            setCurrentTopic({ title: '', description: '', icon_name: 'Globe', color_gradient: 'from-blue-600 to-indigo-400', display_order: topics.length + 1 });
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-blue/20 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue transition-colors" />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all shadow-sm"
            />
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-navy/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Topic</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Icon</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Order</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <Loader2 className="w-6 h-6 text-blue animate-spin mx-auto mb-2" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading...</span>
                      </td>
                    </tr>
                  ) : filteredTopics.map((topic) => (
                    <tr key={topic.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-xs font-black text-navy uppercase tracking-tight">{topic.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 line-clamp-1 italic">{topic.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${topic.color_gradient} mx-auto flex items-center justify-center text-white shadow-lg`}>
                          <Globe className="w-4 h-4" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black">
                          {topic.display_order}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setCurrentTopic(topic);
                              setIsEditing(true);
                            }}
                            className="p-2 text-slate-400 hover:text-blue hover:bg-blue/5 rounded-lg transition-all"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(topic.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-navy rounded-[2rem] p-6 text-white shadow-2xl shadow-navy/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-blue/10 rounded-full blur-3xl group-hover:bg-blue/20 transition-all" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                <Layout className="w-6 h-6 text-blue" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Topics</h3>
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed mt-1">
                  You have {topics.length} topics. These will show on the home page.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-[2rem] p-6 space-y-3">
            <div className="flex items-center gap-3 text-amber-600">
               <AlertCircle className="w-5 h-5" />
               <span className="text-[11px] font-black uppercase tracking-widest">Info</span>
            </div>
            <p className="text-[10px] font-bold text-amber-700 leading-relaxed opacity-80">
              The list order determines the display sequence.
            </p>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setIsEditing(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-navy uppercase tracking-tight">
                  {currentTopic.id ? 'Edit Topic' : 'Add Topic'}
                </h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Details</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:text-navy hover:bg-white rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    required 
                    type="text"
                    value={currentTopic.title}
                    onChange={(e) => setCurrentTopic({...currentTopic, title: e.target.value})}
                    placeholder="e.g. Smart Farming"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all font-outfit"
                  />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">List Order</label>
                   <input 
                    required 
                    type="number"
                    value={currentTopic.display_order}
                    onChange={(e) => setCurrentTopic({...currentTopic, display_order: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all font-outfit"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  required 
                  rows={2}
                  value={currentTopic.description}
                  onChange={(e) => setCurrentTopic({...currentTopic, description: e.target.value})}
                  placeholder="Description..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all font-outfit resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Icon</label>
                   <input 
                    type="text"
                    value={currentTopic.icon_name}
                    onChange={(e) => setCurrentTopic({...currentTopic, icon_name: e.target.value})}
                    placeholder="Globe, Zap, Database..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Color</label>
                   <input 
                    type="text"
                    value={currentTopic.color_gradient}
                    onChange={(e) => setCurrentTopic({...currentTopic, color_gradient: e.target.value})}
                    placeholder="from-blue-600 to-indigo-400"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:ring-4 focus:ring-blue/5 focus:border-blue/20 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="px-8 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue transition-all shadow-xl shadow-navy/20 active:scale-95 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
