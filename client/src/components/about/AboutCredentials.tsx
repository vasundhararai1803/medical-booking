import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, CheckCircle, ChevronDown, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EDUCATION = [
  { degree: 'PhD - Orthodontics & Dentofacial Orthopaedics', inst: 'Patna University', year: '2016' },
  { degree: 'MDS - Orthodontics', inst: 'Maharishi Markandeshwar Institute', year: '2010' },
  { degree: 'BDS - sdch', inst: 'SDCH', year: '2005' }
];

const AWARDS = [
  { title: 'Hons. in MDS', year: '2010' },
  { title: 'Gold Medalist B.D.S. Hons.', year: '2006' }
];

const MEMBERSHIPS = [
  'Indian Dental Association',
  'Indian Orthodontic Society',
  'Bihar State Dental Council (2218/A, 2007)'
];

const FAQS = [
  { q: "Do you offer painless dentistry?", a: "Yes, we utilize advanced anesthesia protocols, precise laser dentistry, and a calming environment to ensure treatments are virtually pain-free." },
  { q: "How long does a consultation take?", a: "A standard comprehensive consultation takes about 30 to 45 minutes, allowing Dr. Jyotirmay to fully understand your needs and perform necessary digital scans." },
  { q: "Are dental implants safe?", a: "Absolutely. With 3D CBCT imaging and guided surgery, our implant success rate is over 98%, making it one of the safest and most predictable procedures." },
  { q: "Do you offer EMI or payment plans?", a: "Yes, we believe world-class dental care should be accessible. We offer flexible payment plans and zero-cost EMI options for major treatments." }
];

export const AboutCredentials: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      {/* CREDENTIALS SECTION */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center mb-24">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Accreditations</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Qualified where it counts.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-8">Academic Excellence</h3>
              <div className="space-y-6">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 leading-tight mb-1">{edu.degree}</p>
                      <p className="text-slate-500 text-sm font-medium">{edu.inst} • {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-8">Awards & Honors</h3>
              <div className="space-y-6">
                {AWARDS.map((award, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 leading-tight mb-1">{award.title}</p>
                      <p className="text-slate-500 text-sm font-medium">{award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <CheckCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-8">Memberships</h3>
              <div className="space-y-6">
                {MEMBERSHIPS.map((membership, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                    <p className="font-bold text-slate-900 leading-tight">{membership}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 bg-[#faf9f6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Patient Inquiries</h2>
            <p className="text-slate-500 font-medium">Common questions about our practice and procedures.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-45 bg-brand-50 text-brand-600' : 'text-slate-400'}`}>
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-500 font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA SECTION */}
      <section className="py-32 bg-slate-900 relative overflow-hidden text-center">
        {/* Layered Abstract Backgrounds */}
        <div className="absolute inset-0 opacity-30 mix-blend-color-dodge pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-gradient-to-br from-brand-400 via-transparent to-transparent rotate-12 blur-3xl" />
          <div className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-tl from-emerald-400 via-transparent to-transparent -rotate-12 blur-3xl" />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              Experience the <br/> <span className="font-light italic text-brand-300">difference.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
              Ready to entrust your smile to one of Patna's most highly accredited specialists? Schedule your bespoke consultation today.
            </p>
            <Link 
              to="/consult" 
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 hover:scale-105 shadow-2xl shadow-white/10 transition-all group"
            >
              Book Your Visit 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
