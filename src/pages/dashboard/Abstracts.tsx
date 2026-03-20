import DashboardLayout from './DashboardLayout';
import { 
  FileText, 
  Plus, 
  MoreVertical, 
  Eye, 
  Trash2, 
  Download,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const abstracts = [
  {
    id: 'ABS-2026-124',
    title: 'Advanced Synthesis of Bio-Based Polymers for Sustainable Manufacturing',
    event: 'World Summit on Polymers 2026',
    date: 'March 05, 2026',
    status: 'Accepted',
    type: 'Oral Presentation'
  },
  {
    id: 'ABS-2026-089',
    title: 'Mechanical Properties of Carbon Nanotube Reinforced Composites',
    event: 'Advanced Composite Fabrication Workshop',
    date: 'February 20, 2026',
    status: 'Under Review',
    type: 'Poster Presentation'
  }
];

export default function Abstracts() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue" />
              My Abstracts
            </h1>
            <p className="text-gray-500">Manage your scientific submissions and review statuses.</p>
          </div>
          <Button className="bg-blue hover:bg-blue-700 shadow-lg shadow-blue/20 rounded-xl h-11 px-6">
            <Plus className="w-4 h-4 mr-2" />
            Submit New Abstract
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {abstracts.map((abs) => (
            <Card key={abs.id} className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden bg-white">
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* ID section */}
                <div className="md:w-48 bg-gray-50/50 p-6 flex flex-col justify-center border-r border-gray-100">
                  <p className="text-xs font-bold text-gray-400 mb-1">Submission ID</p>
                  <p className="font-bold text-navy text-sm">{abs.id}</p>
                  <div className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    abs.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {abs.status === 'Accepted' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {abs.status}
                  </div>
                </div>

                {/* Main section */}
                <div className="flex-1 p-6 relative">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold text-blue mb-1">{abs.type}</p>
                      <h3 className="text-lg font-bold text-navy group-hover:text-blue transition-colors leading-tight mb-2">
                        {abs.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="font-medium text-gray-600">{abs.event}</span>
                        <span>•</span>
                        <span>Submitted on {abs.date}</span>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:bg-gray-50 rounded-xl">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl border-gray-100">
                        <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-lg cursor-pointer">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">Preview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-lg cursor-pointer">
                          <Download className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">Download PDF</span>
                        </DropdownMenuItem>
                        <div className="h-px bg-gray-50 my-1" />
                        <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-600">
                          <Trash2 className="w-4 h-4" />
                          <span className="font-medium text-sm">Withdraw</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="hidden md:flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                    <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-navy hover:bg-gray-50 font-bold border border-transparent hover:border-gray-100">
                      <Eye className="w-4 h-4 mr-2 text-gray-400" />
                      Preview
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-navy hover:bg-gray-50 font-bold border border-transparent hover:border-gray-100">
                      <Download className="w-4 h-4 mr-2 text-gray-400" />
                      Download PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl text-red-500 hover:bg-red-50 font-bold border border-transparent hover:border-red-100">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Help */}
        <div className="bg-gray-50/50 rounded-2xl p-8 border border-dashed border-gray-200 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm text-gray-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h4 className="font-bold text-navy mb-2">Submission Guidelines</h4>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mb-6">
            Ensure your abstracts follow the 2026 Polymer Summit formatting guidelines. 
            All submissions are peer-reviewed within 15 working days.
          </p>
          <Button variant="link" className="text-blue font-bold">View Guidelines PDF</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
