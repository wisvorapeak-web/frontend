import { lazy, Suspense } from 'react';
import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import TrustStrip from '../sections/TrustStrip';
import { Reveal } from '../components/Reveal';

// Lazy load heavy/off-screen sections
const About = lazy(() => import('../sections/About'));
const Topics = lazy(() => import('../sections/Topics'));
const Speakers = lazy(() => import('../sections/Speakers'));
const WhyAttend = lazy(() => import('../sections/WhyAttend'));
const Registration = lazy(() => import('../sections/Registration'));
const Venue = lazy(() => import('../sections/Venue'));
const Testimonials = lazy(() => import('../sections/Testimonials'));
const FAQ = lazy(() => import('../sections/FAQ'));
const FinalCTA = lazy(() => import('../sections/FinalCTA'));
const Footer = lazy(() => import('../sections/Footer'));
const ChairsBanner = lazy(() => import('../sections/ChairsBanner'));
const WorkshopsBanner = lazy(() => import('../sections/WorkshopsBanner'));
const JournalsBanner = lazy(() => import('../sections/JournalsBanner'));

// Local Section Loader
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center bg-slate-50/50 rounded-3xl animate-pulse">
    <div className="w-8 h-8 border-2 border-blue border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <div className="section-divider" />
        <Suspense fallback={<SectionLoader />}>
          <Reveal width="100%"><About /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><Topics /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><Speakers /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><ChairsBanner /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><WhyAttend /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><WorkshopsBanner /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><Registration /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><JournalsBanner /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><Venue /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><Testimonials /></Reveal>
          <div className="section-divider" />
          <Reveal width="100%"><FAQ /></Reveal>
          <div className="section-divider" />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
