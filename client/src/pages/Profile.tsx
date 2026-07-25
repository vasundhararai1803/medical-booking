import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Shield, Edit2, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export const Profile: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');
  
  // OTP Verification state
  const [verificationMode, setVerificationMode] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
    React.useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/profile');
    }
    
    if (user && !editMode && !verificationMode) {
      // eslint-disable-next-line
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '' // Ensure phone exists
      });
    }
  }, [loading, isAuthenticated, navigate, user, editMode, verificationMode]);

  const handleRequestUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUpdateLoading(true);

    try {
      await api.post('/auth/profile/request-update', formData);
      setVerificationMode(true);
      setEditMode(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request update');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otp.join('');
    if (code.length !== 4) return;

    setError('');
    setUpdateLoading(true);

    try {
      await api.post('/auth/profile/verify-update', { otp: code });
      window.location.reload(); // Quick way to refresh context
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (index === 3 && value && newOtp.every(d => d !== '')) {
      setTimeout(() => {
        const event = new Event('submit', { cancelable: true, bubbles: true }) as any;
        handleVerifyOtp(event);
      }, 0);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <p className="font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between border-b border-slate-100 pb-6"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Personal Information</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage your personal details and contact info.</p>
          </div>
          
          {!editMode && !verificationMode && (
            <button 
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}

          {editMode && (
            <button 
              onClick={() => {
                setEditMode(false);
                setError('');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </motion.div>

        {!user.phone && !editMode && !verificationMode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-4"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-amber-800">Phone Number Missing</h3>
              <p className="text-sm text-amber-700 mt-1">Please edit your profile to add a phone number so we can send you SMS updates and OTPs.</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden relative"
        >
          {error && (
            <div className="p-4 bg-rose-50 border-b border-rose-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-700 font-medium">{error}</p>
            </div>
          )}

          {/* Avatar Header */}
          <div className="p-8 border-b border-slate-100 flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-semibold">
              {user.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{user.name}</h2>
              <span className="inline-block mt-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                {user.role} Account
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {verificationMode ? (
              <motion.form 
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp} 
                className="p-8 space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Verify Changes</h3>
                  <p className="text-sm text-slate-500 mt-2">We've sent a verification code to your email/phone to authorize these profile updates.</p>
                </div>

                <div className="flex justify-center gap-3 sm:gap-4 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-14 h-16 sm:w-16 sm:h-18 text-center text-2xl font-extrabold text-slate-900 border-2 border-slate-200 rounded-xl focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all outline-none"
                    />
                  ))}
                </div>

                <div className="flex gap-4 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => { setVerificationMode(false); setEditMode(true); }}
                    className="flex-1 py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading || otp.some(d => d === '')}
                    className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-md shadow-brand-600/20 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition-all"
                  >
                    {updateLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </motion.form>
            ) : editMode ? (
              <motion.form 
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleRequestUpdate} 
                className="p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 sm:text-sm font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 sm:text-sm font-medium transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 sm:text-sm font-medium transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex items-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-md shadow-brand-600/20 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 transition-all"
                  >
                    {updateLoading ? 'Sending Code...' : 'Save & Verify'}
                    {!updateLoading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 space-y-8"
              >
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-grow border-b border-slate-100 pb-6">
                    <p className="text-sm font-medium text-slate-500 mb-1">Full Name</p>
                    <p className="text-base font-medium text-slate-900">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-grow border-b border-slate-100 pb-6">
                    <p className="text-sm font-medium text-slate-500 mb-1">Email Address</p>
                    <p className="text-base font-medium text-slate-900">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-grow border-b border-slate-100 pb-6">
                    <p className="text-sm font-medium text-slate-500 mb-1">Phone Number</p>
                    <p className={`text-base font-medium ${user.phone ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                      {user.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Shield className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-slate-500 mb-1">Account Security</p>
                    <p className="text-base font-medium text-slate-900 flex items-center gap-2">
                      Multi-Factor Authenticated 
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Secure"></span>
                    </p>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
