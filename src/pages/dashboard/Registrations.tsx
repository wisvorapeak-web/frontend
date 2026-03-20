import DashboardLayout from './DashboardLayout';
import { 
  Download, 
  ExternalLink,
  History,
  CheckCircle2,
  Clock,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const registrations = [
  {
    id: 'REG-2026-001',
    event: 'World Summit on Polymers 2026',
    date: 'February 12, 2026',
    amount: '₹15,000',
    type: 'Early Bird',
    status: 'Paid',
    invoice: 'INV-001.pdf'
  },
  {
    id: 'REG-2025-089',
    event: 'Global Composite Expo 2025',
    date: 'November 15, 2025',
    amount: '₹12,500',
    type: 'Standard',
    status: 'Completed',
    invoice: 'INV-456.pdf'
  },
  {
    id: 'REG-2025-045',
    event: 'Sustainable Polymers Webinar',
    date: 'August 10, 2025',
    amount: '₹0',
    type: 'Free',
    status: 'Completed',
    invoice: 'N/A'
  }
];

export default function Registrations() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
              <History className="w-8 h-8 text-blue" />
              Past Registrations
            </h1>
            <p className="text-gray-500">View and download your invoices and registration history.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search registrations..." className="pl-10 h-11 w-64 bg-white border-gray-100 rounded-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow className="border-b-gray-100 divide-x-0">
                <TableHead className="text-xs font-bold text-gray-400 py-6 pl-8">Order ID</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 py-6">Event Name</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 py-6">Date</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 py-6">Amount</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 py-6">Status</TableHead>
                <TableHead className="text-xs font-bold text-gray-400 py-6 text-right pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((reg) => (
                <TableRow key={reg.id} className="border-b-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <TableCell className="font-bold text-navy text-sm py-6 pl-8">{reg.id}</TableCell>
                  <TableCell className="font-medium text-navy text-sm max-w-[250px] overflow-hidden whitespace-nowrap overflow-ellipsis">{reg.event}</TableCell>
                  <TableCell className="text-gray-500 text-sm whitespace-nowrap">{reg.date}</TableCell>
                  <TableCell className="font-bold text-navy text-sm">{reg.amount}</TableCell>
                  <TableCell>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                      reg.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {reg.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {reg.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-blue hover:text-white transition-all text-gray-400">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-navy hover:text-white transition-all text-gray-400">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
