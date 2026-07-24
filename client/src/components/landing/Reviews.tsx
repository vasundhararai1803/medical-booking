import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Quote, ExternalLink } from 'lucide-react';

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

  const filteredReviews = MOCK_REVIEWS.filter(r => 
    activeFilter === "All" || r.treatmentTag === activeFilter
  );

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-brand-100 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-4 h-4 text-brand-600 fill-current" />
            <span className="text-sm font-bold text-brand-700 tracking-wide uppercase">Patient Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
            Real Experiences, <span className="text-brand-600">Real Smiles.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Read what our verified patients have to say about their journey to a better smile at Facio Dental.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter 
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.a
                href={googleMapsClinicUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="block bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative cursor-pointer hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 transition-all group"
              >
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                    <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google Verified</span>
                  </div>
                  <Quote className="w-10 h-10 text-brand-50" />
                </div>
                
                {/* User Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {review.patientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      {review.patientName}
                      <CheckCircle className="w-4 h-4 text-brand-500" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">Verified Patient • {review.date}</p>
                  </div>
                </div>

                {/* Tags & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-brand-50 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {review.treatmentTag}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-slate-200'}`} 
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-700 italic mb-6 leading-relaxed relative z-10">
                  "{review.content}"
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-6 border-t border-slate-100 mb-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Dr. Friendliness</span>
                    <span className="font-semibold text-slate-700">{review.metrics.friendliness}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Explanation</span>
                    <span className="font-semibold text-slate-700">{review.metrics.explanation}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Satisfaction</span>
                    <span className="font-semibold text-slate-700">{review.metrics.satisfaction}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Value</span>
                    <span className="font-semibold text-slate-700">{review.metrics.value}/5</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-brand-600 group-hover:text-brand-700 transition-colors">
                  <span>Read Full Review on Google</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

              </motion.a>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
