import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Video, Building2, Calendar, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface QuickBookModalProps {
  treatmentId: string | null;
  onClose: () => void;
}

export const QuickBookModal: React.FC<QuickBookModalProps> = ({ treatmentId, onClose }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [visitType, setVisitType] = useState<'in-person' | 'video'>('in-person');
  
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [localTreatmentId, setLocalTreatmentId] = useState<string | null>(treatmentId);
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
        const docs = docRes.data.data.doctors;
        setDoctors(docs);
        if (docs.length > 0) setSelectedDoctor(docs[0].userId._id);

        if (!treatmentId) {
          const treatRes = await api.get('/treatments');
          const treats = treatRes.data.data.treatments || treatRes.data.data; // fallback for different API responses
          const treatmentList = Array.isArray(treats) ? treats : treats.treatments || [];
          setTreatments(treatmentList);
          if (treatmentList.length > 0) setLocalTreatmentId(treatmentList[0]._id);
        }
      } catch (err) {
        setError('Could not load data');
      }
    };
    if (step === 1) fetchInitialData();
  }, [treatmentId, step]);

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
      navigate('/login?redirect=/');
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

  // if (!treatmentId) return null; // Removed so modal can open for general bookings

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 flex flex-col min-h-[400px]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4 m-auto">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Appointment Confirmed!</h3>
            <p className="text-slate-600 text-sm">
              Appointment Confirmed at Facio Dental Super Speciality Centre on <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>!
            </p>
            <button
              onClick={() => {
                onClose();
                navigate('/patient-dashboard');
              }}
              className="w-full mt-4 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-md hover:bg-brand-700"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full flex-grow">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 pr-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {step === 1 && "Consultation Details"}
                  {step === 2 && "Select Date & Time"}
                  {step === 3 && "Secure Checkout"}
                </h3>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md">Step {step} of 3</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-500 h-full transition-all duration-300" 
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {error && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: Details */}
            {step === 1 && (
              <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                {!treatmentId && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Select Treatment</label>
                    <select
                      value={localTreatmentId || ''}
                      onChange={(e) => setLocalTreatmentId(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    >
                      {treatments.map((t: any) => (
                        <option key={t._id} value={t._id}>
                          {t.title}
                        </option>
                      ))}
                      <option value="others">Others</option>
                    </select>
                  </div>
                )}

                {localTreatmentId === 'others' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">Type your condition here</label>
                    <textarea
                      value={customCondition}
                      onChange={(e) => setCustomCondition(e.target.value)}
                      placeholder="Please elaborate exactly what your issue is..."
                      className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all min-h-[100px] resize-none"
                    ></textarea>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Select Visit Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setVisitType('in-person')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        visitType === 'in-person' 
                        ? 'border-brand-500 bg-brand-50 text-brand-700' 
                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <Building2 className="w-6 h-6 mb-2" />
                      <span className="text-sm font-semibold">In-Clinic</span>
                    </button>
                    <button
                      onClick={() => setVisitType('video')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                        visitType === 'video' 
                        ? 'border-brand-500 bg-brand-50 text-brand-700' 
                        : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'
                      }`}
                    >
                      <Video className="w-6 h-6 mb-2" />
                      <span className="text-sm font-semibold">HD Video</span>
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
              </div>
            )}

            {/* STEP 2: Date/Time */}
            {step === 2 && (
              <div className="space-y-6 flex-grow">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Pick a Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Available Slots</label>
                  {loadingSlots ? (
                    <div className="text-sm text-slate-400 py-8 text-center bg-slate-50 rounded-xl animate-pulse">Loading slots...</div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {ALL_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 text-xs font-bold rounded-xl border-2 transition-all ${
                              isBooked
                                ? 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed opacity-60'
                                : selectedSlot === slot
                                ? 'bg-brand-50 text-brand-700 border-brand-500 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-100 hover:border-brand-200'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Checkout */}
            {step === 3 && (
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-2">
                  {(() => {
                    const docObj = doctors.find((d) => d.userId?._id === selectedDoctor);
                    const fee = docObj?.consultationFee || 300;
                    return (
                      <>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-slate-500 font-medium">Consultation Fee</span>
                          <span className="font-bold text-slate-900">₹{fee}.00</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                          <span className="text-slate-500 font-medium">Platform Fee</span>
                          <span className="font-bold text-slate-900">₹0.00</span>
                        </div>
                        <div className="h-px w-full bg-slate-200 my-3"></div>
                        <div className="flex justify-between text-base">
                          <span className="text-slate-700 font-bold">Total Deposit</span>
                          <span className="font-extrabold text-brand-600">₹{fee}.00</span>
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
              </div>
            )}

            {/* Navigation Actions */}
            <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={submitting}
                  className="px-4 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 flex items-center justify-center shrink-0 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={(step === 1 && !selectedDoctor) || (step === 2 && !selectedSlot)}
                  className="flex-grow py-3.5 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 shadow-md shadow-slate-900/10 disabled:opacity-50 transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={handleBook}
                  className="flex-grow py-3.5 rounded-xl bg-brand-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-700 shadow-lg shadow-brand-600/30 disabled:opacity-50 transition-all relative overflow-hidden"
                >
                  {submitting ? 'Processing Securely...' : 'Pay Deposit & Book'}
                  {submitting && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
