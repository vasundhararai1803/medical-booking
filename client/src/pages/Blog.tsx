import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { BookOpen } from 'lucide-react';

export const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-brand-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Our Blog</h1>
        <p className="text-lg text-slate-500 max-w-xl">
          Expert insights, oral health tips, and clinic news from Dr. Jyotirmay Singh and the Facio Dental team. Articles are coming soon!
        </p>
      </main>
    </div>
  );
};
