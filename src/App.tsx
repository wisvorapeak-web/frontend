import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import TopicsPage from './pages/TopicsPage';
import DatesPage from './pages/DatesPage';
import VenuePage from './pages/VenuePage';
import ContactPage from './pages/ContactPage';
import RegistrationPage from './pages/RegistrationPage';
import OrganizersPage from './pages/OrganizersPage';
import SpeakersPage from './pages/SpeakersPage';
import ProgramPage from './pages/ProgramPage';
import SponsorshipPage from './pages/SponsorshipPage';
import SessionsPage from './pages/SessionsPage';
import AbstractSubmissionPage from './pages/AbstractSubmissionPage';
import BrochurePage from './pages/BrochurePage';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Events from './pages/dashboard/Events';
import Registrations from './pages/dashboard/Registrations';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import Abstracts from './pages/dashboard/Abstracts';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import Verify from './pages/auth/Verify';
import Setup from './pages/auth/Setup';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import UserManagement from './pages/admin/UserManagement';
import AbstractReview from './pages/admin/AbstractReview';
import Inbox from './pages/admin/Inbox';
import SiteSettings from './pages/admin/SiteSettings';
import AdminRegistrations from './pages/admin/Registrations';
import AdminEvents from './pages/admin/Events';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
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
    </Router>
  </AuthProvider>
);
}

export default App;
