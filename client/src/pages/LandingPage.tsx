import React from 'react';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { TreatmentCatalog } from '../components/landing/TreatmentCatalog';
import { OurServices } from '../components/landing/OurServices';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <Hero />
        <OurServices />
        <TreatmentCatalog />
      </main>
      
      {/* Footer can go here in the future */}
    </div>
  );
};

export default LandingPage;
