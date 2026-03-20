import { useState, useEffect } from 'react';
import PageLayout from './PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/site/settings`);
        if (res.ok) setSettings(await res.json());
      } catch (err) {
        console.error('Failed to fetch contact settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/submissions/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.emailAddress,
          subject: formData.subject,
          message: formData.message
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.success('Your message has been sent successfully. We will respond within 24 hours!');
      setFormData({
        firstName: '', lastName: '', emailAddress: '', subject: '', message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: 'Scientific Secretariat', values: [settings?.contact_email || 'CONTACT@WISVORAPEAK.COM', 'SUBMISSIONS@WISVORAPEAK.COM'] },
    { icon: Phone, label: 'Global Helpline', values: [settings?.contact_phone || '+91 9366531405', settings?.office_hours || 'MON-FRI, 09:00 - 18:00 IST'] },
    { icon: MapPin, label: 'Official Headquarters', values: [settings?.contact_address?.toUpperCase() || 'GUWAHATI, ASSAM, INDIA'] },
  ];

  return (
    <PageLayout 
      title="Global Communications" 
      subtitle="Direct access to the summit's organizing committee and technical board."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Details */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-navy uppercase tracking-tight">Direct <span className="text-blue">Inquiry</span></h2>
              <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                Our support team maintains active coverage for international delegates, 
                speakers, and corporate partners across all time zones.
              </p>
            </div>
            
            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue transition-all group-hover:bg-blue group-hover:text-white shadow-sm border border-slate-100">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-black text-blue uppercase tracking-[0.2em]">{item.label}</h3>
                    {item.values.map((v, vi) => (
                      <p key={vi} className="text-[11px] font-black text-navy uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{v}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 border border-slate-100 rounded-3xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/5 transition-all">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">First Name</Label>
                  <Input 
                    className="h-12 bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
                    placeholder="JOHN" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Name</Label>
                  <Input 
                    className="h-12 bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
                    placeholder="DOE" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</Label>
                <Input 
                  className="h-12 bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
                  type="email" 
                  placeholder="EMAIL@UNIVERSITY.EDU" 
                  required 
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Inquiry Type</Label>
                <Input 
                  className="h-12 bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all"
                  placeholder="SUMMIT LOGISTICS" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Message</Label>
                <Textarea 
                  className="bg-slate-50 border-transparent rounded-xl text-[10px] font-black uppercase tracking-widest focus:bg-white focus:border-blue transition-all min-h-[150px]"
                  placeholder="DETAIL YOUR REQUIREMENTS..." 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full h-14 bg-blue text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-navy transition-all" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Send Transmission'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
