import React, { useState, useMemo, useRef } from 'react';
import { QuickBookModal } from '../components/booking/QuickBookModal';
import { 
  Stethoscope, CheckCircle2, Search, ArrowRight, ArrowLeft, Sparkles, 
  Activity, Shield, Baby, Syringe, Crown, Smile, Zap, Plus, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'All Treatments' | 'Cosmetic' | 'Orthodontics' | 'Surgery & Implants' | 'Restorative' | 'Pediatric' | 'Preventive';

interface FeaturedTreatment {
  title: string;
  category: Category;
  description: string;
  icon: React.FC<any>;
  imageUrl: string;
  popular?: boolean;
}

const FEATURED_TREATMENTS: FeaturedTreatment[] = [
  { 
    title: 'Invisalign Certified Orthodontics', 
    category: 'Orthodontics', 
    description: 'Clear, removable aligners that straighten your teeth discreetly without metal brackets.', 
    icon: Smile, 
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    popular: true 
  },
  { 
    title: 'Smile Makeover', 
    category: 'Cosmetic', 
    description: 'A comprehensive custom redesign of your smile using veneers, whitening, and contouring.', 
    icon: Sparkles, 
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    popular: true 
  },
  { 
    title: 'Artificial Teeth Implant', 
    category: 'Surgery & Implants', 
    description: 'Permanent, natural-looking titanium replacements for missing teeth roots and crowns.', 
    icon: Crown, 
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    popular: true 
  },
  { 
    title: 'Root Canal Treatment (RCT)', 
    category: 'Restorative', 
    description: 'Painless removal of infected pulp to save and restore your natural tooth.', 
    icon: Activity,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Laminates / Veneers', 
    category: 'Cosmetic', 
    description: 'Ultra-thin porcelain shells bonded to the front of teeth for a flawless Hollywood smile.', 
    icon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Wisdom Tooth Extraction', 
    category: 'Surgery & Implants', 
    description: 'Safe and painless surgical removal of impacted or problematic third molars.', 
    icon: Syringe,
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Teeth Whitening Treatment', 
    category: 'Cosmetic', 
    description: 'Professional grade bleaching to remove stains and brighten your smile by several shades.', 
    icon: Zap,
    imageUrl: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800'
  },
  { 
    title: 'Pediatric Dentistry', 
    category: 'Pediatric', 
    description: 'Gentle, specialized care ensuring a lifetime of healthy smiles for your little ones.', 
    icon: Baby, 
    imageUrl: 'https://images.unsplash.com/photo-1609141076615-562a1abfbd8a?auto=format&fit=crop&q=80&w=800',
    popular: true 
  },
];

const ADVANCED_TREATMENTS = [
  "Fixing Dental Gaps", "Post & Core Crown", "Complete Dentures (CD)", "Immediate Denture", "Periodontal (Gums)",
  "Impacted Tooth Extraction", "Complete, Partial and Flexible Dentures", "Tooth Reshaping",
  "Oral and Maxillofacial Trauma", "Maxillofacial Prosthodontics", "Bleeding Gums", "Dental Filling", 
  "Scaling and Polishing", "Oral Cancer", "Dental Trauma", "Dental Inlays and Onlays",
  "Cosmetics and Aesthetics", "Laser Gingivoplasty", "Metal Braces Fixing", "Presurgical Orthodontics", 
  "Laser Dentistry", "Dentofacial Orthopedics", "BPS Dentures Fixing", "Dental X-ray/Digital X-ray"
];

const CATEGORIES: { id: Category; label: string; icon?: React.FC<any> }[] = [
  { id: 'All Treatments', label: 'All Treatments' },
  { id: 'Cosmetic', label: 'Cosmetic', icon: Sparkles },
  { id: 'Orthodontics', label: 'Orthodontics', icon: Smile },
  { id: 'Surgery & Implants', label: 'Surgery & Implants', icon: Crown },
  { id: 'Restorative', label: 'Restorative', icon: Activity },
  { id: 'Pediatric', label: 'Pediatric', icon: Baby },
  { id: 'Preventive', label: 'Preventive', icon: Shield },
];

export const Treatments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const filteredFeatured = useMemo(() => {
    return FEATURED_TREATMENTS.filter(t => {
      const matchesCategory = activeCategory === 'All Treatments' || t.category === activeCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const filteredAdvanced = useMemo(() => {
    if (!searchQuery) return ADVANCED_TREATMENTS;
    return ADVANCED_TREATMENTS.filter(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  const handleBook = (treatmentName: string) => {
    setSelectedTreatment(treatmentName);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20 font-sans selection:bg-brand-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PREMIUM EDITORIAL HERO SECTION */}
        <div className="relative bg-[#F3EFE7] rounded-[3rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-12 flex flex-col lg:flex-row items-center min-h-[500px]">
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          
          <div className="w-full lg:w-1/2 p-10 sm:p-16 lg:p-20 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Stethoscope className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">World-Class Dental Care</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1A2332] mb-6 leading-[1.1] tracking-tight"
            >
              Transform Your Smile<br />
              with <span className="italic font-light text-[#0070B8]">Precision</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg font-medium mb-12 max-w-lg leading-relaxed"
            >
              From routine preventive care to complex full-mouth rehabilitations, explore our curated directory of over 100 specialized treatments.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-md relative"
            >
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-6 py-4 bg-white rounded-full text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#0070B8]/20 shadow-sm transition-all"
                placeholder="Search treatments (e.g. Invisalign, Root Canal)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 h-[400px] lg:h-full absolute bottom-0 right-0 lg:static hidden md:block">
            {/* The organically curved image container mask on the right */}
            <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[55%] h-full">
              <div className="w-full h-full bg-slate-200" style={{ clipPath: 'ellipse(85% 100% at 100% 50%)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Dental Clinic" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Floating Reviews Card overlaying the image */}
              <motion.a 
                href="https://www.google.com/search?sca_esv=84d2e7c7b37a0322&sxsrf=APpeQnu3MDqOiXFH5gIRxsnQpjijHSqp9Q:1784990886149&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_3-ot2Yuxx604F1GCVfbHgHOcONRGS9pRJ9xut4gs9p5m2hi43sDai2BSGPBW7M3sCg2K-JP1njFLrViL_xajKHrtH48&q=Facio+Dental+Reviews&sa=X&ved=2ahUKEwjbwsidie6VAxVyT2wGHXtOFqoQ0bkNegQINRAH&biw=1336&bih=689&dpr=2.2"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                className="absolute top-1/4 -left-16 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20 hidden lg:block w-64 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Patient 1" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Patient 2" />
                    <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Patient 3" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 leading-none">10K+</div>
                    <div className="text-[10px] text-slate-500 font-medium">Smiles Transformed</div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-100 mb-3" />
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <div className="text-xs font-bold text-slate-700">4.9/5 <span className="font-medium text-slate-500">Patient Rating</span></div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTERS & SORT */}
        {!searchQuery && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 w-full md:w-auto pb-2 md:pb-0">
              {CATEGORIES.map(category => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive 
                      ? 'bg-[#1A2332] text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {category.id === 'All Treatments' ? (
                      <div className="flex gap-0.5">
                        <div className={`w-1.5 h-1.5 rounded-sm ${isActive ? 'bg-white/80' : 'bg-slate-400'}`} />
                        <div className={`w-1.5 h-1.5 rounded-sm ${isActive ? 'bg-white/80' : 'bg-slate-400'}`} />
                        <div className={`w-1.5 h-1.5 rounded-sm ${isActive ? 'bg-white/80' : 'bg-slate-400'} -ml-[7px] mt-[7px]`} />
                        <div className={`w-1.5 h-1.5 rounded-sm ${isActive ? 'bg-white/80' : 'bg-slate-400'} mt-[7px]`} />
                      </div>
                    ) : (
                      Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    )}
                    {category.label}
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center gap-2 shrink-0 self-end md:self-auto text-sm text-slate-500 font-medium">
              Sort by <span className="text-slate-900 font-bold cursor-pointer">Popular ▾</span>
            </div>
          </div>
        )}

        {searchQuery && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              Search results for "{searchQuery}"
            </h3>
          </div>
        )}

        {/* FEATURED TREATMENTS HEADER & GRID CONTAINER */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-serif text-[#1A2332] italic relative">
                <span className="absolute -left-5 -top-2 text-[#E8C27B] text-xl">✦</span>
                Featured Treatments
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-[#1A2332] text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-md"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={carouselRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-10 -mx-6 px-6 snap-x snap-mandatory"
          >
            <AnimatePresence mode="popLayout">
              {filteredFeatured.map((t, idx) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    key={t.title}
                    className="group bg-white rounded-[1.5rem] border border-slate-100 flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] snap-start"
                  >
                    {/* Top Image Area */}
                    <div className="relative h-48 sm:h-56 w-full p-2">
                      <div className="w-full h-full rounded-[1.25rem] overflow-hidden relative">
                        <img 
                          src={t.imageUrl} 
                          alt={t.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Popular Badge */}
                        {t.popular && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-[#1A2332] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            Popular
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      {/* Floating Circle Icon */}
                      <div className="absolute -bottom-5 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-md border border-slate-100 z-10 group-hover:scale-110 group-hover:text-[#0070B8] transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="px-6 pt-10 pb-6 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0070B8] transition-colors leading-tight">
                        {t.title}
                      </h3>
                      
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">
                        {t.description}
                      </p>
                      
                      <div className="w-full h-[1px] bg-slate-100 mb-4 group-hover:bg-slate-200 transition-colors" />
                      
                      <button 
                        onClick={() => handleBook(t.title)}
                        className="flex items-center justify-between w-full text-sm font-bold text-slate-900 group/btn hover:text-[#0070B8] transition-colors"
                      >
                        Book Consultation
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover/btn:bg-[#0070B8] group-hover/btn:border-[#0070B8] group-hover/btn:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Global Empty State */}
          {filteredFeatured.length === 0 && filteredAdvanced.length === 0 && (
            <div className="text-center py-20 bg-[#FAF8F5] rounded-[2rem] border border-slate-100 shadow-inner">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No treatments found</h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any procedures matching "{searchQuery}". Please try a different term or book a general consultation.</p>
              <button 
                onClick={() => handleBook('General Consultation')}
                className="mt-8 px-8 py-4 bg-[#1A2332] text-white rounded-full font-bold shadow-lg shadow-[#1A2332]/20 hover:bg-slate-800 transition-colors"
              >
                Book General Consultation
              </button>
            </div>
          )}
        </div>

        {/* Advanced Directory Section */}
        {filteredAdvanced.length > 0 && (
          <div className="mt-8 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2332] mb-2">Advanced Procedure Directory</h2>
                <p className="text-slate-500 font-medium">Our comprehensive list of specialized maxillofacial and dental procedures.</p>
              </div>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 px-6 py-3 bg-[#FAF8F5] text-slate-700 rounded-full font-bold hover:bg-[#F3EFE7] transition-colors shrink-0 border border-slate-200/50"
              >
                {showAdvanced ? 'Collapse Directory' : 'View All 70+ Procedures'}
                <Plus className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? 'rotate-45' : ''}`} />
              </button>
            </div>

            <AnimatePresence>
              {(showAdvanced || searchQuery) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                    {filteredAdvanced.map((treatment, index) => (
                      <div 
                        key={index} 
                        onClick={() => handleBook(treatment)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#0070B8]/40 shrink-0 mt-0.5 group-hover:text-[#0070B8] transition-colors" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-[#1A2332] transition-colors leading-snug">
                          {treatment}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>

      {isModalOpen && (
        <QuickBookModal
          treatmentId={selectedTreatment || undefined}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
