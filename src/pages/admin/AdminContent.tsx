import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  X,
  Loader2,
  MessageSquare,
  Star,
  Users,
  BarChart,
  Plane,
  Edit2
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tableConfig: any = {
  faqs: { 
    title: 'FAQs', 
    endpoint: 'faqs', 
    fields: [
      { name: 'question', type: 'text' },
      { name: 'answer', type: 'textarea' },
      { name: 'display_order', type: 'number' }
    ], 
    icon: MessageSquare 
  },
  testimonials: { 
    title: 'Testimonials', 
    endpoint: 'testimonials', 
    fields: [
      { name: 'name', type: 'text' },
      { name: 'role', type: 'text' },
      { name: 'quote', type: 'textarea' },
      { name: 'image_url', type: 'text' },
      { name: 'display_order', type: 'number' }
    ], 
    icon: Star 
  },
  audiences: { 
    title: 'Audiences', 
    endpoint: 'audiences', 
    fields: [
      { name: 'title', type: 'text' },
      { name: 'subtitle', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'benefits', type: 'json_array' },
      { name: 'icon_name', type: 'text' },
      { name: 'link_path', type: 'text' },
      { name: 'display_order', type: 'number' }
    ], 
    icon: Users 
  },
  metrics: { 
    title: 'Metrics', 
    endpoint: 'metrics', 
    fields: [
      { name: 'label', type: 'text' },
      { name: 'value', type: 'text' },
      { name: 'icon_name', type: 'text' },
      { name: 'display_order', type: 'number' }
    ], 
    icon: BarChart 
  },
  travel: { 
    title: 'Travel', 
    endpoint: 'travel-info', 
    fields: [
      { name: 'title', type: 'text' },
      { name: 'description', type: 'textarea' },
      { name: 'icon_name', type: 'text' },
      { name: 'display_order', type: 'number' }
    ], 
    icon: Plane 
  }
};

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('faqs');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}`, {
        credentials: 'include'
      });
      if (res.ok) setData(await res.json());
    } catch (err) {
      toast.error(`Load error`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentItem.id ? 'PATCH' : 'POST';
    const url = currentItem.id 
      ? `${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}/${currentItem.id}`
      : `${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(currentItem)
      });

      if (res.ok) {
        toast.success('Saved');
        setIsEditing(false);
        fetchData();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error('Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Deleted');
        fetchData();
      }
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const config = tableConfig[activeTab];

  return (
    <div className="space-y-6 animate-in fade-in duration-700 font-outfit">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy uppercase tracking-tight">Website Content</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">Edit FAQs and testimonials.</p>
        </div>
        <button 
          onClick={() => {
            const newItem: any = { display_order: data.length + 1 };
            config.fields.forEach((f: any) => {
              if (f.type === 'json_array') newItem[f.name] = [];
              else newItem[f.name] = '';
            });
            setCurrentItem(newItem);
            setIsEditing(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-navy transition-all shadow-xl shadow-blue/20"
        >
          <Plus className="w-4 h-4" /> Add {config.title}
        </button>
      </div>

      <Tabs defaultValue="faqs" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-50 p-1 rounded-2xl mb-8 flex flex-wrap h-auto gap-1 border border-slate-100">
          {Object.entries(tableConfig).map(([key, cfg]: [string, any]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-black text-[10px] uppercase tracking-widest px-6 py-3 h-11 transition-all flex items-center gap-2"
            >
              <cfg.icon className="w-3.5 h-3.5" /> {cfg.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-navy/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Content</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-24">Order</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-blue" />
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    No items
                  </td>
                </tr>
              ) : data.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/30">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-navy uppercase tracking-tight">{item[config.fields[0].name]}</p>
                      <p className="text-[10px] font-bold text-slate-400 line-clamp-1 italic">{item[config.fields[1].name]}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-black text-slate-400">{item.display_order}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="p-2 text-slate-400 hover:text-blue hover:bg-blue/5 rounded-lg">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Tabs>

      {isEditing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setIsEditing(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-navy uppercase tracking-tight">Edit {config.title}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:text-navy rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-none">
              {config.fields.map((field: any) => (
                <div key={field.name} className="space-y-1.5 text-decoration-none">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.name.replace('_', ' ')}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      required
                      value={currentItem[field.name] || ''}
                      onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:border-blue/20 font-outfit resize-none"
                      rows={3}
                    />
                  ) : field.type === 'json_array' ? (
                    <input 
                      required
                      type="text"
                      value={Array.isArray(currentItem[field.name]) ? currentItem[field.name].join(', ') : currentItem[field.name]}
                      onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value.split(',').map((s: string) => s.trim())})}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:border-blue/20 font-outfit"
                      placeholder="Comma separated values"
                    />
                  ) : (
                    <input 
                      required
                      type={field.type === 'number' ? 'number' : 'text'}
                      value={currentItem[field.name] || ''}
                      onChange={(e) => setCurrentItem({...currentItem, [field.name]: field.type === 'number' ? parseInt(e.target.value) : e.target.value})}
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-navy focus:outline-none focus:border-blue/20 font-outfit"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest">Cancel</button>
                <button type="submit" className="px-10 py-3 bg-navy text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue transition-all">
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
