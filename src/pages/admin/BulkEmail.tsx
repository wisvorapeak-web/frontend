import { useState, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Upload,
  Send,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  Users,
  Eye,
  X,
  Download
} from 'lucide-react';

interface SendResult {
  message: string;
  total: number;
  sent: number;
  failed: number;
  failedEmails: string[];
  skipped: number;
  skippedDetails: string[];
}

export default function BulkEmail() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<{ name: string; email: string }[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a .csv file');
      return;
    }

    setCsvFile(file);
    setResult(null);

    // Parse preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(l => l.trim());
      if (lines.length < 2) {
        toast.error('CSV file must have a header row and at least one data row.');
        setCsvFile(null);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const nameIdx = headers.indexOf('name');
      const emailIdx = headers.indexOf('email');

      if (nameIdx === -1 || emailIdx === -1) {
        toast.error('CSV must contain "name" and "email" columns');
        setCsvFile(null);
        return;
      }

      const rows = lines.slice(1).map(line => {
        const cols = line.split(',').map(c => c.trim());
        return { name: cols[nameIdx] || '', email: cols[emailIdx] || '' };
      }).filter(r => r.name && r.email);

      setCsvPreview(rows);
      toast.success(`${rows.length} recipients loaded from CSV`);
    };
    reader.readAsText(file);
  };

  const handleSend = async () => {
    if (!csvFile) return toast.error('Please upload a CSV file.');
    if (!subject.trim()) return toast.error('Subject is required.');
    if (!content.trim()) return toast.error('Email content is required.');

    setIsSending(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('csv', csvFile);
      formData.append('subject', subject);
      formData.append('content', content);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/bulk-email`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || 'Failed to send emails');
        if (data.details) {
          setResult({ ...data, sent: 0, failed: 0, total: 0, failedEmails: [], skipped: data.details.length, skippedDetails: data.details });
        }
        return;
      }

      setResult(data);
      
      if (data.failed === 0) {
        toast.success(`All ${data.sent} emails sent successfully!`);
      } else {
        toast.warning(`${data.sent} sent, ${data.failed} failed`);
      }
    } catch (err) {
      toast.error('Network error. Check your connection.');
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setSubject('');
    setContent('');
    setCsvFile(null);
    setCsvPreview([]);
    setResult(null);
    setShowPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadSampleCSV = () => {
    const csv = 'name,email\nJohn Doe,john@example.com\nJane Smith,jane@example.com\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_recipients.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-6xl font-inter">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Bulk Email Dispatch</h1>
            <p className="text-sm text-slate-500 mt-1">Send personalized messages to delegates via CSV upload.</p>
          </div>
          {(csvFile || subject || content) && (
            <Button onClick={handleReset} variant="outline" className="text-xs font-semibold h-10 border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
              <X className="w-4 h-4 mr-2" /> Reset Form
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Configuration */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Upload */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">1. Recipient List</h3>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer ${csvFile ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'}`}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".csv" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                {csvFile ? (
                  <div className="space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <p className="text-sm font-bold text-slate-900">{csvFile.name}</p>
                    <p className="text-xs text-emerald-600 font-medium">{csvPreview.length} records detected • Click to replace</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">Select CSV File</p>
                    <p className="text-xs text-slate-400">Click or drag and drop your recipient list</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button onClick={downloadSampleCSV} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Sample CSV
                </button>
                {csvPreview.length > 0 && (
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> {showPreview ? 'Hide List' : 'Preview List'} ({csvPreview.length})
                  </button>
                )}
              </div>

              {showPreview && csvPreview.length > 0 && (
                <div className="mt-6 border border-slate-200 rounded overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">#</th>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">Full Name</th>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">Email Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {csvPreview.slice(0, 100).map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-3 text-slate-400">{i + 1}</td>
                          <td className="p-3 font-medium text-slate-900">{r.name}</td>
                          <td className="p-3 text-slate-600">{r.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Step 2: Compose */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">2. Message Composition</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-600">Email Subject</Label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Important Update: ASFAA-2026 Summit"
                    className="h-11 border-slate-200 rounded bg-slate-50/50 focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold text-slate-600">Message Content</Label>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      Use {'{{name}}'} to insert names
                    </span>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Dear {{name}},\n\nWe are pleased to invite you to the summit...`}
                    rows={12}
                    className="w-full border border-slate-200 rounded-lg p-4 text-sm font-medium bg-slate-50/50 focus:bg-white resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Dispatch */}
            <Button
              onClick={handleSend}
              disabled={isSending || !csvFile || !subject || !content}
              className="w-full h-14 bg-slate-950 text-white hover:bg-slate-800 rounded-lg font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-slate-950/10 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> 
                  Sending in progress...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> 
                  Dispatch to {csvPreview.length || 'recipients'}
                </>
              )}
            </Button>
          </div>

          {/* Right: Results & Meta */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Preview Card */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden sticky top-24">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Preview</h4>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-12 uppercase">From</span>
                    <span className="text-xs font-bold text-slate-900">info@foodagriexpo.com</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-12 uppercase">To</span>
                    <span className="text-xs font-medium text-slate-600">{csvPreview.length > 0 ? csvPreview[0].email : 'recipient@example.com'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-12 uppercase">Subject</span>
                    <span className="text-xs font-bold text-slate-900">{subject || '---'}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded min-h-[200px]">
                  <p className="text-xs text-slate-800 font-medium mb-4">Dear {csvPreview.length > 0 ? csvPreview[0].name : 'Delegate'},</p>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed italic">
                    {(content || 'Message content preview will appear here...')
                      .replace(/\{\{name\}\}/gi, csvPreview.length > 0 ? csvPreview[0].name : '...')
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Results Card */}
            {result && (
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dispatch Results</h4>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-slate-100 rounded p-4 text-center">
                      <p className="text-2xl font-bold text-emerald-600">{result.sent}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Sent</p>
                    </div>
                    <div className="border border-slate-100 rounded p-4 text-center">
                      <p className="text-2xl font-bold text-rose-600">{result.failed}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Failed</p>
                    </div>
                    <div className="border border-slate-100 rounded p-4 text-center">
                      <p className="text-2xl font-bold text-amber-600">{result.skipped}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Skipped</p>
                    </div>
                  </div>

                  {result.failedEmails.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-rose-600 flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> Failed Delivery ({result.failed})
                      </p>
                      <div className="bg-slate-50 rounded p-3 max-h-40 overflow-y-auto border border-slate-100 italic">
                        {result.failedEmails.map((email, i) => (
                          <p key={i} className="text-[10px] text-slate-600 py-1">{email}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.skippedDetails && result.skippedDetails.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-3 space-y-1 max-h-32 overflow-y-auto">
                        {result.skippedDetails.map((detail, i) => (
                          <p key={i} className="text-[10px] font-bold text-amber-700">{detail}</p>
                        ))}
                      </div>
                  )}
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-50 text-slate-400 rounded">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quick Summary</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Recipients Loaded</span>
                  <span className="text-xs font-bold text-slate-900">{csvPreview.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Subject Status</span>
                  <span className={`text-xs font-bold ${subject ? 'text-emerald-600' : 'text-slate-400'}`}>{subject ? 'Ready' : 'Missing'}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-500">Sender Identity</span>
                  <span className="text-xs font-bold text-blue-600">info@foodagriexpo.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
