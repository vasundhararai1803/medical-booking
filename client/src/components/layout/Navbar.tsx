import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Treatments', path: '/treatments' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Consult', path: '/consult' },
  { name: 'Blog', path: '/blog' },
];

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Standard smart navbar: hide on scroll down (latest > previous), show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-250%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="max-w-6xl mx-auto mt-2 mb-4 rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm shadow-black/5 px-6 py-3 fixed left-0 right-0 top-0 z-50 transition-all"
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
              <Shield className="w-6 h-6 text-brand-600" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Facio<span className="text-brand-600">Dental</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive ? 'text-brand-600 border-b-2 border-brand-600 pb-1' : 'text-slate-600 hover:text-brand-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-sm font-semibold text-slate-700 hover:text-brand-600 hidden sm:flex items-center justify-center p-2 rounded-full hover:bg-slate-50 transition-colors"
                  aria-label="Dashboard"
                >
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={logout}
                  className="bg-slate-100 text-slate-700 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md shadow-brand-600/20 hover:bg-brand-700 hover:-translate-y-0.5 transition-all"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </motion.nav>
  );
};
