/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { 
  Globe, 
  Shield, 
  Database, 
  Smartphone, 
  Search, 
  Save, 
  RefreshCcw,
  Key,
  Phone,
  Twitter,
  Settings as SettingIcon
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function SiteSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`);
      if (res.ok) setSettings(await res.json());
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}`
        },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        toast.success('Site settings deployed to main branch');
      } else {
        toast.error('Deployment failed');
      }
    } catch (err) {
      toast.error('Error deploying changes');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-[10px] font-black uppercase tracking-widest text-slate-400 p-12">Loading Protocols...</div></AdminLayout>;
  if (!settings) return null;
  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 font-outfit">Admin Settings</h1>
            <p className="text-slate-500 font-medium">Manage your website's main information and search appearance.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6 bg-white shadow-sm">
               <RefreshCcw className="w-4 h-4 text-slate-400" /> Reset Default
             </Button>
              <Button 
               onClick={handleUpdate}
               disabled={isUpdating}
               className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-600/20 gap-2 h-11 px-8"
              >
                {isUpdating ? <><RefreshCcw className="w-4 h-4 animate-spin" /> Deploying...</> : <><Save className="w-4 h-4" /> Deploy Changes</>}
              </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-2xl mb-10 h-14 w-full md:w-auto overflow-x-auto scrollbar-none flex gap-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 uppercase tracking-widest"><Globe className="w-4 h-4" /> General</TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 uppercase tracking-widest"><Search className="w-4 h-4" /> SEO & Meta</TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 uppercase tracking-widest"><Key className="w-4 h-4" /> API & Bridges</TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 uppercase tracking-widest"><Smartphone className="w-4 h-4" /> Logo & Design</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Platform Identity */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-indigo-50 rounded-lg"><Globe className="w-5 h-5 text-indigo-500" /></div>
                         <CardTitle className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">Platform Identity</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">General information about the summit platform.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</Label>
                         <Input 
                            value={settings.site_title} 
                            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold" 
                          />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Official Tagline</Label>
                         <Input 
                            value={settings.site_tagline} 
                            onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-medium text-slate-600" 
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Currency</Label>
                           <Input 
                             value={settings.currency} 
                             onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</Label>
                           <Input 
                             value={settings.contact_email} 
                             onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold" 
                           />
                        </div>
                      </div>
                   </CardContent>
                </Card>

                {/* Contact Network */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-emerald-50 rounded-lg"><Phone className="w-5 h-5 text-emerald-500" /></div>
                         <CardTitle className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">Contact Network</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">Dynamic contact details for footer and support pages.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Direct Phone</Label>
                           <Input 
                             value={settings.contact_phone} 
                             onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Office Hours</Label>
                           <Input 
                             value={settings.office_hours} 
                             onChange={(e) => setSettings({ ...settings, office_hours: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Global HQ Address</Label>
                         <Input 
                            value={settings.contact_address} 
                            onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                          />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                         <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Active Status</p>
                         <Switch checked />
                      </div>
                   </CardContent>
                </Card>

                {/* Social Presence */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-blue/5 rounded-lg"><Twitter className="w-5 h-5 text-blue" /></div>
                         <CardTitle className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">Social Presence</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">Global handles for community engagement.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Twitter (X)</Label>
                           <Input 
                             value={settings.twitter_url} 
                             onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">LinkedIn</Label>
                           <Input 
                             value={settings.linkedin_url} 
                             onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Facebook</Label>
                           <Input 
                             value={settings.facebook_url} 
                             onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Instagram</Label>
                           <Input 
                             value={settings.instagram_url} 
                             onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold" 
                           />
                        </div>
                      </div>
                   </CardContent>
                </Card>

                {/* Maintenance Mode */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-slate-950 p-2 text-white relative overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                   <CardHeader className="p-8 pb-4 relative z-10">
                      <div className="flex items-center gap-3 mb-2 ">
                         <div className="p-2 bg-white/10 rounded-lg"><Shield className="w-5 h-5 text-white" /></div>
                         <CardTitle className="text-xl font-black font-outfit uppercase tracking-tight">Security & Protocol</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">Critical platform access controls.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6 relative z-10">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                        <div>
                          <p className="text-sm font-bold">Registration Portal</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 transition-colors">ALLOW NEW SCIENTISTS</p>
                        </div>
                        <Switch checked className="data-[state=checked]:bg-emerald-400" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                        <div>
                          <p className="text-sm font-bold">Scientific Review</p>
                          <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">OPEN FOR REVIEWERS</p>
                        </div>
                        <Switch checked />
                      </div>
                      <div className="pt-2">
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Global Overrides</p>
                         <Button className="w-full h-12 bg-white text-slate-950 hover:bg-slate-50 rounded-2xl font-black active:scale-95 transition-all shadow-xl shadow-slate-950/20">
                            ENTER MAINTENANCE MODE
                         </Button>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="seo">
             <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-slate-50 rounded-lg"><Search className="w-5 h-5 text-slate-400" /></div>
                       <CardTitle className="text-xl font-black text-slate-900 font-outfit">Discovery Optimization</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   <div className="space-y-2">
                      <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Meta Title Strategy</Label>
                      <Input defaultValue="| World Summit & Expo on Polymers 2026" className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold" />
                   </div>
                   <div className="space-y-2">
                      <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Meta Description</Label>
                      <Textarea defaultValue="Join the leading World Summit on Polymers and Composite Materials. Explore cutting-edge research in biopolymers, nanomaterials, and sustainable manufacturing in 2026." className="min-h-32 bg-slate-50 border-none rounded-[2rem] focus-visible:ring-indigo-500/10 font-medium text-slate-600 p-6 leading-relaxed resize-none" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="p-6 bg-slate-50 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-indigo-500"><SettingIcon className="w-4 h-4" /></div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Custom Robot.txt</h4>
                         </div>
                         <Button variant="outline" className="w-full rounded-xl bg-white font-bold h-10 px-4 border-slate-100 uppercase text-[9px] tracking-widest text-slate-400">Edit Direct File</Button>
                      </div>
                      <div className="p-6 bg-indigo-50/50 rounded-3xl space-y-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500 shadow-sm flex items-center justify-center text-white"><SettingIcon className="w-4 h-4" /></div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-600 transition-colors">Sitemap Control</h4>
                         </div>
                         <Button className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold h-10 px-4 text-white uppercase text-[9px] tracking-widest active:scale-95 transition-all">Regenerate Sitemap</Button>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="api">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardContent className="p-8 space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm">
                            <Database className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="text-xl font-black text-slate-900 font-outfit leading-tight ">Supabase DB Bridge</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACTIVE CONNECTION</p>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Project reference</Label>
                         <Input value="polymers-2026-prod" readOnly className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold text-slate-400" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Direct Connection string</Label>
                         <div className="relative group">
                            <Input type="password" value="**********************************************" readOnly className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10 font-bold" />
                            <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-100 rounded-lg">Show URL</Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-indigo-900 p-2 text-white relative h-full">
                   <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="w-20 h-20 bg-indigo-800 rounded-[2rem] flex items-center justify-center text-indigo-400 mb-2">
                         <Smartphone className="w-10 h-10" />
                      </div>
                      <div>
                         <h4 className="text-xl font-black font-outfit mb-2 leading-tight">Webhook Notifications</h4>
                         <p className="text-indigo-400 text-sm font-medium px-4">Receive real-time alerts on your administrative endpoint for critical platform events.</p>
                      </div>
                      <Button className="rounded-2xl bg-white text-indigo-900 hover:bg-indigo-50 font-black h-12 px-8 uppercase text-xs tracking-widest active:scale-95 transition-all">Configure Listener</Button>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
