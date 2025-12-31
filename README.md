# 🚀 SkillBridge – Smart Internship & Skill Gap Analyzer

> **SkillBridge** is a full-stack MERN platform that analyzes student resumes, matches skills against internship requirements, identifies skill gaps, and generates a personalized learning roadmap.
> Designed with **scalable, industry-grade architecture** and **AI-ready modularity**.

---

## 📌 Problem Statement

Students often apply to internships without understanding:

* Which skills they already have
* Which skills are missing
* How prepared they are for a specific role

**SkillBridge solves this by providing data-driven insights and actionable learning paths.**

---

## 🎯 Key Features

### 👤 Authentication & Roles

* Secure JWT authentication
* Role-based access (Student / Admin)

### 📄 Resume Analysis

* PDF resume upload
* Text extraction
* Skill identification using keyword & regex matching
* Editable extracted skills

### 💼 Internship Management

* Internship listing with required skills
* Experience level & role categorization
* Admin-only CRUD operations

### 📊 Skill Gap Analysis

* Match percentage calculation
* Matched vs missing skills
* Readiness score visualization

### 🧭 Personalized Learning Roadmap

* Skill priority classification
* Weekly learning plan
* Curated learning resources
* Progress tracking

### 📈 Analytics & Visualization

* Skill gap charts
* Internship readiness indicators
* User progress dashboard

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Query
* Chart.js / Recharts
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (file upload)
* pdf-parse (resume parsing)

### DevOps & Tools

* Git & GitHub
* Docker (optional)
* GitHub Actions (CI)
* MongoDB Atlas
* Render / Vercel deployment

---

## 🏗 System Architecture

```
Client (React)
   |
   | REST APIs
   |
Server (Node + Express)
   |
   ├── Authentication Service
   ├── Resume Parsing Module
   ├── Skill Matching Engine
   ├── Internship Service
   └── Roadmap Generator
        |
     MongoDB
```

---

## 🗂 Database Design

### User

```json
{
  "name": "Student Name",
  "email": "email@example.com",
  "role": "student",
  "skills": ["JavaScript", "React"],
  "resumeId": "ObjectId"
}
```

### Internship

```json
{
  "title": "Frontend Intern",
  "company": "TechCorp",
  "requiredSkills": ["HTML", "CSS", "React"],
  "experienceLevel": "Beginner"
}
```

### Skill Gap Report

```json
{
  "matchedSkills": ["React"],
  "missingSkills": ["HTML", "CSS"],
  "matchPercentage": 33
}
```

---

## 🧭 Skill Gap Calculation Logic

```text
Match Percentage = 
(Matched Skills / Required Skills) × 100
```

This ensures transparent and explainable results.

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/skillbridge.git
cd skillbridge
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

### 4️⃣ Environment Variables

Create `.env` file in backend:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## 🌐 Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway / AWS
* **Database**: MongoDB Atlas

---

## 🧠 Future Enhancements (AI-Ready)

* NLP-based skill extraction
* Resume quality scoring
* AI-generated learning roadmaps
* Skill demand trend analysis
* Internship recommendation engine

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue first.

---

## 📜 License

MIT License
