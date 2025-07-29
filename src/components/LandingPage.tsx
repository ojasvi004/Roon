'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BackgroundEffects from './BackgroundEffects';
import HeroSection from './HeroSection';
import ChatDemo from './ChatDemo';
import FeaturesSection from './FeaturesSection';
import Footer from './Footer';
import AnimatedSection from './AnimatedSection';

const LandingPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Chat Securely.';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedSection animationType="immediate">
        <Navbar />
      </AnimatedSection>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-20">
        <BackgroundEffects />

        <AnimatedSection animationType="immediate" delay={0.2}>
          <HeroSection displayText={displayText} showCursor={showCursor} />
        </AnimatedSection>

        <AnimatedSection className="w-full">
          <ChatDemo />
        </AnimatedSection>

        <AnimatedSection id="features">
          <FeaturesSection />
        </AnimatedSection>

        <div className="h-20"></div>
      </div>

      <AnimatedSection id="footer">
        <Footer />
      </AnimatedSection>
    </div>
  );
};

export default LandingPage;
