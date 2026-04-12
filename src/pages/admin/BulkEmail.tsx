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
  Download,
  Columns
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

/**
 * Simple CSV line parser that handles quoted fields with commas inside.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Parse full CSV text into { headers, rows } where rows is array of Record<string, string>
 */
function parseCSV(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    return obj;
  });

  return { headers, rows };
}

export default function BulkEmail() {
  const senderEmails = [
    'asfaa-2026@foodagriexpo.com',
    'conference@foodagriexpo.com',
    'foodtech@foodagriexpo.com',
    'agritech@foodagriexpo.com',
    'animalscience@foodagriexpo.com',
    'info@foodagriexpo.com',
    'secretary@foodagriexpo.com',
    'contact@foodagriexpo.com',
    'asfaa2026@foodagriexpo.com',
    'grace.nova@foodagriexpo.com',
    'nova.grace@foodagriexpo.com',
    'gracenova@foodagriexpo.com',
    'novagrace@foodagriexpo.com',
    'grace@foodagriexpo.com',
    'nova@foodagriexpo.com',
    'enquiry@foodagriexpo.com',
    'foodagriexpo@ascendixsummits.com'
  ];

  const [fromEmail, setFromEmail] = useState(senderEmails[0]);
  const [fromName, setFromName] = useState('Ascendix World Food, AgroTech & Animal Science');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // CSV parsed data
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([]);
  const [nameColumn, setNameColumn] = useState('');
  const [emailColumn, setEmailColumn] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [result, setResult] = useState<SendResult | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived: mapped preview rows
  const mappedRows = (nameColumn && emailColumn)
    ? csvRows.map(r => ({ name: r[nameColumn] || '', email: r[emailColumn] || '' })).filter(r => r.name && r.email)
    : [];

  // --- Auto-guess a column by checking common header names (case-insensitive) ---
  const guessColumn = (headers: string[], candidates: string[]): string => {
    const lower = candidates.map(c => c.toLowerCase());
    return headers.find(h => lower.includes(h.toLowerCase())) || '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a .csv file');
      return;
    }

    setCsvFile(file);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { headers, rows } = parseCSV(text);

      if (headers.length === 0 || rows.length === 0) {
        toast.error('CSV file must have a header row and at least one data row.');
        setCsvFile(null);
        return;
      }

      if (rows.length > 3000) {
        toast.error(`Maximum 3000 recipients allowed. This CSV has ${rows.length} rows.`);
        setCsvFile(null);
        return;
      }

      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto-guess mappings
      const guessedName = guessColumn(headers, ['name', 'Name', 'Full Name', 'Fullname', 'full_name', 'FirstName', 'First Name', 'recipient_name']);
      const guessedEmail = guessColumn(headers, ['email', 'Email', 'Email Address', 'email_address', 'Mail', 'E-mail', 'EmailAddress']);

      setNameColumn(guessedName);
      setEmailColumn(guessedEmail);

      if (guessedName && guessedEmail) {
        toast.success(`${rows.length} recipients loaded. Columns auto-mapped: "${guessedName}" → Name, "${guessedEmail}" → Email`);
      } else {
        toast.warning(`${rows.length} rows loaded. Please map the Name and Email columns manually.`);
      }
    };
    reader.readAsText(file);
  };

  const handleSend = async () => {
    if (!csvFile) return toast.error('Please upload a CSV file.');
    if (!nameColumn || !emailColumn) return toast.error('Please map both Name and Email columns from the dropdowns.');
    if (nameColumn === emailColumn) return toast.error('Name and Email columns must be different.');
    if (!subject.trim()) return toast.error('Subject is required.');
    if (!content.trim()) return toast.error('Email content is required.');

    if (mappedRows.length === 0) {
      return toast.error('No valid rows found with the selected column mapping.');
    }

    setIsSending(true);
    setProgress(0);
    setSentCount(0);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('csv', csvFile);
      formData.append('subject', subject);
      formData.append('content', content);
      formData.append('fromEmail', fromEmail);
      formData.append('fromName', fromName);
      formData.append('nameColumn', nameColumn);
      formData.append('emailColumn', emailColumn);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/bulk-email`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || 'Failed to send emails');
          if (data.details) {
            setResult({ ...data, sent: 0, failed: 0, total: 0, failedEmails: [], skipped: data.details.length, skippedDetails: Array.isArray(data.details) ? data.details : [data.details] });
          }
        }
        setIsSending(false);
        return;
      }

      const streamReader = res.body?.getReader();
      if (!streamReader) {
        toast.error('Failed to read response stream');
        setIsSending(false);
        return;
      }

      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { done, value } = await streamReader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6);
            if (!dataStr) continue;
            try {
              const data = JSON.parse(dataStr);
              if (data.type === 'progress') {
                setProgress(data.progress);
                setSentCount(data.sent);
              } else if (data.type === 'complete') {
                setResult(data);
                if (data.failed === 0) {
                  toast.success(`All ${data.sent} emails sent successfully!`);
                } else {
                  toast.warning(`${data.sent} sent, ${data.failed} failed`);
                }
                setIsSending(false);
              } else if (data.type === 'error') {
                toast.error(data.error || 'Error occurred during processing.');
              }
            } catch (err) {
              console.error('Failed to parse SSE', err);
            }
          }
        }
      }
    } catch (err) {
      toast.error('Network error. Check your connection.');
      setIsSending(false);
    }
  };

  const handleReset = () => {
    if (isSending) return;
    setFromEmail(senderEmails[0]);
    setFromName('Ascendix World Food, AgroTech & Animal Science');
    setSubject('');
    setContent('');
    setCsvFile(null);
    setCsvHeaders([]);
    setCsvRows([]);
    setNameColumn('');
    setEmailColumn('');
    setResult(null);
    setProgress(0);
    setSentCount(0);
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
                    <p className="text-xs text-emerald-600 font-medium">{csvRows.length} rows • {csvHeaders.length} columns • Click to replace</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-sm font-bold text-slate-700">Select CSV File</p>
                    <p className="text-xs text-slate-400">Click or drag and drop your recipient list</p>
                  </div>
                )}
              </div>

              {/* Column Mapping */}
              {csvHeaders.length > 0 && (
                <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Columns className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Column Mapping</span>
                    {nameColumn && emailColumn && (
                      <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">✓ Mapped</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Name Column</label>
                      <select 
                        className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-100 outline-none"
                        value={nameColumn}
                        onChange={(e) => setNameColumn(e.target.value)}
                      >
                        <option value="">— Select column —</option>
                        {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Email Column</label>
                      <select 
                        className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-100 outline-none"
                        value={emailColumn}
                        onChange={(e) => setEmailColumn(e.target.value)}
                      >
                        <option value="">— Select column —</option>
                        {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>
                  {nameColumn && emailColumn && (
                    <p className="text-[10px] text-slate-500 mt-3">
                      ✓ {mappedRows.length} valid recipients found using "{nameColumn}" and "{emailColumn}"
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <button onClick={downloadSampleCSV} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Sample CSV
                </button>
                {mappedRows.length > 0 && (
                  <button 
                    onClick={() => setShowPreview(!showPreview)} 
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> {showPreview ? 'Hide List' : 'Preview List'} ({mappedRows.length})
                  </button>
                )}
              </div>

              {showPreview && mappedRows.length > 0 && (
                <div className="mt-6 border border-slate-200 rounded overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">#</th>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">{nameColumn}</th>
                        <th className="text-left p-3 font-bold text-slate-500 uppercase tracking-tighter">{emailColumn}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {mappedRows.slice(0, 100).map((r, i) => (
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Sender Name</Label>
                    <Input
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                      placeholder="e.g., ASFAA-2026 Summit"
                      className="h-11 border-slate-200 rounded bg-slate-50/50 focus:bg-white text-sm font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Sender Email</Label>
                    <select
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      className="w-full h-11 border border-slate-200 rounded bg-slate-50/50 focus:bg-white text-sm font-medium px-3 outline-none"
                    >
                      {senderEmails.map(email => (
                        <option key={email} value={email}>{email}</option>
                      ))}
                    </select>
                  </div>
                </div>

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
              disabled={isSending || !csvFile || !nameColumn || !emailColumn || !subject || !content}
              className="w-full h-14 bg-slate-950 text-white hover:bg-slate-800 rounded-lg font-bold text-sm flex items-center justify-center gap-3 shadow-lg shadow-slate-950/10 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> 
                  Sending... {progress}% ({sentCount} sent)
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> 
                  Dispatch to {mappedRows.length || 'recipients'}
                </>
              )}
            </Button>
            
            {isSending && (
              <div className="mt-6">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>Dispatching Emails...</span>
                  <span className="text-blue-600">{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 font-medium text-center mt-2">
                  Please keep this page open until completion.
                </p>
              </div>
            )}
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
                    <span className="text-xs font-bold text-slate-900">{fromEmail}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-12 uppercase">To</span>
                    <span className="text-xs font-medium text-slate-600">{mappedRows.length > 0 ? mappedRows[0].email : 'recipient@example.com'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold text-slate-400 w-12 uppercase">Subject</span>
                    <span className="text-xs font-bold text-slate-900">{subject || '---'}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded min-h-[200px]">
                  <p className="text-xs text-slate-800 font-medium mb-4">Dear {mappedRows.length > 0 ? mappedRows[0].name : 'Delegate'},</p>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed italic">
                    {(content || 'Message content preview will appear here...')
                      .replace(/\{\{name\}\}/gi, mappedRows.length > 0 ? mappedRows[0].name : '...')
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
                  <span className="text-xs font-medium text-slate-500">CSV Rows</span>
                  <span className="text-xs font-bold text-slate-900">{csvRows.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Valid Recipients</span>
                  <span className={`text-xs font-bold ${mappedRows.length > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>{mappedRows.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Column Mapping</span>
                  <span className={`text-xs font-bold ${nameColumn && emailColumn ? 'text-emerald-600' : 'text-amber-600'}`}>{nameColumn && emailColumn ? 'Ready' : 'Needs setup'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Subject Status</span>
                  <span className={`text-xs font-bold ${subject ? 'text-emerald-600' : 'text-slate-400'}`}>{subject ? 'Ready' : 'Missing'}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-500">Sender Identity</span>
                  <span className="text-xs font-bold text-blue-600">{fromEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
