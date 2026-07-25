import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';

const TIMELINE = [
  { year: '2016 - 2018', role: 'Associate Professor', org: 'Patna Government Dental College & Hospital', color: 'from-blue-500 to-indigo-500' },
  { year: '2010 - 2018', role: 'Director', org: 'Facio Dental Super Speciality Clinic', color: 'from-brand-500 to-teal-400' },
  { year: '2012 - 2018', role: 'Senior Consultant', org: 'Perfect Smile Super Speciality Clinic', color: 'from-amber-400 to-orange-500' },
  { year: '2010 - 2018', role: 'Senior Consultant', org: 'Indian Red Cross Society', color: 'from-rose-400 to-red-500' },
  { year: '2010 - 2016', role: 'Associate Professor', org: 'B.R Ambedkar Dental College & Hospital', color: 'from-emerald-400 to-green-500' }
];

export const AboutTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32 bg-white relative overflow-hidden" id="timeline">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="w-6 h-[1px] bg-brand-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">Journey of Excellence</span>
            <div className="w-6 h-[1px] bg-brand-400" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight"
          >
            A Legacy in <span className="font-light italic text-slate-400">Dentistry.</span>
          </motion.h2>
        </div>

        <div className="relative pt-10" ref={containerRef}>
          {/* Static Background Line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Scroll Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[27px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-brand-400 via-teal-400 to-brand-600 md:-translate-x-1/2 rounded-full origin-top" 
          />

          <div className="space-y-16 lg:space-y-24">
            {TIMELINE.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center md:-translate-x-1/2 z-10 transition-colors duration-300">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} p-[2px]`}>
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content Card */}
                <div className={`md:w-1/2 pl-20 md:pl-0 w-full flex ${idx % 2 === 0 ? 'justify-start md:pl-16' : 'justify-end md:pr-16'}`}>
                  <div className="w-full bg-white p-8 lg:p-10 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 group">
                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white bg-gradient-to-r ${item.color} mb-6 shadow-sm`}>
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-brand-600 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      {item.org}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
