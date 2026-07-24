import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, ArrowRight, CheckCircle, GraduationCap, Award, Briefcase, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

// --- DATA ---
const TIMELINE = [
  { year: '2016 - 2018', role: 'Associate Professor', org: 'Patna Government Dental College & Hospital' },
  { year: '2010 - 2018', role: 'Director', org: 'Facio Dental Super Speciality Clinic' },
  { year: '2012 - 2018', role: 'Senior Consultant', org: 'Perfect Smile Super Speciality Clinic' },
  { year: '2010 - 2018', role: 'Senior Consultant', org: 'Indian Red Cross Society' },
  { year: '2010 - 2016', role: 'Associate Professor', org: 'B.R Ambedkar Dental College & Hospital' }
];

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

// --- COMPONENTS ---
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
  return <span className="tabular-nums">{count}{suffix}</span>;
};

export const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-500 selection:text-white overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION (DARK) --- */}
      <section className="relative min-h-[100vh] bg-slate-900 flex items-center justify-center pt-24 overflow-hidden">
        {/* Abstract Background Orbs */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-600/30 blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-500/20 blur-[120px]" 
          />
        </div>

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 pb-32">
          
          {/* Hero Text */}
          <div className="flex-1 lg:max-w-2xl mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-[1.05] tracking-tighter">
                Dr. Jyotirmay<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-300">Singh</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-xl font-light">
                A visionary Orthodontist and Implantologist redefining modern dentistry through precision, empathy, and over two decades of uncompromising excellence.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {['Orthodontist', 'Implantologist', 'Dentofacial Orthopedist', 'Dental Surgeon'].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-slate-700/50 bg-slate-800/30 text-slate-300 text-xs font-bold tracking-wide backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hero Image & Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-[500px] lg:max-w-none flex justify-center"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-b from-slate-700 to-slate-900 w-full max-w-[450px] aspect-[4/5] border border-slate-700/50 group">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop" 
                alt="Dr. Jyotirmay Singh"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Dr. Jyotirmay Singh</h3>
                <p className="text-brand-300 text-sm font-semibold mb-5 uppercase tracking-wider">
                  BDS, MDS - Orthodontics, PhD
                </p>
                <div className="flex gap-3">
                  <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold border border-white/20">20+ Years Exp</span>
                  <span className="px-4 py-2 rounded-full bg-brand-500/20 backdrop-blur-md text-brand-300 text-xs font-bold border border-brand-500/30">Specialist</span>
                </div>
              </div>
            </div>

            {/* Floating Timings Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-16 -left-6 sm:-left-12 bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex items-center gap-4 border border-white/20 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 border border-brand-400/30">
                <Clock className="w-5 h-5 text-brand-300" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-wide">Mon - Sat</p>
                <p className="text-slate-300 text-xs font-medium mt-0.5">11:00 AM - 07:00 PM</p>
              </div>
            </motion.div>

            {/* Floating Location Card */}
            <motion.a 
              href="https://www.google.com/maps?sca_esv=2576bb2322190117&sxsrf=APpeQnt6Xz4eQmUOJ_16-9FeL4yaIAExuw:1784918572896&biw=1336&bih=689&dpr=2.2&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KYlhNQFjfg0UMZakKB7bzr4Z&daddr=A/13,+West+Boring+Canal+Rd,+indrasan,+Anandpuri,+Patna,+Bihar+800001"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-24 -right-6 sm:-right-12 bg-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl flex gap-4 border border-white/20 z-10 max-w-[240px] hover:bg-white/20 transition-colors cursor-pointer group"
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

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS OVERLAP BAR --- */}
      <section className="relative z-20 -mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-900/5 border border-white flex flex-wrap justify-between items-center gap-8"
        >
          <div className="text-center flex-1">
            <h4 className="text-5xl font-black text-slate-900 tracking-tighter mb-2"><StatNumber end={20} suffix="+" /></h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-200" />
          <div className="text-center flex-1">
            <h4 className="text-5xl font-black text-brand-600 tracking-tighter mb-2"><StatNumber end={5} suffix="k+" /></h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Smiles Restored</p>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-200" />
          <div className="text-center flex-1">
            <h4 className="text-5xl font-black text-slate-900 tracking-tighter mb-2"><StatNumber end={15} suffix="+" /></h4>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Certifications</p>
          </div>
        </motion.div>
      </section>

      {/* --- CAREER TIMELINE --- */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3 block">Journey of Excellence</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Career Highlights</h2>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-600/20 via-brand-600/10 to-transparent md:-translate-x-1/2" />

            <div className="space-y-12">
              {TIMELINE.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white rounded-full border-4 border-slate-50 shadow-xl flex items-center justify-center md:-translate-x-1/2 z-10">
                    <Briefcase className="w-5 h-5 text-brand-600" />
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div className="md:w-1/2 pl-20 md:pl-0 w-full">
                    <div className={`bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <span className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-black tracking-widest rounded-full mb-4">{item.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.role}</h3>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.org}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- QUALIFIED WHERE IT COUNTS (LIGHT THEME GRID) --- */}
      <section className="py-32 bg-white border-t border-slate-100 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3 block">Credentials</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Qualified where it counts</h2>
            <p className="text-lg text-slate-500 mt-6">Decades of rigorous academic training and continuous global education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Education Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-emerald-50 hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-colors duration-500">
                <GraduationCap className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-8">Education</h3>
              <ul className="space-y-6">
                {EDUCATION.map((edu, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-900 font-bold text-sm leading-tight mb-1">{edu.degree}</p>
                      <p className="text-slate-500 text-xs font-medium">{edu.inst} ({edu.year})</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Awards Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-blue-50 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 transition-colors duration-500">
                <Award className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-8">Awards</h3>
              <ul className="space-y-6">
                {AWARDS.map((award, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-900 font-bold text-sm leading-tight mb-1">{award.title}</p>
                      <p className="text-slate-500 text-xs font-medium">{award.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Memberships Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-brand-50 hover:shadow-2xl hover:shadow-brand-900/5 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-500 transition-colors duration-500">
                <Award className="w-8 h-8 text-brand-600 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-8">Memberships</h3>
              <ul className="space-y-6">
                {MEMBERSHIPS.map((membership, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 font-medium text-sm leading-relaxed">{membership}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 bg-slate-900 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500 via-transparent to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Experience the difference.</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Ready to entrust your smile to one of Patna's most highly accredited specialists? Book your consultation today.
          </p>
          <Link to="/#consult" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-brand-600 text-white font-bold text-lg hover:bg-brand-500 shadow-2xl shadow-brand-600/30 hover:scale-105 transition-all">
            Book Appointment <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};
