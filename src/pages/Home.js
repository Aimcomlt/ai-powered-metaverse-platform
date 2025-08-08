import React from 'react';
import HeroSection from '../components/HeroSection';
import Introduction from '../components/Introduction';
import FeaturedFactions from '../components/FeaturedFactions';
import KeyFeatures from '../components/KeyFeatures';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

  const Home = () => {
    return (
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <FeaturedFactions />
        <Introduction />
        <KeyFeatures />
        <Testimonials />
        <Footer />
      </main>
    );
  };

export default Home;
