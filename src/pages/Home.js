import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import Introduction from '../components/Introduction';
import FeaturedFactions from '../components/FeaturedFactions';
import KeyFeatures from '../components/KeyFeatures';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Helmet>
      <title>Home | Metaverse Platform</title>
      <meta
        name="description"
        content="Landing page for the AI-powered metaverse platform"
      />
    </Helmet>
    <main id="main-content" tabIndex={-1}>
      <HeroSection />
      <FeaturedFactions />
      <Introduction />
      <KeyFeatures />
      <Testimonials />
      <Footer />
    </main>
  </>
);

export default Home;
