import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// --- MOCK DATA ---
const MOCK_TREATMENTS = [
  {
    _id: 't1',
    id: 't1',
    title: 'Professional Teeth Cleaning',
    slug: 'professional-teeth-cleaning',
    category: 'general',
    description: 'Thorough removal of plaque and tartar to prevent cavities.',
    procedureSteps: ['Examination', 'Plaque Removal', 'Polishing', 'Fluoride'],
    benefits: ['Removes stubborn plaque', 'Prevents gum disease', 'Freshens breath'],
    durationMinutes: 45,
    costRange: { min: 100, max: 150 },
    beforeAfterGallery: [],
    faqs: [],
    isActive: true,
  },
  {
    _id: 't2',
    id: 't2',
    title: 'Invisalign Clear Aligners',
    slug: 'invisalign-clear-aligners',
    category: 'orthodontics',
    description: 'Virtually invisible aligners customized to gradually straighten your teeth.',
    procedureSteps: ['Consultation', '3D Scan', 'Fitting', 'Follow-up'],
    benefits: ['Discreet appearance', 'Removable for eating', 'Comfortable fit'],
    durationMinutes: 30,
    costRange: { min: 3000, max: 5000 },
    beforeAfterGallery: [],
    faqs: [],
    isActive: true,
  },
  {
    _id: 't3',
    id: 't3',
    title: 'Porcelain Veneers',
    slug: 'porcelain-veneers',
    category: 'cosmetic',
    description: 'Custom-made, tooth-colored shells designed to cover the front surface of teeth.',
    procedureSteps: ['Preparation', 'Impressions', 'Temporary Veneers', 'Final Bonding'],
    benefits: ['Fixes chipped teeth', 'Stain-resistant', 'Natural look'],
    durationMinutes: 60,
    costRange: { min: 900, max: 2500 },
    beforeAfterGallery: [],
    faqs: [],
    isActive: true,
  },
  {
    _id: 't4',
    id: 't4',
    title: 'Dental Implants',
    slug: 'dental-implants',
    category: 'implants',
    description: 'Permanent replacement for missing teeth that look and feel like natural teeth.',
    procedureSteps: ['Consultation', 'Implant Placement', 'Healing', 'Crown Placement'],
    benefits: ['Permanent solution', 'Preserves bone structure', 'Restores bite'],
    durationMinutes: 90,
    costRange: { min: 1500, max: 4000 },
    beforeAfterGallery: [],
    faqs: [],
    isActive: true,
  },
  {
    _id: 't5',
    id: 't5',
    title: 'Root Canal Therapy',
    slug: 'root-canal-therapy',
    category: 'general',
    description: 'Relieves dental pain and saves your natural tooth by removing infected pulp.',
    procedureSteps: ['X-ray', 'Anesthesia', 'Pulp Removal', 'Filling'],
    benefits: ['Stops severe pain', 'Saves natural tooth', 'Prevents infection spread'],
    durationMinutes: 90,
    costRange: { min: 800, max: 1500 },
    beforeAfterGallery: [],
    faqs: [],
    isActive: true,
  }
];

const MOCK_DOCTORS = [
  {
    _id: 'd1',
    userId: { _id: 'u1', name: 'Dr. Sarah Jenkins', avatar: 'SJ' },
    specializations: ['General Dentist'],
    consultationFee: 50,
  },
  {
    _id: 'd2',
    userId: { _id: 'u2', name: 'Dr. Michael Chen', avatar: 'MC' },
    specializations: ['Orthodontist'],
    consultationFee: 80,
  },
  {
    _id: 'd3',
    userId: { _id: 'u3', name: 'Dr. Emily Carter', avatar: 'EC' },
    specializations: ['Cosmetic Dentist'],
    consultationFee: 100,
  }
];

// --- ROUTES ---

// 1. GET /api/treatments
app.get('/api/treatments', (req, res) => {
  res.json({ success: true, data: { treatments: MOCK_TREATMENTS } });
});

// 2. GET /api/doctors
app.get('/api/doctors', (req, res) => {
  res.json({ success: true, data: { doctors: MOCK_DOCTORS } });
});

// 3. GET /api/doctors/:doctorId/available-slots?date=YYYY-MM-DD
app.get('/api/doctors/:doctorId/available-slots', (req, res) => {
  const { date } = req.query;
  // Always return the same mock slots for any valid looking date to make testing easy
  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' });
  }
  
  const mockSlots = ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"];
  res.json({ success: true, data: { availableSlots: mockSlots } });
});

// 4. POST /api/appointments
app.post('/api/appointments', (req, res) => {
  const { doctorId, treatmentId, appointmentDate, timeSlot, type, notes } = req.body;
  
  if (!doctorId || !treatmentId || !appointmentDate || !timeSlot) {
    return res.status(400).json({ success: false, message: 'Missing required booking fields' });
  }

  const appointment = {
    _id: 'appt_' + Date.now(),
    doctorId,
    treatmentId,
    appointmentDate,
    timeSlot,
    type: type || 'in-person',
    notes,
    status: 'scheduled'
  };

  res.status(201).json({
    success: true,
    data: { appointment },
    message: 'Appointment successfully booked'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mock server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock server is running on http://localhost:${PORT}`);
});
