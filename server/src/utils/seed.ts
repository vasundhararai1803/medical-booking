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
      { title: 'Invisible And Clear Braces', category: 'Orthodontics', isActive: true },
      { title: 'Invisalign certified orthodontics', category: 'Orthodontics', isActive: true },
      { title: 'Fixing Dental Gaps', category: 'Orthodontics', isActive: true },
      { title: 'Post & Core Crown', category: 'Endodontics/Restorative', isActive: true },
      { title: 'Complete Dentures (CD)', category: 'Prosthodontics', isActive: true },
      { title: 'Immediate Denture', category: 'Prosthodontics', isActive: true },
      { title: 'Periodontal (Gums) Treatment', category: 'Periodontics', isActive: true },
      { title: 'Impacted Tooth Extraction', category: 'Oral Surgery', isActive: true },
      { title: 'Laminates / Veneers', category: 'Cosmetic', isActive: true },
      { title: 'Complete, Partial and Flexible Dentures', category: 'Prosthodontics', isActive: true },
      { title: 'Tooth Whitening Treatment', category: 'Cosmetic', isActive: true },
      { title: 'Tooth Reshaping', category: 'Cosmetic', isActive: true },
      { title: 'Oral and Maxillofacial Trauma Surgery', category: 'Oral Surgery', isActive: true },
      { title: 'Maxillofacial Prosthodontics', category: 'Prosthodontics', isActive: true },
      { title: 'Smile Makeover', category: 'Cosmetic', isActive: true },
      { title: 'Bleeding Gums Treatment', category: 'Periodontics', isActive: true },
      { title: 'Dental Filling', category: 'Restorative', isActive: true },
      { title: 'Scaling and Polishing', category: 'Preventive', isActive: true },
      { title: 'Oral Cancer Screening & Care', category: 'Oral Surgery', isActive: true },
    ];
    
    const treatments = await Treatment.insertMany(
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
