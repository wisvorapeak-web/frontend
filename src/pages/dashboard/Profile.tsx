import DashboardLayout from './DashboardLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe, 
  Camera,
  AtSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 ring-4 ring-white shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-navy">Dr. Anand Verma</h1>
              <p className="text-gray-500 font-medium tracking-wide flex items-center justify-center md:justify-start gap-2">
                <AtSign className="w-3.5 h-3.5 text-blue" />
                anand.verma@research.edu
              </p>
            </div>
          </div>
          <Button className="bg-blue hover:bg-blue-700 shadow-lg shadow-blue/20 px-8 rounded-xl h-12">
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Section */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-blue" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-gray-400">First Name</Label>
                    <Input id="firstName" defaultValue="Anand" className="bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-gray-400">Last Name</Label>
                    <Input id="lastName" defaultValue="Verma" className="bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-gray-400">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    rows={4} 
                    className="bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl"
                    defaultValue="Dr. Anand Verma is a senior research scholar specializing in high-performance polymers and advanced composite materials. With over a decade of experience in the field, he has contributed to several pioneering studies on sustainable polymer alternatives."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue" />
                  Academic & Professional
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-400">Institution</Label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input defaultValue="Indian Institute of Materials" className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-gray-400">Job Title</Label>
                    <div className="relative group">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input defaultValue="Senior Research Fellow" className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Links Section */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input readOnly defaultValue="anand.verma@research.edu" className="pl-10 bg-gray-100 border-transparent rounded-xl text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input defaultValue="+91 98765 43210" className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input defaultValue="Mumbai, India" className="pl-10 bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-gray-50/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue" />
                  Social & Web
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400">Google Scholar</Label>
                  <Input placeholder="scholar.google.com/..." className="bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400">LinkedIn Profile</Label>
                  <Input placeholder="linkedin.com/in/..." className="bg-gray-50 border-transparent focus:bg-white focus:border-blue/20 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
