import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { 
  Calendar, 
  FileText, 
  MapPin, 
  ArrowUpRight, 
  Award, 
  Users,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';


const upcomingEvents = [
  {
    title: 'World Summit on Polymers 2026',
    date: 'June 24-26, 2026',
    location: 'Warsaw, Poland',
    status: 'Confirmed',
    type: 'International Conference'
  },
  {
    title: 'Advanced Composite Workshop',
    date: 'August 12-14, 2026',
    location: 'Berlin, Germany',
    status: 'Waitlisted',
    type: 'Technical Workshop'
  }
];

export default function Overview() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState({
    registeredEvents: 0,
    submittedAbstracts: 0,
    profileScore: 8.4,
    networkPoints: 450
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, profileRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/profile`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          })
        ]);

        if (statsRes.ok) setDashboardStats(await statsRes.json());
        if (profileRes.ok) setProfile(await profileRes.json());
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayStats = [
    { label: 'Registered Events', value: dashboardStats.registeredEvents.toString(), icon: Calendar, color: 'text-blue bg-blue/10' },
    { label: 'Submitted Abstracts', value: dashboardStats.submittedAbstracts.toString(), icon: FileText, color: 'text-purple-600 bg-purple-50' },
    { label: 'Profile Score', value: dashboardStats.profileScore.toString(), icon: Award, color: 'text-amber-600 bg-amber-50' },
    { label: 'Network Points', value: dashboardStats.networkPoints.toString(), icon: Users, color: 'text-emerald-600 bg-emerald-50' },
  ];

  if (loading) return <DashboardLayout><div>Loading overview...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">Welcome Back, {profile?.full_name || 'Researcher'}!</h1>
            <p className="text-gray-500">Here's what's happening with your research profile today.</p>
          </div>
          <Button className="bg-blue hover:bg-blue-700 shadow-lg shadow-blue/20">
            <Calendar className="w-4 h-4 mr-2" />
            Join Next Session
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-navy">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <Card className="border-none shadow-sm h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
                  <CardDescription>Events you've registered for</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-blue">
                  View All <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.title} 
                      className="p-4 rounded-xl border border-gray-100 hover:border-blue/20 hover:bg-blue/5 transition-all group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-blue font-bold mb-1">{event.type}</p>
                          <h4 className="font-bold text-navy group-hover:text-blue transition-colors">{event.title}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                          event.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="border-none shadow-sm bg-navy text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue/20 rounded-full blur-3xl -mr-16 -mt-16" />
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white justify-between">
                  Download Certificates <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white justify-between">
                  Submit New Abstract <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white justify-between">
                  Contact Support <ExternalLink className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Notifications Recap */}
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    'Your abstract #124 has been accepted.',
                    'Registration for Warsaw Summit closes in 12 days.',
                    'Join the pre-event networking lounge now.'
                  ].map((note, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue shrink-0 mt-2" />
                      <p className="text-gray-600">{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
