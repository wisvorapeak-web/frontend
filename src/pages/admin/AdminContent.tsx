import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  X,
  Loader2,
  MessageSquare,
  Star,
  Users,
  BarChart,
  Plane,
  Edit2,
  Layout,
  Info,
  Save
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

const tableConfig: any = {
  faqs: { title: 'FAQs', endpoint: 'faqs', fields: [{ name: 'question', type: 'text' }, { name: 'answer', type: 'textarea' }, { name: 'display_order', type: 'number' }], icon: MessageSquare },
  testimonials: { title: 'Testimonials', endpoint: 'testimonials', fields: [{ name: 'name', type: 'text' }, { name: 'role', type: 'text' }, { name: 'quote', type: 'textarea' }, { name: 'image_url', type: 'text' }, { name: 'display_order', type: 'number' }], icon: Star },
  audiences: { title: 'Audiences', endpoint: 'audiences', fields: [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'benefits', type: 'json_array' }, { name: 'icon_name', type: 'text' }, { name: 'link_path', type: 'text' }, { name: 'display_order', type: 'number' }], icon: Users },
  metrics: { title: 'Metrics', endpoint: 'metrics', fields: [{ name: 'label', type: 'text' }, { name: 'value', type: 'text' }, { name: 'icon_name', type: 'text' }, { name: 'display_order', type: 'number' }], icon: BarChart },
  travel: { title: 'Travel', endpoint: 'travel-info', fields: [{ name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'icon_name', type: 'text' }, { name: 'display_order', type: 'number' }], icon: Plane }
};

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('faqs');
  const [data, setData] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  useEffect(() => { 
    if (['hero', 'about'].includes(activeTab)) {
        fetchSettings();
    } else {
        fetchData(); 
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}`, { credentials: 'include' });
      if (res.ok) setData(await res.json());
    } catch (err) { toast.error(`Load error`); } finally { setLoading(false); }
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`);
      if (res.ok) setSettings(await res.json());
    } catch (err) { toast.error('Settings sync failed'); } finally { setLoading(false); }
  };

  const handleUpdateSettings = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ settings })
      });
      if (res.ok) { toast.success('Updates saved'); fetchSettings(); }
    } catch (err) { toast.error('Update error'); } finally { setIsUpdating(false); }
  };

  const updateSettingsKey = (k: string, v: any) => setSettings((p: any) => ({ ...p, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentItem.id ? 'PATCH' : 'POST';
    const url = currentItem.id ? `${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}/${currentItem.id}` : `${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}`;
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(currentItem) });
      if (res.ok) { toast.success('Changes saved'); setIsEditing(false); fetchData(); } else { throw new Error(); }
    } catch (err) { toast.error('Operation failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this item?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${tableConfig[activeTab].endpoint}/${id}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) { toast.success('Entry removed'); fetchData(); }
    } catch (err) { toast.error('Delete failed'); }
  };

  const config = tableConfig[activeTab];

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-none">Site Content</h1>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-tight font-bold opacity-70">Manage site text and images</p>
          </div>
          <div className="flex items-center gap-3">
             {['hero', 'about'].includes(activeTab) ? (
                <Button onClick={handleUpdateSettings} disabled={isUpdating} className="h-10 px-6 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest transition-none shadow-sm">
                    {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Deploy Updates
                </Button>
             ) : (
                <Button 
                    onClick={() => {
                        const newItem: any = { display_order: data.length + 1 };
                        config.fields.forEach((f: any) => { if (f.type === 'json_array') newItem[f.name] = []; else newItem[f.name] = ''; });
                        setCurrentItem(newItem);
                        setIsEditing(true);
                    }}
                    className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-6 transition-none gap-2 rounded"
                >
                    <Plus className="w-4 h-4" /> Add New
                </Button>
             )}
          </div>
        </div>

        <Tabs defaultValue="faqs" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-100/50 p-1 rounded mb-6 flex flex-wrap h-auto gap-1 border border-slate-200 w-fit">
            {[
                 {v:'hero', t:'Hero Section', i:Layout},
                 {v:'about', t:'About Page', i:Info},
                 ...Object.entries(tableConfig).map(([k, c]: any) => ({ v:k, t:c.title, i:c.icon }))
            ].map((t: any) => (
              <TabsTrigger 
                key={t.v} 
                value={t.v}
                className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-slate-200 border border-transparent rounded px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-none h-9 flex items-center gap-2"
              >
                <t.i className="w-3.5 h-3.5" /> {t.t}
              </TabsTrigger>
            ))}
          </TabsList>


          <TabsContent value="hero" className="mt-0">
            <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">Main Page Header</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-5 italic font-bold">
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Big Title</Label><Input value={settings.hero_title || ''} onChange={e => updateSettingsKey('hero_title', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Tagline / Text</Label><Textarea value={settings.hero_tagline || ''} onChange={e => updateSettingsKey('hero_tagline', e.target.value)} className="min-h-[100px] bg-slate-50 border-slate-200 rounded text-sm transition-none resize-none shadow-none" /></div>
                <div className="grid grid-cols-2 gap-5">
                    <ImageUploadInput label="Background Image" value={settings.hero_image_url || '/hero.png'} onChange={v => updateSettingsKey('hero_image_url', v)} className="h-auto" />
                    <div className="space-y-1.5 pt-px"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Summit Dates</Label><Input value={settings.event_dates || ''} onChange={e => updateSettingsKey('event_dates', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Global Reach</Label><Input value={settings.global_reach || ''} onChange={e => updateSettingsKey('global_reach', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                    <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Event City</Label><Input value={settings.city || ''} onChange={e => updateSettingsKey('city', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                </div>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-0">
            <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">About Page</CardTitle></CardHeader>
                <CardContent className="p-6 space-y-5 italic font-bold">
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Main Title</Label><Input value={settings.about_title || ''} onChange={e => updateSettingsKey('about_title', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Description</Label><Textarea value={settings.about_content || ''} onChange={e => updateSettingsKey('about_content', e.target.value)} className="min-h-[200px] bg-slate-50 border-slate-200 rounded text-sm transition-none resize-none shadow-none leading-relaxed" /></div>
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Our Approach Title</Label><Input value={settings.about_approach_title || ''} onChange={e => updateSettingsKey('about_approach_title', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Our Approach Text</Label><Textarea value={settings.about_approach_desc || ''} onChange={e => updateSettingsKey('about_approach_desc', e.target.value)} className="min-h-[100px] bg-slate-50 border-slate-200 rounded text-sm transition-none resize-none shadow-none" /></div>
                </CardContent>
            </Card>
          </TabsContent>

          {Object.keys(tableConfig).map(tabKey => (
            <TabsContent key={tabKey} value={tabKey} className="mt-0 outline-none">
              <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr className="divide-x divide-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Content</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-24">Order</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right w-32 pr-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 italic">
                    {loading ? (
                      <tr><td colSpan={3} className="px-6 py-20 text-center uppercase tracking-widest text-slate-300 font-bold text-[10px]"><Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" /> Loading...</td></tr>
                    ) : (data || []).length === 0 ? (
                      <tr><td colSpan={3} className="px-6 py-20 text-center uppercase tracking-widest text-slate-300 font-bold text-[10px]">No items found</td></tr>
                    ) : data.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 transition-none divide-x divide-slate-100">
                        <td className="px-6 py-4">
                          <div className="space-y-0.5">
                            <p className="text-sm font-bold text-slate-900 tracking-tight">{item[tableConfig[tabKey].fields[0].name]}</p>
                            <p className="text-[10px] font-bold text-slate-400 line-clamp-1 uppercase tracking-tight opacity-70">{String(item[tableConfig[tabKey].fields[1].name])}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{item.display_order}</span>
                        </td>
                        <td className="px-6 py-4 text-right pr-6 h-full">
                          <div className="flex justify-end gap-1 opacity-20 group-hover:opacity-100 transition-none">
                            <Button variant="ghost" size="icon" onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="h-8 w-8 text-slate-400 hover:text-blue-600 transition-none rounded">
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="h-8 w-8 text-slate-400 hover:text-red-600 transition-none rounded">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          ))}

        </Tabs>

        {isEditing && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm transition-none">
            <div className="relative w-full max-w-xl bg-white rounded border border-slate-200 shadow-2xl overflow-hidden transition-none">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Edit Item: {config.title}</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="h-8 w-8 text-slate-400 hover:text-slate-900 transition-none">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {config.fields.map((field: any) => {
                  if (field.name.includes('image_url') || field.name.includes('photo') || field.name.includes('icon')) {
                      return <ImageUploadInput key={field.name} label={field.name.replace('_', ' ')} value={currentItem[field.name] || ''} onChange={v => setCurrentItem({...currentItem, [field.name]: v})} />;
                  }
                  return (
                    <div key={field.name} className="space-y-1.5">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{field.name.replace('_', ' ')}</Label>
                      {field.type === 'textarea' ? (
                        <Textarea 
                          required
                          value={currentItem[field.name] || ''}
                          onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                          className="w-full h-32 bg-slate-50 border-slate-200 rounded text-sm transition-none font-medium resize-none shadow-none"
                        />
                      ) : field.type === 'json_array' ? (
                        <Input 
                          required
                          type="text"
                          value={Array.isArray(currentItem[field.name]) ? currentItem[field.name].join(', ') : currentItem[field.name]}
                          onChange={(e) => setCurrentItem({...currentItem, [field.name]: e.target.value.split(',').map((s: string) => s.trim())})}
                          className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none"
                          placeholder="Comma separated values"
                        />
                      ) : (
                        <Input 
                          required
                          type={field.type === 'number' ? 'number' : 'text'}
                          value={currentItem[field.name] || ''}
                          onChange={(e) => setCurrentItem({...currentItem, [field.name]: field.type === 'number' ? parseInt(e.target.value) : e.target.value})}
                          className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold shadow-none"
                        />
                      )}
                    </div>
                  );
                })}
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-10 border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-widest transition-none px-6 rounded">Discard</Button>
                  <Button type="submit" className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase text-[10px] tracking-widest transition-none px-8 rounded shadow-sm">Save Changes</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
