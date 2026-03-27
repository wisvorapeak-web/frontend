import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  showPreview?: boolean;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({ 
  label, 
  value, 
  onChange, 
  className = "", 
  showPreview = true 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return;
    }

    // Check size (10MB)
    if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        if (!res.ok) throw new Error('Upload failed');

        const data = await res.json();
        onChange(data.url);
        toast.success('Asset uploaded');
    } catch (err) {
        toast.error('Upload error');
        console.error(err);
    } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</Label>
      <div className="flex gap-2">
        <div className="relative flex-1 group">
            <Input 
                value={value || ''} 
                onChange={(e) => onChange(e.target.value)}
                className="h-10 bg-slate-50 border-slate-200 rounded text-sm transition-none pr-10 font-bold"
                placeholder="Asset Source URL"
            />
            {value && (
                <button 
                   type="button"
                   onClick={() => onChange('')}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-none"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*" 
        />
        <Button 
            type="button"
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="h-10 border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-bold uppercase tracking-widest transition-none px-4 rounded shrink-0"
        >
            {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
        </Button>
      </div>
      
      {showPreview && value && (
        <div className="mt-2 relative w-20 h-20 rounded border border-slate-200 overflow-hidden bg-slate-50 group">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-none pointer-events-none">
                <ImageIcon className="w-4 h-4 text-white" />
            </div>
        </div>
      )}
    </div>
  );
};
