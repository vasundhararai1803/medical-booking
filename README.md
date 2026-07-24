# Facio Dental & Maxillofacial Super Speciality Centre

A premium, full-stack web application designed for a state-of-the-art dental and maxillofacial clinic. This platform provides a seamless, luxurious digital experience for patients to explore treatments, book appointments, upload medical records, and join virtual video consultations, while offering a robust management dashboard for doctors and administrators.

## 🌟 Key Features

- **Premium UI/UX:** Awwwards-inspired design featuring glassmorphism, smooth Framer Motion page transitions, and luxurious aesthetics.
- **Comprehensive Treatment Directory:** Over 100 specialized procedures elegantly categorized with rich descriptions and instant search filtering.
- **Secure Appointment Booking:** Multi-step booking flow with integrated Mock Payment Gateway (UPI, Card, Pay at Clinic).
- **Medical Report Uploads:** Securely upload Patient Medical Reports and X-Rays via Cloudinary integration directly during checkout.
- **Virtual Video Consultations:** Automated generation of unique Jitsi Meet rooms for remote telemedicine appointments.
- **Role-Based Dashboards:** Dedicated, secure portals for both Patients (to view history, join calls, and cancel) and Doctors (to manage schedules, view reports, and update statuses).
- **Automated Email Notifications:** Nodemailer integration to send real-time confirmation and status updates directly to patients.

## 🛠 Tech Stack

**Frontend:**
- [React](https://reactjs.org/) (with TypeScript)
- [Vite](https://vitejs.dev/) - Lightning fast build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) - Professional animation library
- [React Router](https://reactrouter.com/) - Multi-page routing
- [Lucide React](https://lucide.dev/) - Beautiful iconography

**Backend & Database:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - High-performance server
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud NoSQL Database
- [Mongoose](https://mongoosejs.com/) - Elegant object modeling
- [JWT](https://jwt.io/) & [Bcrypt](https://www.npmjs.com/package/bcrypt) - Secure authentication

**External Integrations:**
- [Cloudinary](https://cloudinary.com/) (with Multer) - Cloud media & PDF storage
- [Jitsi Meet](https://jitsi.org/) - Free, secure video conferencing
- [Nodemailer](https://nodemailer.com/) - SMTP Email dispatching

---

## ⚙️ Environment Variables

Before running the application, you must configure your environment variables. 

### Server (`server/.env`)
Create a `.env` file in the `server` directory and add the following keys:

```env
# Application Settings
NODE_ENV=development
PORT=8080
CLIENT_URL=http://localhost:5173

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# JWT Secrets
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# SMTP / Email Notification Credentials (Gmail App Password)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Cloudinary Credentials (For X-Ray / Report Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Client (`client/.env`)
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:8080/api
```

---

## 🚀 Installation & Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/facio-dental.git
cd facio-dental
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
Open a new terminal window:
```bash
cd client
npm install
```

### 4. Run the Application
You will need two terminal windows running simultaneously.

**In the `server` terminal:**
```bash
npm run dev
# The server will start on http://localhost:8080
```

**In the `client` terminal:**
```bash
npm run dev
# The frontend will start on http://localhost:5173
```

Open your browser and navigate to `http://localhost:5173` to view the application!

---

*Designed and engineered with ❤️ for Facio Dental & Maxillofacial Super Speciality Centre.*
