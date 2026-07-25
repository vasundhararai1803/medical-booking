import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar as CalendarIcon, Check, Calendar, Clock, MapPin, Download, CheckCircle, ArrowRight, Activity, Users } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock Data
const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Appointment Confirmed', desc: 'Tomorrow at 10:00 AM.', unread: true, time: '2h' },
  { id: 2, title: 'New Prescription', desc: 'Dr. Thorne uploaded your prescription.', unread: true, time: '5h' },
  { id: 3, title: 'Invoice Paid', desc: 'Payment of ₹150 received.', unread: false, time: '1d' },
];

const MOCK_RECORDS = [
  { id: 1, type: 'X-Ray (Panoramic)', date: 'May 12, 2026' },
  { id: 2, type: 'Treatment Plan', date: 'April 04, 2026' },
  { id: 3, type: 'Prescription', date: 'April 04, 2026' },
];

const MOCK_PAYMENTS = [
  { id: 1, desc: 'Root Canal Treatment', date: 'May 10', amount: '₹850', status: 'Paid' },
  { id: 2, desc: 'General Consultation', date: 'June 15', amount: '₹150', status: 'Pending' },
];

export const PatientDashboardView: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/dashboard');
      return;
    }
    if (loading) return;

    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments/my-appointments');
        setAppointments(res.data.data.appointments);
      } catch (err) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [isAuthenticated, loading, navigate, refreshKey]);

  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await api.patch(`/appointments/${id}/cancel`);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((appt) => {
    const apptDate = new Date(appt.appointmentDate);
    return apptDate >= today && appt.status !== 'cancelled' && appt.status !== 'completed';
  }).sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-16 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 1. Small Welcome Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome, {user?.name?.split(' ')[0] || 'Patient'}</h1>
            <p className="text-slate-500 mt-1 text-sm">Here is your health overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                const element = document.getElementById('digital-records');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              View Records
            </button>
            <button 
              onClick={() => navigate('/consult')}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Book Appointment
            </button>
          </div>
        </motion.div>

        {/* 2. Upcoming Appointment Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-semibold mb-4 tracking-tight">Next Appointment</h2>
          
          {nextAppointment ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between gap-6">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 shrink-0">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{new Date(nextAppointment.appointmentDate).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-2xl font-bold text-slate-800 leading-tight">{new Date(nextAppointment.appointmentDate).getDate()}</span>
                </div>
                
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-slate-900">{nextAppointment.treatmentId?.title || 'General Consultation'}</h3>
                  <p className="text-slate-500 text-sm mt-1">Dr. {nextAppointment.doctorId?.name || 'Specialist'}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {nextAppointment.timeSlot}</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> 
                      {nextAppointment.type === 'video' ? 'Virtual Call' : 'Clinic Location'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleCancel(nextAppointment._id)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => alert('To reschedule, please cancel this appointment and book a new one.')}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Reschedule
                </button>
                {nextAppointment.type === 'video' && nextAppointment.videoConsultUrl && (
                  <a 
                    href={nextAppointment.videoConsultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    Join Video
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-slate-800 font-medium">No upcoming appointments</p>
                <p className="text-slate-500 text-sm mt-1">You are all caught up on your visits.</p>
              </div>
              <button 
                onClick={() => navigate('/consult')}
                className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm text-slate-700"
              >
                Book Appointment
              </button>
            </div>
          )}
        </motion.div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (Main Details) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 3. Treatment Journey */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-semibold mb-6 tracking-tight">Active Treatment Journey</h2>
              <div className="relative pt-4 pb-2">
                <div className="absolute top-6 left-6 right-6 h-[2px] bg-slate-100" />
                <div className="absolute top-6 left-6 w-1/2 h-[2px] bg-blue-500" />
                
                <div className="flex justify-between relative z-10">
                  {['Consultation', 'Diagnosis', 'Treatment', 'Recovery'].map((stage, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-[3px] bg-white ${i < 2 ? 'border-blue-500' : i === 2 ? 'border-blue-500' : 'border-slate-200'}`}>
                        {i < 2 && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                      <span className={`text-xs font-medium ${i <= 2 ? 'text-slate-900' : 'text-slate-400'}`}>{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 4. Digital Records */}
            <motion.div id="digital-records" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold tracking-tight">Digital Records</h2>
                <button 
                  onClick={() => alert('Opening full records library...')}
                  className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
                {MOCK_RECORDS.map((record, index) => (
                  <div key={record.id} className={`flex items-center justify-between p-4 ${index !== MOCK_RECORDS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{record.type}</p>
                        <p className="text-xs text-slate-500">{record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <button onClick={() => alert(`Opening ${record.type} record...`)} className="text-slate-500 hover:text-slate-800 transition-colors">View</button>
                      <button onClick={() => alert(`Downloading ${record.type} record...`)} className="text-blue-600 hover:text-blue-700 transition-colors">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 7. Payments */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className="text-lg font-semibold mb-4 tracking-tight">Payments</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
                {MOCK_PAYMENTS.map((payment, index) => (
                  <div key={payment.id} className={`flex items-center justify-between p-4 ${index !== MOCK_PAYMENTS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{payment.desc}</p>
                      <p className="text-xs text-slate-500">{payment.date}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${payment.status === 'Paid' ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-700'}`}>
                        {payment.status}
                      </span>
                      <p className="text-sm font-medium text-slate-900 w-12 text-right">{payment.amount}</p>
                      <button onClick={() => alert('Downloading invoice...')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 6. Profile Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-semibold text-lg border border-slate-200">
                    {user?.name?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{user?.name}</h3>
                    <p className="text-sm text-slate-500">Patient</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-slate-900 truncate max-w-[150px]">{user?.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-medium text-slate-900">+91 98765 43210</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency</span>
                    <span className="font-medium text-rose-500">Not Set</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/profile')}
                  className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>

            {/* 5. Notifications */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-6">Notifications</h3>
                <div className="space-y-5">
                  {MOCK_NOTIFICATIONS.map(note => (
                    <div key={note.id} className="flex gap-3">
                      <div className="mt-1.5">
                        <div className={`w-2 h-2 rounded-full ${note.unread ? 'bg-blue-500' : 'bg-slate-200'}`} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className={`text-sm ${note.unread ? 'font-medium text-slate-900' : 'text-slate-600'}`}>{note.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{note.time}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{note.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert('Opening notifications center...')}
                  className="w-full mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  View All Notifications
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};


// -- Doctor View --

const DoctorDashboardView: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login?redirect=/dashboard');
      return;
    }
    if (loading) return;

    if (user?.role !== 'doctor' && user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await api.get('/appointments/all');
        setAppointments(res.data.data.appointments);
      } catch (err) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [isAuthenticated, loading, navigate, user, refreshKey]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status });
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      alert('Failed to update status');
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

  // Compute Metrics
  const totalBookings = appointments.length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysAppointments = appointments.filter(a => {
    const d = new Date(a.appointmentDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime() && a.status !== 'cancelled';
  }).length;

  const pendingConfirmations = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 pt-32 pb-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-slate-200/60 p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Doctor Portal</h1>
            <p className="text-slate-600 mt-1">Dr. {user?.name || 'Thorne'}, here is your overview.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50">
              Manage Schedule
            </button>
            <button className="bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-brand-600/20 hover:bg-brand-700">
              New Prescription
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10">
          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Bookings</p>
              <h4 className="text-2xl font-bold text-slate-900">{totalBookings}</h4>
            </div>
          </div>
          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Today's Appointments</p>
              <h4 className="text-2xl font-bold text-slate-900">{todaysAppointments}</h4>
            </div>
          </div>
          <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
              <h4 className="text-2xl font-bold text-slate-900">{pendingConfirmations}</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* Main Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-slate-50/50 rounded-3xl p-6 md:p-8 border border-slate-100 min-h-[500px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">All Appointments</h3>
                <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">System View</span>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No appointments found.</div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div key={appt._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-brand-200 transition-colors bg-slate-50/50">
                      
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="w-16 h-16 bg-white rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                          <span className="text-sm font-bold text-slate-700">{new Date(appt.appointmentDate).getDate()}</span>
                          <span className="text-[10px] uppercase font-semibold text-slate-400">{new Date(appt.appointmentDate).toLocaleDateString('en-US', { month: 'short' })}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-900">{appt.patientId?.name || 'Patient'}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(appt.status)}`}>
                              {appt.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">{appt.treatmentId?.title}</p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appt.timeSlot}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {appt.type}</span>
                            {appt.type === 'video' && appt.videoConsultUrl && (
                              <a 
                                href={appt.videoConsultUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-indigo-600 hover:text-indigo-800 underline font-bold"
                              >
                                Join Video Call
                              </a>
                            )}
                            {appt.medicalReportUrl && (
                              <a 
                                href={appt.medicalReportUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-brand-600 hover:text-brand-800 underline font-bold"
                              >
                                View Report
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {appt.status === 'pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                            className="flex-1 sm:flex-none px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status === 'confirmed' && (
                          <button 
                            onClick={() => handleUpdateStatus(appt._id, 'completed')}
                            className="flex-1 sm:flex-none px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                          <button 
                            onClick={() => handleUpdateStatus(appt._id, 'cancelled')}
                            className="flex-1 sm:flex-none px-3 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-brand-500 rounded-full blur-2xl opacity-20"></div>
              <h3 className="font-bold text-white mb-2 relative z-10">Write a Health Blog</h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Share your expertise on dental care with your patients.</p>
              <button className="w-full bg-white text-slate-900 font-semibold py-2.5 rounded-xl shadow-md hover:bg-slate-100 transition-colors relative z-10">
                Create Article
              </button>
            </div>

            <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Pending Approvals ({pendingConfirmations})</h3>
              <div className="space-y-4">
                {appointments.filter(a => a.status === 'pending').slice(0, 3).map((appt) => (
                  <div key={appt._id} className="flex items-start justify-between border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{appt.patientId?.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{appt.treatmentId?.title} • {appt.timeSlot}</p>
                    </div>
                    <button 
                      onClick={() => handleUpdateStatus(appt._id, 'confirmed')}
                      className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 shrink-0"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-500">
          <div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
          <p className="font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (user?.role === 'doctor' || user?.role === 'admin') return <DoctorDashboardView />;
  return <PatientDashboardView />;
};
