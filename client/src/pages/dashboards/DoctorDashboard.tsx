import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Calendar as CalendarIcon, Users, Activity, Check, X, Clock, MapPin } from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/doctor-dashboard');
      return;
    }

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
  }, [isAuthenticated, navigate, user, refreshKey]);

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
