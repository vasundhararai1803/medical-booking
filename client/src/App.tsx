import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Home } from './pages/Home';
import { PatientDashboard } from './pages/dashboards/PatientDashboard';
import { DoctorDashboard } from './pages/dashboards/DoctorDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Navbar } from './components/layout/Navbar';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Treatments } from './pages/Treatments';
import { Testimonials } from './pages/Testimonials';
import { About } from './pages/About';
import { Consult } from './pages/Consult';
import { Blog } from './pages/Blog';
import { Profile } from './pages/Profile';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/treatments" element={<PageWrapper><Treatments /></PageWrapper>} />
        <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
        <Route path="/consult" element={<PageWrapper><Consult /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/patient-dashboard" element={<PageWrapper><PatientDashboard /></PageWrapper>} />
        <Route path="/doctor-dashboard" element={<PageWrapper><DoctorDashboard /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="w-full">
          <ErrorBoundary>
            <AnimatedRoutes />
          </ErrorBoundary>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
