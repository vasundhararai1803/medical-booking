import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, AlertCircle, Video, Building2, Calendar, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { AxiosError } from 'axios';

export const Consult: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract treatmentId from query params if passed
  const queryParams = new URLSearchParams(location.search);
  const initialTreatmentId = queryParams.get('treatmentId');

  const [step, setStep] = useState<number>(1);
  const [visitType, setVisitType] = useState<'in-person' | 'video'>('in-person');
  
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [localTreatmentId, setLocalTreatmentId] = useState<string | null>(initialTreatmentId);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [customCondition, setCustomCondition] = useState<string>('');
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI (GPay/PhonePe)');

  const ALL_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", 
    "11:30 AM", "12:00 PM", "01:00 PM", "01:30 PM", "02:00 PM", 
    "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", 
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM"
  ];

  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const docRes = await api.get('/doctors');
        let docs = docRes.data?.data?.doctors;
        
        setDoctors(docs || []);
        if (docs && docs.length > 0) setSelectedDoctor(docs[0].userId._id);

        const treatRes = await api.get('/treatments');
        const treats = treatRes.data?.data?.treatments || treatRes.data?.data;
        let treatmentList = Array.isArray(treats) ? treats : (treats?.treatments || []);
        
        setTreatments(treatmentList);
        
        if (!initialTreatmentId && treatmentList.length > 0) {
          setLocalTreatmentId(treatmentList[0]._id);
        }
      } catch (err) {
        const e = err as AxiosError<{ message?: string }>;
        setError(e.response
          ? `Server error ${e.response.status}: ${e.response.data?.message ?? 'unknown'}`
          : 'Network error — could not reach the booking service.');
      }
    };
    if (step === 1) fetchInitialData();
  }, [step, initialTreatmentId]);

  useEffect(() => {
    if (!selectedDoctor || !selectedDate || step !== 2) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const docObj = doctors.find((d) => d.userId._id === selectedDoctor);
        const docId = docObj?._id || selectedDoctor;

        const res = await api.get(`/appointments/booked-slots?doctorId=${docId}&date=${selectedDate}`);
        setBookedSlots(res.data.data.bookedSlots || []);
      } catch (err) {
        setBookedSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedDoctor, selectedDate, doctors, step]);

  const handleNext = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/consult');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleBook = async () => {
    setSubmitting(true);
    setError('');
    try {
      // Simulate Payment Processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      const docObj = doctors.find((d) => d.userId?._id === selectedDoctor);
      const correctDoctorId = docObj?._id || selectedDoctor;
      const transactionId = paymentMethod === 'Pay at Clinic' ? undefined : `PAY_MOCK_${Math.floor(Math.random() * 100000)}`;

      const formData = new FormData();
      formData.append('doctorId', correctDoctorId);
      if (localTreatmentId && localTreatmentId !== 'others') {
        formData.append('treatmentId', localTreatmentId);
      }
      formData.append('appointmentDate', selectedDate);
      formData.append('timeSlot', selectedSlot);
      formData.append('type', visitType);
      formData.append('paymentMethod', paymentMethod);
      if (transactionId) formData.append('transactionId', transactionId);
      formData.append('paymentStatus', paymentMethod === 'Pay at Clinic' ? 'pending' : 'paid');
      
      const combinedNotes = localTreatmentId === 'others' 
          ? `Custom Condition: ${customCondition}\n\nDeposit paid via ${paymentMethod}` 
          : `Deposit paid via ${paymentMethod}`;
      formData.append('notes', combinedNotes);

      if (medicalReport) {
        formData.append('medicalReport', medicalReport);
      }

      await api.post('/appointments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Book a Consultation</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Schedule an appointment with our expert specialists. Choose your preferred treatment, doctor, and a time that works for you.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col min-h-[500px]"
        >
          {success ? (
            <div className="text-center py-12 space-y-6 m-auto">
              <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">Appointment Confirmed!</h3>
                <p className="text-slate-600 text-lg">
                  You are booked at <strong>Facio Dental</strong> on <br/>
                  <span className="text-brand-600 font-bold">{selectedDate}</span> at <span className="text-brand-600 font-bold">{selectedSlot}</span>.
                </p>
              </div>
              <button
                onClick={() => navigate('/patient-dashboard')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-105 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full flex-grow">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {step === 1 && "Consultation Details"}
                    {step === 2 && "Select Date & Time"}
                    {step === 3 && "Secure Checkout"}
                  </h3>
                  <span className="text-sm font-bold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">
                    Step {step} of 3
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-500 h-full transition-all duration-500 ease-out" 
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 mb-6 rounded-xl bg-rose-50 text-rose-700 text-sm font-semibold flex items-center gap-2 border border-rose-100">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: Details */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 flex-grow">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Treatment</label>
                    <select
                      value={localTreatmentId || ''}
                      onChange={(e) => setLocalTreatmentId(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 text-slate-700 font-semibold focus:ring-0 focus:border-brand-500 outline-none transition-all cursor-pointer bg-slate-50 hover:bg-white"
                    >
                      {treatments.map((t: any) => (
                        <option key={t._id} value={t._id}>
                          {t.title}
                        </option>
                      ))}
                      <option value="others">Others / General Checkup</option>
                    </select>
                  </div>

                  {localTreatmentId === 'others' && (
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Describe Your Condition</label>
                      <textarea
                        value={customCondition}
                        onChange={(e) => setCustomCondition(e.target.value)}
                        placeholder="Please elaborate on your dental issue or reason for visit..."
                        className="w-full p-4 rounded-xl border-2 border-slate-100 text-slate-700 focus:ring-0 focus:border-brand-500 outline-none transition-all min-h-[120px] resize-none bg-slate-50 hover:bg-white"
                      ></textarea>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Visit Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setVisitType('in-person')}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all group ${
                          visitType === 'in-person' 
                          ? 'border-brand-500 bg-brand-50 shadow-sm' 
                          : 'border-slate-100 bg-white hover:border-slate-300'
                        }`}
                      >
                        <Building2 className={`w-8 h-8 mb-3 transition-colors ${visitType === 'in-person' ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className={`text-sm font-bold ${visitType === 'in-person' ? 'text-brand-700' : 'text-slate-500'}`}>In-Clinic Visit</span>
                      </button>
                      <button
                        onClick={() => setVisitType('video')}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all group ${
                          visitType === 'video' 
                          ? 'border-brand-500 bg-brand-50 shadow-sm' 
                          : 'border-slate-100 bg-white hover:border-slate-300'
                        }`}
                      >
                        <Video className={`w-8 h-8 mb-3 transition-colors ${visitType === 'video' ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className={`text-sm font-bold ${visitType === 'video' ? 'text-brand-700' : 'text-slate-500'}`}>Video Consult</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Specialist</label>
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 text-slate-700 font-semibold focus:ring-0 focus:border-brand-500 outline-none transition-all cursor-pointer bg-slate-50 hover:bg-white"
                    >
                      {doctors.map((d) => (
                        <option key={d.userId._id} value={d.userId._id}>
                          Dr. {d.userId.name} — {d.specializations[0]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Upload Dental X-Ray / Medical Report (Optional)</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setMedicalReport(e.target.files ? e.target.files[0] : null)}
                      className="w-full p-3 rounded-xl border-2 border-slate-100 text-slate-700 focus:ring-0 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                    />
                    <p className="mt-2 text-xs text-slate-500">Max file size: 10MB. Supported formats: PDF, PNG, JPG.</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Date/Time */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-600" /> Choose a Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-4 rounded-xl border-2 border-slate-100 text-slate-700 font-bold focus:ring-0 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Available Time Slots</label>
                    {loadingSlots ? (
                      <div className="text-sm font-bold text-brand-600 py-12 text-center bg-brand-50 rounded-2xl animate-pulse">
                        Finding available slots...
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {ALL_SLOTS.map((slot) => {
                          const isBooked = bookedSlots.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 text-xs sm:text-sm font-bold rounded-xl border-2 transition-all ${
                                isBooked
                                  ? 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed opacity-50'
                                  : selectedSlot === slot
                                  ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-600/30 scale-105'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Checkout */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 flex-grow flex flex-col justify-center py-4">
                  
                  <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm">
                    {(() => {
                      const docObj = doctors.find((d) => d.userId?._id === selectedDoctor);
                      const fee = docObj?.consultationFee || 300;
                      return (
                        <>
                          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-600">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{selectedDate}</p>
                              <p className="text-sm font-semibold text-slate-500">{selectedSlot} • {visitType === 'video' ? 'Video Consult' : 'In-Clinic'}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-base mb-4">
                            <span className="text-slate-600 font-semibold">Consultation Fee</span>
                            <span className="font-bold text-slate-900">₹{fee}.00</span>
                          </div>
                          <div className="flex justify-between text-base mb-6">
                            <span className="text-slate-600 font-semibold">Platform Fee</span>
                            <span className="font-bold text-emerald-600">Free</span>
                          </div>
                          <div className="h-px w-full bg-slate-200 my-4"></div>
                          <div className="flex justify-between text-xl items-center mt-6">
                            <span className="text-slate-900 font-extrabold">Total Deposit</span>
                            <span className="font-black text-brand-600 text-3xl">₹{fee}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Select Payment Method</label>
                    <div className="space-y-3">
                      {['UPI (GPay/PhonePe)', 'Card', 'Pay at Clinic'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === method 
                            ? 'border-brand-500 bg-brand-50 shadow-sm' 
                            : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === method ? 'border-brand-600' : 'border-slate-300'
                          }`}>
                            {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-brand-600"></div>}
                          </div>
                          <div className="flex items-center gap-3">
                            <CreditCard className={`w-5 h-5 ${paymentMethod === method ? 'text-brand-600' : 'text-slate-400'}`} />
                            <span className={`font-bold ${paymentMethod === method ? 'text-brand-900' : 'text-slate-600'}`}>{method}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Actions */}
              <div className="flex gap-4 mt-12 pt-6 border-t border-slate-100">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    disabled={submitting}
                    className="px-6 py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center shrink-0 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    disabled={(step === 1 && !selectedDoctor) || (step === 2 && !selectedSlot)}
                    className="flex-grow py-4 rounded-2xl bg-slate-900 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    disabled={submitting}
                    onClick={handleBook}
                    className="flex-grow py-4 rounded-2xl bg-brand-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-700 shadow-xl shadow-brand-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {submitting ? 'Processing Securely...' : 'Pay Deposit & Book'}
                    </span>
                    {submitting && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse z-0"></div>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>

      </main>
    </div>
  );
};
