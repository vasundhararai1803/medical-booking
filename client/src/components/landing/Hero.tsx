import React from 'react';
import { Shield, Star, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HeroProps {
  onBookClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick }) => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityFade = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Parallax transforms (very subtle: 2-4px for text, 10px for glow)
  const textX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-4, 4]);
  
  const glowX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const glowY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden min-h-[100svh] flex flex-col justify-center bg-white pt-20"
    >
      
      {/* Editorial Background: Crisp White with Subtle Glassmorphic Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft, drifting blue radial glow restricted to the left */}
        <motion.div 
          style={{ x: glowX, y: glowY }}
          animate={{ 
            scale: [1, 1.05, 1],
            x: ['-2%', '2%', '-2%'],
            y: ['-2%', '2%', '-2%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[45%] h-[55%] bg-sky-100/60 rounded-full blur-[130px] mix-blend-multiply" 
        />
      </div>
      
      {/* Video Background Layer with Clean White Masking - NO PARALLAX (Unchanged) */}
      <div className="absolute inset-y-0 right-0 lg:right-8 w-full lg:w-[50%] z-0 pointer-events-none opacity-20 lg:opacity-100 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 lg:w-32 hidden lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent z-10" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-white/40 z-10 lg:hidden" /> 
        <video 
          poster="/assets/videos/video-poster.jpg"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-contain scale-[0.65] lg:translate-x-12 mix-blend-multiply"
        >
          <source src="/assets/videos/video.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="lg:grid lg:grid-cols-12 items-center">
          
          {/* Main Content Area */}
          <motion.div 
            className="lg:col-span-7 pt-12 pb-20 lg:py-0"
            style={{ y: y2, opacity: opacityFade }}
          >
            <motion.div style={{ x: textX, y: textY }}>
              {/* Tiny Editorial Label */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center space-x-2.5 mb-8"
              >
                <div className="w-8 h-[1px] bg-brand-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
                  Facio Dental Speciality
                </span>
              </motion.div>
              
              {/* Oversized Premium Typography */}
              <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] leading-[1.05] font-black text-slate-900 tracking-tight mb-8">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="inline-block"
                  >
                    Precision
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: "100%", opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="inline-block"
                  >
                    Science.
                  </motion.span>
                </span>
                
                <span className="relative inline-block mt-2">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="font-light italic bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-teal-500 to-brand-700 bg-[length:200%_auto]"
                    style={{ animation: "gradient-sweep 8s ease-in-out infinite" }}
                  >
                    Gentle Care.
                  </motion.span>
                  {/* SVG Underline */}
                  <svg className="absolute -bottom-1 left-0 w-full overflow-visible h-[20px]" viewBox="0 0 300 20" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 10 Q 150 20 300 5"
                      fill="none"
                      stroke="rgba(13, 148, 136, 0.3)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>
                </span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg sm:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium"
              >
                Led by Dr. Jyotirmay Singh (BDS, MDS, PhD), we transform smiles using state-of-the-art technology and pain-managed therapies.
              </motion.p>
              
              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full sm:w-auto"
                >
                  <button 
                    onClick={onBookClick} 
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 tracking-wide">Book Consultation</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full sm:w-auto"
                >
                  <Link 
                    to="/treatments" 
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 active:scale-95"
                  >
                    <span>Explore Treatments</span>
                  </Link>
                </motion.div>
              </div>
              
              {/* Editorial Trust Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-8 pt-8 border-t border-slate-200/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Patient" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Patient" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center shadow-sm">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="text-xs font-bold text-slate-600"
                      >
                        +2k
                      </motion.span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 1 + (i * 0.1), ease: "backOut" }}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-0.5">Google Verified</span>
                  </div>
                </div>
                
                <div className="w-[1px] h-10 bg-slate-200 hidden sm:block" />
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm">
                    <Shield className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 leading-tight">ISO 9001</span>
                    <span className="text-xs text-slate-500 font-medium">Certified Clinic</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Empty Right Column */}
          <div className="lg:col-span-5 relative hidden lg:block h-full pointer-events-none" />
          
        </div>
      </div>
      
      {/* CSS for gradient sweep animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-sweep {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
};
