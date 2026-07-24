import React, { useState } from 'react';
import { MapPin, Video, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Sarah Jenkins', specialization: 'General Dentist', fee: '$50', avatar: 'SJ' },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Orthodontist', fee: '$80', avatar: 'MC' },
  { id: '3', name: 'Dr. Emily Carter', specialization: 'Cosmetic Dentist', fee: '$100', avatar: 'EC' },
];

const MOCK_TREATMENTS = [
  { id: 't1', title: 'Consultation & Checkup', price: '$50' },
  { id: 't2', title: 'Teeth Cleaning', price: '$100' },
  { id: 't3', title: 'Root Canal Therapy', price: '$800' },
  { id: 't4', title: 'Invisalign Assessment', price: '$150' },
];

const MOCK_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '02:30 PM', '03:00 PM', '04:00 PM'
];

type ConsultationType = 'in-clinic' | 'video' | null;

export const BookingWizard: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultType, setConsultType] = useState<ConsultationType>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<string>('');
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Handlers
  const handleNextStep = () => {
    if (step === 1 && consultType && selectedDoctor && selectedTreatment) {
      setStep(2);
      // Simulate loading slots
      setIsLoadingSlots(true);
      setTimeout(() => setIsLoadingSlots(false), 800);
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDate && selectedSlot) {
      // Simulate API call
      setStep(3);
    }
  };

  const isStep1Complete = consultType && selectedDoctor && selectedTreatment;
  const isStep2Complete = selectedDate && selectedSlot;

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Confirmed!</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your appointment has been successfully scheduled. We have sent a confirmation email with all the details.
        </p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Go to Patient Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      
      {/* Header & Step Indicator */}
      <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Dental Visit</h2>
        <p className="text-sm text-slate-500 mb-8">Follow the steps below to schedule your appointment.</p>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step >= 1 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
            <span className={`text-sm font-semibold ${step >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>Type & Doctor</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${step >= 2 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            <span className={`text-sm font-semibold ${step >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>Date & Slot</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        
        {/* Step 1 View */}
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Consultation Type Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900">Consultation Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setConsultType('in-clinic')}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${consultType === 'in-clinic' ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <MapPin className={`w-8 h-8 mb-3 ${consultType === 'in-clinic' ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${consultType === 'in-clinic' ? 'text-brand-700' : 'text-slate-600'}`}>In-Clinic Visit</span>
                </button>
                <button 
                  onClick={() => setConsultType('video')}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${consultType === 'video' ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <Video className={`w-8 h-8 mb-3 ${consultType === 'video' ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${consultType === 'video' ? 'text-brand-700' : 'text-slate-600'}`}>Video Call</span>
                </button>
              </div>
            </div>

            {/* Doctor Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900">Select Doctor</label>
              <div className="space-y-3">
                {MOCK_DOCTORS.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${selectedDoctor === doc.id ? 'border-brand-500 bg-brand-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                        {doc.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                        <p className="text-sm text-slate-500">{doc.specialization}</p>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                      Fee: {doc.fee}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900">Treatment Type</label>
              <select
                value={selectedTreatment}
                onChange={(e) => setSelectedTreatment(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
              >
                <option value="" disabled>Select a treatment</option>
                {MOCK_TREATMENTS.map(t => (
                  <option key={t.id} value={t.id}>{t.title} (Est. {t.price})</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!isStep1Complete}
              className={`w-full py-4 rounded-2xl font-semibold text-white transition-all flex justify-center items-center gap-2 ${isStep1Complete ? 'bg-brand-600 hover:bg-brand-700 shadow-md transform hover:-translate-y-0.5' : 'bg-slate-300 cursor-not-allowed'}`}
            >
              Continue to Date & Slot
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2 View */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            
            {/* HTML5 Date Picker */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900">Select Date</label>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot(null); // reset slot when date changes
                }}
                className="w-full px-4 py-3.5 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors cursor-pointer"
                min={new Date().toISOString().split('T')[0]} // prevent past dates
              />
            </div>

            {/* Dynamic Time Slots */}
            <div className="space-y-3 min-h-[200px]">
              <label className="text-sm font-semibold text-slate-900">Available Time Slots</label>
              {!selectedDate ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-500">
                  Please select a date to view available slots.
                </div>
              ) : isLoadingSlots ? (
                <div className="grid grid-cols-3 gap-3">
                   {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
                   ))}
                </div>
              ) : MOCK_SLOTS.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-500">
                  No slots available for this date.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOCK_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 rounded-xl font-medium text-sm transition-all border-2 ${selectedSlot === slot ? 'border-brand-600 bg-brand-600 text-white shadow-md' : 'border-slate-100 bg-white text-slate-700 hover:border-slate-300'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notes Textarea */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-900">Reason for Visit (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for booking..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition-colors resize-none"
              ></textarea>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-4 rounded-2xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!isStep2Complete}
                className={`w-2/3 py-4 rounded-2xl font-semibold text-white transition-all flex justify-center items-center gap-2 ${isStep2Complete ? 'bg-brand-600 hover:bg-brand-700 shadow-md transform hover:-translate-y-0.5' : 'bg-slate-300 cursor-not-allowed'}`}
              >
                Confirm Booking
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
