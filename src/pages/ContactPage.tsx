import { useState } from 'react';
import PageLayout from './PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    subject: '',
    message: ''
  });

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

      toast.success('Your message has been sent! We will get back to you soon.');
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
    { icon: Mail, label: 'Event Team', values: ['contact@foodagriexpo.com', 'submissions@foodagriexpo.com'] },
    { icon: Phone, label: 'Support Phone', values: ['+91 XXXXX XXXXX', 'Mon-Fri, 09:00 - 18:00 IST'] },
    { icon: MapPin, label: 'Conference Venue', values: ['New Delhi, India'] },
  ];

  return (
    <PageLayout 
      title="Contact Us" 
      subtitle="Get in touch with our team for any questions or help."
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-24 font-outfit">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Details */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-navy">Send us a <span className="text-blue">Message</span></h2>
              <p className="text-sm font-semibold text-slate-500 leading-loose">
                Our team is here to help speakers and visitors from all over the world.
              </p>
            </div>
            
            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue transition-all group-hover:bg-blue group-hover:text-white shadow-sm border border-slate-100">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-blue">{item.label}</h3>
                    {item.values.map((v, vi) => (
                      <p key={vi} className="text-xs font-semibold text-navy opacity-60 group-hover:opacity-100 transition-opacity">{v}</p>
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
                  <Label className="text-xs font-semibold text-slate-400">First Name</Label>
                  <Input 
                    className="h-12 bg-slate-50 border-transparent rounded-xl text-sm font-semibold focus:bg-white focus:border-blue transition-all"
                    placeholder="John" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xs font-semibold text-slate-400">Last Name</Label>
                  <Input 
                    className="h-12 bg-slate-50 border-transparent rounded-xl text-sm font-semibold focus:bg-white focus:border-blue transition-all"
                    placeholder="Doe" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-slate-400">Email Address</Label>
                <Input 
                  className="h-12 bg-slate-50 border-transparent rounded-xl text-sm font-semibold focus:bg-white focus:border-blue transition-all"
                  type="email" 
                  placeholder="email@university.edu" 
                  required 
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-slate-400">Subject</Label>
                <Input 
                  className="h-12 bg-slate-50 border-transparent rounded-xl text-sm font-semibold focus:bg-white focus:border-blue transition-all"
                  placeholder="Summit Logistics" 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-semibold text-slate-400">Message</Label>
                <Textarea 
                  className="bg-slate-50 border-transparent rounded-xl text-sm font-semibold focus:bg-white focus:border-blue transition-all min-h-[150px]"
                  placeholder="How can we help?" 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full h-14 bg-blue text-white text-sm font-bold rounded-2xl hover:bg-navy transition-all" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
