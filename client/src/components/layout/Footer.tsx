import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Star, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#fcfcfc] mt-20 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-slate-100 relative overflow-hidden">
      {/* Faint Watermark at the bottom */}
      <div className="absolute bottom-0 left-0 w-full text-center pointer-events-none opacity-[0.03] select-none overflow-hidden h-40 flex items-end justify-center">
        <span className="text-[12rem] font-black tracking-tighter leading-none whitespace-nowrap text-slate-900">
          Facio Dental
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">Facio<span className="text-brand-600">Dental</span></span>
            </Link>
            
            <p className="font-serif italic text-xl text-slate-800 mb-4 font-medium">
              Expert care for your perfect smile.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Dr. Jyoti Singh, a specialist in orthodontics and facial aesthetics with over 20 years of experience, transforming smiles with advanced, personalized dental care.
            </p>

            <Link 
              to="/consult"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md shadow-brand-500/20 mb-8"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-slate-600 mb-6">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold">4.9</span>
              <span className="text-sm text-slate-500">- Google Reviews</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-brand-600 font-bold text-sm tracking-widest uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">About Dr. Jyoti</Link></li>
              <li><Link to="/treatments" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Treatments</Link></li>
              <li><Link to="/testimonials" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Testimonials</Link></li>
              <li><Link to="/consult" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Consult</Link></li>
              <li><Link to="/blog" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Knowledge & Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div className="lg:col-span-2">
            <h4 className="text-brand-600 font-bold text-sm tracking-widest uppercase mb-6">Treatments</h4>
            <ul className="space-y-4">
              <li><Link to="/treatments?category=orthodontics" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Orthodontics</Link></li>
              <li><Link to="/treatments?category=implants" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Dental Implants</Link></li>
              <li><Link to="/treatments?category=cosmetic" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Cosmetic Dentistry</Link></li>
              <li><Link to="/treatments?category=pediatric" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">Pediatric Care</Link></li>
              <li><Link to="/treatments?category=general" className="text-slate-600 hover:text-brand-600 text-sm font-medium transition-colors">General Care</Link></li>
              <li><Link to="/treatments" className="text-brand-600 hover:text-brand-700 text-sm font-bold transition-colors inline-flex items-center gap-1">View all 107 <ArrowRight className="w-3.5 h-3.5" /></Link></li>
            </ul>
          </div>

          {/* Column 4: Visit Us */}
          <div className="lg:col-span-3">
            <h4 className="text-brand-600 font-bold text-sm tracking-widest uppercase mb-6">Visit Us</h4>
            
            <div className="mb-6">
              <div className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed mb-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-brand-500" />
                <p>A/13 Indrasan, Anandpuri<br/>West Boring Canal Road<br/>Patna - 800001, Bihar, India</p>
              </div>
              <p className="text-xs text-slate-500 font-medium ml-7">Mon–Sat • 9:00 AM – 8:00 PM</p>
            </div>

            <div className="space-y-4">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-slate-600 hover:text-brand-600 transition-colors text-sm font-medium">
                <Phone className="w-4 h-4 text-brand-500" />
                +91 98765 43210
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-brand-600 transition-colors text-sm font-medium">
                {/* SVG for WhatsApp as lucide doesn't have it built-in */}
                <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="mailto:hello@faciodental.com" className="flex items-center gap-3 text-slate-600 hover:text-brand-600 transition-colors text-sm font-medium">
                <Mail className="w-4 h-4 text-brand-500" />
                hello@faciodental.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
