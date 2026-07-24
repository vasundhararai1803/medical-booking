import React from 'react';
import { Shield, Star, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20 pb-16 lg:pt-32 lg:pb-24">
      {/* Fullscreen Background Video */}
      <div 
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{ backgroundColor: '#ffffff' }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-contain scale-[1.02] mt-24"
        >
          <source src="/assets/videos/video.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-brand-50 rounded-full px-4 py-2 mb-6 border border-brand-100">
              <Shield className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-brand-700">Facio Dental Advanced Dental & Facial Aesthetics</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Precision Science, <br className="hidden sm:block" />
              <span className="text-brand-600">Gentle Care.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-2xl leading-relaxed">
              Led by Dr. Jyoti Singh (BDS, MDS, PhD), we specialize in gentle, pain-managed procedures utilizing modern dental technology to deliver a confident and healthy smile.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-brand-600 text-white px-8 py-3.5 rounded-full font-medium shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:-translate-y-0.5 transition-all duration-200">
                Book In-Clinic Visit
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-full font-medium hover:bg-slate-50 transition-all duration-200 flex items-center justify-center space-x-2">
                <span>View Treatments</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">4.9/5</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Patient Rating</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Invisalign®</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Platinum Provider</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Empty Right Column (Doctor moved to carousel) */}
          <motion.div 
            className="lg:col-span-5 mt-16 lg:mt-0 relative hidden lg:block"
          >
            {/* The right column is kept empty to balance the layout and let the background video shine through on the right side where the tooth is. */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
