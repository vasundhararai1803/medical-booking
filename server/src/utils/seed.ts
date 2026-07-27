import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { User } from '../models/User';
import { Doctor } from '../models/Doctor';
import { Treatment } from '../models/Treatment';
import { Review } from '../models/Review';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/aurasmile';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear old data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Treatment.deleteMany({});
    await Review.deleteMany({});
    console.log('Old Data Cleared!');

    // 1. Create Doctor User
    const doctorUser1 = await User.create({
      name: 'Dr. Jyotirmay Singh',
      email: 'jyotirmay@aurasmile.com',
      password: 'password123',
      role: 'doctor',
      phone: '+919999999999'
    });
    const doctorUser2 = await User.create({
      name: 'Dr. Ananya Sharma',
      email: 'ananya@aurasmile.com',
      password: 'password123',
      role: 'doctor',
      phone: '+919888888888'
    });
    const doctorUser3 = await User.create({
      name: 'Dr. Rahul Verma',
      email: 'rahul@aurasmile.com',
      password: 'password123',
      role: 'doctor',
      phone: '+919777777777'
    });
    console.log('Doctor User Created');

    // 2. Create Doctor Profile
    await Doctor.create([
      {
        userId: doctorUser1._id,
        qualifications: ['BDS', 'MDS - Orthodontics and Dentofacial Orthopaedics', 'PhD - Orthodontics & Dentofacial Orthopaedics'],
        specializations: ['Orthodontist', 'Dentofacial Orthopedist', 'Implantologist', 'Dental Surgeon', 'Dentist'],
        experience: '20 Years Experience Overall (18 years as specialist)',
        registration: '2218/A Bihar State Dental Council, 2007',
        consultationFee: 300,
        rating: 5.0,
        clinicDetails: {
          name: 'Facio Dental Super Speciality Centre',
          address: 'A/13, Indrasan, Anandpuri, West Boring Canal Road, Landmark: Near Panchmukhi Hanuman Mandir & Himgiri Apartment, Patna',
          timings: 'Mon - Sat: 02:00 PM - 07:00 PM'
        },
        education: [
          'BDS - SDCH, 2005 (Gold Medalist B.D.S. Hons. - 2006)',
          'MDS - Orthodontics and Dentofacial Orthopaedics - Maharishi Markandeshwar Institute Of Medical Sciences & Research, Mullana, Ambala, 2010 (Hons. in MDS - 2010)',
          'PhD - Orthodontics & Dentofacial Orthopaedics - Patna University, 2016'
        ],
        experienceHistory: [
          '2010 - 2016: Associate Professor at B.R Ambedkar Dental College & Hospital',
          '2010 - 2018: Director at Facio Dental Super Speciality Clinic'
        ],
        memberships: ['Indian Dental Association', 'Indian Orthodontic Society']
      },
      {
        userId: doctorUser2._id,
        qualifications: ['BDS', 'MDS - Periodontics'],
        specializations: ['Periodontist', 'Implantologist'],
        experience: '12 Years Experience Overall (9 years as specialist)',
        registration: '1540/A Bihar State Dental Council, 2012',
        consultationFee: 350,
        rating: 4.8,
        clinicDetails: {
          name: 'Facio Dental Super Speciality Centre',
          address: 'A/13, Indrasan, Anandpuri, West Boring Canal Road, Landmark: Near Panchmukhi Hanuman Mandir & Himgiri Apartment, Patna',
          timings: 'Mon - Sat: 10:00 AM - 05:00 PM'
        },
        education: [
          'BDS - Government Dental College, 2010',
          'MDS - Periodontics - SDCH, 2013'
        ],
        experienceHistory: [
          '2013 - Present: Senior Consultant at Facio Dental Super Speciality Clinic'
        ],
        memberships: ['Indian Society of Periodontology']
      },
      {
        userId: doctorUser3._id,
        qualifications: ['BDS', 'MDS - Oral & Maxillofacial Surgery'],
        specializations: ['Oral & Maxillofacial Surgeon', 'Dental Surgeon'],
        experience: '15 Years Experience Overall (12 years as specialist)',
        registration: '1205/A Bihar State Dental Council, 2009',
        consultationFee: 400,
        rating: 4.9,
        clinicDetails: {
          name: 'Facio Dental Super Speciality Centre',
          address: 'A/13, Indrasan, Anandpuri, West Boring Canal Road, Landmark: Near Panchmukhi Hanuman Mandir & Himgiri Apartment, Patna',
          timings: 'Mon - Fri: 09:00 AM - 04:00 PM'
        },
        education: [
          'BDS - Patna Dental College, 2007',
          'MDS - Oral & Maxillofacial Surgery - King George Medical University, 2011'
        ],
        experienceHistory: [
          '2011 - Present: Chief Surgeon at Facio Dental Super Speciality Clinic'
        ],
        memberships: ['Association of Oral and Maxillofacial Surgeons of India']
      }
    ]);
    console.log('Doctor Profile Created');

    const rawTreatments = [
      { title: 'Invisible And Clear Braces', category: 'orthodontics', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800' },
      { title: 'Invisalign Certified Orthodontics', category: 'orthodontics', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1598256989800-fea5c1c84f1a?auto=format&fit=crop&q=80&w=800' },
      { title: 'Fixing Dental Gaps', category: 'orthodontics', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800' },
      { title: 'Root Canal Treatment (RCT)', category: 'general', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800' },
      { title: 'Complete Dentures (CD)', category: 'general', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800' },
      { title: 'Periodontal (Gums) Treatment', category: 'general', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' },
      { title: 'Laminates / Veneers', category: 'cosmetic', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1522849696084-818b92644246?auto=format&fit=crop&q=80&w=800' },
      { title: 'Tooth Whitening Treatment', category: 'cosmetic', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800' },
      { title: 'Smile Makeover', category: 'cosmetic', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800' },
      { title: 'Single Tooth Implant', category: 'implants', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800' },
      { title: 'Full Mouth Implants (All-On-4)', category: 'implants', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800' },
      { title: 'Pit & Fissure Sealants', category: 'pediatric', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1609141076615-562a1abfbd8a?auto=format&fit=crop&q=80&w=800', description: 'Protective coatings for children\'s teeth to prevent cavities.' },
      { title: 'Fluoride Treatment', category: 'pediatric', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1590620718588-46cb5d43fb32?auto=format&fit=crop&q=80&w=800', description: 'Strengthens child enamel and guards against tooth decay.' },
      { title: 'Painless Pulpotomy', category: 'pediatric', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&q=80&w=800', description: 'Gentle nerve treatment for infected primary (baby) teeth.' },
      { title: 'Impacted Tooth Extraction', category: 'emergency', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800' },
      { title: 'Emergency Tooth Pain Relief', category: 'emergency', isActive: true, imageUrl: 'https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=800' }
    ];
    
    await Treatment.insertMany(
      rawTreatments.map(t => ({
        ...t,
        slug: t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      }))
    );
    console.log('Treatments Created');

    // 4. Create Reviews
    const googleMapsClinicUrl = "https://www.google.com/search?q=Facio+Dental+Super+Speciality+Centre+Boring+Canal+Road+Patna+reviews";

    const reviewsData = [
      {
        patientName: "Janvi",
        date: "20 Jun 2025",
        rating: 5,
        comment: "Wonderful experience by facio dental clinic. i had an orthodontic treatment which was painless. the staff are really poliet and helpfull in everyway.",
        googleReviewUrl: googleMapsClinicUrl
      },
      {
        patientName: "Srishti Arya",
        date: "19 Apr 2025",
        rating: 5,
        comment: "I had a great experience with my orthodontic treatment here. Dr. Jyotirmay Singh was very professional and treated me with great care throughout the process. The staff was also courteous and made every visit comfortable. Highly recommended!",
        googleReviewUrl: googleMapsClinicUrl
      },
      {
        patientName: "Ravi Singh",
        date: "14 Jan 2025",
        rating: 5,
        comment: "I am very satisfied with my treatment RCT and cap by done doctor Dr Jyotirmay sir. Clinic is very good and clean.",
        googleReviewUrl: googleMapsClinicUrl
      },
      {
        patientName: "Sumrit Kumar",
        date: "2025",
        rating: 5,
        comment: "I am fully satisfied with the treatment rct and zirconia crown treatment.",
        googleReviewUrl: googleMapsClinicUrl
      },
      {
        patientName: "Rinkee Kumari",
        date: "2025",
        rating: 5,
        comment: "I am very happy and satisfied with my orthodontic treatment done by Dr jyotirmay singh .",
        googleReviewUrl: googleMapsClinicUrl
      },
      {
        patientName: "Ajit Singh",
        date: "2025",
        rating: 5,
        comment: "Very Good Overall Experience And Painless Surgery. Thank You Facio Dental Treatment",
        googleReviewUrl: googleMapsClinicUrl
      }
    ];

    for (const data of reviewsData) {
      await Review.create(data);
    }

    console.log('Reviews Created');
    console.log('Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error with Seeding DB:', error);
    process.exit(1);
  }
};

seedDatabase();
