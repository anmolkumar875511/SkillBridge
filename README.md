# SkillBridge

SkillBridge is a **full‑stack MERN platform** that helps users analyze their resumes, identify skill gaps against real job opportunities, and generate **AI‑powered learning roadmaps** to bridge those gaps. It combines **rule‑based parsing**, **LLM intelligence**, and **real‑world job data** into one cohesive career‑growth system.

---

## Live Demo

* **Frontend:** [https://skillbridge-chi.vercel.app/](https://skillbridge-chi.vercel.app/)
* **Backend API:** [https://skillbridge-server-zeta.vercel.app/](https://skillbridge-server-zeta.vercel.app/)

---

## Core Features

### Authentication & User Management

* User registration & login (JWT + refresh tokens)
* Email OTP verification & resend OTP
* Forgot / Reset password flow
* Google OAuth 2.0 authentication (Passport.js)
* Profile management (update profile, avatar upload)
* Theme preference update (light / dark)

### Resume Intelligence

* Resume upload (PDF)
* Resume text cleaning & normalization
* **Rule‑based resume parsing** (skills, education, experience, projects)
* **LLM‑based resume parsing** for higher accuracy
* Smart merge of rule‑based + LLM parsed data
* Resume editing & confirmation by user

### Opportunity Matching

* Job ingestion from **FindWork API** (cron‑based)
* Normalized job roles & skills
* Skill matching using:

  * String matching
  * LLM‑based semantic matching
* Skill gap analysis per opportunity

### Skill Gap Analysis

* Visual skill gap reports
* Match percentage calculation
* Identified missing & weak skills
* Stored skill gap reports for reuse

### AI Learning Roadmaps

* Auto‑generated learning roadmap per opportunity
* Custom target‑based roadmap generation
* Task‑based roadmap with completion tracking
* Completed roadmap history

### Admin Panel

* Admin‑only access (role‑based authorization)
* Dashboard analytics
* User management & blacklist toggle
* Opportunity ingestion trigger
* Application logs view & export

---

## Tech Stack

### Frontend

* **React 19** (Vite)
* **React Router v7**
* **Tailwind CSS v4**
* Axios (with interceptors)
* Recharts (analytics & graphs)

### Backend

* **Node.js + Express 5**
* **MongoDB + Mongoose**
* Passport.js (Google OAuth)
* JWT Authentication
* Multer (file uploads)
* Cloudinary (avatar & assets)
* Nodemailer (email & OTP)
* OpenAI / Groq LLM integration
* Node‑cron (background jobs)

---

## Project Structure

```
SkillBridge
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── services
│   │   │   ├── parserRule
│   │   │   ├── parserLLM
│   │   │   ├── roadmapGenerator
│   │   │   └── skillMatcher
│   │   ├── middlewares
│   │   ├── utils
│   │   ├── cron
│   │   └── app.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── context
│   │   └── axiosInstance.js
│   └── package.json
├── documentations
└── README.md
```

---

## Authentication Flow

* Access Token (short‑lived)
* Refresh Token (HTTP‑only cookie)
* Token rotation on refresh
* Protected routes via `verifyToken` middleware
* Role‑based access via `authorizeRoles`

---

## Resume Parsing Strategy

1. **PDF Upload → Text Extraction**
2. **Rule‑Based Parsing** (fast, structured)
3. **LLM Parsing** (context‑aware, semantic)
4. **Merge Engine** resolves conflicts & fills gaps
5. **Normalization** for skills & domains

This hybrid approach ensures **accuracy + reliability**.

---

## Background Jobs (Cron)

* Database cleanup & maintenance

---

## 🧪 API Base Path

```
/api/v1
```

Main modules:

* `/user`
* `/resume`
* `/opportunity`
* `/skillgap`
* `/roadmap`
* `/admin`

---


## Local Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/anmolkumar875511/SkillBridge.git
cd SkillBridge
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---


## Project Makers

SkillBridge is built by a focused two‑member team with clear technical ownership across backend systems and frontend experience.

### **Anmol Kumar** — Backend Engineer

* Backend architecture & REST API design
* Authentication, authorization, and security flows
* Resume parsing pipeline (rule‑based + LLM)
* Skill gap analysis & roadmap generation logic
* Database schema design and background jobs

**Stack:** Node.js, Express, MongoDB, LLM APIs

---

### **Tanishq Lalani** — Frontend Engineer

* Frontend architecture using React + Vite
* UI components and responsive layouts
* API integration and protected routing
* Data visualization and theming

**Stack:** React, Tailwind CSS


⭐ If you like this project, consider giving it a star!
