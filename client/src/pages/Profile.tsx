import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Loader2 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login');
      } else if (user?.role === 'patient') {
        navigate('/patient-dashboard');
      } else if (user?.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/'); // Fallback
      }
    }
  }, [loading, isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Navbar />
      <div className="flex flex-col items-center gap-4 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        <p className="font-medium">Loading your profile...</p>
      </div>
    </div>
  );
};
