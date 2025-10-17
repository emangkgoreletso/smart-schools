# 🏫 Smart Schools System

The **Smart Schools System** is a full-stack web application built with **React (TypeScript)** on the frontend and **ASP.NET Core (C#)** on the backend.  
It is designed to **automate school processes** — from admissions, assignments, tests, and payments to parent and teacher portals — tailored for **individual schools**.

---

## 🚀 Features

### 👨‍🏫 Core Modules
- **Authentication & Roles** — Admin, Student, Teacher, Parent
- **Student Management** — Enrollment, Test Results, Submissions
- **Teacher Portal** — Assignment creation, grading, and reporting
- **Parent Portal** — View child progress, fees, and reports
- **Admissions** — Online applications and student intake
- **Payments** — Fee tracking, balances, and receipts
- **Tests & Exams** — Multiple-choice online tests with results
- **AI Integration (Optional)** — Future support for AI-powered grading or chat assistant

---

## 🧩 Tech Stack

### **Frontend**
- React + TypeScript  
- Tailwind CSS  
- Axios (API calls)  
- React Router DOM  

### **Backend**
- ASP.NET Core 9.0  
- Entity Framework Core  
- Microsoft SQL Server  
- JWT Authentication  
- BCrypt for password hashing  
- Swagger (API documentation)

---

## 📁 Project Structure

smart-schools/
│
├── backend/
│ ├── Controllers/
│ ├── Models/
│ ├── Data/
│ ├── Services/
│ ├── Program.cs
│ ├── appsettings.json
│ └── backend.csproj
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── types/
│ ├── api/
│ ├── utils/
│ └── styles/
├── package.json
└── tailwind.config.js


---

## ⚙️ Setup Guide

### **Backend Setup**
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run

 ### **Frontend Setup**
cd frontend
npm install
npm start

