import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { AboutHero } from '../components/about/AboutHero';
import { AboutStats } from '../components/about/AboutStats';
import { AboutTimeline } from '../components/about/AboutTimeline';
import { AboutStory } from '../components/about/AboutStory';
import { AboutTech } from '../components/about/AboutTech';
import { AboutCredentials } from '../components/about/AboutCredentials';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-500 selection:text-white overflow-hidden">
      <Navbar />
      
      {/* 1. Enhanced Hero Section */}
      <AboutHero />
      
      {/* 2. Trust Statistics Overlap */}
      <AboutStats />
      
      {/* 3. Immersive Career Timeline */}
      <AboutTimeline />
      
      {/* 4, 5, 8. Why Trust Us, Our Philosophy, A Day at Facio Dental */}
      <AboutStory />
      
      {/* 6, 7. Technology & Innovation, Inside Our Clinic */}
      <AboutTech />
      
      {/* 9, 10, 11. Qualifications, Memberships, Awards, FAQ, CTA */}
      <AboutCredentials />

    </div>
  );
};
