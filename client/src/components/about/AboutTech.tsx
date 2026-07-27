import React from 'react';
import { motion } from 'framer-motion';

const TECH_EQUIPMENT = [
  { title: "Digital 3D CBCT", desc: "Crystal clear 3D jaw imaging for precise surgical planning and zero guesswork.", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" },
  { title: "Intraoral Scanners", desc: "No more messy molds. We capture your teeth digitally in seconds for a perfect fit.", img: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800" },
  { title: "Laser Dentistry", desc: "Minimally invasive, virtually painless gum treatments and surgeries with rapid healing.", img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" },
  { title: "Class B Sterilisation", desc: "Hospital-grade, 4-step sterilization protocols ensuring absolute safety and hygiene.", img: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800" }
];

const CLINIC_GALLERY = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200", // Reception/Lounge
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200", // Operatory
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200", // Details
  "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=1200", // Equipment
];

export const AboutTech: React.FC = () => {
  return (
    <>
      {/* TECHNOLOGY SECTION */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-[1px] bg-brand-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">Technology & Innovation</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
                Engineering <span className="font-light italic text-brand-600">Precision.</span>
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-500 font-medium max-w-md">
              We invest heavily in the world's most advanced dental technologies to ensure your treatments are faster, safer, and entirely painless.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {TECH_EQUIPMENT.map((tech, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden bg-slate-100 aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10]"
              >
                <img 
                  src={tech.img} 
                  alt={tech.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-8 sm:p-10 w-full">
                  <div className="w-10 h-1 bg-brand-500 mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <h3 className="text-2xl font-bold text-white mb-3">{tech.title}</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIDE OUR CLINIC (EDITORIAL GALLERY) */}
      <section className="py-20 lg:py-32 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-24">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 block mb-4">Architecture of Care</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Inside Facio Dental</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px] md:h-[600px] lg:h-[800px]">
            {/* Main large image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="md:col-span-8 rounded-[2rem] overflow-hidden group relative"
            >
              <img src={CLINIC_GALLERY[0]} alt="Clinic Interior" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </motion.div>
            
            <div className="md:col-span-4 flex flex-col gap-6">
              {/* Top right small image */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 rounded-[2rem] overflow-hidden group relative"
              >
                <img src={CLINIC_GALLERY[1]} alt="Treatment Room" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
              {/* Bottom right small image */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 rounded-[2rem] overflow-hidden group relative"
              >
                <img src={CLINIC_GALLERY[2]} alt="Consultation" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
