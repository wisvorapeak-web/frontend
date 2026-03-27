import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  
  // Invitation Form State
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('staff');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, invRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, { credentials: 'include' }),
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/invitations`, { credentials: 'include' })
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (invRes.ok) setInvitations(await invRes.json());
    } catch (err) {
      console.error('Fetch Error:', err);
      toast.error('Failed to sync authentication data.');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
        credentials: 'include'
      });

      if (res.ok) {
        toast.success(`Invitation dispatched to ${inviteEmail}`);
        setInviteEmail('');
        fetchData();
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to send invitation.');
      }
    } catch (err) {
      toast.error('Network failure during dispatch.');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleRevokeInvitation = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this invitation?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/invitations/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success('Invitation revoked.');
        fetchData();
      }
    } catch (err) {
      toast.error('Failed to revoke.');
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus ? 'Suspended' : 'Active' }),
        credentials: 'include'
      });
      if (res.ok) {
        toast.success(`User access ${currentStatus ? 'suspended' : 'restored'}.`);
        fetchData();
      }
    } catch (err) {
      toast.error('Status sync failure.');
    }
  };

  if (loading && users.length === 0) return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
         <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-inter">Syncing Repository...</p>
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="space-y-10 font-inter pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
           <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin User Management</h1>
              <p className="text-sm text-slate-500 mt-1">Manage administrative access control and dispatch invitations for the ASFAA team.</p>
           </div>
           <div className="flex items-center gap-3">
              <Button onClick={fetchData} variant="outline" className="text-xs font-bold gap-2">
                 <RefreshCcw className="w-4 h-4" /> Sync Data
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
           
           {/* Left: User & Invitation Tables */}
           <div className="xl:col-span-8 space-y-10">
              
              {/* Active Admins */}
              <section>
                 <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900">Registered Administrators</h3>
                 </div>
                 
                 <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                          <tr>
                             <th className="px-6 py-4">Identity</th>
                             <th className="px-6 py-4">Access Level</th>
                             <th className="px-6 py-4">Condition</th>
                             <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {users.map(u => (
                            <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {u.firstName[0]}{u.lastName[0]}
                                     </div>
                                     <div>
                                        <p className="font-bold text-slate-900">{u.firstName} {u.lastName}</p>
                                        <p className="text-[11px] text-slate-400 font-medium">{u.email}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap capitalize">
                                     {u.role}
                                  </span>
                               </td>
                               <td className="px-6 py-4">
                                  {u.isActive ? (
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                       <CheckCircle2 className="w-3 h-3" /> Secure
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-500">
                                       <AlertCircle className="w-3 h-3" /> Suspended
                                    </span>
                                  )}
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                     <Button 
                                       onClick={() => toggleUserStatus(u._id, u.isActive)}
                                       variant="outline" 
                                       size="sm" 
                                       className={`text-[10px] font-bold h-7 px-3 border-slate-200 ${u.isActive ? 'text-slate-500' : 'text-emerald-600 bg-emerald-50 border-emerald-100'}`}
                                     >
                                        {u.isActive ? 'Suspend' : 'Reactivate'}
                                     </Button>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </section>

              {/* Pending Invitations */}
              <section>
                 <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">Pending Authorization Links</h3>
                 </div>
                 
                 <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    {invitations.filter(i => i.status === 'pending').length > 0 ? (
                      <table className="w-full text-left text-sm">
                         <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                            <tr>
                               <th className="px-6 py-4">Target Email</th>
                               <th className="px-6 py-4">Role</th>
                               <th className="px-6 py-4">Authorization Status</th>
                               <th className="px-6 py-4 text-right">Revocation</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {invitations.filter(i => i.status === 'pending').map(inv => (
                              <tr key={inv._id} className="hover:bg-slate-50/50 transition-colors">
                                 <td className="px-6 py-4 font-medium text-slate-900">{inv.email}</td>
                                 <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded capitalize">
                                       {inv.role}
                                    </span>
                                 </td>
                                 <td className="px-6 py-4">
                                    <div className="space-y-1">
                                       <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                          <Clock className="w-3 h-3" /> Awaiting Signal
                                       </span>
                                       <p className="text-[10px] text-slate-400">Expires: {new Date(inv.expiresAt).toLocaleDateString()}</p>
                                    </div>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <Button 
                                      onClick={() => handleRevokeInvitation(inv._id)}
                                      variant="ghost" 
                                      size="icon" 
                                      className="text-slate-400 hover:text-rose-600 h-8 w-8"
                                    >
                                       <XCircle className="w-4 h-4" />
                                    </Button>
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                    ) : (
                      <div className="p-12 text-center flex flex-col items-center">
                         <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-6 h-6 text-slate-300" />
                         </div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No Active Dispatch Requests</p>
                      </div>
                    )}
                 </div>
              </section>

           </div>

           {/* Right: Invitation Form */}
           <div className="xl:col-span-4">
              <div className="bg-slate-900 text-white rounded-lg p-8 shadow-xl sticky top-24">
                 <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center mb-6">
                    <UserPlus className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Invite Staff Agent</h3>
                 <p className="text-slate-400 text-xs mb-8 leading-relaxed">
                    Dispatches a cryptographically secure registration link to the target entity. Unauthorized actors cannot register without a valid token.
                 </p>

                 <form onSubmit={handleInvite} className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Entity Email</label>
                       <input 
                         type="email" 
                         required
                         value={inviteEmail}
                         onChange={(e) => setInviteEmail(e.target.value)}
                         placeholder="staff@wisvorascientific.com"
                         className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-sm focus:outline-none focus:border-blue-600 transition-colors"
                       />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Access Privilege</label>
                       <select 
                         value={inviteRole}
                         onChange={(e) => setInviteRole(e.target.value)}
                         className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-sm focus:outline-none focus:border-blue-600 appearance-none transition-colors"
                       >
                          <option value="admin">Platform Admin (Full)</option>
                          <option value="sub-admin">Sub-Admin (Operations)</option>
                          <option value="staff">Staff Agent (Standard)</option>
                          <option value="editor">Content Editor</option>
                          <option value="judge">Scientific Judge</option>
                       </select>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={inviteLoading}
                      className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest gap-2"
                    >
                       {inviteLoading ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                       ) : (
                          <Send className="w-4 h-4" />
                       )}
                       Dispatch Authorization
                    </Button>
                 </form>

                 <div className="mt-10 p-4 border border-slate-800 rounded bg-slate-800/20">
                    <div className="flex items-center gap-2 mb-2">
                       <Shield className="w-4 h-4 text-emerald-500" />
                       <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Security Protocol</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                       Invitations are bound to the specific email address provided and will automatically expire after 168 hours of inactivity.
                    </p>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </AdminLayout>
  );
}

function Send({ className }: { className?: string }) {
   return (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
     </svg>
   )
}
