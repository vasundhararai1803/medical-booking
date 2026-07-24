import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, CheckCircle, Play, ChevronRight, ChevronLeft, Shield, Users, Award, Heart, ArrowRight, Video, ExternalLink } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Link } from 'react-router-dom';

// --- DATA ---

interface Review {
  id: string;
  patientName: string;
  treatmentTag: string;
  rating: number;
  content: string;
  avatar: string;
}

const PRACTO_REVIEWS: Review[] = [
  { id: '1', patientName: 'Shwetank Jain', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80', content: "“He is a person with a Golden heart and helps us to be a person with a Golden Smile” I am 24, Got my Braces and now it is my 9th Month and I am loving the journey. I went all alone fixed the appointment, they are all like family... my smile is in the best hands." },
  { id: '2', patientName: 'Sweety Kumari', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80', content: "was patient of orthodontics treatment and I got my perfect alignment of teeth 🪥. Here I found a good environment 😊😊 you can go for it here for best treatment 🦷 in patna. Thanks to doctor joyotirmay Singh🙏" },
  { id: '3', patientName: 'Shreya mishra', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80', content: "I went for my orthodontic treatment and the way dr.Jyotirmay singh worked was excellent.... I am very satisfied with my Ordontics treatment done by Dr. Jyotirmay sir... Clinic is also very neat and clean and behavior of all stafs is also very impressive..." },
  { id: '4', patientName: 'Richa', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80', content: "I was suffering from so many issues related to my previous orthodontic treatment and condition was so critical. I searched about Best doctor and I got Dr. Jyotirmay Singh... My tooth are getting aligned day by day and it looks ideal." },
  { id: '5', patientName: 'Prasant singh', treatmentTag: 'Dental Implant Fixing', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80', content: "dr. jyotimay singh a very soft spoken and confidence builder. Who made the treatment look so comforting was meticulous at the job and also very prompt in replying to any Querrey wrt the treatment ." },
  { id: '6', patientName: 'Anuradha Bhardwaj', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?w=150&h=150&fit=crop&q=80', content: "Facio dental clinic is excellent in its services. I am hundred percent 100% satisfied with the treatment. According to me it's best. He motivates you such that you tend to forget your worries he answers your every query..." },
  { id: '7', patientName: 'Priyanka kumari', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&q=80', content: "I am happy with the orthodontic treatment the doctor advised me to get the orthdontic treatment procedure.i am satisfied with the whole procedure of orthodontic treatment it save a lot of time for me.thanks doctor jyotirmay singh" },
  { id: '8', patientName: 'Vivekanand Thakur', treatmentTag: 'Orthodontic Treatment', rating: 5, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80', content: "Dr jyotirmay Singh very soft spoken and confidence builder who made the treatment look so conferting was meticulous I am the job and also very prompt is riplying... it was a very good experience. I am very happy and satisfied" },
  { id: '9', patientName: 'Asha sachin yadav', treatmentTag: 'Surgical Tooth Extraction', rating: 5, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80', content: "Great services, friendly and super professional.i had to have a third molar extraction so you can only imagine the level of pain I was expecting but I didn't feel any kind of pain at all I really thankful for. Jyotirmay Singh for his painless extraction." },
];

const VIDEOS = [
  { id: 1, name: 'Ananya Sharma', treatment: 'Invisalign Journey', thumb: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80' },
  { id: 2, name: 'Rahul Verma', treatment: 'Full Mouth Rehabilitation', thumb: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80' },
  { id: 3, name: 'Priya Das', treatment: 'Painless Root Canal', thumb: 'https://images.unsplash.com/photo-1590611936760-eeb9bc598548?w=800&q=80' }
];

const BEFORE_AFTER = [
  { id: 1, title: 'Severe Crowding to Perfect Alignment', before: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80', after: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80' },
  { id: 2, title: 'Porcelain Veneers Makeover', before: 'https://images.unsplash.com/photo-1598256989800-fea5f6c810db?w=600&q=80', after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80' }
];

const TIMELINE = [
  { step: '01', title: 'Consultation & Scanning', desc: 'Comprehensive examination using 3D CBCT scans to formulate a precise plan.' },
  { step: '02', title: 'Personalized Treatment', desc: 'Painless, efficient procedures utilizing world-class technology and materials.' },
  { step: '03', title: 'Your New Smile', desc: 'Walk out with restored confidence and an aftercare plan designed for longevity.' }
];

// --- COMPONENTS ---

// Animated Counter Hook
const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

const StatItem = ({ label, value, suffix = '', icon: Icon }: any) => {
  const count = useCounter(value);
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-4 text-brand-600">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-4xl font-extrabold text-slate-900 mb-2 tabular-nums tracking-tight">
        {count}{suffix}
      </h3>
      <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const [baIndex, setBaIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/50 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/50 blur-[120px]" />
          <div className="absolute top-[40%] left-[20%] w-[60%] h-[60%] rounded-full bg-slate-200/50 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 mb-8 shadow-sm"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-bold tracking-wide uppercase text-slate-700">Trusted by Thousands</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8 max-w-4xl"
          >
            See the Difference.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">
              Feel the Confidence.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed"
          >
            Every smile has a story. Discover how our world-class treatments have transformed the lives, health, and confidence of our patients.
          </motion.p>
        </div>
      </section>

      {/* STATISTICS GRID */}
      <section className="relative z-20 -mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <StatItem label="Google Rating" value={4.9} suffix="+" icon={Star} />
          <StatItem label="Patients Treated" value={5000} suffix="+" icon={Users} />
          <StatItem label="Years Experience" value={15} suffix="+" icon={Award} />
          <StatItem label="Satisfaction" value={100} suffix="%" icon={Heart} />
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Patient Video Stories</h2>
              <p className="text-lg text-slate-600">Hear directly from our patients about their life-changing experiences.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEOS.map((video, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={video.id} 
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg shadow-slate-200/50 aspect-[4/5]"
              >
                <img src={video.thumb} alt={video.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity group-hover:opacity-90" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    <Video className="w-3 h-3" /> Video
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{video.name}</h3>
                  <p className="text-slate-300 text-sm font-medium">{video.treatment}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTO REVIEWS (Glassmorphism Cards) */}
      <section className="py-32 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Verified Reviews</h2>
            <p className="text-lg text-slate-600">Rated 4.9 across Google & Practo by thousands of happy patients.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTO_REVIEWS.slice(0, 6).map((review, idx) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all group min-h-[300px]"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img src={review.avatar} alt={review.patientName} className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-slate-50" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{review.patientName}</h4>
                      <p className="text-xs text-brand-600 font-bold">{review.treatmentTag}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide">
                    <CheckCircle className="w-3 h-3" /> Practo
                  </div>
                </div>

                <div className="flex items-center gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-slate-200'}`} />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed flex-grow text-sm italic">
                  {review.content}
                </p>

                <a 
                  href="https://www.practo.com/patna/doctor/dr-jyotirmay-singh-dentist/reviews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-600 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 px-4 py-2 rounded-full transition-all self-start"
                >
                  View on Practo <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Transformations</h2>
            <p className="text-lg text-slate-400">Drag to see the incredible results achieved by our specialists.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-800 shadow-2xl border border-slate-700">
              <img src={BEFORE_AFTER[baIndex].after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 w-1/2 overflow-hidden border-r-2 border-white">
                <img src={BEFORE_AFTER[baIndex].before} alt="Before" className="absolute top-0 left-0 w-[200%] h-full object-cover max-w-none" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Before</div>
              </div>
              <div className="absolute top-4 right-4 bg-brand-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">After</div>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setBaIndex((p) => (p === 0 ? BEFORE_AFTER.length - 1 : p - 1))}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="px-6 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-sm font-bold">
                  {BEFORE_AFTER[baIndex].title}
                </div>
                <button 
                  onClick={() => setBaIndex((p) => (p === BEFORE_AFTER.length - 1 ? 0 : p + 1))}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT JOURNEY TIMELINE */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">The Patient Journey</h2>
            <p className="text-lg text-slate-600">Three simple steps to your perfect smile.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-100 z-0"></div>
            {TIMELINE.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white border-8 border-slate-50 shadow-xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-black text-brand-600">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-brand-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-600 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Shield className="w-12 h-12 text-brand-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Ready to transform <br/>your smile?
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of happy patients. Book your comprehensive consultation today and take the first step towards dental perfection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/#consult" className="px-8 py-4 rounded-full bg-brand-600 text-white font-bold text-lg hover:bg-brand-700 shadow-xl shadow-brand-600/30 transition-all flex items-center justify-center gap-2">
              Book Appointment <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-50 border border-slate-200 transition-all flex items-center justify-center">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
};
