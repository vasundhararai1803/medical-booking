# Facio Dental Super Speciality Centre

A full-stack, premium web application for a modern dental clinic. Features patient booking, telemedicine video consultations, secure medical record uploads, and role-based management dashboards.

## Core Features
- **Premium UI:** Glassmorphism, smooth Framer Motion transitions, and a highly responsive design.
- **Secure Booking System:** Race-condition-free slot booking with a server-side verified simulated payment gateway.
- **Telemedicine Ready:** Instant generation of Jitsi Meet video rooms for virtual consultations.
- **Medical Uploads:** Secure Cloudinary integration for patient X-rays and reports with strict MIME-type validation.
- **Robust Security:** JWT cookie-based authentication, Zod validation, and comprehensive error handling.

## 🛠 Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express.js, TypeScript, MongoDB Atlas, Mongoose
- **Integrations:** Cloudinary, Jitsi Meet, Nodemailer
- **Ops:** Docker, GitHub Actions CI/CD, ESLint/Prettier, Vitest (Testing), Swagger (API Docs)

## Quick Start (Docker)

The fastest way to run the entire stack (Frontend, Backend, and MongoDB) is using Docker Compose.

1. **Environment Setup:**
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   *(Fill in your MongoDB URI, JWT Secrets, Cloudinary Keys, etc. in `server/.env`)*

2. **Run the Stack:**
   ```bash
   docker-compose up --build -d
   ```

*(Alternatively, run `npm install` and `npm run dev` in both the `client` and `server` directories for local manual development).*
