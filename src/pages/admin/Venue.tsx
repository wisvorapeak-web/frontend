import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Plus, 
  Trash2, 
  Loader2,
  RefreshCw,
  Save,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

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
      toast.error('Sync failure: Could not retrieve venue records.');
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
      if (res.ok) {
          toast.success('Venue configuration updated.');
          await fetchVenueData(); // Refresh to get any server-side defaults
      } else {
          throw new Error();
      }
    } catch (err) {
      toast.error('Update failed: Check your connection or permissions.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddImage = async () => {
    if (!newImage.image_url) return toast.error('Asset source is required.');
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
        toast.success('Gallery entry added.');
        setNewImage({ image_url: '', caption: '', category: 'venue' });
        fetchVenueData();
      } else {
          throw new Error();
      }
    } catch (err) {
      toast.error('Add failed: Could not register gallery entry.');
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/venue/gallery/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Gallery entry removed.');
        setGallery(gallery.filter(img => img.id !== id || img._id !== id));
        fetchVenueData(); // Sync full state
      }
    } catch (err) {
      toast.error('Removal failed.');
    }
  };

  if (loading) return (
    <AdminLayout>
        <div className="flex items-center justify-center p-20 space-x-3">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Venue...</span>
        </div>
    </AdminLayout>
  );
  
  return (
    <AdminLayout>
      <div className="space-y-6 font-inter pb-20">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-none">Venue & Hospitality</h1>
            <p className="text-sm text-slate-500 mt-2">Manage event location, photos, and travel info.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button 
               variant="outline" 
               onClick={fetchVenueData}
               className="h-10 border-slate-200 font-bold text-slate-600 transition-none gap-2 px-6"
             >
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
             </Button>
             <Button 
               onClick={handleUpdateSettings}
               disabled={isUpdating}
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-8 transition-none gap-2 shadow-xl shadow-blue-600/20"
             >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isUpdating ? 'Saving...' : 'Save Changes'}
             </Button>
          </div>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-lg mb-8 h-12 flex w-fit">
            <TabsTrigger value="info" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md font-bold text-xs px-8 transition-none">Location</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md font-bold text-xs px-8 transition-none">Photos</TabsTrigger>
             <TabsTrigger value="hospitality" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md font-bold text-xs px-8 transition-none">Travel</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-0 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                  {/* Core Info */}
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Main Location</h3>
                    </div>
                    <div className="p-6 space-y-5">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Host City</Label>
                          <Input 
                            value={settings?.host_city || ''} 
                            onChange={(e) => setSettings({ ...settings, host_city: e.target.value })}
                            className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" 
                            placeholder="e.g. Guwahati, Assam"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Venue Name</Label>
                          <Input 
                            value={settings?.venue_name || ''} 
                            onChange={(e) => setSettings({ ...settings, venue_name: e.target.value })}
                            className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-bold" 
                            placeholder="e.g. World Summit Center"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Physical Address</Label>
                        <Input 
                          value={settings?.venue_address || ''} 
                          onChange={(e) => setSettings({ ...settings, venue_address: e.target.value })}
                          className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none font-medium" 
                          placeholder="Full street address..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Google Maps Link (URL)</Label>
                            <Input 
                              value={settings?.map_url || ''} 
                              onChange={(e) => setSettings({ ...settings, map_url: e.target.value })}
                              className="h-10 bg-slate-50 border-slate-200 rounded text-xs transition-none" 
                              placeholder="https://google.com/maps/..."
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Virtual Tour Link (URL)</Label>
                            <Input 
                              value={settings?.virtual_tour_url || ''} 
                              onChange={(e) => setSettings({ ...settings, virtual_tour_url: e.target.value })}
                              className="h-10 bg-slate-50 border-slate-200 rounded text-xs transition-none" 
                              placeholder="https://matterport.com/..."
                            />
                          </div>
                      </div>
                    </div>
                  </div>

                  {/* Extended Description */}
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Description</h3>
                    </div>
                    <div className="p-6">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Venue Summary</Label>
                      <Textarea 
                        value={settings?.venue_description || ''} 
                        onChange={(e) => setSettings({ ...settings, venue_description: e.target.value })}
                        className="min-h-[140px] bg-slate-50 border-slate-200 rounded text-sm transition-none font-medium leading-relaxed" 
                        placeholder="Write a brief description of the venue..."
                      />
                    </div>
                  </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                  {/* Primary Visual */}
                  <div className="bg-slate-900 rounded-lg p-6 text-white shadow-xl shadow-slate-900/10 h-fit">
                    <ImageUploadInput 
                        label="Main Venue Image" 
                        value={settings?.venue_image_url || ''} 
                        onChange={(v) => setSettings({ ...settings, venue_image_url: v })} 
                        className="text-white"
                    />
                    <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current City</p>
                                <p className="text-xs font-black truncate">{settings?.host_city || 'Undefined'}</p>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 space-y-3">
                       <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border-b border-blue-200 pb-2">Website Update</h4>
                       <p className="text-[11px] font-bold text-blue-900/60 leading-relaxed italic">
                           The changes you make here will show up on the public website venue and contact pages.
                       </p>
                  </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm h-fit sticky top-6">
                   <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Add New Photo</h3>
                   </div>
                   <div className="p-6 space-y-5">
                      <ImageUploadInput 
                        label="Photo Image" 
                        value={newImage.image_url} 
                        onChange={(v) => setNewImage({ ...newImage, image_url: v })} 
                      />
                      
                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Photo Caption</Label>
                         <Input 
                           value={newImage.caption} 
                           onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                           placeholder="Type a caption..."
                           className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none" 
                         />
                      </div>

                      <div className="space-y-1.5">
                         <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Category</Label>
                         <select 
                           value={newImage.category} 
                           onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                           className="w-full h-10 bg-slate-50 border border-slate-200 rounded text-sm px-3 focus:ring-4 focus:ring-blue-600/5 outline-none font-bold text-slate-900"
                         >
                            <option value="venue">Venue</option>
                            <option value="accommodation">Accommodation</option>
                            <option value="tourism">Local Tourism</option>
                            <option value="past_event">Past Events</option>
                         </select>
                      </div>

                      <Button onClick={handleAddImage} className="w-full bg-slate-900 hover:bg-black text-white rounded font-bold h-11 transition-none gap-2 shadow-lg shadow-black/10">
                         <Plus className="w-4 h-4" /> Save Photo
                      </Button>
                   </div>
                </div>

                {/* Gallery List */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                   {gallery.map((img) => (
                     <div key={img.id || img._id} className="relative bg-white border border-slate-200 rounded-xl group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border-b-4 border-b-transparent hover:border-b-blue-600">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                           <img src={img.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={img.caption} />
                        </div>
                        <div className="p-4 flex items-start justify-between bg-white border-t border-slate-50">
                           <div className="min-w-0 pr-2">
                              <p className="text-[10px] font-black text-slate-900 truncate uppercase tracking-tighter">{img.caption || 'No Caption'}</p>
                              <div className="flex items-center gap-1.5 mt-1.5">
                                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{img.category}</p>
                              </div>
                           </div>
                           <Button 
                             variant="ghost" 
                             size="icon" 
                             onClick={() => handleDeleteImage(img.id || img._id)}
                             className="h-8 w-8 text-slate-200 hover:text-red-600 hover:bg-red-50 transition-none shrink-0"
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>
                     </div>
                   ))}
                   {gallery.length === 0 && (
                       <div className="col-span-full py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center space-y-3 opacity-60 italic">
                            <ImageIcon className="w-10 h-10 text-slate-300" />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">No photos found.</p>
                       </div>
                   )}
                </div>
             </div>
          </TabsContent>

          <TabsContent value="hospitality" className="mt-0 space-y-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Hotels</h3>
                      <ImageIcon className="w-4 h-4 text-slate-300" />
                   </div>
                   <div className="p-6">
                      <Textarea 
                        value={settings?.accommodation_info || ''} 
                        onChange={(e) => setSettings({ ...settings, accommodation_info: e.target.value })}
                        className="min-h-[280px] bg-slate-50 border-slate-200 rounded text-sm p-5 font-medium leading-relaxed transition-none" 
                        placeholder="List hotel partners and special rates..."
                      />
                   </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                   <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Tourism</h3>
                      <MapPin className="w-4 h-4 text-slate-300" />
                   </div>
                   <div className="p-6">
                      <Textarea 
                        value={settings?.tourism_info || ''} 
                        onChange={(e) => setSettings({ ...settings, tourism_info: e.target.value })}
                        className="min-h-[280px] bg-slate-50 border-slate-200 rounded text-sm p-5 font-medium leading-relaxed transition-none" 
                        placeholder="Provide tips for local landmarks and city travel..."
                      />
                   </div>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
