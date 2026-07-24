import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All Services', 'General Dentistry', 'Orthodontics', 'Cosmetic', 'Implants'];

const MOCK_TREATMENTS = [
  {
    id: '1',
    title: 'Professional Teeth Cleaning',
    category: 'General Dentistry',
    duration: '45 Mins',
    description: 'Thorough removal of plaque and tartar to prevent cavities and maintain optimal oral health.',
    benefits: ['Removes stubborn plaque', 'Prevents gum disease', 'Freshens breath'],
    priceRange: '$100 - $150',
  },
  {
    id: '2',
    title: 'Invisalign Clear Aligners',
    category: 'Orthodontics',
    duration: '30 Mins (Consult)',
    description: 'Virtually invisible aligners customized to gradually and comfortably straighten your teeth.',
    benefits: ['Discreet appearance', 'Removable for eating', 'Comfortable fit'],
    priceRange: '$3,000 - $5,000',
  },
  {
    id: '3',
    title: 'Porcelain Veneers',
    category: 'Cosmetic',
    duration: '60 Mins',
    description: 'Custom-made, tooth-colored shells designed to cover the front surface of teeth to improve your appearance.',
    benefits: ['Fixes chipped teeth', 'Stain-resistant', 'Natural look'],
    priceRange: '$900 - $2,500',
  },
  {
    id: '4',
    title: 'Dental Implants',
    category: 'Implants',
    duration: '90 Mins',
    description: 'Permanent replacement for missing teeth that look, feel, and function like natural teeth.',
    benefits: ['Permanent solution', 'Preserves bone structure', 'Restores bite'],
    priceRange: '$1,500 - $4,000',
  },
  {
    id: '5',
    title: 'Teeth Whitening',
    category: 'Cosmetic',
    duration: '60 Mins',
    description: 'Professional grade whitening treatment to safely brighten your smile by several shades.',
    benefits: ['Fast results', 'Safe for enamel', 'Long-lasting'],
    priceRange: '$300 - $600',
  },
  {
    id: '6',
    title: 'Root Canal Therapy',
    category: 'General Dentistry',
    duration: '90 Mins',
    description: 'Relieves dental pain and saves your natural tooth by removing infected pulp.',
    benefits: ['Stops severe pain', 'Saves natural tooth', 'Prevents spread of infection'],
    priceRange: '$800 - $1,500',
  },
];

export const TreatmentCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading] = useState(false);

  const filteredTreatments = MOCK_TREATMENTS.filter((t) => {
    const matchesCategory = activeCategory === 'All Services' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Dental Services</h2>
          <p className="text-lg text-slate-600">
            From routine cleanings to advanced restorative procedures, we offer a full spectrum of dental care tailored to your unique needs.
          </p>
        </div>

        {/* Interactive Control Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Horizontal Filter Tabs */}
          <div className="flex overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 gap-2 hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        {isLoading ? (
          /* Loading Skeleton State */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 animate-pulse h-[400px]">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 mb-8"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTreatments.length === 0 ? (
          /* Empty Search State */
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
            <Search className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No treatments found</h3>
            <p className="text-slate-500">We couldn't find any treatments matching your current filters.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All Services');}}
              className="mt-6 text-brand-600 font-medium hover:text-brand-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                    {treatment.category}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm font-medium gap-1.5">
                    <Clock className="w-4 h-4" />
                    {treatment.duration}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{treatment.title}</h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{treatment.description}</p>
                
                <ul className="space-y-2 mb-8">
                  {treatment.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 font-medium">Estimated Cost</span>
                    <span className="text-base font-bold text-slate-900">{treatment.priceRange}</span>
                  </div>
                  <button className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 group-hover:bg-brand-50 px-4 py-2 rounded-full transition-colors">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
