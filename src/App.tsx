import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import TawkChat from './components/TawkChat';
import FloatingWidgets from './components/FloatingWidgets';

// Lazy load Main Website Pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TopicsPage = lazy(() => import('./pages/TopicsPage'));
const DatesPage = lazy(() => import('./pages/DatesPage'));
const VenuePage = lazy(() => import('./pages/VenuePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const OrganizersPage = lazy(() => import('./pages/OrganizersPage'));
const SpeakersPage = lazy(() => import('./pages/SpeakersPage'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const SponsorshipPage = lazy(() => import('./pages/SponsorshipPage'));
const SessionsPage = lazy(() => import('./pages/SessionsPage'));
const AbstractSubmissionPage = lazy(() => import('./pages/AbstractSubmissionPage'));
const BrochurePage = lazy(() => import('./pages/BrochurePage'));
const ChairsPage = lazy(() => import('./pages/ChairsPage'));
const WorkshopsPage = lazy(() => import('./pages/WorkshopsPage'));
const JournalsPage = lazy(() => import('./pages/JournalsPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));

// Lazy load Dashboard Pages
const Overview = lazy(() => import('./pages/dashboard/Overview'));
const Events = lazy(() => import('./pages/dashboard/Events'));
const Registrations = lazy(() => import('./pages/dashboard/Registrations'));
const Profile = lazy(() => import('./pages/dashboard/Profile'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));
const Abstracts = lazy(() => import('./pages/dashboard/Abstracts'));

// Lazy load Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Verify = lazy(() => import('./pages/auth/Verify'));
const Setup = lazy(() => import('./pages/auth/Setup'));

// Lazy load Admin Pages
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const AbstractReview = lazy(() => import('./pages/admin/AbstractReview'));
const Inbox = lazy(() => import('./pages/admin/Inbox'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const AdminRegistrations = lazy(() => import('./pages/admin/Registrations'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
      <p className="text-navy text-sm font-bold animate-pulse uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <TawkChat /> {/* Tawk.to live chat global integration */}
      <FloatingWidgets /> {/* Floating contact & chat widgets */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/dates" element={<DatesPage />} />
          <Route path="/organizers" element={<OrganizersPage />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/sponsorship" element={<SponsorshipPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/abstract-submission" element={<AbstractSubmissionPage />} />
          <Route path="/brochure" element={<BrochurePage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/chairs" element={<ChairsPage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/pay/:type/:slug" element={<PaymentPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/setup" element={<Setup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/registrations" element={<Registrations />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/abstracts" element={<Abstracts />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/abstracts" element={<AbstractReview />} />
          <Route path="/admin/registrations" element={<AdminRegistrations />} />
          <Route path="/admin/inbox" element={<Inbox />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/settings" element={<SiteSettings />} />
        </Routes>
      </Suspense>
    </Router>
  </AuthProvider>
);
}

export default App;
