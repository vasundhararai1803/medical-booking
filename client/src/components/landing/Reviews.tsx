import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote, ExternalLink, ArrowRight } from 'lucide-react';

interface Review {
  id: string;
  patientName: string;
  treatmentTag: string;
  rating: number;
  content: string;
  date: string;
  metrics: {
    friendliness: number;
    explanation: number;
    satisfaction: number;
    value: number;
  };
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    patientName: 'Janvi',
    treatmentTag: 'Orthodontics',
    rating: 5,
    content: "Wonderful experience by facio dental clinic. i had an orthodontic treatment which was painless. the staff are really poliet and helpfull in everyway.",
    date: '20 Jun 2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '2',
    patientName: 'Srishti Arya',
    treatmentTag: 'Orthodontics',
    rating: 5,
    content: "I had a great experience with my orthodontic treatment here. Dr. Jyotirmay Singh was very professional and treated me with great care throughout the process. The staff was also courteous and made every visit comfortable. Highly recommended!",
    date: '19 Apr 2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '3',
    patientName: 'Ravi Singh',
    treatmentTag: 'Root Canal & Crowns',
    rating: 5,
    content: "I am very satisfied with my treatment RCT and cap by done doctor Dr Jyotirmay sir. Clinic is very good and clean.",
    date: '14 Jan 2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '4',
    patientName: 'Sumrit Kumar',
    treatmentTag: 'Root Canal & Crowns',
    rating: 5,
    content: "I am fully satisfied with the treatment rct and zirconia crown treatment.",
    date: '2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '5',
    patientName: 'Rinkee Kumari',
    treatmentTag: 'Orthodontics',
    rating: 5,
    content: "I am very happy and satisfied with my orthodontic treatment done by Dr jyotirmay singh .",
    date: '2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '6',
    patientName: 'Ajit Singh',
    treatmentTag: 'Surgery',
    rating: 5,
    content: "Very Good Overall Experience And Painless Surgery. Thank You Facio Dental Treatment",
    date: '2025',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  },
  {
    id: '7',
    patientName: 'Dwarika Bhagat',
    treatmentTag: 'Orthodontics',
    rating: 5,
    content: "Doctor jyotirmay singh give me real confidence to smile properly by orthodontic treatment so professional and very caring I am very very happy and satisfied thanks doctor H...",
    date: '19 Aug 2019',
    metrics: { friendliness: 5, explanation: 5, satisfaction: 5, value: 5 }
  }
];

const googleMapsClinicUrl = "https://www.google.com/search?q=Facio+Dental+Super+Speciality+Centre+Boring+Canal+Road+Patna+reviews";

const FILTERS = ["All", "Orthodontics", "Root Canal & Crowns", "Surgery"];

export const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract Srishti Arya as the Featured Hero Story
  const featuredStory = MOCK_REVIEWS.find(r => r.patientName === 'Srishti Arya') || MOCK_REVIEWS[0];
  
  // The rest are secondary reviews, filtered by the active tab
  const secondaryReviews = MOCK_REVIEWS.filter(r => r.id !== featuredStory.id).filter(r => 
    activeFilter === "All" || r.treatmentTag === activeFilter
  );

  return (
    <section id="testimonials" className="py-32 bg-slate-900 relative overflow-hidden">
      
      {/* Editorial Dark Navy / Sky Blue Atmospheric Lighting */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-900 rounded-full blur-[150px] opacity-40 pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-teal-900/40 rounded-full blur-[150px] opacity-30 pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-6 h-[1px] bg-brand-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Patient Journeys</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]"
            >
              Real Experiences. <br className="hidden sm:block"/>
              <span className="font-light italic text-brand-300">Beautiful Smiles.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-brand-100 flex items-center justify-center text-brand-700 font-bold z-30">A</div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-teal-100 flex items-center justify-center text-teal-700 font-bold z-20">S</div>
              <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-rose-100 flex items-center justify-center text-rose-700 font-bold z-10">J</div>
            </div>
            <div className="text-white">
              <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-sm font-medium text-slate-300">100+ Five Star Reviews</p>
            </div>
          </motion.div>
        </div>

        {/* HERO STORY: The editorial highlighted patient story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <a 
            href={googleMapsClinicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative rounded-[3rem] overflow-hidden bg-slate-800/50 border border-white/10 group shadow-2xl hover:bg-slate-800/80 transition-colors duration-500"
          >
            <div className="grid lg:grid-cols-12 items-stretch min-h-[500px]">
              
              {/* Left Side: The Image/Before-After Representation */}
              <div className="lg:col-span-5 relative overflow-hidden bg-brand-900">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200" 
                  alt="Happy Patient" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/90 hidden lg:block" />
                
                <div className="absolute top-8 left-8">
                  <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/20 backdrop-blur-md">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Verified Google Review
                  </div>
                </div>
              </div>

              {/* Right Side: The Story Content */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                <Quote className="w-16 h-16 text-white/5 absolute top-10 right-10 pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-8">
                  <span className="bg-brand-500/20 text-brand-300 text-xs font-bold px-3 py-1.5 rounded-full border border-brand-400/20">
                    {featuredStory.treatmentTag}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium leading-snug mb-10 italic">
                  "{featuredStory.content}"
                </p>

                <div className="flex items-end justify-between mt-auto pt-8 border-t border-white/10">
                  <div>
                    <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                      {featuredStory.patientName}
                    </h4>
                    <p className="text-sm text-slate-400 font-medium">{featuredStory.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-brand-400 font-bold text-sm group-hover:text-brand-300 transition-colors">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* SECONDARY REVIEWS HEADER & FILTERS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <h3 className="text-2xl font-bold text-white">More Patient Stories</h3>
          <div className="flex flex-wrap items-center gap-2 bg-slate-800/50 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeFilter === filter 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* SECONDARY REVIEWS MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {secondaryReviews.map((review, idx) => (
              <motion.a
                href={googleMapsClinicUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="block bg-white/5 rounded-3xl p-8 border border-white/10 relative cursor-pointer hover:bg-white/10 hover:border-brand-500/50 transition-all duration-300 group"
              >
                <div className="absolute top-8 right-8 text-brand-400/20 group-hover:text-brand-400/40 transition-colors">
                  <Quote className="w-8 h-8" />
                </div>
                
                {/* Tags & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-white/10 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-white/5">
                    {review.treatmentTag}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-300 text-sm italic mb-8 leading-relaxed line-clamp-4 relative z-10">
                  "{review.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-4 pt-6 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm border border-slate-600">
                    {review.patientName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5 mb-0.5">
                      {review.patientName}
                      <CheckCircle className="w-3.5 h-3.5 text-brand-400" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{review.date}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-brand-400 transition-colors" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
