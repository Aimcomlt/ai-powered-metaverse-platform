import React from 'react';
import HeroSection from '../components/HeroSection';
import Introduction from '../components/Introduction';
import FeaturedFactions from '../components/FeaturedFactions';
import KeyFeatures from '../components/KeyFeatures';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedFactions />
      <Introduction />
      <KeyFeatures />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
