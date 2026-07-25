import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Search, ShieldCheck, Smile, Star, ArrowRight, Zap, Microscope, Stethoscope } from 'lucide-react';

const WHY_TRUST = [
  { icon: ShieldCheck, title: "Evidence-Based", desc: "Every procedure is backed by the latest clinical research and global dental standards." },
  { icon: HeartPulse, title: "Pain-Free Focus", desc: "Advanced anesthesia and gentle techniques ensure you never fear the dentist again." },
  { icon: Search, title: "Transparent Care", desc: "No hidden fees. We explain every step, showing you exact scans and tailored treatment plans." },
  { icon: Smile, title: "Personalised", desc: "Your smile is unique. We design custom treatment roadmaps rather than one-size-fits-all fixes." }
];

const JOURNEY = [
  { time: "09:00 AM", title: "Book & Arrive", desc: "Seamless scheduling and a warm welcome in our calming reception lounge.", icon: Star },
  { time: "09:15 AM", title: "Consultation", desc: "A detailed one-on-one discussion about your goals, fears, and dental history.", icon: Stethoscope },
  { time: "09:45 AM", title: "Digital Scan", desc: "Painless 3D intraoral scanning to map your entire dental architecture.", icon: Microscope },
  { time: "10:15 AM", title: "Treatment", desc: "Expert, gentle execution of your personalized procedure while you relax.", icon: Zap },
  { time: "11:00 AM", title: "New Smile", desc: "Walk out with renewed confidence and comprehensive aftercare guidance.", icon: Smile }
];

export const AboutStory: React.FC = () => {
  return (
    <>
      {/* WHY TRUST US SECTION */}
      <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6"
            >
              Why Patients <span className="font-light italic text-brand-600">Trust Us.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_TRUST.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY SECTION */}
      <section className="py-32 bg-amber-50/50 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[100px] opacity-60" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-10">
              <svg className="w-12 h-12 text-brand-300 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 leading-[1.2] tracking-tight mb-12">
              "Dentistry is not just about treating teeth. It's about <span className="text-brand-600 italic font-light">restoring confidence</span>, alleviating fear, and treating every patient with the highest ethical standard."
            </h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-slate-400">Dr. Jyotirmay Singh</span>
              <div className="w-12 h-[1px] bg-brand-300 mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* A DAY AT FACIO DENTAL (STORYTELLING TIMELINE) */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 opacity-80" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 mb-6">
                <div className="w-6 h-[1px] bg-brand-400" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">The Patient Journey</span>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-white tracking-tight">
                A Day at <span className="font-light italic text-brand-300">Facio Dental.</span>
              </motion.h2>
            </div>
          </div>

          <div className="relative">
            {/* Horizontal Line (Desktop) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-[1px] bg-white/10" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6">
              {JOURNEY.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="relative group cursor-default"
                  >
                    <div className="hidden lg:flex absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-brand-400 group-hover:scale-150 group-hover:bg-brand-400 transition-all duration-300 z-10" />
                    
                    <div className="lg:pt-36 flex flex-col lg:items-center text-left lg:text-center">
                      <span className="text-brand-400 font-bold tracking-widest text-xs mb-4 block">{step.time}</span>
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 lg:mx-auto group-hover:bg-white/10 group-hover:-translate-y-2 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
