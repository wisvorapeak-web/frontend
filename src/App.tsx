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
const LegalPage = lazy(() => import('./pages/LegalPage'));

// Lazy load Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Lazy load Admin Pages
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AbstractReview = lazy(() => import('./pages/admin/AbstractReview'));
const Inbox = lazy(() => import('./pages/admin/Inbox'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const AdminRegistrations = lazy(() => import('./pages/admin/Registrations'));
const AdminEvents = lazy(() => import('./pages/admin/Events'));
const AdminSponsors = lazy(() => import('./pages/admin/AdminSponsors'));
const AdminVenue = lazy(() => import('./pages/admin/Venue'));
const AdminSpeakers = lazy(() => import('./pages/admin/Speakers'));
const AdminPricing = lazy(() => import('./pages/admin/AdminPricing'));
const AdminBrochures = lazy(() => import('./pages/admin/AdminBrochures'));
const AdminTopics = lazy(() => import('./pages/admin/AdminTopics'));
const AdminContent = lazy(() => import('./pages/admin/AdminContent'));
const SetupPage = lazy(() => import('./pages/SetupPage'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue border-t-transparent rounded-full animate-spin" />
      <p className="text-navy text-sm font-bold animate-pulse uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

import ProtectedRoute from './components/auth/ProtectedRoute';

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
          <Route path="/payment/:type/:slug" element={<PaymentPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/setup" element={<SetupPage />} />
          
          {/* Auth Routes moved to Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          
          {/* Admin Routes (PROTECTED) */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin>
              <AdminOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/overview" element={
            <ProtectedRoute requireAdmin>
              <AdminOverview />
            </ProtectedRoute>
          } />
          <Route path="/admin/abstracts" element={
            <ProtectedRoute requireAdmin>
              <AbstractReview />
            </ProtectedRoute>
          } />
          <Route path="/admin/registrations" element={
            <ProtectedRoute requireAdmin>
              <AdminRegistrations />
            </ProtectedRoute>
          } />
          <Route path="/admin/pricing" element={
            <ProtectedRoute requireAdmin>
              <AdminPricing />
            </ProtectedRoute>
          } />
          <Route path="/admin/inbox" element={
            <ProtectedRoute requireAdmin>
              <Inbox />
            </ProtectedRoute>
          } />
          <Route path="/admin/events" element={
            <ProtectedRoute requireAdmin>
              <AdminEvents />
            </ProtectedRoute>
          } />
          <Route path="/admin/sponsors" element={
            <ProtectedRoute requireAdmin>
              <AdminSponsors />
            </ProtectedRoute>
          } />
          <Route path="/admin/venue" element={
            <ProtectedRoute requireAdmin>
              <AdminVenue />
            </ProtectedRoute>
          } />
          <Route path="/admin/speakers" element={
            <ProtectedRoute requireAdmin>
              <AdminSpeakers />
            </ProtectedRoute>
          } />
          <Route path="/admin/brochures" element={
            <ProtectedRoute requireAdmin>
              <AdminBrochures />
            </ProtectedRoute>
          } />
          <Route path="/admin/topics" element={
            <ProtectedRoute requireAdmin>
              <AdminTopics />
            </ProtectedRoute>
          } />
          <Route path="/admin/content" element={
            <ProtectedRoute requireAdmin>
              <AdminContent />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute requireAdmin>
              <SiteSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  </AuthProvider>
);
}

export default App;
