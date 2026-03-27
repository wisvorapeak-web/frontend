import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X
} from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

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
    if (!confirm('Permanently remove this research topic?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/topics/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Topic removed');
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

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12 uppercase tracking-widest">Loading topics...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Conference Topics</h1>
            <p className="text-sm text-slate-500 mt-1">Manage themes for abstract submission and website display.</p>
          </div>
          <Button 
            onClick={() => {
              setCurrentTopic({ title: '', description: '', icon_name: 'Globe', color_gradient: 'from-blue-600 to-indigo-400', display_order: topics.length + 1 });
              setIsEditing(true);
            }}
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 transition-none gap-2"
          >
            <Plus className="w-4 h-4" /> New Topic
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-none font-bold placeholder:font-normal text-slate-900"
              />
            </div>

            <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="divide-x divide-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Topic Details</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Order</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-6">Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 italic">
                    {filteredTopics.map((topic) => (
                      <tr key={topic.id} className="hover:bg-slate-50 transition-none group divide-x divide-slate-100">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            {topic.image_url && (
                              <div className="w-10 h-10 rounded overflow-hidden border border-slate-100 flex-shrink-0">
                                <img src={topic.image_url} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="space-y-0.5">
                              <p className="text-sm font-bold text-slate-900 tracking-tight">{topic.title}</p>
                              <p className="text-[11px] font-bold text-slate-400 line-clamp-1 uppercase tracking-tighter opacity-70">{topic.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200 text-[10px] font-bold">
                            {topic.display_order}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right pr-6 h-full">
                          <div className="flex items-center justify-end gap-1 opacity-20 group-hover:opacity-100 transition-none">
                            <Button 
                              variant="ghost" size="icon"
                              onClick={() => {
                                setCurrentTopic(topic);
                                setIsEditing(true);
                              }}
                              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-none"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" size="icon"
                              onClick={() => handleDelete(topic.id)}
                              className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-none"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTopics.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest opacity-60">
                           No topics found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded p-6 text-white shadow-sm overflow-hidden h-fit">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Total Topics</h3>
              <p className="text-3xl font-black italic">{topics.length}</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight mt-1">Themes published on website</p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded p-6 space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block border-b border-blue-200/50 pb-2 mb-2 italic">Topic Order</span>
              <p className="text-[11px] font-bold text-blue-900 leading-relaxed opacity-80 italic">
                The number you give to each topic sets the order they appear on the website.
              </p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm transition-none">
            <div className="relative w-full max-w-xl bg-white rounded border border-slate-200 shadow-2xl overflow-hidden transition-none">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                  {currentTopic.id ? 'Edit Topic' : 'New Topic'}
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="h-8 w-8 text-slate-400 hover:text-slate-900 transition-none">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5">
                <div className="grid grid-cols-5 gap-5">
                  <div className="col-span-3 space-y-1.5">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Topic Title</Label>
                    <Input 
                      required 
                      type="text"
                      value={currentTopic.title}
                      onChange={(e) => setCurrentTopic({...currentTopic, title: e.target.value})}
                      placeholder="e.g. Smart Farming"
                      className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold"
                    />
                  </div>
                  <div className="col-span-2 space-y-1.5">
                     <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Order Number</Label>
                     <input 
                      required 
                      type="number"
                      value={currentTopic.display_order}
                      onChange={(e) => setCurrentTopic({...currentTopic, display_order: parseInt(e.target.value)})}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-900 transition-none outline-none focus:ring-4 ring-blue-600/5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</Label>
                  <textarea 
                    required 
                    rows={3}
                    value={currentTopic.description}
                    onChange={(e) => setCurrentTopic({...currentTopic, description: e.target.value})}
                    placeholder="Provide a brief description of this topic..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-sm font-medium text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                     <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Icon Name</Label>
                     <Input 
                      type="text"
                      value={currentTopic.icon_name}
                      onChange={(e) => setCurrentTopic({...currentTopic, icon_name: e.target.value})}
                      placeholder="Globe, Zap, etc..."
                      className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                     <ImageUploadInput label="Topic Image" value={currentTopic.image_url || ''} onChange={v => setCurrentTopic({ ...currentTopic, image_url: v })} />
                  </div>
                </div>

                <div className="space-y-1.5">
                   <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Colors (CSS)</Label>
                   <Input 
                    type="text"
                    value={currentTopic.color_gradient}
                    onChange={(e) => setCurrentTopic({...currentTopic, color_gradient: e.target.value})}
                    placeholder="from-blue-600 to-indigo-400"
                    className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)} 
                    className="h-10 px-8 font-bold text-[10px] uppercase tracking-widest border-slate-200 text-slate-500 transition-none rounded"
                  >
                    Discard Changes
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-10 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest transition-none rounded shadow-sm flex items-center gap-2"
                  >
                    Save Topic
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
