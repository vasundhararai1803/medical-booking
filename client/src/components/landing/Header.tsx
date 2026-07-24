import React from 'react';
import { Stethoscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-brand-600 text-white p-2 rounded-xl">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Apex<span className="text-brand-600">Dental</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex gap-8">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Treatments</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">Book Online</a>
          </nav>

          {/* Call to Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors px-4 py-2">
              Sign In
            </button>
            <button className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Book Appointment
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
