# Facio Dental & Maxillofacial Super Speciality Centre

> A full-stack MERN appointment management and clinical operational platform built with passwordless 4-digit OTP authentication, atomic schedule locking, and real-time medical record storage.

---

## Technical Overview

Facio Dental provides patients with a multi-step clinic booking experience while delivering scheduling and record management for healthcare providers. 

The application utilizes passwordless authentication, server-side authorization boundaries, atomic concurrency controls, and Zod input validation to ensure end-to-end security and data integrity.

---

## Core Features

### Patient Experience
* **Passwordless OTP Login:** 4-digit OTP verification via SMS/Email with a persistent 12-hour secure session.
* **Smart Booking Engine:** Real-time doctor availability checks with automated concurrency locking.
* **Telehealth Integration:** Virtual video consultations powered by the Jitsi Meet API.
* **Medical Record Storage:** Diagnostic report and X-ray uploads with strict MIME-type validation.

### Clinical & Admin Panel
* **Appointment Operations:** Live status updates (`Confirmed`, `In-Consultation`, `Completed`, `Cancelled`).
* **Schedule Management:** Configurable doctor working hours, break times, and dynamic slot generation.
* **Patient History:** Integrated dashboard for historical booking metrics and attached records.

---

## Security & Architecture Highlights

* **12-Hour HttpOnly Cookie Sessions:** Auth tokens stored exclusively in `HttpOnly`, `SameSite`, and `Secure` cookies to defend against XSS exfiltration.
* **Atomic Double-Booking Protection:** MongoDB Compound Unique Indexes (`doctorId + date + slot`) preventing duplicate bookings under high concurrency.
* **Server-Side Verification:** Transaction states verified directly via server-to-server validation routes.
* **Strict Input Validation:** Runtime request parsing powered by Zod schemas to reject invalid payloads at the router layer.

---

## Tech Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Axios, Lucide Icons, Vite |
| **Backend** | Node.js, Express.js, TypeScript, Zod, Cookie-Parser, Multer |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Services & APIs** | Cloudinary API, Jitsi Meet API, Nodemailer / Twilio |
| **DevOps & Testing** | Vitest, Supertest, Docker, GitHub Actions |

---

## Getting Started

### Prerequisites
* Node.js (v20+ recommended)
* npm / pnpm
* MongoDB Atlas Cluster

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/facio-dental-centre.git](https://github.com/YOUR_USERNAME/facio-dental-centre.git)
   cd facio-dental-centre