import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  Phone,
  Mail,
  Check,
  Clock,
  ChevronDown,
  Search,
  CreditCard,
  ShieldCheck,
  Globe,
  MessageSquare,
  Trash2,
  ExternalLink,
  Filter,
  RefreshCw,
  Ban
} from 'lucide-react';
import { toast } from 'sonner';

interface FailedPayment {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  institution?: string;
  country?: string;
  tier_name?: string;
  amount: number;
  currency: string;
  method: string;
  error_code?: string;
  error_description?: string;
  error_source?: string;
  error_step?: string;
  gateway_order_id?: string;
  gateway_payment_id?: string;
  registration_id?: string;
  follow_up_status: 'Pending' | 'Contacted' | 'Resolved' | 'Abandoned';
  follow_up_notes?: string;
  followed_up_by?: { firstName: string; lastName: string; email: string };
  followed_up_at?: string;
  user_agent?: string;
  createdAt: string;
}

const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
  Pending: { color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', icon: Clock },
  Contacted: { color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', icon: Phone },
  Resolved: { color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', icon: Check },
  Abandoned: { color: 'text-slate-400', bg: 'bg-slate-50 border-slate-200', icon: Ban },
};

const methodIcons: Record<string, any> = {
  stripe: CreditCard,
  razorpay: ShieldCheck,
  paypal: Globe,
};

export default function FailedPayments() {
  const [records, setRecords] = useState<FailedPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/failed-payments`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (err) {
      console.error('Failed to fetch failed payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const updateStatus = async (id: string, follow_up_status: string, follow_up_notes?: string) => {
    try {
      const body: any = { follow_up_status };
      if (follow_up_notes !== undefined) body.follow_up_notes = follow_up_notes;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/failed-payments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (res.ok) {
        toast.success('Status updated.');
        fetchRecords();
      }
    } catch (err) {
      toast.error('Failed to update.');
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm('Delete this failed payment record?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/failed-payments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Record deleted.');
        setRecords(r => r.filter(x => x._id !== id));
      }
    } catch (err) {
      toast.error('Failed to delete.');
    }
  };

  const filtered = records.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      (r.institution || '').toLowerCase().includes(search.toLowerCase()) ||
      (r.error_description || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.follow_up_status === statusFilter;
    const matchesMethod = methodFilter === 'all' || r.method === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const stats = {
    total: records.length,
    pending: records.filter(r => r.follow_up_status === 'Pending').length,
    contacted: records.filter(r => r.follow_up_status === 'Contacted').length,
    resolved: records.filter(r => r.follow_up_status === 'Resolved').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-amber-500" />
              Failed Payments
            </h1>
            <p className="text-sm text-slate-500 mt-1">Track and follow up on failed payment attempts.</p>
          </div>
          <Button
            onClick={fetchRecords}
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Failures', value: stats.total, color: 'text-slate-900', bg: 'bg-slate-50' },
            { label: 'Pending Follow-up', value: stats.pending, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Contacted', value: stats.contacted, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Resolved', value: stats.resolved, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-5 border border-slate-100`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
              <p className={`text-3xl font-black ${s.color} mt-1`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, institution, or error..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Contacted">Contacted</option>
                <option value="Resolved">Resolved</option>
                <option value="Abandoned">Abandoned</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={methodFilter}
                onChange={e => setMethodFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-slate-200 rounded-lg text-sm bg-white outline-none appearance-none cursor-pointer font-medium"
              >
                <option value="all">All Methods</option>
                <option value="razorpay">Razorpay</option>
                <option value="paypal">PayPal</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Records List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-slate-300 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Check className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="text-sm font-medium text-slate-500">
              {records.length === 0 ? 'No failed payments recorded yet.' : 'No records match your filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(record => {
              const isExpanded = expandedId === record._id;
              const config = statusConfig[record.follow_up_status] || statusConfig.Pending;
              const MethodIcon = methodIcons[record.method] || CreditCard;
              const StatusIcon = config.icon;

              return (
                <div
                  key={record._id}
                  className={`bg-white border rounded-xl overflow-hidden transition-all ${
                    isExpanded ? 'shadow-lg border-blue-200' : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  {/* Main Row */}
                  <div
                    className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : record._id)}
                  >
                    {/* Status Indicator */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}>
                      <StatusIcon className={`w-5 h-5 ${config.color}`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 truncate">{record.name}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${config.bg} ${config.color}`}>
                          {record.follow_up_status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{record.email}</p>
                    </div>

                    {/* Amount */}
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-900">{record.currency} {record.amount.toLocaleString()}</p>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        <MethodIcon className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-semibold text-slate-400 uppercase">{record.method}</span>
                      </div>
                    </div>

                    {/* Error Preview */}
                    <div className="hidden lg:block max-w-[200px]">
                      <p className="text-xs text-red-500 font-medium truncate">{record.error_description}</p>
                    </div>

                    {/* Date */}
                    <div className="text-right hidden md:block">
                      <p className="text-[11px] text-slate-400 font-medium">
                        {new Date(record.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </p>
                      <p className="text-[10px] text-slate-300">
                        {new Date(record.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 px-6 py-5 bg-slate-50/50 space-y-5 animate-in slide-in-from-top-2 duration-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Info</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-700"><span className="font-semibold">Name:</span> {record.name}</p>
                            <p className="text-sm text-slate-700 flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <a href={`mailto:${record.email}`} className="text-blue-600 hover:underline">{record.email}</a>
                            </p>
                            {record.phone && (
                              <p className="text-sm text-slate-700 flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 text-slate-400" />
                                <a href={`tel:${record.phone}`} className="text-blue-600 hover:underline">{record.phone}</a>
                              </p>
                            )}
                            {record.institution && <p className="text-sm text-slate-700"><span className="font-semibold">Institution:</span> {record.institution}</p>}
                            {record.country && <p className="text-sm text-slate-700"><span className="font-semibold">Country:</span> {record.country}</p>}
                          </div>
                        </div>

                        {/* Payment Details */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-slate-700"><span className="font-semibold">Plan:</span> {record.tier_name || 'N/A'}</p>
                            <p className="text-sm text-slate-700"><span className="font-semibold">Amount:</span> {record.currency} {record.amount.toLocaleString()}</p>
                            <p className="text-sm text-slate-700"><span className="font-semibold">Method:</span> {record.method.toUpperCase()}</p>
                            {record.gateway_order_id && <p className="text-xs text-slate-500 font-mono">Order: {record.gateway_order_id}</p>}
                            {record.gateway_payment_id && <p className="text-xs text-slate-500 font-mono">Payment: {record.gateway_payment_id}</p>}
                            {record.registration_id && (
                              <p className="text-sm text-slate-700 flex items-center gap-1">
                                <span className="font-semibold">Reg ID:</span>
                                <span className="text-blue-600 font-mono text-xs">{record.registration_id}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Error Details */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Error Details</h4>
                          <div className="space-y-2">
                            <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                              <p className="text-sm text-red-700 font-medium">{record.error_description}</p>
                              {record.error_code && <p className="text-xs text-red-500 mt-1 font-mono">Code: {record.error_code}</p>}
                            </div>
                            {record.error_source && <p className="text-xs text-slate-500"><span className="font-semibold">Source:</span> {record.error_source}</p>}
                            {record.error_step && <p className="text-xs text-slate-500"><span className="font-semibold">Step:</span> {record.error_step}</p>}
                          </div>
                        </div>
                      </div>

                      {/* Follow-up Notes */}
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Follow-up Notes
                        </h4>
                        {editingNotes === record._id ? (
                          <div className="flex gap-2">
                            <textarea
                              value={notesText}
                              onChange={e => setNotesText(e.target.value)}
                              className="flex-1 border border-slate-200 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                              rows={3}
                              placeholder="Add notes about the follow-up..."
                            />
                            <div className="flex flex-col gap-2">
                              <Button
                                onClick={() => {
                                  updateStatus(record._id, record.follow_up_status, notesText);
                                  setEditingNotes(null);
                                }}
                                className="bg-blue-600 text-white text-xs px-3 h-8"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingNotes(null)}
                                className="bg-slate-100 text-slate-600 text-xs px-3 h-8"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="bg-white border border-slate-100 rounded-lg p-3 text-sm text-slate-600 cursor-pointer hover:border-blue-200 transition-colors min-h-[40px]"
                            onClick={() => {
                              setEditingNotes(record._id);
                              setNotesText(record.follow_up_notes || '');
                            }}
                          >
                            {record.follow_up_notes || (
                              <span className="text-slate-300 italic">Click to add follow-up notes...</span>
                            )}
                          </div>
                        )}
                        {record.followed_up_by && (
                          <p className="text-[10px] text-slate-400">
                            Last updated by {record.followed_up_by.firstName} {record.followed_up_by.lastName} on{' '}
                            {record.followed_up_at ? new Date(record.followed_up_at).toLocaleString() : 'N/A'}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Set Status:</span>
                        {['Pending', 'Contacted', 'Resolved', 'Abandoned'].map(status => {
                          const sc = statusConfig[status];
                          const IsActive = record.follow_up_status === status;
                          return (
                            <Button
                              key={status}
                              onClick={() => updateStatus(record._id, status)}
                              className={`text-[10px] font-bold uppercase tracking-wider px-3 h-8 rounded-lg border transition-all ${
                                IsActive
                                  ? `${sc.bg} ${sc.color} shadow-sm`
                                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {status}
                            </Button>
                          );
                        })}

                        <div className="flex-1" />

                        <a
                          href={`mailto:${record.email}?subject=Regarding your payment for ASFAA-2026&body=Dear ${record.name},%0D%0A%0D%0AWe noticed that your payment of ${record.currency} ${record.amount} for ${record.tier_name || 'the summit'} was not completed. We would like to help you complete your registration.%0D%0A%0D%0APlease don't hesitate to reach out if you need any assistance.%0D%0A%0D%0ABest regards,%0D%0AASFAA-2026 Team`}
                          className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100 hover:bg-blue-100 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <Button
                          onClick={() => deleteRecord(record._id)}
                          className="bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 text-[10px] font-bold uppercase tracking-wider px-3 h-8 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
