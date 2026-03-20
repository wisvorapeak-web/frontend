import DashboardLayout from './DashboardLayout';
import { 
  Calendar, 
  MapPin, 
  Search, 
  SlidersHorizontal,
  Clock,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    id: 1,
    title: 'World Summit on Polymers 2026',
    date: 'June 24-26, 2026',
    location: 'Warsaw, Poland (Hybrid)',
    status: 'Confirmed',
    type: 'Scientific Summit',
    price: '₹15,000',
    image: '/path-to-warsaw.jpg'
  },
  {
    id: 2,
    title: 'Advanced Composite Fabrication Workshop',
    date: 'August 12, 2026',
    location: 'Berlin, Germany (In-Person)',
    status: 'Register Now',
    type: 'Technical Workshop',
    price: '₹8,000',
    image: '/path-to-berlin.jpg'
  },
  {
    id: 3,
    title: 'Nanomaterials in Medicine Webinar',
    date: 'September 05, 2026',
    location: 'Virtual Event',
    status: 'Register Now',
    type: 'Free Webinar',
    price: 'Free',
    image: '/path-to-webinar.jpg'
  }
];

export default function Events() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Upcoming Events</h1>
            <p className="text-gray-500">Discover and manage your participation in upcoming summits.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search events..." className="pl-10 h-11 w-64 bg-white border-gray-100 rounded-xl" />
            </div>
            <Button variant="outline" className="h-11 rounded-xl border-gray-100 bg-white">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="border-none shadow-sm group hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col bg-white">
              <div className="h-48 bg-navy relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-blue/10 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Calendar className="w-24 h-24 text-white" />
                </div>
                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={event.status === 'Confirmed' ? 'default' : 'secondary'} className={`
                    px-3 py-1 text-[10px] font-bold uppercase rounded-lg border-none
                    ${event.status === 'Confirmed' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue hover:bg-blue-600'}
                  `}>
                    {event.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <p className="text-[10px] font-bold text-blue uppercase tracking-widest mb-1">{event.type}</p>
                  <h3 className="text-lg font-bold text-navy leading-tight group-hover:text-blue transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    Registration Fee: <span className="font-bold text-navy">{event.price}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  <Button 
                    className={`w-full h-11 rounded-xl shadow-lg transition-all
                      ${event.status === 'Confirmed' ? 'bg-white text-navy border border-gray-100 hover:bg-gray-50' : 'bg-blue text-white hover:bg-blue-700 shadow-blue/20 hover:scale-[1.02]'}
                    `}
                  >
                    {event.status === 'Confirmed' ? 'View Details' : 'Register Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
