import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, FileText, User, ChevronRight, MapPin } from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const PatientDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [refreshKey, setRefreshKey] = useState(0); // Used to trigger refetch

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/patient-dashboard');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments/my-appointments');
        setAppointments(res.data.data.appointments);
      } catch (err) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [isAuthenticated, navigate, refreshKey]);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.patch(`/appointments/${id}/cancel`);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-brand-50 text-brand-700';
      case 'completed': return 'bg-emerald-50 text-emerald-700';
      case 'cancelled': return 'bg-rose-50 text-rose-700';
      default: return 'bg-amber-50 text-amber-700'; // pending
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const displayedAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.appointmentDate);
    if (activeTab === 'upcoming') {
      return apptDate >= today && appt.status !== 'cancelled';
    } else {
      return apptDate < today || appt.status === 'cancelled';
    }
  });

  return (
    <div className="min-h-screen bg-slate-100 pt-32 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-200/60 p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="flex items-center justify-between mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Patient Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back, {user?.name || 'Patient'}!</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-lg">
            {user?.name?.charAt(0) || 'P'}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Left Column: Quick Actions & Profile */}
          <div className="space-y-6">
            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-500" /> My Profile
              </h3>
              <div className="space-y-3 text-sm">
                <p><span className="text-slate-500">Email:</span> <span className="font-medium text-slate-900">{user?.email || 'patient@example.com'}</span></p>
                <p><span className="text-slate-500">Phone:</span> <span className="font-medium text-slate-900">{user?.phoneNumber || 'Not provided'}</span></p>
              </div>
              <button className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors text-sm">
                Edit Profile
              </button>
            </div>

            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-500" /> Digital Records
              </h3>
              <ul className="space-y-3">
                {['Recent X-Ray (May 12)', 'Prescription (Apr 04)', 'Treatment Plan'].map((doc, i) => (
                  <li key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition-colors cursor-pointer group">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-brand-700">{doc}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100 min-h-[500px]">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                  <button 
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'upcoming' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Upcoming
                  </button>
                  <button 
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'past' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Past History
                  </button>
                </div>
                <button 
                  onClick={() => navigate('/')}
                  className="bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-100 transition-colors shrink-0"
                >
                  + Book New
                </button>
              </div>

              {displayedAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-slate-900 font-medium mb-1">No {activeTab} appointments</h4>
                  <p className="text-slate-500 text-sm">When you book a consultation, it will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedAppointments.map((appt) => (
                    <div key={appt._id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-slate-100 hover:border-brand-200 transition-colors bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                      <div className="sm:w-32 flex flex-col justify-center items-center bg-slate-50 rounded-xl p-3 shrink-0">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          {new Date(appt.appointmentDate).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-2xl font-extrabold text-slate-900">
                          {new Date(appt.appointmentDate).getDate()}
                        </span>
                        <span className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {appt.timeSlot}
                        </span>
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-bold text-slate-900 text-lg">{appt.treatmentId?.title || 'General Consultation'}</h4>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                            {appt.status}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">with {appt.doctorId?.name || 'Doctor'}</p>
                        <p className="text-slate-500 text-xs mb-3 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Facio Dental Super Speciality Centre
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-wider">
                            {appt.type} Visit
                          </span>
                        </div>
                      </div>
                      
                      {activeTab === 'upcoming' && appt.status === 'pending' ? (
                        <div className="sm:w-24 flex flex-col justify-center gap-2 shrink-0">
                          {appt.type === 'video' && appt.videoConsultUrl && (
                            <a 
                              href={appt.videoConsultUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 text-center transition-colors shadow-sm"
                            >
                              Join Video Call
                            </a>
                          )}
                          {appt.medicalReportUrl && (
                            <a 
                              href={appt.medicalReportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 bg-brand-50 text-brand-600 border border-brand-200 rounded-lg text-xs font-medium hover:bg-brand-100 hover:border-brand-300 text-center transition-colors"
                            >
                              View Report
                            </a>
                          )}
                          <button 
                            onClick={() => handleCancel(appt._id)}
                            className="w-full py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        (appt.medicalReportUrl || (appt.type === 'video' && appt.videoConsultUrl)) && (
                          <div className="sm:w-24 flex flex-col justify-center gap-2 shrink-0">
                            {appt.type === 'video' && appt.videoConsultUrl && (
                              <a 
                                href={appt.videoConsultUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 text-center transition-colors shadow-sm"
                              >
                                Join Video Call
                              </a>
                            )}
                            {appt.medicalReportUrl && (
                              <a 
                                href={appt.medicalReportUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2 bg-brand-50 text-brand-600 border border-brand-200 rounded-lg text-xs font-medium hover:bg-brand-100 hover:border-brand-300 text-center transition-colors"
                              >
                                View Report
                              </a>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
