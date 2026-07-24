import React, { useState, useMemo } from 'react';
import { QuickBookModal } from '../components/booking/QuickBookModal';
import { 
  Stethoscope, CheckCircle2, Search, ArrowRight, Sparkles, 
  Activity, Shield, Baby, Syringe, Crown, Smile, Zap, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'All' | 'Cosmetic' | 'Orthodontics' | 'Surgery & Implants' | 'Restorative' | 'Pediatric' | 'Preventive';

interface FeaturedTreatment {
  title: string;
  category: Category;
  description: string;
  icon: React.FC<any>;
  popular?: boolean;
}

const FEATURED_TREATMENTS: FeaturedTreatment[] = [
  { title: 'Invisalign Certified Orthodontics', category: 'Orthodontics', description: 'Clear, removable aligners that straighten your teeth discreetly without metal brackets.', icon: Smile, popular: true },
  { title: 'Smile Makeover', category: 'Cosmetic', description: 'A comprehensive custom redesign of your smile using veneers, whitening, and contouring.', icon: Sparkles, popular: true },
  { title: 'Artificial Teeth Implant', category: 'Surgery & Implants', description: 'Permanent, natural-looking titanium replacements for missing teeth roots and crowns.', icon: Crown, popular: true },
  { title: 'Root Canal Treatment (RCT)', category: 'Restorative', description: 'Painless removal of infected pulp to save and restore your natural tooth.', icon: Activity },
  { title: 'Laminates / Veneers', category: 'Cosmetic', description: 'Ultra-thin porcelain shells bonded to the front of teeth for a flawless Hollywood smile.', icon: Sparkles },
  { title: 'Wisdom Tooth Extraction', category: 'Surgery & Implants', description: 'Safe and painless surgical removal of impacted or problematic third molars.', icon: Syringe },
  { title: 'Teeth Whitening Treatment', category: 'Cosmetic', description: 'Professional grade bleaching to remove stains and brighten your smile by several shades.', icon: Zap },
  { title: 'Ceramic Dental Braces', category: 'Orthodontics', description: 'Tooth-colored brackets that blend in naturally while effectively straightening teeth.', icon: Smile },
  { title: 'Pediatric Dentistry', category: 'Pediatric', description: 'Gentle, specialized care ensuring a lifetime of healthy smiles for your little ones.', icon: Baby, popular: true },
  { title: 'Gum Disease Treatment', category: 'Preventive', description: 'Deep cleaning and periodontal therapy to halt gingivitis and restore gum health.', icon: Shield },
  { title: 'Zirconia Crowns', category: 'Restorative', description: 'Highly durable, metal-free crowns that look exactly like your natural teeth.', icon: Crown },
  { title: 'Full Mouth Rehabilitation', category: 'Surgery & Implants', description: 'Complete restoration of all teeth in both jaws for optimal function and aesthetics.', icon: Activity },
  { title: 'Laser Gum Surgery', category: 'Surgery & Implants', description: 'Minimally invasive laser therapy for treating gum disease with rapid healing times.', icon: Zap },
  { title: 'Space Maintainers', category: 'Pediatric', description: 'Custom appliances to keep space open for permanent teeth after early baby tooth loss.', icon: Baby },
  { title: 'Fluoride Application', category: 'Preventive', description: 'Strengthening enamel to prevent cavities and tooth decay in both children and adults.', icon: Shield },
  { title: 'Invisible / Clear Braces', category: 'Orthodontics', description: 'A transparent alternative to traditional braces for teens and adults.', icon: Smile },
];

const ADVANCED_TREATMENTS = [
  "Fixing Dental Gaps", "Post & Core Crown", "Complete Dentures (CD)", "Immediate Denture", "Periodontal (Gums)",
  "Impacted Tooth Extraction", "Complete, Partial and Flexible Dentures", "Tooth Reshaping",
  "Oral and Maxillofacial Trauma", "Maxillofacial Prosthodontics", "Bleeding Gums", "Dental Filling", 
  "Scaling and Polishing", "Oral Cancer", "Dental Trauma", "Dental Inlays and Onlays",
  "Cosmetics and Aesthetics", "Laser Gingivoplasty", "Metal Braces Fixing", "Presurgical Orthodontics", 
  "Laser Dentistry", "Dentofacial Orthopedics", "BPS Dentures Fixing", "Dental X-ray/Digital X-ray", 
  "Dental Sleep Medicine", "Bad Breath (Halitosis Treatment)", "Flap Surgery", "Laser Gingioplasty",
  "Laser Depigmentation", "Pit & Fissure Sealant", "Management of Maloccluded Teeth", "Pulpotomy", 
  "Pulpectomy", "Facial Fracture Treatment", "Inlays & Onlays", "Endo Surgery/Apexotomy", 
  "Discoloured Tooth Restoration", "Tooth-Coloured Filling", "RCT – Single Sitting", "Biopsy",
  "Bone Grafting Surgery", "Bone Plating in Maxilla & Mandible", "Surgical Tooth Extraction",
  "Removal of Cyst", "Oral Cancer Treatment", "Impacted Tooth Surgery", "TMJ Pain Management", 
  "Facial Trauma Treatment", "Oral & Maxillofacial Surgery", "Acrylic Full/Partial Dentures", 
  "Flexible Partial/Complete Dentures", "Maxillofacial Prosthetics", "Implant Retained Dentures", 
  "Porcelain Fused Metal Crowns", "Ceramic Crown & Bridge Fixing", "Smile Design", 
  "Cleft Lip & Palate Orthodontics", "Orthognathic Surgery", "Habit Breaking Appliances",
  "Myofunctional Appliances During Growth", "Lingual Orthodontics", "Metal Braces",
  "Laser Surgery", "Oral Rehabilitation", "Oral Cancers & Lesions", "Dental Radiology",
  "Bridges, Crowns & Dentures", "Fixed & Removable Dentures", "Filling & Root Canal",
  "Hair Transplants", "General Dentistry"
];

const CATEGORIES: Category[] = ['All', 'Cosmetic', 'Orthodontics', 'Surgery & Implants', 'Restorative', 'Pediatric', 'Preventive'];

export const Treatments: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filteredFeatured = useMemo(() => {
    return FEATURED_TREATMENTS.filter(t => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
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
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-20">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-brand-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500 rounded-full blur-[100px] opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-brand-50 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-white/10"
            >
              <Stethoscope className="w-4 h-4" />
              World-Class Dental Care
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1]"
            >
              Transform Your Smile with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-emerald-300">Precision</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-100 text-lg md:text-xl font-medium mb-10 max-w-2xl"
            >
              From routine preventive care to complex full-mouth rehabilitations, explore our curated directory of over 100 specialized treatments.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-xl relative"
            >
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/30 shadow-xl transition-all"
                placeholder="Search treatments (e.g. Invisalign, Root Canal)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filters */}
        {!searchQuery && (
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-12 pb-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category 
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {searchQuery && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900">
              Search results for "{searchQuery}"
            </h3>
          </div>
        )}

        {/* Featured Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFeatured.map((t, idx) => {
              const Icon = t.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={t.title}
                  className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-brand-900/10 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
                >
                  {t.popular && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                      Popular
                    </div>
                  )}
                  
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {t.title}
                  </h3>
                  
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
                    {t.description}
                  </p>
                  
                  <button 
                    onClick={() => handleBook(t.title)}
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 text-slate-700 font-bold group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Advanced Directory Section */}
        {filteredAdvanced.length > 0 && (
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Advanced Procedure Directory</h2>
                <p className="text-slate-500 font-medium">Our comprehensive list of specialized maxillofacial and dental procedures.</p>
              </div>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-700 rounded-full font-bold hover:bg-slate-100 transition-colors shrink-0"
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
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-50 transition-colors cursor-pointer group"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500/50 shrink-0 mt-0.5 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-brand-700 transition-colors leading-snug">
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

        {/* Global Empty State */}
        {filteredFeatured.length === 0 && filteredAdvanced.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No treatments found</h3>
            <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any procedures matching "{searchQuery}". Please try a different term or book a general consultation.</p>
            <button 
              onClick={() => handleBook('General Consultation')}
              className="mt-8 px-8 py-4 bg-brand-600 text-white rounded-full font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-colors"
            >
              Book General Consultation
            </button>
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
