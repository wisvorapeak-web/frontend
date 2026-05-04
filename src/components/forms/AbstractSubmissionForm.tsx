import { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Loader2, 
  User, 
  Mail, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

export default function AbstractSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    topic: '',
    category: '',
    title: '',
    abstract: ''
  });

  const categories = ['Plenary', 'Keynote', 'Invited', 'New Researchers', 'Poster Displays'];

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/topics`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTopics(data);
      })
      .catch(err => console.error('Failed to load topics:', err));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 30 * 1024 * 1024) {
        toast.error('File too large. Max 30MB allowed.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      if (file) {
        submitData.append('file', file);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submissions/abstract`, {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      toast.success('Abstract submitted successfully! Check your email for confirmation.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        institution: '',
        topic: '',
        category: '',
        title: '',
        abstract: ''
      });
      setFile(null);
    } catch (error: any) {
      console.error('Submission error:', error);
      toast.error(error.message || 'Failed to submit conference abstract. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 lg:p-16 shadow-2xl shadow-blue/5 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* Author details */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue/10 rounded-2xl flex items-center justify-center text-blue shadow-inner">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-none mb-1">Author Details</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Presenter Information</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">First Name</Label>
                <Input 
                  placeholder="e.g. Anand" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-bold transition-all" 
                />
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Last Name</Label>
                <Input 
                  placeholder="e.g. Jaiswal" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-bold transition-all" 
                />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Email Address</Label>
                <div className="relative">
                   <Input 
                    type="email"
                    placeholder="anand@university.edu" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-bold transition-all pl-12" 
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Affiliation / Institution</Label>
                <Input 
                  placeholder="e.g. MIT, Boston" 
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  required
                  className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-bold transition-all" 
                />
              </div>
           </div>
        </section>

        <hr className="border-slate-50" />

        {/* Paper details */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-none mb-1">Research Meta</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Submission Identification</p>
              </div>
           </div>

           <div className="space-y-3">
              <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Submission Topic</Label>
              <Select onValueChange={(val) => setFormData({...formData, topic: val})} value={formData.topic}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/5 font-bold">
                  <SelectValue placeholder="Select a domain" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 rounded-2xl shadow-2xl">
                   {topics.length > 0 ? topics.map(t => (
                      <SelectItem key={t._id} value={t.title} className="font-bold text-navy focus:bg-indigo-50 focus:text-indigo-600 py-3">{t.title}</SelectItem>
                   )) : (
                      <SelectItem value="Research" disabled>Loading topics...</SelectItem>
                   )}
                </SelectContent>
              </Select>
           </div>

           <div className="space-y-3">
              <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Presentation Category</Label>
              <Select onValueChange={(val) => setFormData({...formData, category: val})} value={formData.category}>
                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/5 font-bold">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-100 rounded-2xl shadow-2xl">
                   {categories.map(c => (
                      <SelectItem key={c} value={c} className="font-bold text-navy focus:bg-indigo-50 focus:text-indigo-600 py-3">{c}</SelectItem>
                   ))}
                </SelectContent>
              </Select>
           </div>

           <div className="space-y-3">
              <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Title of Abstract</Label>
              <Input 
                placeholder="e.g. Impacts of Climate Change on Tropical Agriculture" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="h-14 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-bold transition-all" 
              />
           </div>

           <div className="space-y-3">
              <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Full Abstract Content</Label>
              <Textarea 
                placeholder="Paste your 250-400 word abstract here..." 
                className="min-h-[200px] rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-blue/5 font-medium transition-all"
                value={formData.abstract}
                onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                required
              />
              <div className="flex justify-between items-center px-1">
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Min 100 characters</p>
                 <p className={`text-[10px] font-bold uppercase ${formData.abstract.length > 5000 ? 'text-red-500' : 'text-slate-400'}`}>
                    {formData.abstract.length} / 5000
                 </p>
              </div>
           </div>

           {/* PDF Upload */}
           <div className="space-y-3">
              <Label className="text-xs font-black text-slate-500 ml-1 uppercase tracking-widest">Full Paper (PDF/Word)</Label>
              <div className="relative group">
                 <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                 />
                 <label 
                  htmlFor="file-upload" 
                  className={`flex flex-col items-center justify-center gap-4 py-12 rounded-[2rem] border-2 border-dashed transition-all cursor-pointer ${file ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-slate-50 group-hover:border-blue group-hover:bg-white'}`}
                 >
                    {file ? (
                      <>
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20"><CheckCircle2 className="w-8 h-8" /></div>
                        <p className="text-sm font-bold text-emerald-600">{file.name}</p>
                        <button type="button" onClick={() => setFile(null)} className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest">Cancel Upload</button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white text-slate-300 rounded-3xl flex items-center justify-center shadow-sm border border-slate-50 group-hover:text-blue group-hover:scale-110 transition-all"><Upload className="w-8 h-8" /></div>
                        <div className="text-center group-hover:scale-105 transition-transform">
                           <p className="text-sm font-black text-navy uppercase tracking-tight">Click to upload document</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PDF or DOCX (Max 30MB)</p>
                        </div>
                      </>
                    )}
                 </label>
              </div>
           </div>
        </section>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-start gap-3 max-w-sm">
              <div className="mt-1"><AlertCircle className="w-4 h-4 text-emerald-500" /></div>
              <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-wider">
                 All submissions are finalized upon receipt and cannot be edited. Please verify all details before initiating upload.
              </p>
           </div>
           
           <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full md:w-auto h-18 px-16 bg-blue hover:bg-navy text-white text-sm font-black rounded-2xl shadow-2xl shadow-blue/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
           >
              {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Process Submission <FileText className="w-5 h-5 opacity-40" /></>}
           </Button>
        </div>
      </form>
    </div>
  );
}
