import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Globe, 
  Shield, 
  Search, 
  Loader2,
  Phone,
  Twitter,
  Save,
  RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

export default function SiteSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`);
      if (res.ok) setSettings(await res.json());
    } catch (err) { toast.error('Cloud synchronization failed'); } finally { setLoading(false); }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ settings })
      });
      if (res.ok) { toast.success('Registry updated successfully'); fetchSettings(); } else { toast.error('Sync failed'); }
    } catch (err) { toast.error('Update error'); } finally { setIsUpdating(false); }
  };

  const updateKey = (k: string, v: any) => setSettings((p: any) => ({ ...p, [k]: v }));

  if (loading) return <AdminLayout><div className="p-12 text-xs font-bold text-slate-400 uppercase tracking-widest">Initialising core parameters...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 leading-none">System Configuration</h1>
             <p className="text-sm text-slate-500 mt-1 uppercase tracking-tight font-bold opacity-70">Global Variables Registry</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" onClick={fetchSettings} className="h-10 px-4 rounded border-slate-200 font-bold text-[10px] uppercase tracking-widest transition-none italic">
                <RefreshCcw className="w-3.5 h-3.5 mr-2" /> Re-Sync
             </Button>
             <Button onClick={handleUpdate} disabled={isUpdating} className="h-10 px-6 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest transition-none shadow-sm">
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Deploy Updates
             </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded mb-8 flex flex-wrap h-auto gap-1 border border-slate-200 w-fit">
            {[ 
              {v:'general', l:'Identity', i:Globe}, {v:'contact', l:'Contact', i:Phone}, 
              {v:'social', l:'Social', i:Twitter}, {v:'seo', l:'SEO', i:Search}
            ].map(t => (
              <TabsTrigger key={t.v} value={t.v} className="data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded border border-transparent px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-none h-9 flex items-center gap-2">
                <t.i className="w-3.5 h-3.5" /> {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <TabsContent value="general" className="mt-0">
                <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">Global Brand Context</CardTitle></CardHeader>
                  <CardContent className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5 italic font-bold">
                      <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Platform Name</Label><Input value={settings.site_title || ''} onChange={e => updateKey('site_title', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                      <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Official Tagline</Label><Input value={settings.site_tagline || ''} onChange={e => updateKey('site_tagline', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Ticker Symbol</Label><Input value={settings.currency || '$'} onChange={e => updateKey('currency', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none text-center font-black" /></div>
                      <div className="col-span-2">
                        <ImageUploadInput label="Asset Asset (Logo)" value={settings.logo_url || '/logo.png'} onChange={v => updateKey('logo_url', v)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="mt-0">
                <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">Access Registry</CardTitle></CardHeader>
                  <CardContent className="p-6 space-y-5 italic font-bold">
                    <div className="grid grid-cols-2 gap-5">
                       <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Registry Email</Label><Input value={settings.contact_email || ''} onChange={e => updateKey('contact_email', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                       <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Support Line</Label><Input value={settings.contact_phone || ''} onChange={e => updateKey('contact_phone', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                    </div>
                    <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Headquarters Location</Label><Input value={settings.contact_address || ''} onChange={e => updateKey('contact_address', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" /></div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="mt-0">
                <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">Network Links</CardTitle></CardHeader>
                  <CardContent className="p-6 space-y-5">
                    {['linkedin', 'twitter', 'facebook', 'instagram'].map(s => (
                      <div key={s} className="space-y-1.5 italic font-bold"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1 capitalize">{s} URL</Label><Input value={settings[`${s}_url`] || ''} onChange={e => updateKey(`${s}_url`, e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-[11px] transition-none" /></div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="mt-0">
                 <Card className="border border-slate-200 shadow-none rounded overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 p-6"><CardTitle className="text-sm font-bold uppercase tracking-widest">Indexing Metadata</CardTitle></CardHeader>
                  <CardContent className="p-6 space-y-5 italic font-bold">
                    <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Search Keywords</Label><Input value={settings.meta_keywords || ''} onChange={e => updateKey('meta_keywords', e.target.value)} className="h-10 bg-slate-50 border-slate-200 rounded text-xs transition-none" /></div>
                    <div className="space-y-1.5"><Label className="text-[10px] text-slate-400 uppercase tracking-widest ml-1">Meta Descriptor</Label><Textarea value={settings.meta_description || ''} onChange={e => updateKey('meta_description', e.target.value)} className="min-h-[100px] bg-slate-50 border-slate-200 rounded text-xs transition-none resize-none shadow-none italic" /></div>
                  </CardContent>
                </Card>
              </TabsContent>

            </div>

            <div className="space-y-6">
               <Card className="border border-slate-200 shadow-none rounded overflow-hidden h-fit">
                  <CardHeader className="bg-slate-900 border-b border-slate-800 p-6 text-white"><CardTitle className="text-xs font-bold uppercase tracking-widest opacity-60">System Information</CardTitle></CardHeader>
                  <CardContent className="p-6 space-y-6 font-bold uppercase tracking-widest text-[9px]">
                     <div className="flex justify-between pb-2 border-b border-slate-100 text-slate-500"><span>Registry Size</span><span className="text-slate-900 font-bold">{Object.keys(settings).length} Keys</span></div>
                     <div className="flex justify-between pb-2 border-b border-slate-100 text-slate-500"><span>Connectivity</span><span className="text-blue-600">Established</span></div>
                     <div className="flex justify-between text-slate-500"><span>Synchronisation</span><span className="text-slate-900 lowercase italic font-normal">Auto-active</span></div>
                  </CardContent>
               </Card>
               <div className="bg-blue-50 border border-blue-100 p-6 rounded space-y-3 italic">
                  <div className="flex items-center gap-2 text-blue-600 border-b border-blue-200/50 pb-2"><Shield className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Guard Protocol</span></div>
                  <p className="text-[11px] font-bold text-blue-900 opacity-80 leading-relaxed uppercase tracking-tighter">Updating core parameters affects global platform UI immediately upon deployment.</p>
               </div>
            </div>
          </div>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
