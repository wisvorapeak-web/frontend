import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import TrustStrip from '../sections/TrustStrip';
import About from '../sections/About';
import Topics from '../sections/Topics';
import Speakers from '../sections/Speakers';
import WhyAttend from '../sections/WhyAttend';
import Registration from '../sections/Registration';
import Venue from '../sections/Venue';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import FinalCTA from '../sections/FinalCTA';
import Footer from '../sections/Footer';
import ChairsBanner from '../sections/ChairsBanner';
import WorkshopsBanner from '../sections/WorkshopsBanner';
import JournalsBanner from '../sections/JournalsBanner';
import { Reveal } from '../components/Reveal';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <div className="section-divider" />
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
      </main>
      <Footer />
    </div>
  );
}
