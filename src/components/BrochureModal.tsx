import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FileDown, Loader2 } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  brochure: {
    title: string;
    file_url: string;
  } | null;
}

export default function BrochureModal({ isOpen, onClose, brochure }: BrochureModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochure) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submissions/brochure`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      toast.success('Thank you! Your download is starting...');
      
      // Trigger download
      const url = brochure.file_url.startsWith('http') 
        ? brochure.file_url 
        : `${import.meta.env.VITE_API_URL}${brochure.file_url.startsWith('/') ? '' : '/'}${brochure.file_url}`;
      
      window.open(url, '_blank');

      onClose();
      setFormData({ firstName: '', lastName: '', email: '', phone: '', institution: '' });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl overflow-hidden p-0 bg-white">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600" />
        
        <div className="p-8 space-y-6">
          <DialogHeader>
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 mx-auto">
              <FileDown className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-bold font-outfit uppercase tracking-tight text-center text-slate-900">
              Brochure Download
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium text-center max-w-[280px] mx-auto leading-relaxed">
              Fill in your professional details to access <span className="text-indigo-600 font-bold">{brochure?.title || 'the guide'}</span>.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name *</Label>
                <Input 
                  id="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                  placeholder="John" 
                  className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name *</Label>
                <Input 
                  id="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                  placeholder="Doe" 
                  className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address *</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="john@example.com" 
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+1..." 
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Institution / Organization</Label>
              <Input 
                id="institution" 
                value={formData.institution} 
                onChange={handleChange} 
                placeholder="University/Company" 
                className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4" 
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-slate-950 hover:bg-indigo-600 text-white rounded-xl h-14 font-black uppercase tracking-widest transition-all shadow-xl shadow-slate-900/10 mt-2"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                <><FileDown className="mr-2 h-4 w-4" /> Download PDF</>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
