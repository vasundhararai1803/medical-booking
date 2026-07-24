import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Stethoscope,
  Smile,
  Activity,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Treatment } from '../../types/treatment';
import api from '../../services/api';

interface OurServicesProps {
  onBookTreatment?: (treatmentId?: string) => void;
}

export const OurServices: React.FC<OurServicesProps> = ({ onBookTreatment }) => {
  const [services, setServices] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryIcons: Record<string, React.ReactNode> = {
    general: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    orthodontics: <Smile className="w-6 h-6 text-brand-600" />,
    cosmetic: <Sparkles className="w-6 h-6 text-amber-500" />,
    implants: <Activity className="w-6 h-6 text-emerald-600" />,
    pediatric: <HeartPulse className="w-6 h-6 text-rose-500" />,
    emergency: <ShieldCheck className="w-6 h-6 text-red-500" />,
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/treatments');
        const fetched: Treatment[] = response.data.data.treatments || [];
        setServices(fetched);
      } catch (err) {
        console.error('Failed to fetch services for accordion', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-64 bg-slate-200/60 animate-pulse rounded-3xl" />
      </div>
    );
  }

  // Double the array for seamless marquee looping
  const marqueeItems = [...services, ...services];

  return (
    <section className="py-16 bg-slate-50 relative overflow-hidden">
      {/* Background Honeycomb Pattern Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0052cc_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-full mx-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                <span>+ Our Services & Expertise</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                Expert Care For Your Perfect Smile
              </h2>
              <p className="text-slate-600 text-lg mb-8 max-w-xl">
                Explore our comprehensive treatments, guided by two decades of specialist experience in orthodontics and facial aesthetics.
              </p>
              <Link
                to="/treatments"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-bold text-sm transition-all hover:bg-brand-700 hover:-translate-y-0.5 shadow-md shadow-brand-600/20"
              >
                <span>View All 107 Treatments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden bg-brand-100 shadow-xl max-w-md mx-auto lg:ml-auto">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Dr. Jyoti Singh" 
                  className="w-full h-[320px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">Dr. Jyoti Singh</h3>
                  <p className="text-brand-100 font-medium text-sm mb-3">BDS, MDS - Orthodontics, PhD</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">20 Years Exp</span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">Specialist</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* INFINITE MARQUEE ROW                                 */}
        {/* ---------------------------------------------------- */}
        {services.length > 0 ? (
          <div 
            className="flex overflow-hidden relative group py-4 px-4 sm:px-12"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <motion.div
              className="flex gap-6 w-max px-4"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ 
                duration: Math.max(30, services.length * 4), 
                ease: 'linear', 
                repeat: Infinity 
              }}
            >
              {marqueeItems.map((item, index) => (
                <div
                  key={`${item._id}-${index}`}
                  className="w-[320px] shrink-0 bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm border border-slate-100 flex items-center justify-center">
                        {categoryIcons[item.category] || <Stethoscope className="w-6 h-6 text-emerald-600" />}
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ₹{item.costRange?.min || 0} - ₹{item.costRange?.max || 0}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      {(item.benefits || []).slice(0, 3).map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onBookTreatment?.(item._id);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-emerald-500 text-slate-700 hover:text-white font-semibold text-sm transition-all border border-slate-200 hover:border-emerald-500"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-slate-500 text-center py-10">No treatments found.</p>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 shadow-sm text-center flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-600">
            <span>Explore our full directory of 107 specialized procedures.</span>
            <Link to="/treatments" className="font-bold text-emerald-600 hover:underline inline-flex items-center gap-1">
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
