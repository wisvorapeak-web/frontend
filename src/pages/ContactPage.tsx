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
  const [settings, setSettings] = useState<any>({
    contact_email: 'contact@asfaa2026.com',
    support_email: 'info@asfaa2026.com',
    contact_phone: '+65 6123 4567',
    office_hours: 'Mon - Fri: 09:00 - 18:00 (SGT)',
    contact_address: 'Singapore'
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/site/settings`)
      .then(res => res.json())
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(err => console.error('Contact Settings Sync Error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageLayout title="Contact" subtitle="Loading...">
      <div className="flex flex-col items-center justify-center py-40 space-y-6">
        <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] animate-pulse">Wait a moment...</p>
      </div>
    </PageLayout>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submissions/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.emailAddress,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      toast.success('Your message has been sent! Check your email for confirmation.');
      setFormData({
        firstName: '', lastName: '', emailAddress: '', subject: '', message: ''
      });
    } catch (error: any) {
      console.error('Contact error:', error);
      toast.error(error.message || 'Connection failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: 'Email', values: [settings?.contact_email, settings?.support_email] },
    { icon: Phone, label: 'Phone', values: [settings?.contact_phone, settings?.office_hours] },
    { icon: MapPin, label: 'Venue', values: [settings?.contact_address] },
  ];

  return (
    <PageLayout
      title="Contact"
      subtitle="Get in touch with our team for help."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-12 py-10 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-5 duration-1000">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-navy uppercase tracking-tight leading-none">Get in <span className="text-blue">Touch</span></h2>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest italic opacity-80 decoration-blue/20 decoration-1 underline-offset-4">
                Support for all speakers and visitors.
              </p>
            </div>

            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-blue transition-all group-hover:bg-blue group-hover:text-white shadow-sm border border-slate-50">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[9px] font-black text-blue uppercase tracking-widest leading-none">{item.label}</h3>
                    {item.values.map((v, vi) => (
                      <p key={vi} className="text-[10px] font-bold text-navy opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-tight">{v}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 border border-slate-50 rounded-3xl hover:border-blue/20 hover:shadow-2xl hover:shadow-blue/10 transition-all bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[8px] font-black text-slate-300 uppercase tracking-widest">First Name</Label>
                  <Input
                    className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-tight focus:bg-white focus:border-blue transition-all"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Last Name</Label>
                  <Input
                    className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-tight focus:bg-white focus:border-blue transition-all"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Email Address</Label>
                <Input
                  className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-tight focus:bg-white focus:border-blue transition-all"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Subject</Label>
                <Input
                  className="h-10 bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-tight focus:bg-white focus:border-blue transition-all"
                  placeholder="General Question"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Message</Label>
                <Textarea
                  className="bg-slate-50 border-transparent rounded-lg text-[10px] font-black uppercase tracking-tight focus:bg-white focus:border-blue transition-all min-h-[100px] italic opacity-70"
                  placeholder="What do you need help with?"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full h-10 bg-navy text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-900 transition-all shadow-xl shadow-navy/20 active:scale-95 text-decoration-none" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
