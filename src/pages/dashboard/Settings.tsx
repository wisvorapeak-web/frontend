import DashboardLayout from './DashboardLayout';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Lock, 
  Globe, 
  Mail,
  Eye,
  Trash2,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue" />
            Dashboard Settings
          </h1>
          <p className="text-gray-500">Configure your dashboard preferences and security settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Nav */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { icon: Bell, label: 'Notifications', active: true },
              { icon: Shield, label: 'Security & Privacy', active: false },
              { icon: Globe, label: 'Language & Region', active: false },
              { icon: Monitor, label: 'Connected Devices', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm font-medium
                  ${item.active 
                    ? 'bg-blue text-white shadow-lg shadow-blue/20' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-navy'}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${item.active ? 'rotate-90' : ''}`} />
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-all text-sm font-medium">
                <Trash2 className="w-5 h-5 flex-shrink-0" />
                Delete Account
              </button>
            </div>
          </aside>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Notifications */}
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Control which notifications you receive and where.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                {[
                  { title: 'Email Notifications', desc: 'Receive event updates and invoices via email', icon: Mail, checked: true },
                  { title: 'New Event Alerts', desc: 'Get notified when new summits are announced', icon: Bell, checked: true },
                  { title: 'Research Recommendations', desc: 'Personalized scientific insights based on your profile', icon: Eye, checked: false },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue shadow-sm border border-gray-100">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-navy text-sm">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={item.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Password & Security */}
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue" />
                  Password & Security
                </CardTitle>
                <CardDescription>Update your password and manage two-factor authentication.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 rounded-xl border-gray-100 hover:bg-gray-50 text-navy font-bold text-sm bg-white">
                    Update Password
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl border-gray-100 hover:bg-gray-50 text-navy font-bold text-sm bg-white">
                    Enable 2FA Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
