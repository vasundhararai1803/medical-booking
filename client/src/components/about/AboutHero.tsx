import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export const AboutHero: React.FC = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], ['0%', '20%']);
  const yImage = useTransform(scrollY, [0, 800], ['0%', '10%']);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[90svh] bg-white flex items-center justify-center pt-32 pb-20 overflow-hidden">
      
      <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-20">
        
        {/* Left Content Area (Slightly larger for asymmetry) */}
        <div className="w-full lg:w-[55%] mt-12 lg:mt-0 flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="w-12 h-[1px] bg-slate-300" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Clinical Director</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-slate-900 mb-8 leading-[1.05] tracking-tight"
          >
            Dr. Jyotirmay<br/>
            <span className="font-serif italic text-slate-500 font-light">Singh.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed max-w-xl font-medium"
          >
            A visionary Orthodontist and Implantologist redefining modern dentistry through precision, empathy, and over two decades of uncompromising excellence.
          </motion.p>

          {/* Cleaner Credentials Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-3 pl-5 border-l border-slate-200"
          >
            <span className="text-slate-900 font-bold tracking-tight text-lg mb-1">BDS • MDS • PhD</span>
            <div className="flex flex-col gap-1.5 text-slate-500 text-sm font-medium">
              <span>Orthodontics</span>
              <span>Implant Dentistry</span>
              <span>Dentofacial Orthopedics</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content Area: Editorial Image & Minimal Map Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end relative"
        >
          <motion.div style={{ y: yImage }} className="relative w-full max-w-[440px] aspect-[3/4] bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop" 
                alt="Dr. Jyotirmay Singh"
                className="absolute inset-0 w-full h-full object-cover object-top filter contrast-[1.02] saturate-[0.95]"
              />
            </div>

            {/* Floating Timing Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-16 -left-6 sm:-left-12 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex items-center gap-4 border border-slate-700/50 z-20"
            >
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 border border-brand-400/30">
                <Clock className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">Mon - Sat</p>
                <p className="text-slate-300 text-xs font-medium mt-0.5">11:00 AM - 07:00 PM</p>
              </div>
            </motion.div>

            {/* Gradient Map Card */}
            <motion.a 
              href="https://www.google.com/maps?sca_esv=2576bb2322190117&sxsrf=APpeQnt6Xz4eQmUOJ_16-9FeL4yaIAExuw:1784918572896&biw=1336&bih=689&dpr=2.2&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KYlhNQFjfg0UMZakKB7bzr4Z&daddr=A/13,+West+Boring+Canal+Rd,+indrasan,+Anandpuri,+Patna,+Bihar+800001"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-16 -right-6 sm:-right-12 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex items-start gap-4 border border-slate-700/50 z-20 max-w-[260px] hover:bg-slate-800/95 transition-colors cursor-pointer group/map"
            >
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-400/30 mt-0.5 group-hover/map:bg-teal-500/30 transition-colors">
                <MapPin className="w-4 h-4 text-teal-400 group-hover/map:text-teal-300 transition-colors" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight mb-1 flex items-center gap-1">Facio Dental <ArrowRight className="w-3 h-3 opacity-0 group-hover/map:opacity-100 -translate-x-2 group-hover/map:translate-x-0 transition-all text-teal-400" /></p>
                <p className="text-slate-300 text-xs font-medium leading-relaxed">
                  Anandpuri, West Boring Canal Rd, Patna
                </p>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
