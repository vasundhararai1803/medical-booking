import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

export const AboutHero: React.FC = () => {
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 800], ['0%', '30%']);
  const yImage = useTransform(scrollY, [0, 800], ['0%', '15%']);
  const opacityHero = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] bg-slate-900 flex items-center justify-center pt-24 overflow-hidden">
      {/* Editorial Grain Texture & Layered Gradients */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-brand-600/30 blur-[150px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-teal-500/20 blur-[150px]" 
        />
      </div>

      {/* Decorative Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        <span className="text-[20rem] font-black tracking-tighter whitespace-nowrap text-white">
          VISIONARY
        </span>
      </div>

      <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 pb-32">
        
        {/* Left Content Area */}
        <div className="flex-1 lg:max-w-2xl mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-[1px] bg-brand-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">Clinical Director</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-white mb-6 leading-[1.05] tracking-tight"
          >
            Dr. Jyotirmay<br/>
            <span className="font-light italic text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-teal-200">Singh.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-medium"
          >
            A visionary Orthodontist and Implantologist redefining modern dentistry through precision, empathy, and over two decades of uncompromising excellence.
          </motion.p>

          {/* Animated Qualification Chips */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {['Orthodontist', 'Implantologist', 'Dentofacial Orthopedist', 'PhD Scholar'].map((tag, i) => (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + (i * 0.1) }}
                key={i} 
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-bold tracking-widest uppercase backdrop-blur-md hover:bg-white/10 transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Handwritten Signature SVG & Credentials */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-8 border-t border-white/10"
          >
            <div className="w-48 h-16 opacity-70">
              <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white fill-none stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]">
                {/* Elegant abstract signature path */}
                <path d="M 50 100 Q 70 50 90 90 T 130 70 T 160 110 T 190 60 T 230 120 T 260 80 T 300 100 T 330 60 Q 350 40 370 80" />
                <path d="M 120 110 L 250 110" className="stroke-brand-400 stroke-[1]" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight">BDS, MDS, PhD</span>
              <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Chief Specialist</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content Area: Hero Image & Floating Elements */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 relative w-full max-w-[500px] lg:max-w-none flex justify-center lg:justify-end"
        >
          <motion.div style={{ y: yImage }} className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-slate-800 w-full max-w-[480px] aspect-[4/5] border border-white/10 group">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop" 
              alt="Dr. Jyotirmay Singh"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Elegant overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-brand-900/20 mix-blend-overlay" />
            
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex gap-3 mb-4">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-lg">20+ Years Excellence</span>
                <span className="px-4 py-2 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-xs font-bold border border-brand-500/30 shadow-lg">5k+ Patients</span>
              </div>
            </div>
          </motion.div>

          {/* Floating UI Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-20 -left-6 sm:-left-12 bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex items-center gap-4 border border-white/20 z-10"
          >
            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 border border-brand-400/30">
              <Clock className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Mon - Sat</p>
              <p className="text-slate-300 text-xs font-medium mt-0.5">11:00 AM - 07:00 PM</p>
            </div>
          </motion.div>

          <motion.a 
            href="https://www.google.com/maps?sca_esv=2576bb2322190117&sxsrf=APpeQnt6Xz4eQmUOJ_16-9FeL4yaIAExuw:1784918572896&biw=1336&bih=689&dpr=2.2&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KYlhNQFjfg0UMZakKB7bzr4Z&daddr=A/13,+West+Boring+Canal+Rd,+indrasan,+Anandpuri,+Patna,+Bihar+800001"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute bottom-28 -right-6 sm:-right-12 bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex gap-4 border border-white/20 z-10 max-w-[240px] hover:bg-white/20 transition-colors cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 border border-teal-400/30 mt-1 group-hover:bg-teal-500/30 transition-colors">
              <MapPin className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight mb-1.5 flex items-center gap-1">Facio Dental <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" /></p>
              <p className="text-slate-300 text-xs font-medium leading-relaxed">
                Anandpuri, West Boring Canal Rd, Patna
              </p>
            </div>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
