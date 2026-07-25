import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

const StatNumber = ({ end, suffix = '' }: { end: number, suffix?: string }) => {
  const count = useCounter(end);
  return <span className="tabular-nums font-black">{count}{suffix}</span>;
};

export const AboutStats: React.FC = () => {
  return (
    <section className="relative z-20 -mt-20 max-w-6xl mx-auto px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-12"
      >
        <div className="text-center flex-1 group">
          <h4 className="text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 tracking-tighter mb-3 group-hover:scale-105 transition-transform">
            <StatNumber end={20} suffix="+" />
          </h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Years of Excellence</p>
        </div>
        
        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        
        <div className="text-center flex-1 group">
          <h4 className="text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-brand-500 to-teal-400 tracking-tighter mb-3 group-hover:scale-105 transition-transform">
            <StatNumber end={5} suffix="k+" />
          </h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Smiles Restored</p>
        </div>
        
        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
        
        <div className="text-center flex-1 group">
          <h4 className="text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-700 tracking-tighter mb-3 group-hover:scale-105 transition-transform">
            <StatNumber end={15} suffix="+" />
          </h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Global Accreditations</p>
        </div>
      </motion.div>
    </section>
  );
};
