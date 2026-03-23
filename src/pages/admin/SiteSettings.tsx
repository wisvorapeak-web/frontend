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
  Settings as SettingIcon,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface LegalContent {
  slug: string;
  title: string;
  content: string;
  updated_at: string;
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [legalItems, setLegalItems] = useState<LegalContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchLegal();
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

  const fetchLegal = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/legal`, {
        credentials: 'include'
      });
      if (res.ok) setLegalItems(await res.json());
    } catch (err) {
      console.error('Failed to fetch legal content:', err);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      // 1. Update Site Settings
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/settings/${settings.id || 1}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(settings)
      });

      // 2. Update Legal Content
      await Promise.all(legalItems.map(item => 
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/legal/${item.slug}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ title: item.title, content: item.content })
        })
      ));

      if (res.ok) {
        toast.success('Site settings and legal content updated successfully');
      } else {
        toast.error('Update failed');
      }
    } catch (err) {
      toast.error('Error deploying changes');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLegalChange = (slug: string, field: string, value: string) => {
    setLegalItems(prev => prev.map(item => item.slug === slug ? { ...item, [field]: value } : item));
  };

  if (loading) return <AdminLayout><div className="p-12 text-slate-400 font-bold flex items-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> Loading settings...</div></AdminLayout>;
  if (!settings) return null;
  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Settings</h1>
            <p className="text-slate-500 font-medium">Update your site information and search settings.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6 bg-white shadow-sm font-outfit">
               <RefreshCcw className="w-4 h-4 text-slate-400" /> Reset
             </Button>
              <Button 
               onClick={handleUpdate}
               disabled={isUpdating}
               className="rounded-xl bg-blue hover:bg-navy font-bold shadow-lg shadow-blue/20 gap-2 h-11 px-8 font-outfit"
              >
                {isUpdating ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving... </> : <><Save className="w-4 h-4" /> Save</>}
              </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-2xl mb-10 h-14 w-full md:w-auto overflow-x-auto scrollbar-none flex gap-1">
            <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Globe className="w-4 h-4" /> General</TabsTrigger>
            <TabsTrigger value="legal" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Shield className="w-4 h-4" /> Legal</TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Search className="w-4 h-4" /> Search (SEO)</TabsTrigger>
             <TabsTrigger value="api" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Key className="w-4 h-4" /> Advanced</TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Smartphone className="w-4 h-4" /> Branding</TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><SettingIcon className="w-4 h-4" /> Home Page</TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Database className="w-4 h-4" /> About</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Platform Identity */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-blue/5 rounded-lg"><Globe className="w-5 h-5 text-blue" /></div>
                         <CardTitle className="text-xl font-bold text-slate-900 font-outfit">Website Info</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">General information about your website.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Site Name</Label>
                         <Input 
                            value={settings.site_title} 
                            onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-bold font-outfit" 
                          />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Tagline</Label>
                         <Input 
                            value={settings.site_tagline} 
                            onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-medium text-slate-600 font-outfit" 
                          />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Currency</Label>
                           <Input 
                             value={settings.currency} 
                             onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-bold font-outfit" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Support Email</Label>
                           <Input 
                             value={settings.contact_email} 
                             onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-bold font-outfit" 
                           />
                        </div>
                      </div>
                   </CardContent>
                </Card>

                {/* Contact Network */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                       <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-emerald-50`}><Phone className="w-5 h-5 text-emerald-500" /></div>
                          <CardTitle className="text-xl font-bold text-slate-900 font-outfit">Contact Details</CardTitle>
                       </div>
                       <CardDescription className="text-slate-400 font-medium font-outfit">Contact info shown on the site.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Phone</Label>
                           <Input 
                             value={settings.contact_phone} 
                             onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Office Hours</Label>
                           <Input 
                             value={settings.office_hours} 
                             onChange={(e) => setSettings({ ...settings, office_hours: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Office Address</Label>
                         <Input 
                            value={settings.contact_address} 
                            onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                          />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                         <p className="text-xs font-bold text-emerald-600">Active Status</p>
                         <Switch checked />
                      </div>
                   </CardContent>
                </Card>

                {/* Social Presence */}
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-blue/5 rounded-lg"><Twitter className="w-5 h-5 text-blue" /></div>
                         <CardTitle className="text-xl font-bold text-slate-900 font-outfit">Social Media</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 font-medium font-outfit">Links to your social media pages.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-8 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Twitter (X)</Label>
                           <Input 
                             value={settings.twitter_url} 
                             onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">LinkedIn</Label>
                           <Input 
                             value={settings.linkedin_url} 
                             onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Facebook</Label>
                           <Input 
                             value={settings.facebook_url} 
                             onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-xs font-bold text-slate-400 ml-1">Instagram</Label>
                           <Input 
                             value={settings.instagram_url} 
                             onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                             className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                           />
                        </div>
                      </div>
                   </CardContent>
                </Card>

                {/* Maintenance Mode */}
                <Card className="border-none shadow-lg shadow-slate-200/40 rounded-2xl bg-slate-950 text-white relative overflow-hidden">
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                   <CardHeader className="p-6 pb-2 relative z-10">
                      <div className="flex items-center gap-3 mb-1 ">
                         <div className="p-1.5 bg-white/10 rounded-lg"><Shield className="w-4 h-4 text-white" /></div>
                         <CardTitle className="text-lg font-bold font-outfit">Website Status</CardTitle>
                      </div>
                      <CardDescription className="text-slate-400 text-xs font-medium font-outfit">Control visibility.</CardDescription>
                   </CardHeader>
                   <CardContent className="p-6 space-y-4 relative z-10">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                        <div>
                           <p className="text-xs font-bold uppercase tracking-tight">Registration</p>
                        </div>
                        <Switch checked className="data-[state=checked]:bg-emerald-400" />
                      </div>
                      <div className="pt-2">
                         <Button className="w-full h-10 bg-white text-slate-950 hover:bg-slate-50 rounded-xl font-bold text-xs active:scale-95 transition-all shadow-xl shadow-slate-950/20">
                             Go Maintenance
                         </Button>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="legal">
             <div className="space-y-8">
                {legalItems.map((item) => (
                   <Card key={item.slug} className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                      <CardHeader className="p-8 pb-4">
                         <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue/5 rounded-lg"><Shield className="w-5 h-5 text-blue" /></div>
                            <CardTitle className="text-xl font-bold text-slate-900 font-outfit">{item.title}</CardTitle>
                         </div>
                         <CardDescription className="text-slate-400 font-medium font-outfit">Edit text for {item.slug}.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 space-y-6">
                         <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 ml-1">Title</Label>
                            <Input 
                               value={item.title} 
                               onChange={(e) => handleLegalChange(item.slug, 'title', e.target.value)}
                               className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                             />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 ml-1">Content</Label>
                            <Textarea 
                               value={item.content} 
                               onChange={(e) => handleLegalChange(item.slug, 'content', e.target.value)}
                               className="min-h-64 bg-slate-50 border-none rounded-[2rem] font-medium text-slate-600 p-6 leading-relaxed font-outfit" 
                             />
                         </div>
                      </CardContent>
                   </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="seo">
             <Card className="border-none shadow-lg shadow-slate-200/40 rounded-2xl bg-white p-2">
                <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-1">
                       <div className="p-1.5 bg-slate-50 rounded-lg"><Search className="w-4 h-4 text-slate-400" /></div>
                        <CardTitle className="text-xl font-bold text-slate-900 font-outfit">SEO Settings</CardTitle>
                     </div>
                     <CardDescription className="text-slate-400 font-medium font-outfit">Change how your site appears in search engines.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-4">
                    <div className="space-y-1">
                       <Label className="text-xs font-bold text-slate-400 ml-1">Search Title</Label>
                       <Input value={settings.site_title} className="h-12 bg-slate-50 border-none rounded-xl font-bold font-outfit" />
                    </div>
                    <div className="space-y-1">
                       <Label className="text-xs font-bold text-slate-400 ml-1">Meta Description</Label>
                       <Textarea defaultValue="..." className="min-h-24 bg-slate-50 border-none rounded-xl font-medium text-slate-600 p-4 font-outfit resize-none" />
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
                              <h3 className="text-xl font-bold text-slate-900 font-outfit leading-tight ">Database Connection</h3>
                             <p className="text-xs font-bold text-slate-400">Active Connection</p>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Project Reference</Label>
                         <Input value="polymers-2026-prod" readOnly className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-bold text-slate-400 font-outfit" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-xs font-bold text-slate-400 ml-1">Database URL</Label>
                         <div className="relative group">
                            <Input type="password" value="**********************************************" readOnly className="h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-blue/10 font-bold font-outfit" />
                            <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-xs font-bold text-slate-400 hover:bg-slate-100 rounded-lg">Show URL</Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-navy p-2 text-white relative h-full">
                   <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center space-y-6">
                      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-blue mb-2">
                         <Smartphone className="w-10 h-10" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold font-outfit mb-2 leading-tight">System Notifications</h4>
                         <p className="text-slate-400 text-sm font-medium px-4">Get alerts for important website events.</p>
                      </div>
                      <Button className="rounded-2xl bg-white text-navy hover:bg-white/90 font-bold h-12 px-8 text-xs active:scale-95 transition-all">Set Up Alerts</Button>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>

          <TabsContent value="hero">
             <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-bold font-outfit">Home Page Header</CardTitle>
                    <CardDescription className="text-slate-400 font-medium">Control the main landing section of your homepage.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-slate-400 ml-1">Main Title</Label>
                       <Input 
                         value={settings.hero_title || ''} 
                         onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                         className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                       />
                   </div>
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-slate-400 ml-1">Welcome Text</Label>
                       <Textarea 
                         value={settings.hero_tagline || ''} 
                         onChange={(e) => setSettings({ ...settings, hero_tagline: e.target.value })}
                         className="min-h-24 bg-slate-50 border-none rounded-2xl font-medium p-4 leading-relaxed font-outfit" 
                       />
                   </div>
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-slate-400 ml-1">Header Image</Label>
                       <Input 
                         value={settings.hero_image_url || ''} 
                         onChange={(e) => setSettings({ ...settings, hero_image_url: e.target.value })}
                         className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                       />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-400 ml-1">Event Dates</Label>
                          <Input 
                            value={settings.event_dates || ''} 
                            onChange={(e) => setSettings({ ...settings, event_dates: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                            placeholder="e.g. November 18-20, 2026"
                          />
                      </div>
                      <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-400 ml-1">Global Reach</Label>
                          <Input 
                            value={settings.global_reach || ''} 
                            onChange={(e) => setSettings({ ...settings, global_reach: e.target.value })}
                            className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                            placeholder="e.g. 50+ Countries"
                          />
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="about">
             <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-navy p-2 text-white">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-bold font-outfit">About Content</CardTitle>
                    <CardDescription className="text-slate-400">Update your event's story and information.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-blue ml-1">Section Title</Label>
                       <Input 
                         value={settings.about_title || ''} 
                         onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                         className="h-12 bg-white/5 border-white/10 rounded-2xl font-bold text-white font-outfit" 
                       />
                   </div>
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-blue ml-1">Content</Label>
                       <Textarea 
                         value={settings.about_content || ''} 
                         onChange={(e) => setSettings({ ...settings, about_content: e.target.value })}
                         className="min-h-48 bg-white/5 border-white/10 rounded-2xl font-medium text-white leading-relaxed p-6 font-outfit" 
                       />
                   </div>
                   <div className="space-y-2">
                       <Label className="text-xs font-bold text-blue ml-1">About Image</Label>
                       <Input 
                         value={settings.about_image_url || ''} 
                         onChange={(e) => setSettings({ ...settings, about_image_url: e.target.value })}
                         className="h-12 bg-white/5 border-white/10 rounded-2xl font-bold text-white font-outfit" 
                       />
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
