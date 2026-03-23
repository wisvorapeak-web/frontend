import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  MapPin, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  RefreshCcw,
  Hotel,
  Palmtree,
  Loader2
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminVenue() {
  const [settings, setSettings] = useState<any>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newImage, setNewImage] = useState({ image_url: '', caption: '', category: 'venue' });

  useEffect(() => {
    fetchVenueData();
  }, []);

  const fetchVenueData = async () => {
    try {
      const [settingsRes, galleryRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue`, {
          credentials: 'include'
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue/gallery`, {
          credentials: 'include'
        })
      ]);

      if (settingsRes.ok) setSettings(await settingsRes.json());
      if (galleryRes.ok) setGallery(await galleryRes.json());
    } catch (err) {
      console.error('Failed to fetch venue data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(settings)
      });
      if (res.ok) toast.success('Venue details updated successfully');
    } catch (err) {
      toast.error('Failed to update venue');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImage.image_url) return toast.error('Image URL is required');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue/gallery`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(newImage)
      });
      if (res.ok) {
        toast.success('Image added to gallery');
        setNewImage({ image_url: '', caption: '', category: 'venue' });
        fetchVenueData();
      }
    } catch (err) {
      toast.error('Failed to add image');
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Image removed');
        setGallery(gallery.filter(img => img.id !== id));
      }
    } catch (err) {
      toast.error('Failed to remove image');
    }
  };

  if (loading) return <AdminLayout><div className="p-12 flex items-center gap-3 text-slate-400 font-bold"><Loader2 className="w-5 h-5 animate-spin" /> Loading venue...</div></AdminLayout>;
  
  return (
    <AdminLayout>
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20 font-outfit">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Venue & Gallery</h1>
            <p className="text-slate-500 font-medium">Update venue information and photo gallery.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button 
               variant="outline" 
               onClick={fetchVenueData}
               className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6 bg-white shadow-sm font-outfit"
             >
               <RefreshCcw className="w-4 h-4 text-slate-400" /> Refresh
             </Button>
             <Button 
               onClick={handleUpdateSettings}
               disabled={isUpdating}
               className="rounded-xl bg-navy hover:bg-zinc-900 font-bold shadow-lg shadow-navy/20 gap-2 h-11 px-8 font-outfit"
             >
               {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save
             </Button>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-slate-100 p-1 rounded-2xl mb-10 h-14 w-full md:w-auto overflow-x-auto flex gap-1">
            <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><MapPin className="w-4 h-4" /> Location</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><ImageIcon className="w-4 h-4" /> Gallery</TabsTrigger>
             <TabsTrigger value="hospitality" className="data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm rounded-xl font-bold text-xs h-full px-8 gap-2 font-outfit"><Hotel className="w-4 h-4" /> Hotels & Travel</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-bold font-outfit">Venue Details</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Host City</Label>
                      <Input 
                        value={settings?.host_city || ''} 
                        onChange={(e) => setSettings({ ...settings, host_city: e.target.value })}
                        className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-400 ml-1">Venue Name</Label>
                      <Input 
                        value={settings?.venue_name || ''} 
                        onChange={(e) => setSettings({ ...settings, venue_name: e.target.value })}
                        className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 ml-1">Address</Label>
                    <Input 
                      value={settings?.venue_address || ''} 
                      onChange={(e) => setSettings({ ...settings, venue_address: e.target.value })}
                      className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-400 ml-1">Google Maps Link</Label>
                    <Input 
                      value={settings?.map_url || ''} 
                      onChange={(e) => setSettings({ ...settings, map_url: e.target.value })}
                      className="h-12 bg-slate-50 border-none rounded-2xl font-bold font-outfit" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-navy text-white p-2">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-bold font-outfit">Description</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-white/30 ml-1">Details</Label>
                    <Textarea 
                      value={settings?.venue_description || ''} 
                      onChange={(e) => setSettings({ ...settings, venue_description: e.target.value })}
                      className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl font-medium text-white leading-relaxed font-outfit" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-white/30 ml-1">Virtual Tour</Label>
                    <Input 
                      value={settings?.virtual_tour_url || ''} 
                      onChange={(e) => setSettings({ ...settings, virtual_tour_url: e.target.value })}
                      className="h-12 bg-white/5 border-white/10 rounded-2xl font-bold text-white font-outfit" 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Upload Section */}
                <Card className="lg:col-span-1 border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-slate-50 p-2 h-fit">
                   <CardHeader className="p-6 pb-2 text-center">
                      <CardTitle className="text-lg font-bold font-outfit">Add Photo</CardTitle>
                   </CardHeader>
                   <CardContent className="p-6 space-y-4">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-bold text-slate-400">Image URL</Label>
                         <Input 
                           value={newImage.image_url} 
                           onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                           placeholder="Image URL..."
                           className="h-10 bg-white border-slate-100 rounded-xl text-xs font-outfit" 
                         />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-bold text-slate-400">Caption</Label>
                         <Input 
                           value={newImage.caption} 
                           onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                           placeholder="Caption..."
                           className="h-10 bg-white border-slate-100 rounded-xl text-xs font-outfit" 
                         />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-bold text-slate-400">Category</Label>
                         <select 
                           value={newImage.category} 
                           onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                           className="w-full h-10 bg-white border border-slate-100 rounded-xl text-xs px-3 font-outfit"
                         >
                            <option value="venue">Venue</option>
                            <option value="accommodation">Accommodation</option>
                            <option value="tourism">Tourism</option>
                            <option value="past_event">Past Event</option>
                         </select>
                      </div>
                      <Button onClick={handleAddImage} className="w-full bg-blue text-white rounded-xl h-11 font-bold shadow-lg shadow-blue/10 gap-2 font-outfit">
                         <Plus className="w-4 h-4" /> Add to Gallery
                      </Button>
                   </CardContent>
                </Card>

                {/* Gallery List */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                   {gallery.map((img) => (
                     <div key={img.id} className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                           <img src={img.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={img.caption} />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                           <div>
                              <p className="text-xs font-bold text-navy truncate max-w-[140px] font-outfit">{img.caption || 'No caption'}</p>
                              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter font-outfit">{img.category}</p>
                           </div>
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             onClick={() => handleDeleteImage(img.id)}
                             className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg"
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="hospitality">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                   <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-blue/5 rounded-lg"><Hotel className="w-5 h-5 text-blue" /></div>
                       <CardTitle className="text-xl font-bold font-outfit">Hotels</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                     <Textarea 
                       value={settings?.accommodation_info || ''} 
                       onChange={(e) => setSettings({ ...settings, accommodation_info: e.target.value })}
                       className="min-h-[200px] bg-slate-50 border-none rounded-3xl p-6 font-medium text-slate-600 leading-relaxed font-outfit" 
                       placeholder="Information about hotels and shuttles."
                     />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-2">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-emerald-50 rounded-lg"><Palmtree className="w-5 h-5 text-emerald-600" /></div>
                       <CardTitle className="text-xl font-bold font-outfit">Tourism</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8">
                     <Textarea 
                       value={settings?.tourism_info || ''} 
                       onChange={(e) => setSettings({ ...settings, tourism_info: e.target.value })}
                       className="min-h-[200px] bg-slate-50 border-none rounded-3xl p-6 font-medium text-slate-600 leading-relaxed font-outfit" 
                       placeholder="Information about local attractions."
                     />
                  </CardContent>
                </Card>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
