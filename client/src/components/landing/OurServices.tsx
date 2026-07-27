import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Sparkles,
  Stethoscope,
  Smile,
  Activity,
  ShieldCheck,
  HeartPulse,
  Clock,
  ThumbsUp,
  PhoneCall
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Treatment } from '../../types/treatment';
import api from '../../services/api';

interface OurServicesProps {
  onBookTreatment?: (treatmentId?: string) => void;
}

const CATEGORIES = [
  { id: 'All', label: 'All Treatments' },
  { id: 'orthodontics', label: 'Orthodontics', icon: Smile },
  { id: 'implants', label: 'Dental Implants', icon: Activity },
  { id: 'cosmetic', label: 'Cosmetic Dentistry', icon: Sparkles },
  { id: 'general', label: 'General Care', icon: Stethoscope },
  { id: 'pediatric', label: 'Pediatric Dentistry', icon: HeartPulse },
  { id: 'emergency', label: 'Emergency', icon: ShieldCheck },
];

const CATEGORY_IMAGES: Record<string, string> = {
  orthodontics: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
  implants: 'https://images.unsplash.com/photo-1598256989800-fea5c1c84f1a?auto=format&fit=crop&q=80&w=1200',
  cosmetic: 'https://images.unsplash.com/photo-1522849696084-818b92644246?auto=format&fit=crop&q=80&w=1200',
  pediatric: 'https://images.unsplash.com/photo-1609141076615-562a1abfbd8a?auto=format&fit=crop&q=80&w=1200',
  general: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
  emergency: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200',
};

// Map distinct, rich background hues for the featured carousel slides
const CAROUSEL_COLORS = [
  'from-slate-900 via-slate-900/60 to-transparent',
  'from-brand-900 via-brand-900/60 to-transparent',
  'from-emerald-900 via-emerald-900/60 to-transparent',
  'from-indigo-900 via-indigo-900/60 to-transparent',
  'from-rose-900 via-rose-900/60 to-transparent',
];

export const OurServices: React.FC<OurServicesProps> = ({ onBookTreatment }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/treatments');
        const fetched: Treatment[] = response.data.data.treatments || [];
        setServices(fetched);
      } catch (err) {
        console.error('Failed to fetch services', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

  const activeCategories = useMemo(() => {
    const existingIds = new Set(services.map(s => s.category.toLowerCase()));
    return CATEGORIES.filter(cat => cat.id === 'All' || existingIds.has(cat.id.toLowerCase()));
  }, [services]);

  const featuredServices = useMemo(() => services.slice(0, 5), [services]);
  const popularServices = useMemo(() => filteredServices.slice(0, 8), [filteredServices]);

  // Auto-play Carousel
  useEffect(() => {
    if (featuredServices.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredServices.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredServices.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredServices.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? featuredServices.length - 1 : prev - 1));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 bg-[#faf9f6]">
        <div className="h-[600px] bg-slate-200/50 animate-pulse rounded-[3rem]" />
      </div>
    );
  }

  return (
    <section className="py-32 bg-[#faf9f6] relative overflow-hidden" id="treatments">
      {/* Editorial Noise Texture & Warm Gradients */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-amber-100/40 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* EDITORIAL HEADER & SEARCH SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-6 h-[1px] bg-brand-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Clinical Expertise</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]"
            >
              Mastering the art of <br className="hidden sm:block"/>
              <span className="font-light italic text-brand-600">dental aesthetics.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-96 relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search treatments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-md border border-slate-200/60 focus:border-brand-400 focus:bg-white rounded-full text-base font-medium text-slate-900 placeholder:text-slate-500 transition-all shadow-sm focus:shadow-md outline-none"
            />
          </motion.div>
        </div>

        {/* CATEGORY FILTERS (Magnetic feeling) */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          {activeCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                    : 'bg-white/50 backdrop-blur-sm text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-white hover:text-slate-900'
                }`}
              >
                {Icon && <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-400' : ''}`} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* PREMIUM IMMERSIVE CAROUSEL */}
        {!searchQuery && selectedCategory === 'All' && featuredServices.length > 0 && (
          <div className="mb-32">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xl font-bold text-slate-900">Featured Highlight</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl h-[550px] lg:h-[700px] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/* Subtle Zooming Background Image */}
                  <motion.img
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 15, ease: "linear" }}
                    src={CATEGORY_IMAGES[featuredServices[currentIndex].category] || CATEGORY_IMAGES.general}
                    alt={featuredServices[currentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  
                  {/* Layered Editorial Gradients based on index */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${CAROUSEL_COLORS[currentIndex % CAROUSEL_COLORS.length]}`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent w-full md:w-3/4" />
                  
                  <div className="absolute inset-0 p-8 sm:p-12 lg:p-20 flex flex-col justify-end max-w-4xl z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="mb-6"
                    >
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        Signature Treatment
                      </span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-white mb-6 leading-[1.05] tracking-tight"
                    >
                      {featuredServices[currentIndex].title}
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl line-clamp-3 leading-relaxed font-medium"
                    >
                      {featuredServices[currentIndex].description}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex flex-wrap items-center gap-4"
                    >
                      <button 
                        onClick={() => onBookTreatment?.(featuredServices[currentIndex]._id)}
                        className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-brand-50 hover:scale-105 transition-all shadow-xl shadow-white/10 flex items-center gap-2"
                      >
                        Book Consultation
                        <ArrowRight className="w-5 h-5" />
                      </button>
                      <Link 
                        to={`/treatments`}
                        className="px-8 py-4 rounded-full bg-slate-800/40 text-white font-bold hover:bg-slate-800/60 transition-colors backdrop-blur-md border border-white/10 flex items-center gap-2"
                      >
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Minimalist Pagination Lines */}
              <div className="absolute top-8 right-8 lg:top-12 lg:right-12 flex flex-col gap-3 z-10 hidden sm:flex">
                {featuredServices.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-1 rounded-full transition-all duration-500 overflow-hidden ${
                      idx === currentIndex ? 'h-10 bg-white/20' : 'h-3 bg-white/10 hover:bg-white/30'
                    }`}
                  >
                    {idx === currentIndex && (
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 7, ease: "linear" }}
                        className="w-full bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EDITORIAL GRID (Product-Style Cards) */}
        {popularServices.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {searchQuery ? 'Search Results' : selectedCategory === 'All' ? 'Popular Procedures' : `${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
              </h3>
              <div className="flex-1 h-[1px] bg-slate-200 mt-2 hidden sm:block" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {popularServices.map((treatment, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  key={treatment._id}
                  className="group relative bg-white rounded-3xl p-1 flex flex-col h-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100"
                >
                  <div className="bg-[#faf9f6] rounded-[1.35rem] p-6 h-full flex flex-col relative overflow-hidden z-10">
                    
                    {/* Background Image / Gradient */}
                    {treatment.imageUrl ? (
                      <>
                        <img 
                          src={treatment.imageUrl} 
                          alt={treatment.title} 
                          className="absolute inset-0 w-full h-40 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-[#faf9f6] pointer-events-none" />
                      </>
                    ) : (
                      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent opacity-50 pointer-events-none" />
                    )}

                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 text-brand-600 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight relative z-10 leading-tight">
                      {treatment.title}
                    </h4>
                    
                    <p className="text-slate-500 text-sm line-clamp-3 mb-8 flex-grow relative z-10 leading-relaxed">
                      {treatment.description}
                    </p>
                    
                    <div className="pt-5 border-t border-slate-200/60 mt-auto flex items-center justify-between relative z-10">
                      <button 
                        onClick={() => navigate('/treatments')}
                        className="text-brand-600 font-bold text-xs uppercase tracking-wider hover:text-brand-800 transition-colors"
                      >
                        Read More
                      </button>
                      <button 
                        onClick={() => onBookTreatment?.(treatment._id)}
                        className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-brand-600 group-hover:border-brand-600 group-hover:text-white transition-all duration-300 group-hover:scale-110"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* PREMIUM LAYERED CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 relative text-center"
        >
          {/* Subtle View All Button above CTA */}
          <div className="mb-12">
            <Link
              to="/treatments"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:border-slate-300 hover:shadow-md transition-all group"
            >
              Browse Directory
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 relative overflow-hidden text-center shadow-2xl">
            {/* Elegant Glassy Gradients */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-color-dodge">
              <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-brand-400 via-transparent to-transparent rotate-12 blur-3xl" />
              <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-tl from-emerald-400 via-transparent to-transparent -rotate-12 blur-3xl" />
            </div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Unsure which procedure is right for you?
              </h3>
              <p className="text-slate-300 text-lg sm:text-xl mb-12 font-medium">
                Book a bespoke consultation. Our specialists will analyze your needs and curate a personalized treatment roadmap.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => onBookTreatment?.()}
                  className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-xl flex items-center justify-center gap-2 text-lg group"
                >
                  Schedule Visit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link 
                  to="/consult"
                  className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-800/50 text-white font-bold hover:bg-slate-800 transition-colors border border-white/10 flex items-center justify-center gap-2 backdrop-blur-md text-lg"
                >
                  <PhoneCall className="w-5 h-5" />
                  Contact Desk
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
