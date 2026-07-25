import React from 'react';
import { Hero } from '../components/landing/Hero';
import { OurServices } from '../components/landing/OurServices';
import { Reviews } from '../components/landing/Reviews';
import { QuickBookModal } from '../components/booking/QuickBookModal';

export const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTreatment, setSelectedTreatment] = React.useState<string>();

  const handleBookService = (treatmentId?: string) => {
    setSelectedTreatment(treatmentId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-200 selection:text-brand-900">
      {/* 
        NOTE: Header/Navbar component should ideally go here. 
        For now, we render the Hero directly as requested.
      */}
      
      <Hero onBookClick={() => handleBookService()} />
      
      <OurServices onBookTreatment={handleBookService} />
      
      <Reviews />

      {isModalOpen && (
        <QuickBookModal 
          treatmentId={selectedTreatment || null}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </main>
  );
};
