/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  Filter, 
  Download,
  Eye,
  Mail,
  Shield,
  Trash2,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
  MapPin,
  Briefcase,
  GraduationCap,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('ascendix_token')}` }
      });
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-xs font-bold text-slate-400 p-12">Loading users...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 font-outfit">User Directory</h1>
            <p className="text-slate-500 font-medium">Manage platform members, permissions, and profiles.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 gap-2 h-11 px-6">
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-600/20 gap-2 h-11 px-6">
              <UserPlus className="w-4 h-4" /> Add Member
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name, email, or institution..." 
              className="pl-12 h-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-500/10"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="rounded-2xl border-slate-100 bg-slate-50/50 text-slate-600 font-bold h-12 gap-2 flex-1 md:flex-initial">
              <Filter className="w-4 h-4 text-slate-400" /> Filter
            </Button>
            <Button variant="outline" className="rounded-2xl border-slate-100 bg-slate-50/50 text-slate-600 font-bold h-12 gap-2 flex-1 md:flex-initial text-xs">
              Active Only
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400">
                  <th className="px-8 py-6">Member</th>
                  <th className="px-6 py-6 font-outfit">Role</th>
                  <th className="px-6 py-6 font-outfit">Registration Date</th>
                  <th className="px-6 py-6 font-outfit">Status</th>
                  <th className="px-8 py-6 text-right font-outfit">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-11 h-11 border-2 border-white shadow-sm ring-1 ring-slate-100">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`} />
                          <AvatarFallback className="bg-slate-100 text-slate-400 font-bold">
                            {user.full_name.split(' ').map((n: any) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.full_name}</p>
                          <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="text-sm font-bold text-slate-600">{user.role}</span>
                      </div>
                    </td>
                     <td className="px-6 py-5">
                      <span className="text-sm font-medium text-slate-500">{new Date(user.created_at).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                        user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        user.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {user.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : 
                         user.status === 'Pending' ? <Activity className="w-3 h-3" /> : 
                         <XCircle className="w-3 h-3" />}
                        {user.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-9 h-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[2.5rem] bg-white shadow-2xl">
                            {selectedUser && (
                              <div className="flex flex-col h-full">
                                {/* Profile Header Background */}
                                <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600 relative">
                                  <div className="absolute -bottom-12 left-10">
                                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.full_name}`} />
                                      <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                  </div>
                                </div>
                                <div className="pt-16 pb-10 px-10">
                                  <div className="flex justify-between items-start mb-8">
                                     <div>
                                      <h2 className="text-2xl font-bold text-slate-900 font-outfit">{selectedUser.full_name}</h2>
                                      <p className="text-slate-500 font-medium">{selectedUser.role} at {selectedUser.institution || 'ASCENDIX SUMMITS'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="rounded-xl border-slate-100 font-bold h-10 px-4">
                                        <Mail className="w-4 h-4 mr-2 text-slate-400" /> Message
                                      </Button>
                                      <Button size="sm" className="rounded-xl bg-slate-900 hover:bg-slate-800 font-bold h-10 px-4">
                                        Edit Profile
                                      </Button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-8 mb-8">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3 text-slate-600">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                          <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-slate-400">Location</p>
                                          <p className="text-sm font-bold text-slate-700">{selectedUser.location}</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 text-slate-600">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                          <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-slate-400">Institution</p>
                                          <p className="text-sm font-bold text-slate-700">{selectedUser.institution}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-3 text-slate-600">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                          <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                           <p className="text-xs font-bold text-slate-400">Title</p>
                                           <p className="text-sm font-bold text-slate-700">Senior Research Fellow</p>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-3 text-slate-600">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                          <LinkIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                          <p className="text-xs font-bold text-slate-400">Personal Web</p>
                                          <p className="text-sm font-bold text-indigo-500">{selectedUser.web}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                     <h4 className="text-xs font-bold text-slate-400 mb-3">Biography</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                      {selectedUser.bio} Extensive experience in developing high-performance composite materials for aerospace applications. 
                                      Has published over 15 peer-reviewed papers in industry-leading journals.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-9 h-9 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-slate-100 shadow-xl">
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-slate-600 font-bold hover:bg-slate-50">
                              <Shield className="w-4 h-4" /> Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-slate-600 font-bold hover:bg-slate-50">
                              <Mail className="w-4 h-4" /> Reset Password
                            </DropdownMenuItem>
                            <div className="h-px bg-slate-100 my-2" />
                            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-500 font-bold hover:bg-red-50 focus:bg-red-50 focus:text-red-600">
                              <Trash2 className="w-4 h-4" /> Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
             <p className="text-xs font-bold text-slate-400">Showing {users.length} of {users.length} Platform Members</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-400" disabled>1</Button>
              <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-600 font-bold">2</Button>
              <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-600 font-bold">3</Button>
              <span className="flex items-center px-1 text-slate-300">...</span>
              <Button variant="outline" size="sm" className="rounded-lg h-9 w-9 p-0 border-slate-200 text-slate-600 font-bold">48</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
